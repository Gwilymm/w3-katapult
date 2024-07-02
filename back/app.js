const express = require("express");
const app = express();
const port = 3001;
const { ApolloServer, gql } = require("apollo-server-express");
const sequelize = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "katapult_secret_key";
const multer = require("multer");
const path = require("path");
const { GraphQLUpload } = require("graphql-upload");

// Configuration de multer pour les uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ajouter une timestamp pour éviter les conflits de noms
  },
});

const upload = multer({ storage: storage });

// Middleware pour parser les requêtes POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pour servir les fichiers statiques
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route pour afficher le formulaire (corrigé pour servir un fichier statique)
app.get("/front", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Route pour gérer la soumission du formulaire
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  res.send(
    `Formulaire soumis avec succès !<br>Nom: ${name}<br>Email: ${email}<br>Message: ${message}`
  );
});

// Schémas GraphQL
const typeDefs = gql`
  scalar Upload

  type User {
    id: ID!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    profilePicture: String
    address: String
    siret: String
    phoneNumber: String
    birthDate: String
    token: String
  }

  type Query {
    login(username: String!, password: String!): User
    getUserProfile(id: ID!): User
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): User
    updateUserProfile(
      id: ID!
      profilePicture: String
      address: String
      siret: String
      birthDate: String
      phoneNumber: String
    ): User
    uploadProfilePicture(id: ID!, file: Upload!): User
  }
`;

// Résolveurs GraphQL
const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error("Utilisateur non retrouvé");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Mot de passe incorrect");
      }

      const token = jwt.sign({ userId: user.id }, secretKey);
      return { ...user.toJSON(), token };
    },
    getUserProfile: async (_, { id }) => {
      return await User.findByPk(id);
    },
  },
  Mutation: {
    register: async (_, { username, email, password, firstName, lastName }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      const token = jwt.sign({ userId: user.id }, secretKey);
      return { ...user.toJSON(), token };
    },
    updateUserProfile: async (
      _,
      { id, profilePicture, address, siret, birthDate }
    ) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Utilisateur non retrouvé");
      }

      await user.update({ profilePicture, address, siret, birthDate });
      return user;
    },

    uploadProfilePicture: async (_, { id, file }) => {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Utilisateur non retrouvé");
      }
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      // Générer un nom de fichier unique
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const pathName = __dirname + `/uploads/${uniqueSuffix}-${filename}`;
      await new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(pathName);
        stream.pipe(writeStream);
        stream.on("end", resolve);
        stream.on("error", reject);
      });

      const profilePictureUrl = `/uploads/${uniqueSuffix}-${filename}`;
      await user.update({ profilePicture: profilePictureUrl });
      return user;
    },
  },
};

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, secretKey);
    }
    return null;
  } catch (err) {
    return null;
  }
};

// Initialiser Apollo Server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      const user = getUser(token);
      return { user };
    },
  });
  await server.start();
  server.applyMiddleware({ app });

  sequelize.sync().then(() => {
    app.listen({ port: port }, () => {
      console.log(
        `Serveur en cours sur http://localhost:${port}${server.graphqlPath}`
      );
    });
  });
}

startServer();

//exemple
//login
// query {
// 	login(username: "donne12", password: "testpassword") {
// 	  id
// 	  username
// 	  email
// 	  firstName
// 	  lastName
// 	  token
// 	}
//}
//register
// mutation {
// 	register(username: "donne12", email: "test@example.com", password: "testpassword", firstName: "John", lastName: "Doe") {
// 	  id
// 	  username
// 	  email
// 	  firstName
// 	  lastName
// 	  token
// 	}
//}
//updateprofile
// mutation {
// 	updateUserProfile(id: 1, profilePicture: "newpicture.jpg", address: "123 Main St", iban: "DE1234567890", birthDate: "1990-01-01") {
// 	  id
// 	  username
// 	  email
// 	  firstName
// 	  lastName
// 	  profilePicture
// 	  address
// 	  siret
// 	  birthDate
// 	}
// }

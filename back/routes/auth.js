const express = require("express");
const db = require('../models');
const router = express.Router();
const app = express();
const User = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const secretKey = "katapult_secret_key";


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

// Middleware pour charger dynamiquement les routes
router.get("/", async (req, res) => {
  res.send("Hello World");
});

// Pour servir les fichiers statiques
router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware pour vérifier le token JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "Token manquant" });
  }
  try {
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Token invalide" });
  }
};

// Route pour l'enregistrement des utilisateurs
router.post("/register", async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  try {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      siret,
      birthDate,
      phoneNumber,
    });
    const token = jwt.sign({ userId: user.id }, secretKey);
    res.json({ ...user.toJSON(), token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Erreur lors de l'enregistrement" });
  }
});

// Route pour la connexion des utilisateurs
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send({ message: "Utilisateur non retrouvé" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).send({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey);
    res.json({ ...user.toJSON(), token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Erreur lors de la connexion" });
  }
});

// Route pour obtenir le profil utilisateur
router.get("/user/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "Utilisateur non retrouvé" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).send({
      message: "Erreur lors de la récupération du profil utilisateur",
    });
  }
});

// Route pour mettre à jour le profil utilisateur
router.put("/user/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { profilePicture, address, siret, birthDate, phoneNumber } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "Utilisateur non retrouvé" });
    }

    await user.update({
      profilePicture,
      address,
      siret,
      birthDate,
      phoneNumber,
    });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la mise à jour du profil utilisateur" });
  }
});

// Route pour uploader une photo de profil
router.post(
  "/user/:id/upload",
  authenticate,
  upload.single("file"),
  async (req, res) => {
    const { id } = req.params;
    const file = req.file;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non retrouvé" });
      }

      const profilePictureUrl = `/uploads/${file.filename}`;
      await user.update({ profilePicture: profilePictureUrl });
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Erreur lors de l'upload de la photo de profil" });
    }
  }
);

// Générer le PDF
router.get("/user/:id/pdf", authenticate, async (req, res) => { });

module.exports = router;

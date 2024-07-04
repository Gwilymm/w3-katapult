const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const secretKey = "katapult_secret_key";
const jwt = require("jsonwebtoken");

const {
  sequelize,
  Application,
  EconomicModel,
  ProjectDetails,
  ProjectTeam,
  TeamIntroduction,
} = require("../models");
const router = express.Router();

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

// Route pour générer le PDF
router.get("/generate-pdf/:id", authenticate, async (req, res) => {
  try {
    await sequelize.authenticate();

    const application = await Application.findOne({
      where: { id: req.params.id },
      include: [EconomicModel, ProjectDetails, ProjectTeam, TeamIntroduction],
    });

    if (!application) {
      res.status(404).send({ message: "Dossier non trouvé", status: 404 });
      return;
    }

    const {
      EconomicModel: economicModel,
      ProjectDetail: projectDetail,
      ProjectTeam: projectTeam,
      TeamIntroduction: teamIntroduction,
    } = application;

    // Generate HTML content
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2, h3, h4 { text-align: center; }
            .section { margin-bottom: 20px; }
            .subsection { margin-bottom: 10px; }
            .underline { text-decoration: underline; }
            * {
        margin: 0;
        padding: 0;
        text-indent: 0;
      }
      .s1 {
        color: black;
        font-family: "Times New Roman", serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s2 {
        color: #ec665b;
        font-family: "Arial Black", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 36pt;
      }
      h1 {
        color: #ec665b;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 36pt;
      }
      .s3 {
        color: #ec665b;
        font-family: Arial, sans-serif;
        font-style: italic;
        font-weight: normal;
        text-decoration: none;
        font-size: 18pt;
      }
      h2 {
        color: #575756;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: underline;
        font-size: 14pt;
      }
      .s4 {
        color: #575756;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 12pt;
      }
      .s5 {
        color: #575756;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s6 {
        color: black;
        font-family: "Times New Roman", serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s7 {
        color: #ec6559;
        font-family: "Arial Black", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 13pt;
      }
      h3 {
        color: #575756;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 12pt;
      }
      .s8 {
        color: #ec665b;
        font-family: "Arial Black", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 13pt;
      }
      .p,
      p {
        color: #575756;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
        margin: 0pt;
      }
      .s10 {
        color: #575756;
        font-family: "Times New Roman", serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s11 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s12 {
        color: #666;
        font-family: Arial, sans-serif;
        font-style: italic;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s13 {
        color: #202024;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s14 {
        color: #575756;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s16 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s17 {
        color: #1154cc;
        font-family: Arial, sans-serif;
        font-style: italic;
        font-weight: normal;
        text-decoration: underline;
        font-size: 10pt;
      }
      .s18 {
        color: #575756;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s19 {
        color: #67b32d;
        font-family: "Arial Black", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 13pt;
      }
      .s20 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s21 {
        color: #202024;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s23 {
        color: #575756;
        font-family: "Segoe UI Symbol", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s24 {
        color: #f5b026;
        font-family: "Arial Black", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 13pt;
      }
      .s25 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s26 {
        color: #575756;
        font-family: "Segoe UI Symbol", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s27 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s28 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s29 {
        color: black;
        font-family: "Times New Roman", serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
        vertical-align: 1pt;
      }
      .s30 {
        color: #575756;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 11pt;
        vertical-align: 1pt;
      }
      .s31 {
        color: #575756;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 11pt;
      }
      .s33 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s34 {
        color: #ec665b;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 12pt;
      }
      .s35 {
        color: #ec665b;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 12pt;
      }
      .s36 {
        color: #f5b026;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 12pt;
      }
      .s37 {
        color: #575756;
        font-family: "Segoe UI Symbol", sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      .s38 {
        color: #ec665b;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      a {
        color: #1154cc;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: underline;
        font-size: 12pt;
      }
      li {
        display: block;
      }
      #l1 {
        padding-left: 0pt;
      }
      #l1 > li > *:first-child:before {
        content: "- ";
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      li {
        display: block;
      }
      #l2 {
        padding-left: 0pt;
      }
      #l2 > li > *:first-child:before {
        content: "○ ";
        color: #575756;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 12pt;
      }
      table,
      tbody {
        vertical-align: top;
        overflow: visible;
      }

      h3{
        text-decoration: underline;
      }

       .container {
      display: flex;
      justify-content: space-between;
    }
    .column {
      display: inline-block;
    }
          </style>
        </head>
        <body>
          <p class="s1" style="padding-left: 5pt; text-indent: 0pt; text-align: left">
      <div class="container">
    <div class="column">
      <img width="191" height="139" src="https://i.ibb.co/bdgrBf5/Screen-Shot-20240704115036.jpg" />
    </div>
    <div class="column">
      <img width="286" height="105" src="https://i.ibb.co/B3HXd7m/Screen-Shot-20240704115043.jpg" />
    </div>
  </div>
       
    </p>
    <p
      class="s2"
      style="padding-top: 1pt; text-indent: 0pt; text-align: center"
    >
      ADRESS Normandie
    </p>
    <h1 style="padding-top: 9pt; text-indent: 0pt; text-align: center">
      Incubateur KATAPULT
    </h1>
    <p
      class="s3"
      style="
        padding-top: 6pt;
        padding-left: 141pt;
        text-indent: 0pt;
        line-height: 114%;
        text-align: center;
      "
    >
      Dossier de candidature Promotion mars 2024
    </p>

          <div class="section">
            <h3>Fiche d’identité</h3>
            <p><strong>Genèse du projet:</strong> ${
              projectDetail ? projectDetail.genesis : "N/A"
            }</p>
            <p><strong>Résumé du projet:</strong> ${
              projectDetail ? projectDetail.summary : "N/A"
            }</p>
            <p><strong>À quel problème social et/ou environnemental souhaitez-vous répondre ? :</strong> ${
              projectDetail ? projectDetail.problemAddressed : "N/A"
            }</p>
            <p><strong>Qui est concerné ? :</strong> ${
              projectDetail ? projectDetail.beneficiaries : "N/A"
            }</p>
            <p><strong>Quelle solution souhaitez-vous proposer ? Quelle sera votre offre ? :</strong> ${
              projectDetail ? projectDetail.offer : "N/A"
            }</p>
            <p><strong>En quoi votre projet est-il différent et/ou complémentaire des solutions existantes sur le
territoire considéré ? :</strong> ${
      projectDetail ? projectDetail.differentiation : "N/A"
    }</p>
          </div>

            
          ${
            economicModel
              ? `
          <div class="section">
            <h3>Le modèle économique</h3>
            <p><strong>Quelles sont les sources de revenus envisagées pour votre projet?:</strong> ${economicModel.revenueSources}</p>
            <p><strong>Combien d’emplois pensez-vous créer sur les premières années d’activités?:</strong> ${economicModel.jobCreation}</p>
            <p><strong>À ce stade, quels sont les éléments vous permettant d’affirmer la viabilité économique du projet?:</strong> ${economicModel.economicViability}</p>
          </div>`
              : ""
          }


          ${
            projectTeam
              ? `
          <div class="section">
            <h3>L'équipe projet</h3>
            <p><strong>Personne référente</strong></p>
            <p><strong>Nom:</strong> ${projectTeam.name}</p>
            <p><strong>Prénom:</strong> ${projectTeam.surname}</p>
            <p><strong>Date de naissance:</strong> ${projectTeam.birthDate}</p>
            <p><strong>Adresse:</strong> ${projectTeam.address}</p>
            <p><strong>E-mail:</strong> ${projectTeam.email}</p>
            <p><strong>Téléphone:</strong> ${projectTeam.phone}</p>
            <p><strong>Autres personnes impliquées dans le projet:</strong> ${projectTeam.otherMembers}</p>
          </div>`
              : ""
          }

          ${
            projectDetail
              ? `
          <div class="section">
            <h3>Votre projet et son utilité sociale</h3>
            <p><strong>Expliquez la genèse de votre projet:</strong> ${projectDetail.genesis}</p>
            <p><strong>Résumez votre projet:</strong> ${projectDetail.summary}</p>
            <p><strong>À quel problème social et/ou environnemental souhaitez-vous répondre?:</strong> ${projectDetail.problemAddressed}</p>
          </div>`
              : ""
          }


          ${
            teamIntroduction
              ? `
          <div class="section">
            <h3>Vous et votre équipe</h3>
            <p><strong>Avez-vous une expérience entrepreneuriale?:</strong> ${teamIntroduction.entrepreneurialExperience}</p>
            <p><strong>Citez un entrepreneur social qui vous inspire particulièrement:</strong> ${teamIntroduction.inspirationalEntrepreneur}</p>
            <p><strong>Quelles sont selon vous les compétences manquantes dans l’équipe pour mener à bien ce projet?:</strong> ${teamIntroduction.missingSkills}</p>
            <p><strong>Qui suivra le parcours d’incubation?:</strong> ${teamIntroduction.incubationParticipation}</p>
          </div>`
              : ""
          }
          <center>
           <p style="text-indent: 0pt; text-align: center; padding-top:290px">
      Merci pour vos réponses et au plaisir de vous lire !
    </p>
    <p style="padding-top: 4pt; text-indent: 0pt; text-align: left"><br /></p>
    <p style="text-indent: 0pt; text-align: center">L’équipe de Katapult</p>
    <p style="padding-top: 6pt; text-indent: 0pt; text-align: left"><br /></p>
    <h2 style="text-indent: 0pt; text-align: center">Les dates à retenir</h2>
    <p style="padding-top: 6pt; text-indent: 0pt; text-align: left"><br /></p>
    <div
      class="textbox"
      style="
        border: 0.8pt solid #000000;
        display: block;
        min-height: 201.8pt;
        width: 510pt;
      "
    >
      <p
        class="s35"
        style="
          padding-top: 5pt;
          padding-left: 5pt;
          text-indent: 0pt;
          text-align: left;
        "
      >
        Dépôt du dossier de candidature et annexes
        <span style="color: #575756">: </span
        ><span class="s5">21 février 2024 minuit</span>
      </p>
      <p style="padding-top: 4pt; text-indent: 0pt; text-align: left"><br /></p>
      <p
        class="s4"
        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
      >
        Processus de sélection
      </p>
      <p
        class="s26"
        style="
          padding-left: 23pt;
          text-indent: 0pt;
          line-height: 16pt;
          text-align: left;
        "
      >
        ★ <span class="s35">Présélection sur dossier</span>
      </p>
      <p
        class="s26"
        style="
          padding-left: 23pt;
          text-indent: 0pt;
          line-height: 16pt;
          text-align: left;
        "
      >
        ★ <span class="s35">Comités de sélection </span
        ><span class="s5">:</span>
      </p>
      <ul id="l2">
        <li data-list-text="○">
          <p
            class="s4"
            style="
              padding-top: 1pt;
              padding-left: 77pt;
              text-indent: -18pt;
              text-align: left;
            "
          >
            Caen (projets des départements 14, 50 et 61)
            <span class="s5">: 12 et 13 mars 2024</span>
          </p>
        </li>
        <li data-list-text="○">
          <p
            class="s4"
            style="
              padding-top: 2pt;
              padding-left: 77pt;
              text-indent: -18pt;
              text-align: left;
            "
          >
            Rouen (projets des départements 27 et 76)
            <span class="s5">: 14 et 15 mars 2024</span>
          </p>
        </li>
      </ul>
      <p style="padding-top: 4pt; text-indent: 0pt; text-align: left"><br /></p>
      <p
        class="s4"
        style="padding-left: 5pt; text-indent: 0pt; text-align: left"
      >
        Si vous êtes sélectionné pour intégrer l’incubateur, voici les premières
        dates <span class="s5">:</span>
      </p>
      <p
        class="s26"
        style="
          padding-left: 23pt;
          text-indent: 0pt;
          line-height: 16pt;
          text-align: left;
        "
      >
        ★ <span class="s35">Premier rendez-vous </span
        ><span class="s5">avec l’ADRESS à fixer à partir du 18 mars 2024</span>
      </p>
      <p
        class="s26"
        style="
          padding-left: 23pt;
          text-indent: 0pt;
          line-height: 16pt;
          text-align: left;
        "
      >
        ★ <span class="s35">Journée d’intégration </span
        ><span class="s5">: 4 avril 2024 (lieu à définir)</span>
      </p>
      <p
        class="s26"
        style="
          padding-left: 23pt;
          text-indent: 0pt;
          line-height: 16pt;
          text-align: left;
        "
      >
        ★ <span class="s35">1ère journée de formation </span
        ><span class="s5">: 10, 11 ou 12 avril 2024</span>
      </p>
    </div>
    <p style="padding-left: 17pt; text-indent: 0pt; text-align: left" />
    <p style="text-indent: 0pt; text-align: left"><br /></p>
    <h3 style="padding-left: 18pt; text-indent: 0pt; text-align: justify">
      Dossier de candidature et annexes à joindre au dossier:
    </h3>
    <p
      class="s37"
      style="
        padding-left: 36pt;
        text-indent: 0pt;
        line-height: 16pt;
        text-align: justify;
      "
    >
      ★ <span class="s34">le CV de chacun des porteurs de projets</span>
    </p>
    <p
      class="s37"
      style="
        padding-left: 54pt;
        text-indent: -18pt;
        line-height: 112%;
        text-align: justify;
      "
    >
      ★
      <span class="p"
        >Si vous êtes une entreprise existante (développement d’un nouveau
        projet ou essaimage), merci de joindre également le </span
      ><span class="s34"
        >dernier rapport d’activité et les derniers éléments financiers</span
      ><span class="s38">.</span>
    </p>
    <p style="padding-top: 2pt; text-indent: 0pt; text-align: left"><br /></p>
    <p
      style="
        padding-left: 92pt;
        text-indent: 0pt;
        line-height: 114%;
        text-align: center;
      "
    >
      à renvoyer en version numérique
      <u><b>avant le 21 février 2024 minuit</b></u
      ><b> </b
      ><a
        href="mailto:katapult@adress-normandie.org"
        style="
          color: #575756;
          font-family: Arial, sans-serif;
          font-style: normal;
          font-weight: normal;
          text-decoration: none;
          font-size: 12pt;
        "
        target="_blank"
        >à : </a
      ><a href="mailto:katapult@adress-normandie.org" target="_blank"
        >katapult@adress-normandie.org</a
      >
    </p>
    <p style="text-indent: 0pt; text-align: left"><br /></p>
     
           <img
                width="636"
                height="200"
                src="https://i.ibb.co/KrwQCf6/Screen-Shot-20240704112100.png"
              />
            <center/>
        </body>
      </html>
    `;

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filePath = path.join(
      __dirname,
      `../uploads/${uniqueSuffix}-report.pdf`
    );

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "load", timeout: 0 });
    await page.pdf({ path: filePath, format: "A4", printBackground: true });
    await browser.close();

    res.send({
      message: "PDF généré avec succès",
      filePath: `uploads/${uniqueSuffix}-report.pdf`,
      status: 200,
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    res.status(500).send({ message: "Internal Server Error", error: err });
  }
});

// Récupération de toutes les candidatures
router.get("/all", authenticate, async (req, res) => {
  try {
    await sequelize.authenticate();

    const applications = await Application.findAll({
      include: [EconomicModel, ProjectDetails, ProjectTeam, TeamIntroduction],
    });

    res.json(applications);
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    res.status(500).send({ message: "Internal Server Error", error: err });
  }
});

module.exports = router;

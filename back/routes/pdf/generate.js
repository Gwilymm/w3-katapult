const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const secretKey = "katapult_secret_key";
const jwt = require("jsonwebtoken");
const fs = require('fs');

const {
  sequelize,
  Application,
  EconomicModel,
  ProjectDetails,
  ProjectTeam,
  TeamIntroduction,
} = require("../../models");
const router = express.Router();

/* // Middleware pour vérifier le token JWT
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
}; */

router.get("/generate-pdf/:id", async (req, res) => {
  try {
    const application = await Application.findOne({
      where: { id: req.params.id },
      include: [ EconomicModel, ProjectDetails, ProjectTeam, TeamIntroduction ],
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
    function base64Encode(file) {
      const filePath = path.resolve(file);
      const fileData = fs.readFileSync(filePath);
      return fileData.toString('base64');
    }

    const adressLogoBase64 = base64Encode(path.join(__dirname, 'adress-logo.png'));
    const katapultLogoBase64 = base64Encode(path.join(__dirname, 'logo_katapult.png'));

    // Generate HTML content from the template.html file
    let htmlContent = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

    htmlContent = htmlContent
      .replace('{{adressLogoBase64}}', adressLogoBase64)
      .replace('{{katapultLogoBase64}}', katapultLogoBase64);

    const browser = await puppeteer.launch({
      headless: true,
      args: [ "--no-sandbox" ],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "load", timeout: 0 });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="report.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);

    const stream = require('stream');
    const readStream = new stream.PassThrough();
    readStream.end(pdfBuffer);
    readStream.pipe(res);
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    res.status(500).send({ message: "Internal Server Error", error: err });
  }
});

// Récupération de toutes les candidatures
/* router.get("/all", authenticate, async (req, res) => {
  try {
    await sequelize.authenticate();

    const applications = await Application.findAll({
      include: [ EconomicModel, ProjectDetails, ProjectTeam, TeamIntroduction ],
    });

    res.json(applications);
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    res.status(500).send({ message: "Internal Server Error", error: err });
  }
}); */

module.exports = router;

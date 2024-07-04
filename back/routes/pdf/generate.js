const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const secretKey = "katapult_secret_key";
const jwt = require("jsonwebtoken");
const fs = require('fs');

const db = require("../../models");
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


/**
 * The function `base64Encode` encodes a file to base64 format using Node.js.
 * @param   $file - The `file` parameter in the `base64Encode` function is a file path that you want
 * to encode to base64.
 * @returns The function `base64Encode` reads a file from the given file path, encodes the file data to
 * base64 format, and returns the base64 encoded data as a string.
 * 
 * Generated on 07/05/2024 Gwilymm
 */
function base64Encode(file) {
  const filePath = path.resolve(file);
  const fileData = fs.readFileSync(filePath);
  return fileData.toString('base64');
}
// Function to replace placeholders in the template
function replacePlaceholders(template, data) {
  return template.replace(/{{(\w+)\.(\w+)}}/g, (match, parentKey, key) => {
    return data[ parentKey ] && data[ parentKey ][ key ] ? data[ parentKey ][ key ] : '';
  });
}

function replacePhotoPlaceholders(template, data) {
  return template.replace(/{{(\w+)}}/g, (match, key) => {
    return data[ key ] ? data[ key ] : '';
  });
}


function normalizeTemplate(template) {
  // Combine multiline {{#ifChecked ...}} placeholders into a single line
  return template.replace(/{{#ifChecked[\s\S]*?}}/g, (match) => {
    return match.replace(/\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
  });
}


function replaceCheckboxes(template, data) {
  template = normalizeTemplate(template); // Normalize the template
  return template.replace(/{{#ifChecked (\w+)\.(\w+) '(\w+)'}}/g, (match, parentKey, key, value) => {
    console.log(match);
    const values = data[ parentKey ] && data[ parentKey ][ key ] ? data[ parentKey ][ key ].toLowerCase().split(',') : [];
    const result = values.includes(value) ? 'checked' : '';
    console.log(values);
    return result;
  });
}

async function getDataFromTables(applicationId) {
  const data = {};
  const tables = [
    { model: db.Application, name: 'application' },
    { model: db.EconomicModel, name: 'economicModel' },
    { model: db.ProjectDetails, name: 'projectDetails' },
    { model: db.ProjectTeam, name: 'projectTeam' },
    { model: db.TeamIntroduction, name: 'teamIntroduction' },
    { model: db.ProjectIdentity, name: 'projectIdentities' },
    { model: db.LegalStructure, name: 'legalStructure' },
    { model: db.User, name: 'user' }
  ];

  for (const table of tables) {
    if (!table.model) {
      console.log(`Table ${table.name} not found`);
      continue;
    }
    if (table.name === 'application') {
      let record = await table.model.findOne({ where: { id: applicationId } });
      if (record) {
        data[ table.name ] = record.dataValues;
      }
    } else if (table.name === 'user') {
      //get application and find the user id
      const application = await db.Application.findOne({ where: { id: applicationId } });
      let record = await table.model.findOne({ where: { id: application.userId } });
      if (record) {
        data[ table.name ] = record.dataValues;
      }
    } else if (table.name === 'projectTeam') {
      let records = await table.model.findAll({ where: { applicationId } });
      if (records) {
        data[ table.name ] = records.map(record => record.dataValues);
      }
    } else {
      let record = await table.model.findOne({ where: { applicationId } });
      if (record) {
        data[ table.name ] = record.dataValues;
      }
    }

  }

  return data;
}
function formatDate(date) {
  const d = new Date(date);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
function generateProjectTeamTable(projectTeam) {
  if (!Array.isArray(projectTeam)) {
    projectTeam = [ projectTeam ];
  }

  return projectTeam.map(member => `
    <tr>
      <td>${member.surname}</td>
      <td>${member.name}</td></td>
      <td>${member.email}</td>
      <td>${member.phone}</td>
    </tr>
  `).join('');
}
router.get("/generate-pdf/:id", async (req, res) => {
  try {
    const applicationId = req.params.id;
    const data = await getDataFromTables(applicationId);

    if (data.user && data.user.birthDate) {
      data.user.birthDate = formatDate(data.user.birthDate);
    }
    if (data.legalStructure.creationDate) {
      data.legalStructure.creationDate = formatDate(data.legalStructure.creationDate);
    }

    const adressLogoBase64 = base64Encode(path.join(__dirname, 'adress-logo.png'));
    const katapultLogoBase64 = base64Encode(path.join(__dirname, 'logo_katapult.png'));

    // Generate HTML content from the template.html file
    let htmlContent = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

    // Ajout des logos
    data.adressLogoBase64 = adressLogoBase64;
    data.katapultLogoBase64 = katapultLogoBase64;

    htmlContent = htmlContent.replace('{{#projectTeam}}', generateProjectTeamTable(data.projectTeam));
    // Remplacement des placeholders par les données réelles
    htmlContent = replacePlaceholders(htmlContent, data);

    htmlContent = replacePhotoPlaceholders(htmlContent, data);
    // Gestion des checkboxes
    htmlContent = replaceCheckboxes(htmlContent, data);

    const browser = await puppeteer.launch({
      headless: true,
      args: [ "--no-sandbox" ],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "load", timeout: 0 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true

    });
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

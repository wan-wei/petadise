var express = require('express');
var router = express.Router();
const getTips = require('../public/javascripts/gameCore').getTips;
const processResponse = require('../public/javascripts/gameCore').processResponse;
const generateReportSuggestion = require('../public/javascripts/gameCore').generateReportSuggestion;
const generateMatchRateReport = require('../public/javascripts/gameCore').generateMatchRateReport;

router.post('/tips', function(req, res, next) {
  const petName = req.body.petName;
  const type = req.body.type;
  const taskUniqueId = req.body.taskUniqueId;
  const tips = getTips(petName, type, taskUniqueId);
  res.status(200).send(JSON.stringify({tips: tips}));
});

router.post('/response', function(req, res, next) {
  const uniqueId = req.body.uniqueId;
  const petName = req.body.petName;
  const type = req.body.type;
  const taskUniqueId = req.body.taskUniqueId;
  const chooseItemIndex = req.body.chooseItemIndex;
  const happinessBonus = processResponse(uniqueId, petName, type, taskUniqueId, chooseItemIndex);
  res.status(200).send(JSON.stringify({happinessBonus: happinessBonus}));
});

router.post('/generate-suggestion', function(req, res, next) {
  const uniqueId = req.body.uniqueId;
  const petNames = req.body.petNames;
  const suggestion = generateReportSuggestion(uniqueId, petNames);
  res.status(200).send(JSON.stringify({suggestion: suggestion}));
});

router.post('/generate-report', function(req, res, next) {
  const uniqueId = req.body.uniqueId;
  const petNames = req.body.petNames;
  const report = generateMatchRateReport(uniqueId, petNames);
  res.status(200).send(JSON.stringify({report: report}));
});

module.exports = router;

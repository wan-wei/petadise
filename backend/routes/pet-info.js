var express = require('express');
var router = express.Router();
const generateQuestionnaire = require('../public/javascripts/pet').generateQuestionnaire;
const getPetCandidates = require('../public/javascripts/pet').getPetCandidates;

router.get('/questionnaire-questions', function(req, res, next) {
  const questionnaire = generateQuestionnaire();
  res.status(200).send(JSON.stringify({questionnaire: questionnaire}));
});

router.post('/pet-candidates', function(req, res, next) {
  const questionnaireResult = req.body.questionnaire;
  const petCandidates = getPetCandidates(questionnaireResult);
  res.status(200).send(JSON.stringify({petCandidates: petCandidates}));
});

module.exports = router;

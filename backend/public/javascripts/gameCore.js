var randomstring = require('randomstring');
var petInfo = require('../datas/pet-info').petInfo;

/* global const */
const speedUpRate = 1000.0;
const oneDaySecond = 60 * 60 * 24;
const happinessBonusValueScale = 10.0;
const interactionThreshold = 5;
const satisfyScoreWeight = 0.6;
const interactionScoreWeight = 0.4;
const rescale = 5.0;

var waitForResponseTasks = {};

// Structure: {uniqueId: {petName: {satisfyScore, interactionScore}}}
var matchScore = {};
var fullScore = {};

function timeToMilliSecond(timeString) {
  const tmp = timeString.split(":");
  var second = 0;
  if (tmp.length > 0) {
    second += parseInt(tmp[0]) * 3600;
  }
  if (tmp.length > 1) {
    second += parseInt(tmp[1]) * 60;
  }
  if (tmp.length > 2) {
    second += parseInt(tmp[2]);
  }
  return second / speedUpRate * 1000;

}

function generateUniqueTaskId() {
  return randomstring.generate()
}

function processTemplate(template, petName, startTime) {
  return template.replace('[petName]', petName).replace('[startTime]', startTime);
}

function getTips(petName, type, taskUniqueId) {
  if (taskUniqueId in waitForResponseTasks) {
    return waitForResponseTasks[taskUniqueId].tips;
  } else {
      return processTemplate(petInfo[petName][type]["nondemand"].tips, petName, '');
  }
}

/* Three cases:
   1. Pet is in need and user responses in time
   2. Pet is in need and user DOESN'T response in time
   3. Pet is NOT in need and user responses
 */
function calculateMatchScoreActively(petsInNeed, timeoutFlag, happinessBonusValue, uniqueId, petName) {
  if (petsInNeed) {
    if (!timeoutFlag) {
      matchScore[uniqueId][petName].satisfyScore += (1.0 + happinessBonusValue / happinessBonusValueScale);
      matchScore[uniqueId][petName].interactionScore += 1.0;
    } else {
      matchScore[uniqueId][petName].satisfyScore += 0.5 * (1.0 + happinessBonusValue / happinessBonusValueScale);
      matchScore[uniqueId][petName].interactionScore += 1.0;
    }
  }
  if (!petsInNeed) {
    matchScore[uniqueId][petName].interactionScore += 1.0;
  }
}

/* One case: Pet is in need and user DOESN'T response at all */
function calculateMatchScorePassively(uniqueId, petName) {
  for (var taskUniqueId in waitForResponseTasks) {
    const item = waitForResponseTasks[taskUniqueId];
    if (item.uniqueId === uniqueId && item.petName === petName) {
      matchScore[uniqueId][petName].satisfyScore -= 1;
      delete waitForResponseTasks[taskUniqueId];
    }
  }
}

function getMaxHappinessBonusValue(happinessBonus) {
  var maxHappinessValue = 0.;
  for (var i = 0; i < happinessBonus.length; i++) {
    const item = happinessBonus[i];
    if (item.value > maxHappinessValue) {
      maxHappinessValue = item.value;
    }
  }
  return maxHappinessValue;
}

function calculateFullScore(uniqueId, petName, happinessBonusValue) {
  fullScore[uniqueId][petName].satisfyScore += (1.0 + happinessBonusValue / happinessBonusValueScale);
  fullScore[uniqueId][petName].interactionScore += 1.0;
}

function integrateMatchScore(uniqueId, petName) {
  console.log("full", fullScore[uniqueId][petName])
  console.log("mine", matchScore[uniqueId][petName])
  const integratedFullScore = satisfyScoreWeight * fullScore[uniqueId][petName].satisfyScore +
    interactionScoreWeight * fullScore[uniqueId][petName].interactionScore;
  const integratedMatchScore = satisfyScoreWeight * matchScore[uniqueId][petName].satisfyScore +
    interactionScoreWeight * matchScore[uniqueId][petName].interactionScore;
  var percentage = integratedMatchScore / integratedFullScore;
  percentage = Math.min(percentage, 1.0);
  percentage = Math.max(percentage, 0.0);
  console.log("percentage", percentage)
  const rescaleScore = rescale * percentage;
  console.log("final", rescaleScore)
  return rescaleScore.toFixed(2);
}

function processResponseWithTaskUniqueId(uniqueId, petName, taskUniqueId, chooseItemIndex) {
  // console.log("waitForResponseTasks[taskUniqueId]", waitForResponseTasks[taskUniqueId])
  const happinessBonus = {
    value: waitForResponseTasks[taskUniqueId].happinessBonus[chooseItemIndex].value,
    reason: waitForResponseTasks[taskUniqueId].happinessBonus[chooseItemIndex].reason
  };
  const createTime = waitForResponseTasks[taskUniqueId].createTime;
  const startTimeout = waitForResponseTasks[taskUniqueId].startTimeout;
  const endTimeout = waitForResponseTasks[taskUniqueId].endTimeout;
  const responseTime = new Date().getTime();
  const responseCost = responseTime - createTime;
  var timeoutFlag = true;
  if (parseInt(startTimeout) + parseInt(responseCost) <= parseInt(endTimeout)) {
    timeoutFlag = false;
  }
  calculateMatchScoreActively(true, timeoutFlag, happinessBonus.value, uniqueId, petName);
  happinessBonus.reason = processTemplate(happinessBonus.reason, petName, '');
  if (!timeoutFlag) {
    happinessBonus.reason += "(You earn " + happinessBonus.value + "/" + happinessBonus.value + " bonus because of response in time)";
  }
  if (timeoutFlag) {
    const penalValue = happinessBonus.value * 0.5;
    happinessBonus.reason += "(You only earn " + penalValue + "/" + happinessBonus.value + " bonus because of response too late)";
    happinessBonus.value = penalValue;
  }
  delete waitForResponseTasks[taskUniqueId];
  console.log("in-need", matchScore);
  return happinessBonus;
}

function processResponseWithoutTaskUniqueId(uniqueId, petName, type, chooseItemIndex) {
  const happinessBonus = {
    value: petInfo[petName][type]["nondemand"].happinessBonus[chooseItemIndex].value,
    reason: petInfo[petName][type]["nondemand"].happinessBonus[chooseItemIndex].reason
  };
  calculateMatchScoreActively(false, false, happinessBonus.value, uniqueId, petName);
  // const maxHappinessValue = getMaxHappinessBonusValue(happinessBonus);
  // calculateFullScore(uniqueId, petName, happinessBonusValue)
  happinessBonus.reason = processTemplate(happinessBonus.reason, petName, '');
  happinessBonus.reason += "(You earn " + happinessBonus.value + " bonus)";
  console.log("not-in-need", matchScore);
  return happinessBonus;
}

function processResponse(uniqueId, petName, type, taskUniqueId, chooseItemIndex) {
  if (taskUniqueId in waitForResponseTasks) {
    return processResponseWithTaskUniqueId(uniqueId, petName, taskUniqueId, chooseItemIndex);
  } else {
    return processResponseWithoutTaskUniqueId(uniqueId, petName, type, chooseItemIndex);
  }
}

function generateReportSuggestion(uniqueId, petNames) {
  var enoughPetNames = [];
  var notEnoughPetNames = [];
  for (var i = 0; i < petNames.length; i++) {
    if (matchScore[uniqueId][petNames[i]].interactionScore >= interactionThreshold) {
      enoughPetNames.push(petNames[i]);
    } else {
      notEnoughPetNames.push(petNames[i]);
    }
  }
  var suggestion = "";
  if (enoughPetNames) {
    suggestion += "[" + enoughPetNames.toString() + "]" + " is/are ready for generate match score report.";
  }
  if (notEnoughPetNames.length > 0) {
    suggestion += " Your interaction with " + "[" + notEnoughPetNames.toString() + "]" + " is/are not over " + interactionThreshold + ".";
  }
  suggestion += " Do you want to generate the match rate report?";
  return suggestion;
}

function generateMatchRateReport(uniqueId, petNames) {
  var results = {};
  for (var i = 0; i < petNames.length; i++) {
    if (matchScore[uniqueId][petNames[i]].interactionScore >= interactionThreshold) {
      calculateMatchScorePassively(uniqueId, petNames[i]);
      const score = integrateMatchScore(uniqueId, petNames[i]);
      results[petNames[i]] = score;
    } else {
      results[petNames[i]] = "N/A";
    }
  }
  return results;
}

function prepareTasks(socket, uniqueId, petName) {
  const types = ["feed", "play", "walk"];
  if (!(uniqueId in matchScore)) {
    matchScore[uniqueId] = {};
    fullScore[uniqueId] = {};
  }
  matchScore[uniqueId][petName] = {satisfyScore: 0, interactionScore: 0};
  fullScore[uniqueId][petName] = {satisfyScore: 0, interactionScore: 0};
  for (var i = 0; i < types.length; i++) {
    const type = types[i];

    const demands = petInfo[petName][type]["demand"];
    for (var j = 0; j < demands.length; j++) {
      const startTime = demands[j].startTime;
      const startTimeout = timeToMilliSecond(demands[j].startTime);
      const endTimeout = timeToMilliSecond(demands[j].endTime);
      const tips = demands[j].tips;
      const happinessBonus = demands[j].happinessBonus;
      setTimeout(function () {
        const uniqueTaskId = generateUniqueTaskId();
        waitForResponseTasks[uniqueTaskId] = {
          uniqueId: uniqueId,
          petName: petName,
          tips: processTemplate(tips, petName, startTime),
          startTimeout: startTimeout,
          endTimeout: endTimeout,
          createTime: new Date().getTime(),
          happinessBonus: happinessBonus
        };
        const maxHappinessValue = getMaxHappinessBonusValue(happinessBonus);
        calculateFullScore(uniqueId, petName, maxHappinessValue);
        socket.emit('taskAlert', {petName: petName, type: type, uniqueTaskId: uniqueTaskId});

        setInterval(function () {
          const uniqueTaskId = generateUniqueTaskId();
          waitForResponseTasks[uniqueTaskId] = {
            uniqueId: uniqueId,
            petName: petName,
            tips: processTemplate(tips, petName, startTime),
            startTimeout: startTimeout,
            endTimeout: endTimeout,
            createTime: new Date().getTime(),
            happinessBonus: happinessBonus
          };
          const maxHappinessValue = getMaxHappinessBonusValue(happinessBonus);
          calculateFullScore(uniqueId, petName, maxHappinessValue);
          socket.emit('taskAlert', {petName: petName, type: type, uniqueTaskId: uniqueTaskId});
          console.log("interval task sent!")
        }, oneDaySecond / speedUpRate * 1000);
      }, startTimeout);
    }
  }
}

exports.preparTask = prepareTasks;
exports.getTips = getTips;
exports.processResponse = processResponse;
exports.generateReportSuggestion = generateReportSuggestion;
exports.generateMatchRateReport = generateMatchRateReport;
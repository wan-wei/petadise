<script>
var taskBacklogCounter = {}
var latestTaskUniqueId = {}
var happinessValue = {}

function initialize (petNames) {
  for (var i = 0; i < petNames.length; i++) {
    happinessValue[petNames[i]] = 50
    taskBacklogCounter[petNames[i]] = {'feed': 0, 'play': 0, 'walk': 0, 'total': 0}
    latestTaskUniqueId[petNames[i]] = {'feed': '', 'play': '', 'walk': ''}
  }
  localStorage.setItem('happinessValue', JSON.stringify(happinessValue))
  localStorage.setItem('taskBacklogCounter', JSON.stringify(taskBacklogCounter))
  localStorage.setItem('latestTaskUniqueId', JSON.stringify(latestTaskUniqueId))
  localStorage.setItem('petNames', JSON.stringify(petNames))
}

export default {
  initialize
}

</script>

let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('lapsList');

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 1000;
  let ms = Math.floor(diffInMs);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(3, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.innerHTML = timeToString(elapsedTime);
  }, 10);
  document.getElementById('startStopBtn').disabled = true;
}

function pause() {
  clearInterval(timerInterval);
  document.getElementById('startStopBtn').disabled = false;
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.innerHTML = "00:00:00.000";
  laps = [];
  lapsList.innerHTML = "";
  document.getElementById('startStopBtn').disabled = false;
}

function lap() {
  if (elapsedTime === 0) return;
  laps.push(elapsedTime);
  const li = document.createElement('li');
  li.textContent = `Lap ${laps.length}: ${timeToString(elapsedTime)}`;
  lapsList.appendChild(li);
}

// Event Listeners
document.getElementById('startStopBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);

let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const clearLapsBtn = document.getElementById('clearLapsBtn');
const lapsList = document.getElementById('lapsList');

function updateTime() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = Math.floor(milliseconds / 10);
    ms = ms < 10 ? "0" + ms : ms;

    timeDisplay.textContent = `${h}:${m}:${s}:${ms}`;
}

// Start/Pause
startPauseBtn.addEventListener('click', () => {
    if (!running) {
        timer = setInterval(updateTime, 10);
        startPauseBtn.textContent = "Pause";
        running = true;
    } else {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
        running = false;
    }
});

// Pause Button
pauseBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
        running = false;
    }
});

// Reset
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    hours = minutes = seconds = milliseconds = 0;
    timeDisplay.textContent = "00:00:00:00";
    startPauseBtn.textContent = "Start";
    running = false;
    lapsList.innerHTML = "";
});

// Lap
lapBtn.addEventListener('click', () => {
    if (running) {
        const lapTime = timeDisplay.textContent;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.appendChild(li);
    }
});

// Clear Laps
clearLapsBtn.addEventListener('click', () => {
    lapsList.innerHTML = "";
});

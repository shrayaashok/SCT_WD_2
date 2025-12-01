let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const barbie = document.getElementById('barbie');

// Update timer
function updateTime() {
    milliseconds += 10;
    if (milliseconds === 1000) { milliseconds = 0; seconds++; }
    if (seconds === 60) { seconds = 0; minutes++; }
    if (minutes === 60) { minutes = 0; hours++; }

    let h = hours.toString().padStart(2,'0');
    let m = minutes.toString().padStart(2,'0');
    let s = seconds.toString().padStart(2,'0');
    let ms = Math.floor(milliseconds/10).toString().padStart(2,'0');

    timeDisplay.textContent = `${h}:${m}:${s}:${ms}`;
}

// Function to animate Barbie to button
function barbieClickAnimation(button) {
    const rect = button.getBoundingClientRect();
    barbie.style.display = 'block';
    // Convert page coordinates to barbie's parent coordinates
    const x = rect.left + rect.width/2 - 40; // 40 = half barbie width
    const y = rect.top + rect.height/2 - 80; // 80 = barbie height

    barbie.style.transform = `translate(${x}px, ${y}px)`;
    // After animation, hide Barbie
    setTimeout(()=>{ barbie.style.display='none'; barbie.style.transform='translate(0,0)'; }, 1000);
}

// Event listeners with Barbie animation
startPauseBtn.addEventListener('click', ()=>{
    barbieClickAnimation(startPauseBtn);
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

pauseBtn.addEventListener('click', ()=>{
    barbieClickAnimation(pauseBtn);
    if (running) {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
        running = false;
    }
});

resetBtn.addEventListener('click', ()=>{
    barbieClickAnimation(resetBtn);
    clearInterval(timer);
    hours = minutes = seconds = milliseconds = 0;
    timeDisplay.textContent = "00:00:00:00";
    startPauseBtn.textContent = "Start";
    running = false;
    lapsList.innerHTML = "";
});

lapBtn.addEventListener('click', ()=>{
    barbieClickAnimation(lapBtn);
    if (running) {
        const li = document.createElement('li');
        li.textContent = `Lap ${lapsList.children.length+1}: ${timeDisplay.textContent}`;
        lapsList.appendChild(li);
    }
});

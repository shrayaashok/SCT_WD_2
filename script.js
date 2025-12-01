// Stopwatch variables
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;

// DOM elements
const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const barbie = document.getElementById('barbie');

// Update timer display
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

// Animate Barbie to a button
function barbieClickAnimation(button) {
    const rect = button.getBoundingClientRect();
    barbie.style.display = 'block';

    // Calculate Barbie's position relative to viewport
    const x = rect.left + rect.width/2 - 40; // 40 = half Barbie width
    const y = rect.top + window.scrollY + rect.height/2 - 80; // 80 = Barbie height

    // Optional: randomize Barbie image for fun
    const barbieImages = ['barbie_image.png'];
    barbie.style.backgroundImage = `url('assets/barbie_image/${barbieImages[Math.floor(Math.random()*barbieImages.length)]}')`;

    // Move Barbie
    barbie.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;

    // Hide Barbie after animation
    setTimeout(()=>{
        barbie.style.display='none';
        barbie.style.transform='translate(0,0) scale(1)';
    }, 1000);
}

// Start/Pause button
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

// Pause button
pauseBtn.addEventListener('click', ()=>{
    barbieClickAnimation(pauseBtn);
    if (running) {
        clearInterval(timer);
        startPauseBtn.textContent = "Start";
        running = false;
    }
});

// Reset button
resetBtn.addEventListener('click', ()=>{
    barbieClickAnimation(resetBtn);
    clearInterval(timer);
    hours = minutes = seconds = milliseconds = 0;
    timeDisplay.textContent = "00:00:00:00";
    startPauseBtn.textContent = "Start";
    running = false;
    lapsList.innerHTML = "";
});

// Lap button
lapBtn.addEventListener('click', ()=>{
    barbieClickAnimation(lapBtn);
    if (running) {
        const li = document.createElement('li');
        li.textContent = `Lap ${lapsList.children.length+1}: ${timeDisplay.textContent}`;
        lapsList.appendChild(li);
        // Optional: scroll to bottom
        lapsList.scrollTop = lapsList.scrollHeight;
    }
});

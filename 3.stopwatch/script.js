let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let isRunning = false;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('laps');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function startTimer() {
  timer = setInterval(() => {
    milliseconds += 10;
    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    updateDisplay();
  }, 10);
  isRunning = true;
}

function updateDisplay() {
  millisecondsElement.textContent = (milliseconds / 10).toFixed(0).padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  updateDisplay();
  lapsContainer.innerHTML = ''; // Clear all laps
}

function recordLap() {
  if (!isRunning) return; // Only record lap if timer is running
  const lapTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${(milliseconds / 10).toFixed(0).padStart(2, '0')}`;
  const lapElement = document.createElement('div');
  lapElement.classList.add('lap-time');
  lapElement.textContent = lapTime;
  lapsContainer.insertBefore(lapElement, lapsContainer.firstChild); // Insert lap at the top
}

startButton.addEventListener('click', () => {
  if (!isRunning) startTimer();
});

stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

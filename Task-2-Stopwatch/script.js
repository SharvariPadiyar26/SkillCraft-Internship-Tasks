let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const laps = document.getElementById("laps");

function updateTime() {
    const time = Date.now() - startTime + elapsedTime;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    display.textContent =
        String(hours).padStart(2, '0') + ":" +
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0');
}

startStopBtn.addEventListener("click", () => {
    if (!isRunning) {
        startTime = Date.now();
        timer = setInterval(updateTime, 1000);
        startStopBtn.textContent = "Pause";
        isRunning = true;
    } else {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = "Start";
        isRunning = false;
    }
});

lapBtn.addEventListener("click", () => {
    if (isRunning) {
        const li = document.createElement("li");
        li.textContent = display.textContent;
        laps.appendChild(li);
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    display.textContent = "00:00:00";
    elapsedTime = 0;
    isRunning = false;
    startStopBtn.textContent = "Start";
    laps.innerHTML = "";
});

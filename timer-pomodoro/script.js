let timer;
let timeLeft = 25 * 60;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            alert("Tempo esgotado! Hora de uma pausa.");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = 25 * 60;
    updateDisplay();
}

function setTimer(minutes) {
    pauseTimer();
    timeLeft = minutes * 60;
    if(minutes === 25){
        document.body.style.backgroundColor = "#2D2424";
    }else if(minutes === 5){
        document.body.style.backgroundColor = "#417D7A";
    }else {
        document.body.style.backgroundColor = "#32527B";
    }
    
    updateDisplay();
    

    console.log("Modo alterado para: " + minutes + " minutos");
}
// Listeners
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
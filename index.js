let timer;
let totalTimeInSeconds;

function startTimer() {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;

    totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalTimeInSeconds > 0) {
        timer = setInterval(updateTimer, 1000);
        updateTimer();
    } else {
        alert("Please enter a valid time!");
    }
}

function updateTimer() {
    const display = document.getElementById("timer-display");
    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
    const seconds = totalTimeInSeconds % 60;

    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

    if (totalTimeInSeconds <= 0) {
        clearInterval(timer);


        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.remove(tabs[0].id);
        });
    } else {
        totalTimeInSeconds--;
        document.getElementById('hours').value = "";
        document.getElementById('minutes').value = "";
        document.getElementById('seconds').value = "";
    }
}


function resetTimer() {
    clearInterval(timer);
    document.getElementById('timer-display').textContent = "00:00:00";
    document.getElementById('hours').value = "";
    document.getElementById('minutes').value = "";
    document.getElementById('seconds').value = "";
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

document.getElementById("start-btn").addEventListener("click", startTimer);
document.getElementById("reset-btn").addEventListener("click", resetTimer);





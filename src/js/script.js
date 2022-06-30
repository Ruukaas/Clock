//HMDL = How Many Days Left

//Countdown elements
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("mins");
const secondsEl = document.getElementById("seconds");
const countdownTitle = document.getElementById("countdown-title");

//Date Elements
const inputDate = document.getElementById("inputData");
const inputButton = document.getElementById("inputButton");
const divDate = document.getElementById("date");

//Stopwatch Elements
const buttonStartStopwatch = document.getElementById("stopwatchStart");
const buttonStopStopwatch = document.getElementById("stopwatchStop");
const divStopWatch = document.getElementById("stopwatch");

//Nav elements
const HMDL = document.getElementById("accessHMDL");
const stopwatch = document.getElementById("accessStopwatch");


const newYears = '1 Jan 2023';
let untilDate = newYears;
let IDCountdown;


let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;

function countdown(op) {
    if (op == "HMDL") {
        const untilThisDate = new Date(untilDate);
        const currentinputDate = new Date();

        const totalSeconds = (untilThisDate - currentinputDate) / 1000;

        days = Math.floor(totalSeconds / 3600 / 24);
        hours = Math.floor(totalSeconds / 3600) % 24;
        minutes = Math.floor(totalSeconds / 60) % 60
        seconds = Math.floor(totalSeconds % 60);

        daysEl.innerHTML = days;
        hoursEl.innerHTML = hours;
        minsEl.innerHTML = minutes;
        secondsEl.innerHTML = seconds;

    } else if (op == "stopwatch") {
        if (hours == 23 && minutes == 59 && seconds == 59) {
            hours = 0;
            minutes = 0;
            seconds = 0;
            days++
            daysEl.innerHTML = days;
            hoursEl.innerHTML = hours;
            minsEl.innerHTML = minutes;
            secondsEl.innerHTML = seconds;
        } else if (minutes == 59 && seconds == 59) {
            minutes = 0;
            seconds = 0
            hours++;
            hoursEl.innerHTML = hours;
            minsEl.innerHTML = minutes;
            secondsEl.innerHTML = seconds;
        } else if (seconds == 59) {
            seconds = 0;
            minutes++;
            minsEl.innerHTML = minutes
            secondsEl.innerHTML = seconds;
        } else {
            seconds++;
            secondsEl.innerHTML = seconds;
        }
    }
}

const startCountdown = (op) => {
    countdown(op);
    IDCountdown = setInterval(function () {
        countdown(op);
    }, 1000);
}

function clearGlobalTimers() {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
}

//Function to prevent date before current
const setTodayDate = () => {
    const todayDate = new Date();
    let year = todayDate.getFullYear();
    let month = todayDate.getMonth() + 1;
    let day = todayDate.getDate() + 1;

    if (month < 10)
        month = "0" + month.toString();
    else if (day < 10)
        day = "0" + day.toString();

    const minDate = year + '-' + month + '-' + day;
    inputDate.setAttribute("min", minDate);
}



//actions
const newUntilDate = () => {
    if (inputDate.value) {
        clearInterval(IDCountdown);
        updateTitle("Until " + inputDate.value);
        console.log(inputDate.value);
        untilDate = inputDate.value + "T00:00:00";
        startCountdown("HMDL");
    }
}

const changeToStopwatch = () => {
    updateTitle("Stopwatch");
    clearInterval(IDCountdown);
    hiddenHTML(divDate);
    showHTML(divStopWatch);
    clearTimer();
    clearGlobalTimers();
}

const changeToHMDL = () => {
    clearInterval(IDCountdown);
    updateTitle();
    hiddenHTML(divStopWatch);
    showHTML(divDate);
    inputDate.value = "";
    untilDate = newYears;
    startCountdown("HMDL");
}

let stopwatchOn = false
const startStopwatch = () => {
    if (!stopwatchOn) {
        clearGlobalTimers();
        startCountdown("stopwatch");
        stopwatchOn = true;
    }
}

const stopStopwatch = () => {
    clearInterval(IDCountdown);
    stopwatchOn = false;
}



//HTML
const updateTitle = (newTitle = "Until new beginnings") => {
    countdownTitle.innerHTML = newTitle;
}

const hiddenHTML = (element) => {
    element.setAttribute("class", "none");
}

const showHTML = (element) => {
    element.removeAttribute("class");
}

const clearTimer = () => {
    daysEl.innerHTML = 0;
    hoursEl.innerHTML = 0;
    minsEl.innerHTML = 0;
    secondsEl.innerHTML = 0;
}

//automate?
const updateNewYear = () => {
    const currentYear = new Date().getFullYear();
    const systemYear = newYears.substring(newYears.indexOf(2));

    if (currentYear == systemYear)
        newYears.replace(systemYear, currentYear + 1)
}

updateNewYear();
setTodayDate();

inputButton.addEventListener("click", newUntilDate);
HMDL.addEventListener("click", changeToHMDL);
stopwatch.addEventListener("click", changeToStopwatch);
buttonStartStopwatch.addEventListener("click", startStopwatch);
buttonStopStopwatch.addEventListener("click", stopStopwatch);

startCountdown("HMDL");
// Start vom Timer (1Tag / 13 Stunden / 30 Minuten)
let originalDuration = 120;
let duration = originalDuration; // Aktuell verbleibene Dauer in Sekunden
let isPaused = true; //  Gibt an, ob der Timer pausiert ist
let countdownInterval; // Speichert die Intervall-Referenz ID für den Countdown


// Funktion zur Aktualisierung zur Timer Anzeige
function updateTimerDisplay() {
    // Zeitwerte in Tage, Stunden, Minuten und Sekunden aufteilen
    const days = Math.floor(duration / (60*60*24))
    const hours = Math.floor((duration % (60*60*24))/(60*60));
    const minutes = Math.floor((duration % (60*60)) / 60);
    const seconds = duration % 60;



//Aktualisieren der Timer Anzeige für tage,stunden,minuten,sekunden
document.getElementById("days").querySelector(".time").textContent = String(days).padStart(2, "0");
document.getElementById("hours").querySelector(".time").textContent = String(hours).padStart(2, "0");
document.getElementById("minutes").querySelector(".time").textContent = String(minutes).padStart(2, "0");
document.getElementById("seconds").querySelector(".time").textContent = String(seconds).padStart(2, "0");

//Ändern der Klassen, um den Pause und Playzustand anzuzeigen
document.querySelectorAll(".time").forEach((timeElement)=>{
    timeElement.classList.toggle("playing", !isPaused);
    timeElement.classList.toggle("paused", isPaused);
})
}

// Function zum Umschalten von Play/Pause-Zustand
function togglePlayPause(){
isPaused = !isPaused

const playPauseButton = document.getElementById("playPauseButton");
playPauseButton.innerHTML = isPaused
? "<span>&#9658;</span>"
: "<span>&#10074&#10074</span>";

playPauseButton.classList.toggle("playing", !isPaused);
playPauseButton.classList.toggle("paused", isPaused);

}
 
//Funktion zum Starten des Countdowns

function startCountdown(){
    togglePlayPause();
    updateTimerDisplay();

    countdownInterval = setInterval(() => {
        duration--;
        if(duration < 0){
            clearInterval(countdownInterval);



            duration=0;
            togglePlayPause();
        }

        updateTimerDisplay();
    },1000)

}

//Reset Timer
function resetTimerStyles(){
// Reset Play/Pause-Button
const playPauseButton = document.getElementById("playPauseButton");
playPauseButton.innerHTML = "<span>&#9658;</span>";
playPauseButton.classList.toggle("playing", true);
playPauseButton.classList.toggle("paused", false);

//Reset Time Slots
document.querySelectorAll(".time").forEach((timeElement)=>{
    timeElement.classList.toggle("playing", true);
    timeElement.classList.toggle("paused", false);
});
}

// Events

document.addEventListener("DOMContentLoaded", function(){
    //Buttons
    const playPauseButton = document.getElementById("playPauseButton");
    const restartButton = document.getElementById("restartButton");
    const increaseButton = document.getElementById("increaseButton");
    const decreaseButton = document.getElementById("decreaseButton");

    // Event-Handler
    //Play/Pause Button Event Handler
    playPauseButton.addEventListener("click", function(){
        if (isPaused){
            startCountdown() // Starten des Countdown
        } else {
            clearInterval(countdownInterval);
            togglePlayPause();//Button umschalten
            updateTimerDisplay();

        }
        });

        //Restart Button Event Handler

        restartButton.addEventListener("click", function(){
            resetTimerStyles();
            clearInterval(countdownInterval);
            isPaused = true;
            duration = originalDuration;
            updateTimerDisplay();
        });

        //Increase Button Event Handler

        increaseButton.addEventListener("click", function(){
            duration += 60;
            originalDuration = Math.ceil(duration / 60) * 60
            updateTimerDisplay();
        })

        //Decrease Button Event Handler

        decreaseButton.addEventListener("click", function(){
            if (duration >= 61){
            duration -= 60;
            originalDuration = Math.ceil(duration / 60) *60;
            updateTimerDisplay();
            }
            else {
                alert("Eine Verringerung der Restlaufzeit ist nur bei einer Mindestlaufzeit von über 1 Minute möglich.")
            }
        })
        // Initialisierung der Timer Anzeige

updateTimerDisplay();
resetTimerStyles();
    });




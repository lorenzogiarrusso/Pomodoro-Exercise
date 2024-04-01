let studying = false;
let resting = false;

function get_ready_to_rest() {
    document.getElementById("tomato-eye-l").style.display = "none";
    document.getElementById("tomato-eye-r").style.display = "none";
    document.getElementById("closed-tomato-eye-l").style.display = "block";
    document.getElementById("closed-tomato-eye-r").style.display = "block";
    document.getElementById("tomato-table").style.display = "none";
    document.getElementById("tomato-book").style.display = "none";
    document.getElementById("tomato-book-cover").style.display = "none";
    document.getElementById("tomato-bed").style.display = "block";
}

function get_ready_to_study() {
    document.getElementById("closed-tomato-eye-l").style.display = "none";
    document.getElementById("closed-tomato-eye-r").style.display = "none";
    document.getElementById("tomato-eye-l").style.display = "block";
    document.getElementById("tomato-eye-r").style.display = "block";
    document.getElementById("tomato-table").style.display = "block";
    document.getElementById("tomato-book").style.display = "block";
    document.getElementById("tomato-book-cover").style.display = "block";
    document.getElementById("tomato-bed").style.display = "none";
}

document.getElementById('times-form').addEventListener('submit', (e) => {
    e.preventDefault(); //Prevent the form button's default behavior (submit)
    const submit_btn = document.getElementById("start-btn");
    submit_btn.textContent = "STUDYING...";
    submit_btn.disabled = true;
    studying = true;

    // Convert the inserted study time into an integer, base 10
    const study_time_min = parseInt(document.getElementById('study-time').value, 10);

    // Convert the inserted rest time into an integer, base 10
    const rest_time_min = parseInt(document.getElementById('rest-time').value, 10);

    //Calculate durations in seconds; used for animations
    const study_time_sec = study_time_min * 60;
    const rest_time_sec = rest_time_min * 60;

    get_ready_to_study();
    document.getElementById("tomato-body").style.animation = `become-ripe ${study_time_sec}s linear forwards`;

    let end_time = Date.now() + study_time_min * 60000;

    // Interval to deal with the passage of time
    const interval = setInterval(function () {
        const now = Date.now();
        const difference = end_time - now;

        if (difference <= 0) {
            if (studying) {
                studying = false;
                resting = true;
                end_time = Date.now() + rest_time_min * 60000;
                document.getElementById("tomato-body").style.animation = `become-unripe ${rest_time_sec}s linear forwards`;
                get_ready_to_rest();
                document.getElementById("tomato").style.filter = "brightness(60%)";
                submit_btn.textContent = "RESTING...";
            }
            else if (resting) {
                resting = false;
                clearInterval(interval);
                submit_btn.textContent = "START STUDYING";
                document.getElementById("tomato").style.filter = "brightness(100%)";
                submit_btn.disabled = false;
                open_eyes();
                document.getElementById('timer-display').textContent = "00:00";
            }
        }
        else {
            // Minutes and seconds left
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Display remaining time on #timer-display
            document.getElementById('timer-display').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);
});




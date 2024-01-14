function highlightAnswers() {
    // Reset styles
    resetStyles();

    let score = 0;

    // Question 1
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer) {
        if (q1Answer.value === "2degres") {
            q1Answer.parentElement.classList.add('correct');
            score++;
        } else {
            q1Answer.parentElement.classList.add('incorrect');
        }
    }

    // Question 2
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    if (q2Answer) {
        if (q2Answer.value === "78k") {
            q2Answer.parentElement.classList.add('correct');
            score++;
        } else {
            q2Answer.parentElement.classList.add('incorrect');
        }
    }

    // Question 3
    const q3Answer = document.querySelector('input[name="q3"]:checked');
    if (q3Answer) {
        if (q3Answer.value === "18p") {
            q3Answer.parentElement.classList.add('correct');
            score++;
        } else {
            q3Answer.parentElement.classList.add('incorrect');
        }
    }

    // Question 4
    const q4Answer = document.querySelector('input[name="q4"]:checked');
    if (q4Answer) {
        if (q4Answer.value === "Danemark") {
            q4Answer.parentElement.classList.add('correct');
            score++;
        } else {
            q4Answer.parentElement.classList.add('incorrect');
        }
    }

    // Question 5
    const q5Answer = document.querySelector('input[name="q5"]:checked');
    if (q5Answer) {
        if (q5Answer.value === "Nucleaire") {
            q5Answer.parentElement.classList.add('correct');
            score++;
        } else {
            q5Answer.parentElement.classList.add('incorrect');
        }
    }

    // Question 6
    const q6Answer = document.querySelector('input[name="q6"]:checked');
    if (q6Answer) {
        if (q6Answer.value === "36p") {
            q6Answer.parentElement.classList.add('correct');
            score++;
        } else {
            q6Answer.parentElement.classList.add('incorrect');
        }
    }

    // Afficher le résultat
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Votre score est de ${score} sur 6.`;
}

function resetStyles() {
    const choices = document.querySelectorAll('.choices label');
    choices.forEach(choice => {
        choice.classList.remove('correct', 'incorrect');
    });
}

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.remove('hide');
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});



// riddle page

let currentRiddle = 1;
const totalRiddles = 10;
let startTime;
let riddleTimers = {};
let correctAnswers = 0;
let wrongAnswers = 0;

function startRiddleTimer() {
    const currentIndex = parseInt(localStorage.getItem('currentRiddleIndex'));
    
    // Clear any existing timer for this riddle
    if (riddleTimers[currentIndex]) {
        clearTimeout(riddleTimers[currentIndex]);
    }
    
    // Initialize or get existing start time
    let startTime = localStorage.getItem(`startTime_${currentIndex}`);
    if (!startTime) {
        startTime = new Date().getTime();
        localStorage.setItem(`startTime_${currentIndex}`, startTime);
    }

    updateTimer(currentIndex, parseInt(startTime));
}

function updateTimer(riddleIndex, startTime) {
    const currentIndex = parseInt(localStorage.getItem('currentRiddleIndex'));
    
    // Only update if we're still on the same riddle
    if (riddleIndex === currentIndex) {
        const elapsed = new Date().getTime() - startTime;
        const timeLeft = 60 - Math.floor(elapsed / 1000);

        if (timeLeft <= 0) {
            // Stop the timer at 00:00
            document.querySelector(`#riddle${currentIndex + 1} .timer`).textContent = `Time: 00s`;
            clearTimeout(riddleTimers[riddleIndex]);
            
            // Show time up message in the div instead of alert
            const timeUpMessage = document.querySelector('#time-up-message');
            if (timeUpMessage) {
                timeUpMessage.style.display = 'block';
            }
        } else {
            document.querySelector(`#riddle${currentIndex + 1} .timer`).textContent = `Time: ${timeLeft}s`;
            riddleTimers[riddleIndex] = setTimeout(() => updateTimer(riddleIndex, startTime), 1000);
        }
    }
}

const riddlesData = [        
    {
        question: " I am a three-digit number. The sum of my digits is 16. My first digit is the largest, and it is twice the second digit. My last digit is 4 less than the first digit. What number am I? ",
        options: ["844", "763", "952", "762"],
        answer: "844"
    },
    {
        question: "A farmer has 10 baskets, each with a different number of apples. The first basket has 5 apples, and each subsequent basket has 3 more apples than the previous one. How many apples are in the 10th basket?",
        options: ["29 apples", "32 apples", "35 apples", "38 apples"],
        answer: "32 apples" 
    },
    {
        question: "A boy is 4 years old. His sister is half as old as him. When the boy turns 40, how old will his sister be?",
        options: ["36 years", "38 years", "40 years", "20 years"],
        answer: "38 years"
    },
    {
        question: "Mr. Johnson has 5 children. Each of his sons has an equal number of brothers and sisters. How many sons and daughters does Mr. Johnson have?",
        options: ["2 sons and 3 daughters", "3 sons and 2 daughters", "4 sons and 1 daughter", "5 sons and 0 daughters"],
        answer: "3 sons and 2 daughters"
    },
    {
        question: "You have two containers and an unlimited supply of water. To measure exactly 4 liters, start by filling the larger container to its full capacity. Next, pour water from the larger container into the smaller one until the smaller container is full, leaving some water in the larger container. After that, empty the smaller container, then pour the remaining water from the larger container into it. Finally, refill the larger container completely and pour just enough water into the smaller container to fill it again, leaving exactly 4 liters in the larger container",		
        options: ["5 liters and 3 liters", "6 liters and 4 liters", "8 liters and 5 liters", "7 liters and 3 liters"],
        answer: "5 liters and 3 liters"
    },
    {
        question: "There are 15 people at a party. Each person greets every other person exactly once by either a handshake or a fist bump. If the number of handshakes is double the number of fist bumps, how many handshakes and fist bumps occurred?",
        options: ["45 handshakes and 15 fist bumps", "50 handshakes and 25 fist bumps", "70 handshakes and 35 fist bumps", "84 handshakes and 42 fist bumps"],
        answer: "70 handshakes and 35 fist bumps"
    },
    {
        question: "I am a three-digit number between 400 and 800. The sum of my digits is 15. My tens digit is twice my hundreds digit. Who am I?",
        options: ["672", "756", "483", "564"],
        answer: "483"
    },
    {
        question: "At exactly midnight, two identical clocks are set to the correct time. One clock gains 2 minutes every hour, while the other loses 2 minutes every hour. After how many hours will the fast clock be exactly one hour ahead of the slow clock?",
        options: ["12 hours", "15 hours", "30 hours", "60 hours"],
        answer: "15 hours"
    },
    {
        question: "A driver travels from City A to City B at an average speed of 60 km/h. On his return trip from City B to City A, due to heavy traffic, he travels at an average speed of 40 km/h. What is his average speed for the entire round trip?",
        options: ["48 km/h", "50 km/h", "52 km/h", "55 km/h"],
        answer: "48 km/h"
    },
    {
        question: "In a coding contest, participants receive unique two-digit code numbers ranging from 10 to 99. Programmer Alice's code number is the reverse of Programmer Bob's code number. The difference between their code numbers ends with 5. What are their code numbers?",
        options: ["Alice code number: 16, Bob code number: 61", "Alice code number: 23, Bob code number: 32", "Alice code number: 38, Bob code number: 83", "Alice code number: 45, Bob code number: 54"],
        answer: "Alice code number: 38, Bob code number: 83"
    },
    {
        question: "I am a number such that when you add me to 5, you get the same result as when you subtract me from 17. What number am I?",
        options: ["6", "8", "11", "12"],
        answer: "6"
    },
    {
        question: "Multiply all the numbers on the number pad of a phone. What is the total?",
        options: ["132980", "132980", "0", "245323"],
        answer: "0"
    },
    {
        question: "A store sells notebooks at $2 each. They have a special offer: for every 2 notebooks you buy, you get 1 notebook free. If you have $12, what is the maximum number of notebooks you can get?",
        options: ["6 notebooks", "8 notebooks", "9 notebooks", "10 notebooks"],
        answer: "9 notebooks"
    },
    {
        question: "What is the value of the equation: 8+(12÷4×2)−5=?",
        options: ["3", "9", "11", "15"],
        answer: "9"
    },
    {
        question: "Divide 50 by half and then add 20. What is the result?",
        options: ["25", "45", "70", "120"],
        answer: "120"
    },
    {
        question: "A fruit basket contains 60 apples. 40% of the apples are green, and the rest are red. If you eat 25% of the red apples, how many apples are left in the basket?",
        options: ["36", "42", "51", "48"],
        answer: "51"
    },
    {
        question: "I am a two-digit number. When you add me to the number formed by reversing my digits, the total is a perfect square. Additionally, the difference between me and the number formed by reversing my digits is also a perfect square. What number am I?",
        options: ["45", "54", "65", "81"],
        answer: "65"
    },
    {
        question: "A four-digit number, A6B4 has missing digits A and B ranging from 0 to 9. This number satisfies the following conditions: it is divisible by 36, the sum of all its digits equals 18, and the number formed by its last two digits, B4, is divisible by 4.",
        options: ["A=3, B=8", "A=2, B=6", "A=4, B=2", "A=6, B=8"],
        answer: "A=3, B=8"
    },
    {
        question: "If 5 printers can print 5 pages in 5 minutes, how long will it take 100 printers to print 100 pages?",
        options: ["100 minutes", "5 minutes", "50 minutes", "10 minutes"],
        answer: "5 minutes"
    }
];

const riddlesData_1 = 
[
    {
        "question": "I am an odd number. Take away one letter, and I become even. What number am I?",
        "options": ["3", "7", "5", "11"],
        "answer": "7"
    },
    {
        "question": "When you divide 30 by half and add ten, what do you get?",
        "options": ["20", "50", "70", "25"],
        "answer": "70"
    },
    {
        "question": "I am a three-digit number. My hundreds digit is three times my units digit. My tens digit is the sum of my hundreds and units digits. What am I?",
        "options": ["324", "253", "621", "531"],
        "answer": "324"
    },
    {
        "question": "A farmer has 17 sheep, and all but 9 die. How many are left?",
        "options": ["9", "8", "17", "0"],
        "answer": "9"
    },
    {
        "question": "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
        "options": ["$0.05", "$0.10", "$0.15", "$0.50"],
        "answer": "$0.05"
    },    
    {
        "question": "If two\’s company and three\’s a crowd, what are four and five?",
        "options": ["A party", "Nine", "Seven", "Twelve"],
        "answer": "Nine"
    },
    {
        "question": "If you multiply me by any number, the result will always be zero. What number am I?",
        "options": ["1", "0", "-1", "Infinity"],
        "answer": "0"
    },
    {
        "question": "What number comes next in the sequence: 2, 3, 5, 7, 11, ___?",
        "options": ["12", "13", "15", "17"],
        "answer": "13"
    },
    {
        "question": "I am an even number. If you divide me by 2, you get an odd number. What number am I?",
        "options": ["4", "6", "2", "10"],
        "answer": "2"
    },
    {
        "question": "How many sides does a circle have?",
        "options": ["None", "One", "Two", "Infinite"],
        "answer": "Two"
    },
    {
        "question": "How many months have 28 days?",
        "options": ["1", "12", "6", "Depends on the year"],
        "answer": "12"
    },
    {
        "question": "What is half of two plus two?",
        "options": ["2", "3", "4", "2.5"],
        "answer": "3"
    },
    {
        "question": "Which three positive numbers give the same result when multiplied together and added together?",
        "options": ["1, 2, 3", "2, 2, 2", "3, 3, 3", "1, 1, 1"],
        "answer": "1, 2, 3"
    },
    {
        "question": "What is the next number in the sequence: 2, 6, 12, 20, ___?",
        "options": ["30", "40", "50", "60"],
        "answer": "30"
    },
    {
        "question": "Which number is equivalent to 3^2 + 4^2?",
        "options": ["7", "12", "25", "5"],
        "answer": "25"
    }
];

// Initialize riddles in localStorage if not exists
function initializeRiddles() {
	let riddles;
    if (window.location.href.includes('math_puzzles')) {
    	console.log("entered puzzles")
        riddles_data = riddlesData;
    } else if (window.location.href.includes('riddles')) {
    	console.log("entered riddles")
        riddles_data = riddlesData_1;
    }

    // if (!localStorage.getItem('riddles')) {
    // 	console.log("set riddles")
    localStorage.setItem('riddles', JSON.stringify(riddles_data));
    // }
    if (!localStorage.getItem('currentRiddleIndex')) {
        localStorage.setItem('currentRiddleIndex', '0');
        localStorage.setItem('correctAnswers', '0');
        localStorage.setItem('wrongAnswers', '0');
        localStorage.setItem('riddleTimers', '{}');
    }
}

// Get current riddle from localStorage
function getCurrentRiddle() {
    const riddles = JSON.parse(localStorage.getItem('riddles'));
    const currentIndex = parseInt(localStorage.getItem('currentRiddleIndex'));
    return riddles[currentIndex];
}

// Update the checkAnswer function
function checkAnswer(button, correctAnswer) {
    const options = button.parentElement.getElementsByClassName('option');
    const currentIndex = parseInt(localStorage.getItem('currentRiddleIndex'));
    let correctAnswers = parseInt(localStorage.getItem('correctAnswers'));
    let wrongAnswers = parseInt(localStorage.getItem('wrongAnswers'));
    let riddleTimers = JSON.parse(localStorage.getItem('riddleTimers') || '{}');
    const correctAnswerLower = correctAnswer.toLowerCase();

    // Prevent multiple answers
    if (button.classList.contains('correct') || button.classList.contains('incorrect')) {
        return;
    }

    Array.from(options).forEach(opt => {
        opt.disabled = true;
    });

    if (button.textContent.toLowerCase().includes(correctAnswerLower)) {
    	console.log("Answer is correct")
        button.classList.add('correct');
        correctAnswers++;
        localStorage.setItem('correctAnswers', correctAnswers);
    } else {
    	console.log("Answer is Incorrect")
        button.classList.add('incorrect');
        wrongAnswers++;
        localStorage.setItem('wrongAnswers', wrongAnswers);
        Array.from(options).forEach(opt => {
            if (opt.textContent.toLowerCase().includes(correctAnswerLower)) {
                opt.classList.add('correct');
            }
        });
    }

    // Print the answer, selected answer, and comparison result
    const selectedAnswer = button.textContent.trim();
    const isCorrect = selectedAnswer.toLowerCase() === correctAnswerLower.toLowerCase();
    console.log(`Correct Answer: ${correctAnswer}`);
    console.log(`Selected Answer: ${selectedAnswer}`);
    console.log(`Is Correct: ${isCorrect}`);

    // Calculate time taken for this riddle
    const startTime = parseInt(localStorage.getItem(`startTime_${currentIndex}`));
    const timeTaken = Math.floor((new Date().getTime() - startTime) / 1000);
    riddleTimers[currentIndex] = Math.min(timeTaken, 60); // Cap at 60 seconds
    localStorage.setItem('riddleTimers', JSON.stringify(riddleTimers));

    // Save the selected answer
    saveAnswerToLocalStorage(currentIndex, button.textContent);
}

// Add function to save answers
function saveAnswerToLocalStorage(riddleIndex, selectedAnswer) {
    const answers = JSON.parse(localStorage.getItem('selectedAnswers') || '{}');
    answers[riddleIndex] = selectedAnswer;
    localStorage.setItem('selectedAnswers', JSON.stringify(answers));
}

// Add function to load previous answers when navigating
function loadPreviousAnswer() {
    const currentIndex = parseInt(localStorage.getItem('currentRiddleIndex'));
    const answers = JSON.parse(localStorage.getItem('selectedAnswers') || '{}');
    const selectedAnswer = answers[currentIndex];

    if (selectedAnswer) {
        const options = document.getElementsByClassName('option');
        Array.from(options).forEach(opt => {
            if (opt.textContent === selectedAnswer) {
                // Simulate clicking the previously selected answer
                checkAnswer(opt, getCurrentRiddle().answer);
            }
        });
    }
}

function moveToNextRiddle() {
    const currentIndex = parseInt(localStorage.getItem('currentRiddleIndex'));
    const riddles = JSON.parse(localStorage.getItem('riddles'));

    // Clear current riddle's timer
    if (riddleTimers[currentIndex]) {
        clearTimeout(riddleTimers[currentIndex]);
    }

    if (currentIndex < riddles.length - 1) {
        localStorage.setItem('currentRiddleIndex', currentIndex + 1);
        displayRiddle();
        startRiddleTimer();
        loadPreviousAnswer();
    }
}

function moveToPreviousRiddle() {
    const currentIndex = parseInt(localStorage.getItem('currentRiddleIndex'));

    // Clear current riddle's timer
    if (riddleTimers[currentIndex]) {
        clearTimeout(riddleTimers[currentIndex]);
    }

    if (currentIndex > 0) {
        localStorage.setItem('currentRiddleIndex', currentIndex - 1);
        displayRiddle();
        // Only start timer if it hasn't expired for the previous riddle
        const previousStartTime = localStorage.getItem(`startTime_${currentIndex - 1}`);
        if (previousStartTime) {
            const elapsed = new Date().getTime() - parseInt(previousStartTime);
            if (elapsed < 60000) { // 60 seconds
                startRiddleTimer();
            } else {
                // Show 00:00 for expired timer
                document.querySelector(`#riddle${currentIndex} .timer`).textContent = `Time: 00s`;
            }
        }
        loadPreviousAnswer();
    }
}

function displayRiddle() {
    const currentRiddle = getCurrentRiddle();
    const currentIndex = parseInt(localStorage.getItem('currentRiddleIndex'));
    const riddles = JSON.parse(localStorage.getItem('riddles'));

    const riddleHTML = `
        <div class="riddle-section" id="riddle${currentIndex + 1}">
            <div class="card backdrop-blur">
                <div class="card-body">
                    <div class="riddle-header d-flex justify-content-between">
                        <h3 class="card-title mb-4">Riddle #${currentIndex + 1}</h3>
                        <h4 class="card-title mb-4 text-danger" id="time-up-message" style="display: none;">Time is up, Move to next question!</h4>
                        <div class="d-flex justify-content-between align-items-center gap-5">
                            <button class="btn btn-light" onclick="window.location.href='worksheet.html'">
                                Worksheet View
                            </button>

                            <div class="timer">Time: 60s</div>

                        </div>

                    </div>
                    <p class="riddle-question">${currentRiddle.question}</p>
                    <div class="options-container">
                        ${currentRiddle.options.map(option => `
                            <button class="option btn btn-light mb-2" 
                                    onclick="checkAnswer(this, '${currentRiddle.answer}')">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                    
                    <!-- Navigation Buttons -->
                    <div class="navigation-buttons d-flex justify-content-between mt-4">
                        <button class="btn footer-btn btn-light" 
                                onclick="moveToPreviousRiddle()"
                                ${currentIndex === 0 ? 'disabled' : ''}>
                            Previous
                        </button>
                        <div class="d-flex gap-2">
                            ${currentIndex === riddles.length - 1 ?
            `<button class="btn btn-success" onclick="showResults()">Submit Quiz</button>` :
            `<button class="btn footer-btn btn-light" onclick="moveToNextRiddle()">Next</button>`
        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('riddle-container').innerHTML = riddleHTML;
}

function showResults() {
    const riddleTimers = JSON.parse(localStorage.getItem('riddleTimers') || '{}');
    const correctAnswers = parseInt(localStorage.getItem('correctAnswers'));
    const totalRiddles = JSON.parse(localStorage.getItem('riddles')).length;
    
    // Calculate total time by summing all recorded times
    const totalTime = Object.values(riddleTimers).reduce((a, b) => a + b, 0);
    
    const percentage = (correctAnswers / totalRiddles) * 100;
    const passed = percentage >= 80;

    const resultsHTML = `
        <div class="card backdrop-blur">
            <div class="card-body">
                <h3>Quiz Results</h3>
                <p>Total Riddles: ${totalRiddles}</p>
                <p>Correct Answers: ${correctAnswers}</p>
                <p>Wrong Answers: ${parseInt(localStorage.getItem('wrongAnswers'))}</p>
                <p>Total Time: ${totalTime} seconds</p>
                <p>Score: ${percentage}%</p>
                <div class="alert ${passed ? 'alert-success' : 'alert-danger'}">
                    ${passed ? 'Congratulations! You passed!' : 'Sorry, you need 80% to pass. Try again!'}
                </div>
                <button class="btn btn-primary" onclick="resetQuiz()">Try Again</button>
            </div>
        </div>
    `;

    document.getElementById('riddle-container').innerHTML = resultsHTML;

    saveToHistory({
        date: new Date().toISOString(),
        correctAnswers,
        wrongAnswers: parseInt(localStorage.getItem('wrongAnswers')),
        totalTime,
        percentage,
        passed
    });
}

function saveToHistory(result) {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.push(result);
    localStorage.setItem('quizHistory', JSON.stringify(history));
}

function resetQuiz() {
    localStorage.setItem('currentRiddleIndex', '0');
    localStorage.setItem('correctAnswers', '0');
    localStorage.setItem('wrongAnswers', '0');
    localStorage.setItem('riddleTimers', '{}');
    localStorage.setItem('selectedAnswers', '{}');
    location.reload();
    localStorage.clear();
}

// Function to display all riddles in worksheet view
function displayWorksheetRiddles() {
    const container = document.getElementById('riddles-container');
    if (!container) return; // Exit if not on worksheet page

    const riddlesHTML = riddlesData.map((riddle, index) => `
        <div class="riddle-card mb-4">
            <h5>Riddle #${index + 1}</h5>
            <p class="riddle-question">${riddle.question}</p>
            <div class="answer-section">
                <div class="options">
                    ${riddle.options.map((option, i) => `
                        <div class="option">
                            <span>${String.fromCharCode(65 + i)})</span> ${option}
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = riddlesHTML;
}

// Initialize when page loads
window.onload = () => {
    initializeRiddles();
    
    if (document.getElementById('riddles-container')) {
        displayWorksheetRiddles();
    } else {
        displayRiddle();
        startRiddleTimer();
        loadPreviousAnswer();
    }
};






// crosswords 




const crosswordPuzzles = [
    {
        id: 1,
        grid: [
            [5, '+', 3, '+', 2, '=', 10],
            ['+', '□', '+', '□', '+', '□', '+'], 
            [4, '+', 6, '+', 5, '=', 15],
            ['+', '□', '+', '□', '+', '□', '+'],
            [2, '+', 8, '+', 3, '=', 13],
            ['=', '□', '=', '□', '=', '□', '='],
            [11, '+', 17, '+', 10, '=', 38]
        ],
        answers: {
            row: [1, null, 1, null, 1, null, 1],
            column: [1]
        }
    },
    {
        id: 2,
        grid: [
            [7, '+', 8, '+', 5, '=', 20],
            ['+', '□', '+', '□', '+', '□', '+'],
            [3, '+', 9, '+', 4, '=', 16], 
            ['+', '□', '+', '□', '+', '□', '+'],
            [6, '+', 2, '+', 7, '=', 15],
            ['=', '□', '=', '□', '=', '□', '='],
            [16, '+', 19, '+', 16, '=', 51]
        ],
        answers: {
            row: [1, null, 1, null, 1, null, 1],
            column: [1, 1]
        }
    },
    {
        id: 3,
        grid: [
            [4, '+', 6, '+', 8, '=', 18],
            ['+', '□', '+', '□', '+', '□', '+'],
            [9, '+', 3, '+', 5, '=', 17],
            ['+', '□', '+', '□', '+', '□', '+'], 
            [7, '+', 4, '+', 6, '=', 17],
            ['=', '□', '=', '□', '=', '□', '='],
            [20, '+', 13, '+', 19, '=', 52]
        ],
        answers: {
            row: [1, null, 1, null, 1, null, 1],
            column: [1, 1, 1]
        }
    },
    {
        id: 4,
        grid: [
            [8, '+', 7, '+', 9, '=', 24],
            ['+', '□', '+', '□', '+', '□', '+'],
            [5, '+', 8, '+', 3, '=', 16],
            ['+', '□', '+', '□', '+', '□', '+'],
            [4, '+', 6, '+', 5, '=', 15],
            ['=', '□', '=', '□', '=', '□', '='],
            [17, '+', 21, '+', 17, '=', 55]
        ],
        answers: {
            row: [1, null, 1, null, 1, null, 1], 
            column: [1, 1, 1, 1]
        }
    },
    {
        id: 5,
        grid: [
            [6, '+', 9, '+', 7, '=', 22],
            ['+', '□', '+', '□', '+', '□', '+'],
            [8, '+', 4, '+', 6, '=', 18],
            ['+', '□', '+', '□', '+', '□', '+'],
            [3, '+', 7, '+', 8, '=', 18],
            ['=', '□', '=', '□', '=', '□', '='],
            [17, '+', 20, '+', 21, '=', 58]
        ],
        answers: {
            row: [1, null, 1, null, 1, null, 1],
            column: [1, 1, 1, 1, 1]
        }
    }
];

let currentPuzzle = 0;
let puzzleTimer;
let timeLeft = 300; 

let totalCorrectPuzzles = 0;
let puzzleResults = [];

function createPuzzleGrid(puzzleData) {
    const crosswordGrid = document.querySelector('.crossword-grid');
    crosswordGrid.innerHTML = '';
    
    // Show/hide conversion questions based on puzzle number
    const conversionQuestions = document.getElementById('conversionQuestions');
    const crosswordSection = document.getElementById('crosswordSection');
    
    if (conversionQuestions && crosswordSection) {
        if (currentPuzzle === 0) {
            conversionQuestions.style.display = 'block';
            crosswordSection.classList.remove('col-lg-8');
            crosswordSection.classList.add('col-lg-6');
        } else {
            conversionQuestions.style.display = 'none';
            crosswordSection.classList.remove('col-lg-6');
            crosswordSection.classList.add('col-lg-12');
        }
    }

    // Update puzzle counter in header
    document.querySelector('.crossword-header h2').textContent = 
        `Crosswords - Puzzle ${currentPuzzle + 1} of ${crosswordPuzzles.length}`;

    puzzleData.grid.forEach((row, rowIndex) => {
        const gridRow = document.createElement('div');
        gridRow.className = 'grid-row';

        row.forEach((cell, colIndex) => {
            if (cell === '□') {
                // Create blocked cell
                const blocked = document.createElement('div');
                blocked.className = 'blocked';
                gridRow.appendChild(blocked);
            } else if (cell === '+' || cell === '=') {
                // Create operator cell
                const operator = document.createElement('div');
                operator.className = 'operator';
                operator.textContent = cell;
                gridRow.appendChild(operator);
            } else {
                // Create number cell or answer input
                const input = document.createElement('input');
                input.type = 'number';
                input.className = 'cell-input';

                // Check if this is an answer cell (last column or last row)
                if (colIndex === 6 || rowIndex === 6) {
                    input.className = 'answer';
                    input.dataset.row = rowIndex;
                    input.dataset.col = colIndex;
                    if (puzzleData.answers.row[rowIndex] !== null) {
                        input.dataset.correct = puzzleData.answers.row[rowIndex];
                    }
                } else {
                    input.value = cell;
                    input.readOnly = true;
                }

                gridRow.appendChild(input);
            }
        });

        crosswordGrid.appendChild(gridRow);
    });
}

function checkAnswers() {
    const answers = document.querySelectorAll('.answer');
    let allCorrect = true;
    let correctCount = 0;
    let totalAnswers = answers.length;

    answers.forEach(input => {
        const userAnswer = parseInt(input.value);
        const correctAnswer = parseInt(input.dataset.correct);
        
        if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('incorrect');
            correctCount++;
        } else {
            input.classList.add('incorrect');
            input.classList.remove('correct');
            allCorrect = false;
        }
    });

    const percentage = (correctCount / totalAnswers) * 100;
    
    if (allCorrect) {
        totalCorrectPuzzles++;
        clearInterval(puzzleTimer);
        document.getElementById('nextPuzzle').disabled = false;
        Swal.fire({
            title: 'Success!',
            text: 'Congratulations! All answers are correct!',
            icon: 'success',
            confirmButtonText: 'Continue'
        });
    } else {
        Swal.fire({
            title: 'Oops!',
            text: 'Some answers are incorrect. Please try again!',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
    }

    puzzleResults[currentPuzzle] = {
        puzzleNumber: currentPuzzle + 1,
        percentage: percentage,
        timeSpent: 300 - timeLeft
    };
}

function loadNextPuzzle() {
    currentPuzzle++;
    if (currentPuzzle < crosswordPuzzles.length) {
        createPuzzleGrid(crosswordPuzzles[currentPuzzle]);
        document.getElementById('nextPuzzle').disabled = true;
        resetTimer();
    } else {
        showFinalResults();
    }
}

function resetTimer() {
    clearInterval(puzzleTimer);
    timeLeft = 300;
    startTimer();
}

function startTimer() {
    updateTimerDisplay();
    puzzleTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(puzzleTimer);
            Swal.fire({
                title: 'Time\'s Up!',
                text: 'Please try again.',
                icon: 'warning',
                confirmButtonText: 'Restart'
            }).then((result) => {
                if (result.isConfirmed) {
                    resetPuzzle();
                }
            });
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.querySelector('.timer').textContent = `Time: ${timerDisplay}`;
}

function resetPuzzle() {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(input => {
        input.value = '';
        input.classList.remove('correct', 'incorrect');
    });
    resetTimer();
}

// Add new function to show final results
function showFinalResults() {
    const averageScore = puzzleResults.reduce((acc, result) => acc + result.percentage, 0) / puzzleResults.length;
    const totalTime = puzzleResults.reduce((acc, result) => acc + result.timeSpent, 0);
    const passed = averageScore >= 80;

    Swal.fire({
        title: 'Final Results',
        html: `
            <div class="results-container">
                <p><strong>Total Puzzles:</strong> ${crosswordPuzzles.length}</p>
                <p><strong>Correctly Solved Puzzles:</strong> ${totalCorrectPuzzles}</p>
                <p><strong>Average Score:</strong> ${averageScore.toFixed(1)}%</p>
                <p><strong>Total Time:</strong> ${Math.floor(totalTime / 60)}m ${totalTime % 60}s</p>
                <div class="alert ${passed ? 'alert-success' : 'alert-danger'}">
                    ${passed ? 'Congratulations! You passed!' : 'Sorry, you need 80% average to pass. Try again!'}
                </div>
                <h4>Individual Puzzle Results:</h4>
                <div class="puzzle-results">
                    ${puzzleResults.map(result => `
                        <div class="puzzle-result">
                            Puzzle ${result.puzzleNumber}: ${result.percentage.toFixed(1)}% 
                            (Time: ${Math.floor(result.timeSpent / 60)}m ${result.timeSpent % 60}s)
                        </div>
                    `).join('')}
                </div>
            </div>
        `,
        icon: passed ? 'success' : 'error',
        confirmButtonText: 'Try Again',
        allowOutsideClick: false,
        width: '700px'
    }).then((result) => {
        if (result.isConfirmed) {
            resetAllPuzzles();
        }
    });
}

// Add function to reset everything
function resetAllPuzzles() {
    currentPuzzle = 0;
    totalCorrectPuzzles = 0;
    puzzleResults = [];
    timeLeft = 300;
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    const crosswordContainer = document.querySelector('.crossword-container');
    if (crosswordContainer) {
        createPuzzleGrid(crosswordPuzzles[currentPuzzle]);
        
        const checkAnswersBtn = document.getElementById('checkAnswers');
        const nextPuzzleBtn = document.getElementById('nextPuzzle');

        if (checkAnswersBtn && nextPuzzleBtn) {
            checkAnswersBtn.addEventListener('click', checkAnswers);
            nextPuzzleBtn.addEventListener('click', loadNextPuzzle);
            startTimer();
        }
    }
});












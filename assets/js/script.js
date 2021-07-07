/*
    global constants
*/
const testTime = 500;
const timePenalty = 10;

/*
    global page element variables. Used to manipulate the DOM
*/
var mainEl = document.getElementById('main');
var questionElement = document.getElementById('question');
var multipleChoicesElement = document.getElementById('answers');
var answerStatusEl = document.getElementById('answer-status');
var container = document.getElementsByClassName('container');

/*
    Global variables used throughout the program 
*/
var count = 0;
var rightAnswers = 0;
var secondsLeft = testTime;
var rightAnswerRecord = 0;
var timeInterval;
var scores =  JSON.parse(localStorage.getItem("scores")) || [];

/*
    Function countdown
    Purpose: Shows the timer countdown on the page. Stops the test when timer reaches 0
    input: none
    return: none
*/
function countdown() { 
    timeInterval = setInterval(function () {
        secondsLeft--;
        mainEl.textContent = secondsLeft ;
        
        if(secondsLeft < 0) {               
            mainEl.textContent = "Time's Up!!!!";
            stopTest();
        }
    }, 1000);
}

/*
    Function: stopTest
    Purpose: Called when the test is over. The test is over when all the questions are answered or the timer reaches zero
    Input: none
    return: none
*/      
function stopTest() {
    clearQuestion();
    answerStatusEl.textContent = "";
    mainEl.textContent = "";
    clearInterval(timeInterval);
    displayTestScore();
    promptForInitials();
 }

/*
    Function: promptForInitials
    Purpose: prompts the user to enter intials in the textfield and button. Once the input is received, values are added to the scores array. After submission user is taken to the scores view
    Input: none
    return: none
*/
function promptForInitials() {
    var initials = "";
    var input = document.createElement("input");
    input.type = "text";
    input.name = "initials";
    input.placeholder = "Enter initials";
    testResults.appendChild(input);

    let submitInitialsBtn = document.createElement("button");
    submitInitialsBtn.innerHTML = "Submit";
    submitInitialsBtn.onclick = function () {
        initials = input.value.trim();
        addScore(initials, rightAnswers);
        showScoresPage();
    }
    testResults.appendChild(submitInitialsBtn);
}

/*
    Function: addScores
    Purpose: adds a string to the scores array and persists it to the local storage
    Inputs: 
        initials = the user's initials 
        score = the user's test score
    return: none
*/
function addScore(initials = "", rightAnswer = "0") {
    scores.push (initials + " " + rightAnswers);
    localStorage.setItem("scores", JSON.stringify(scores));
}

/*
    Function: clearScores
    Purpose: used by the clear score button to remove the local storeage scores array and reinitialize it to an empty array
    input: none 
    return: none
*/
function clearScores() {
    localStorage.removeItem("scores");
    scores = JSON.parse(localStorage.getItem("scores")) || [];
}

/*
    Function: showScoresPage
    Purpose: iterate through the scores array and display the initials and scores along with buttons to clear score or restart test
    Input: none
    return: none
*/
function showScoresPage() {
    clearAllElements();
    mainEl.textContent = "High Scores";
    let highScoreListEl = document.createElement("ul");
    mainEl.appendChild(highScoreListEl);
    for(let i = 0; i < scores.length; i++) {
        let highScoreListItemEl = document.createElement("li");
        highScoreListItemEl.textContent = scores[i];
        highScoreListEl.appendChild(highScoreListItemEl);
    }

    let clearScoresButton = document.createElement("button");
    clearScoresButton.innerHTML = "Clear Scores";
    clearScoresButton.onclick = function () {
        clearScores();
        showScoresPage();
    }
    let goBackButton = document.createElement("button");
    goBackButton.innerHTML = "Go Back";
    goBackButton.onclick = startTest;
    mainEl.appendChild(clearScoresButton);
    mainEl.appendChild(goBackButton);

}

/*
    Function displayTestScore
    Purpose: inform the user that the test is done and how many answers they got right
    input: none
    return: none
*/
function displayTestScore() {
    questionElement.textContent = "All Done!";
    answerStatusEl.textContent = "You answered " + rightAnswers + " questions correctly";
}

/*
    Function: startTest
    Purpose: kickstarts the test by showing the welcome page with the start button. Also defines behavior for Start Test button onclick 
    Input: none
    return: none
*/
function startTest() {
    let container = document.getElementsByClassName('container');
    let welcome = document.getElementsByClassName('welcome');
    container.textContent = "";
    welcome.textContent = "Welcome to WebDev Quiz";
    mainEl.textContent = "Try to answer as many questions as you can correctly. Keep in mind, wrong questions will have a time penalty of " + timePenalty + " seconds";

    let startTestButton = document.createElement("button");
    startTestButton.innerHTML = "Start Test";
    startTestButton.onclick = function () {
        clearAllElements();
        countdown();
        addQuestion(0);
    }
    mainEl.appendChild(document.createElement("br"));
    mainEl.appendChild(startTestButton);
}

/*
    Function clearAllElements
    Purpose: clears all the html elements. used to start a new test 
    input: none
    return: none
*/
function clearAllElements() {
    count = 0;
    rightAnswers = 0;
    secondsLeft = testTime;
    mainEl.textContent = "";
    questionElement.textContent = "";
    multipleChoicesElement.textContent = "";
    answerStatusEl.textContent = "";
    finalScoreEl.textContent = "";
    testResults.innerHTML = "";
}

/*
    Function clearQuestions
    Purpose: remove the current question from the display along with all of its choices
    Input: none
    return: none
*/
function clearQuestion () {
    questionElement.textContent = "";
    var listItemEl = multipleChoicesElement.lastElementChild; 
    while (listItemEl) {
        multipleChoicesElement.removeChild(listItemEl);
        listItemEl = multipleChoicesElement.lastElementChild;
    }
    
}

/*
    Function processAnswer
    Purpose: determines if the answer selected is correct or not. Will increment the rightAnswers count if the answer is correct. Will decrease the remaining time if the answer is incorrect. 
    input: none
    return: none
*/
function processAnswer() {
    if(questionsArray[count].rightAnswer === this.textContent) {
        rightAnswers++;
        answerStatusEl.textContent = "Correct!";
    } else {
        answerStatusEl.textContent = "Wrong!!"
        secondsLeft = secondsLeft - timePenalty;
    }
}

/*
    Function: addQuestion
    Purpose: displays the next question on the screen. Ends the test if there are no more qeustions
    input: the question to display
    return: none
*/
function addQuestion(questionNumber) {
    clearQuestion();
    questionElement.textContent = "Q " + (questionNumber + 1) + ". " + questionsArray[questionNumber].questionText;
    for (let i = 0; i < questionsArray[questionNumber].possibleAnswers.length; i++) {
        var currentPossibleAnswer = questionsArray[questionNumber].possibleAnswers[i];
        var listItemEl = document.createElement("li");
        var MultipleChoiceAnswerTextNode = document.createTextNode(currentPossibleAnswer);
        listItemEl.appendChild(MultipleChoiceAnswerTextNode);
        multipleChoicesElement.appendChild(listItemEl);
        listItemEl.onclick = function () {
            processAnswer;
            count++;
            if(count < questionsArray.length) { 
                addQuestion(count);
            } else {
                stopTest();
            }
        }
    }
}

startTest();
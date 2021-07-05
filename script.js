const testTime = 20;
const timePenalty = 10;
var mainEl = document.getElementById('main');
var questionElement = document.getElementById('question');
var multipleChoicesElement = document.getElementById('answers');
var answerStatusEl = document.getElementById('answer-status');
var finalScoreEl = document.getElementById('final-score');
var testResults = document.getElementById('test-results');

var count = 0;
var rightAnswers = 0;
var secondsLeft = testTime;
var rightAnswerRecord = 0;
var timeInterval;
var scores = ["test 1", "test 2", "test 3"];

/*
    Function countdown
    Purpose: Shows the timer countdown on the page
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

function stopTest() {
    clearQuestion();
    answerStatusEl.textContent = "";
    mainEl.textContent = "";
    clearInterval(timeInterval);
    checkHighScore();
    promptForInitials();
 }

function promptForInitials() {
    var initials = "";
    var input = document.createElement("input");
    input.type = "text";
    input.name = "initials";
    // input.defaultValue = "Enter initials";
    input.placeholder = "Enter initials";
    console.log("input" + input);
    console.log("testResults" + testResults);
    testResults.appendChild(input);

    let btn = document.createElement("button");
    btn.innerHTML = "Submit";
    btn.onclick = function () {
        initials = input.value;
        scores.push (initials + " " + rightAnswers);
        console.log(scores);
        showScoresPage();
    }
    testResults.appendChild(btn);
}

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

}

function checkHighScore() {
    console.log("inside check high score! ");
    questionElement.textContent = "All Done!";
    finalScoreEl.textContent = "You answered " + rightAnswers + " questions correctly";
}

function startTest() {
    countdown();
    clearAllElements();
    addQuestion(0);
}

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

function clearQuestion () {
    questionElement.textContent = "";
    var listItemEl = multipleChoicesElement.lastElementChild; 
    while (listItemEl) {
        multipleChoicesElement.removeChild(listItemEl);
        listItemEl = multipleChoicesElement.lastElementChild;
    }
    
}

function processAnswer() {
    if(questionsArray[count].rightAnswer === this.textContent) {
        rightAnswers++;
        answerStatusEl.textContent = "Correct!";
    } else {
        answerStatusEl.textContent = "Wrong!!"
        secondsLeft = secondsLeft - timePenalty;
    }
    count++;
    if(count < questionsArray.length) { 
        addQuestion(count);
    } else {
        stopTest();
    }
}

function addQuestion(questionNumber) {
    clearQuestion();
    questionElement.textContent = "Q " + (questionNumber + 1) + ". " + questionsArray[questionNumber].questionText;
    for (let i = 0; i < questionsArray[questionNumber].possibleAnswers.length; i++) {
        var currentPossibleAnswer = questionsArray[questionNumber].possibleAnswers[i];
        var listItemEl = document.createElement("li");
        var MultipleChoiceAnswerTextNode = document.createTextNode(currentPossibleAnswer);
        listItemEl.appendChild(MultipleChoiceAnswerTextNode);
        multipleChoicesElement.appendChild(listItemEl);
        listItemEl.onclick = processAnswer;
    }
}



/*
    TODO: 
    0. add start button to start the counter
        0.1 show the button that says start
        0.2 on click make the button disappear
        0.3 on click show the counter and the first question
    
    //1. show the timer counting down -DONE
    //    1.1 stop timer when all questions are answer --DONE
    //2. show quizz questions 
    //    2.1 create quiz object -DONE 
    //    2.2 quiz object contains a question, up to 4 answers, and a correct answer identifier - DONE
    //    2.3 quiz object will have a function that takes an answer and returns true if it matches the correct answer -DONE
    //    2.4 display the quiz question and the answers to the screen --DONE
    //        2.4.1 quiz question should be shown by iteslef --DONE
    //        2.4.2 quiz answers should be shown as a an ordered list --DONE
    //    2.5 use a json file to create a list of questions and populate them --DONE
    //   2.6 add logic to decide which question to display --DONE
    3. capture quiz answers
    //    3.1 capture clicks on the ul element --DONE
    //    3.2 switch the question on clicks --DONE
    //    3.3 track correct answers --DONE
    //    3.4 reduce timer on incorrect answers --DONE
    //4. when timer expires, show correct answers
    //    4.1 clear all the pending answers is any --DONE
    //    4.2 show the results -DONE

    5. prompt for initials 
        //5.1 show a text field for the initials --DONE
        //5.2 add submit button  --DONE
        // 5.3 capture the input of the initials and store it with the score -- DONE
        5.4 when the submit button is clicked go to the highscroes view --DONE
    

    6. process high scores
        6.0 Set welcome text
        6.1 view the high scores
        6.2 add go back button 
        6.3 add clear scores button 
        6.4 add functionality to clear scores
            6.4.1 remove the display of high scores
        6.5 add functionality to go back
            6.5.1 takes you to start quiz button 

    7. show highest scores
    8. update CSS
        8.1 add css to the UL element to change color on mouse over

    
*/

startTest();


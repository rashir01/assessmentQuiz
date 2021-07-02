var mainEl = document.getElementById('main');
var questionElement = document.getElementById('question');
var answersElement = document.getElementById('answers');
var resultsElement = document.getElementById('test-resutls');
var count = 0;
var testIsOver = false;
var rightAnswers = 0;
var secondsLeft = 10;

/*
    Function countdown
    Purpose: Shows the timer countdown on the page
    input: none
    return: none
*/
function countdown() { 
      var timeInterval = setInterval(function () {
        if (!testIsOver) {
            secondsLeft--;
            mainEl.textContent = secondsLeft ;
            
            if(secondsLeft < 0) {
                clearInterval(timeInterval);
                mainEl.textContent = "";
                questionElement.textContent = "Time's Up!!!!";
                //TODO remove multiple choice when timer expires
                resultsElement.textContent = "You had " + rightAnswers +" correct answers";
            }
            //TODO: add code to capture and display the results
        }
    }, 1000);
}

function addQuestion(questionNumber) {
    
    questionElement.textContent = "Q " + questions[questionNumber].questionText;
    for (let i = 0; i < questions[questionNumber].possibleAnswers.length; i++) {
        var currentPossibleAnswer = questions[questionNumber].possibleAnswers[i];
        var tag = document.createElement("li");
        var text = document.createTextNode(currentPossibleAnswer);
        tag.appendChild(text);
        answersElement.appendChild(tag);
        tag.onclick = function (e) {
            console.log(e.target.textContent); 
            console.log(questions[count].rightAnswer === e.target.textContent);
            if(questions[count].rightAnswer === e.target.textContent) {
                rightAnswers++;
            } else {
                secondsLeft = secondsLeft - 10;
            }
            //TODO add to a spearate method
            child = answersElement.lastElementChild; 
            while (child) {
                answersElement.removeChild(child);
                child = answersElement.lastElementChild;
            }
            count++;
            if(count < questions.length) { 
                addQuestion(count);
            } else {
                questionElement.textContent = "Test is over. "
                resultsElement.textContent = "You had " + rightAnswers + " correct answers";
                testIsOver = true;
            }
        }
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
    //   2.6 add logic to decide which question to display
        
    
    3. capture quiz answers
    //    3.1 capture clicks on the ul element --DONE
    //    3.2 switch the question on clicks --DONE
    //    3.3 track correct answers --DONE
    //    3.4 reduce timer on incorrect answers --DONE

    4. when timer expires, show correct answers
        4.1 clear all the pending answers is any 
        4.2 show the results 
    5. prompt for initials 
    6. show highest scores
    7. update CSS
        7.1 add css to the UL element to change color on mouse over

    
*/


countdown();
addQuestion(count);


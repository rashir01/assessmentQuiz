var mainEl = document.getElementById('main');
var questionElement = document.getElementById('question');

/*
    Function countdown
    Purpose: Shows the timer countdown on the page
    input: none
    return: none
*/
function countdown() {
  var secondsLeft = 60;
  var timeInterval = setInterval(function () {
    secondsLeft--;
    mainEl.textContent = secondsLeft ;
    questionElement.textContent = "Q " + (1 + secondsLeft%5) + ". " + questions[secondsLeft%5].questionText;
    if(secondsLeft === 0) {
      clearInterval(timeInterval);
      mainEl.textContent = "Times up!!!!";
      //TODO: add code to capture and display the results
    }
  }, 1000);
}



/*
    TODO: 
    0. add start button to start the counter
        0.1 show the button that says start
        0.2 on click make the button disappear
        0.3 on click show the counter and the first question
    1. show the timer counting down -DONE
    2. show quizz questions 
        2.1 create quiz object -DONE 
        2.2 quiz object contains a question, up to 4 answers, and a correct answer identifier - DONE
        2.3 quiz object will have a function that takes an answer and returns true if it matches the correct answer -DONE
        2.4 display the quiz question and the answers to the screen
            2.4.1 quiz question should be shown by iteslef
            2.4.2 quiz answers should be shown as a list with radio buttons
        2.5 use a json file to create a list of questions and populate them 
    
    3. capture quiz answers
    4. when timer expires, show correct answers
    5. prompt for initials 
    6. show highest scores
    7. update CSS
    
*/


countdown();


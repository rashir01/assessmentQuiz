var mainEl = document.getElementById('main');



function countdown() {
  var secondsLeft = 60;
 
  var timeInterval = setInterval(function () {
    secondsLeft--;
    mainEl.textContent = secondsLeft ;

    if(secondsLeft === 0) {
      clearInterval(timeInterval);
      mainEl.textContent = "Times up!!!!";
    }

  }, 1000);
}



/*
    TODO: 
    1. show the timer counting down
    2. show quizz questions 
    3. capture quiz answers
    4. when timer expires, show correct answers
    5. prompt for initials 
    6. show highest scores
    7. update CSS
*/


countdown();


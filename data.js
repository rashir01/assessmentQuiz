class Question {
    constructor(questionText, possibleAnswers, rightAnswer) {
      this.questionText = questionText;
      this.possibleAnswers = possibleAnswers;
      this.rightAnswer = rightAnswer;
    }
}

question = [
    new Question ("Which of the following is an advantage of using JavaScript?", ["A - Less server interaction", "B - Immediate feedback to the visitors", "C - Increased interactivity", "D - All of the above."], "D - All of the above."),
    new Question ("Can you assign a anonymous function to a variable?", ["A - true", "B - false"], "A - true"),
    new Question ("Which built-in method combines the text of two strings and returns a new string?", ["A - append()", "B - concat()", "C - attach()", "D - None of the above."], "B - concat()"), 
    new Question ("Which built-in method returns the calling string value converted to lower case?", ["A - toLowerCase()", "B - toLower()", "C - changeCase(case)", "D - None of the above."], "A - toLowerCase()"), 
    new Question ("Which of the following function of Number object returns a string value version of the current number?", ["A - toString()", "B - toFixed()", "C - toLocaleString()", "D - toPrecision()"], "A - toString()"), 

];
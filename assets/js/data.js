class Question {
    constructor(questionText, possibleAnswers, rightAnswer) {
      this.questionText = questionText;
      this.possibleAnswers = possibleAnswers;
      this.rightAnswer = rightAnswer;
    }

    checkAnswer(answerToCheck) {
        return this.rightAnswer === answerToCheck;
    }
}

questionsArray = [
    new Question ("Which of the following is an advantage of using JavaScript?", ["Less server interaction", "Immediate feedback to the visitors", "Increased interactivity", "All of the above."], "All of the above."),
    new Question ("Can you assign a anonymous function to a variable?", ["true", "false"], "true"),
    new Question ("Which built-in method combines the text of two strings and returns a new string?", ["append()", "concat()", "attach()", "None of the above."], "concat()"), 
    new Question ("Which built-in method returns the calling string value converted to lower case?", ["toLowerCase()", "toLower()", "changeCase(case)", "None of the above."], "toLowerCase()"), 
    new Question ("Which of the following function of Number object returns a string value version of the current number?", ["toString()", "toFixed()", "toLocaleString()", "toPrecision()"], "toString()"), 
];
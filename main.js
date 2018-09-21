'use strict';

const USERDATA = {
  currentQuestion: 1,
  answersCorrect: 0,
  answersIncorrect: 0
};

function setupQuiz() {
  handleAllButtons();
  renderStartupPage();
}

// Render start-page
// -might need to reset 'score' if the user is restarting the quiz
function renderStartupPage() {
  $('.quiz-container').append(`
  <div class="start-page">
    <h2>In mexico, there are a lot of interesting phrases you'll come across. How many can you get right?</h2>
    <button type="button" class="startButton">Start Quiz</button>
  </div>`);
}

// Handle start-button
function handleStartButton() {
  $('.quiz-container').on('click', '.startButton', function (e) {
    //e.preventDefault();
    $('.start-page').remove();
    USERDATA.currentQuestion = 1;
    USERDATA.answersCorrect = 0;
    USERDATA.answersIncorrect = 0;
    renderQuestionPage();
  });
}

// Render question-page
// -grab the current question from QUIZDATA
// -render out all the choices
function renderQuestionPage() {
  generateQuestion();
}

function generateQuestion() {
  let currentQuestionObj = QUESTIONDATA[USERDATA.currentQuestion - 1];

  $('.quiz-container').append(
    `<div class="question-page">
  <h2>Question ${USERDATA.currentQuestion}:</h2>
  <p>${currentQuestionObj.question}</p>

  <form class="question-form">
    <fieldset class="question-choices">`);

  for (let i = 0; i < currentQuestionObj.choices.length; i++) {
    $('.question-choices').append(
      `<label class="answerOption">
          <input type="radio" name="answer" value="${currentQuestionObj.choices[i]}" required>
          <span>${currentQuestionObj.choices[i]}</span>
      </label>`
    );
  }

  $('.question-page').append(
    `
      <button type="button" class="submitButton">Submit</button>
    </fieldset>
  </form>

  <p>Current Question: ${USERDATA.currentQuestion} of 10 ~ ${USERDATA.answersCorrect} correct, ${USERDATA.answersIncorrect} incorrect</p>
</div>
  `);
}

// Handle question-form-radio-choices
// -allows user to click on the questions
// Handle question-submit-button
// -check if the user picked the correct answer or not
function handleQuestionSubmitButton() {
  $('.quiz-container').on('click', '.submitButton', e => {
    if ($('input:radio[name=answer]').is(':checked')) {
      renderFeedbackPage( isUserCorrect() );
      $('.question-page').remove();
    }
  });

}

function isUserCorrect() {
  let checkedAnswer = $('input[name=answer]:checked').val();
  let correctAnswer = QUESTIONDATA[USERDATA.currentQuestion-1].answer;
  if (checkedAnswer === correctAnswer) { return true } else { return false }
}

// Render feedback-page
function renderFeedbackPage(isCorrect) {

  if (isCorrect === true) {
  $('.quiz-container').append(
    `<div class="feedback-correct">
      <h2>You were right!</h2>
      <button type="button" class="nextQuestionButton">Next Question</button>
    </div>`);
    USERDATA.answersCorrect += 1;
  } else {
    $('.quiz-container').append(
    `<div class="feedback-wrong">
      <h2>Oh no!</h2>
      <p>The correct answer was "${QUESTIONDATA[USERDATA.currentQuestion-1].answer}"</p>
      <button type="button" class="nextQuestionButton">Next Question</button>
    </div>`);
  USERDATA.answersIncorrect += 1;
}
}
// -if above question was right, congratulate
// -otherwise they were wrong and you need to display the correct answer
// Handle next-question-button
function handleNextQuestionButton() {
  $('.quiz-container').on('click', '.nextQuestionButton', e => {
    //e.preventDefault();
    $('.feedback-correct').remove();
    $('.feedback-wrong').remove();
    if (USERDATA.currentQuestion < 10) {
      USERDATA.currentQuestion += 1;
      renderQuestionPage()
    } else {
      renderFinalPage();
    }
  });

}


// Render final-page
function renderFinalPage() {
  $('.quiz-container').append(
    `<div class="final-page">
      <h2>Congratulations!</h2>
      <p>You got ${USERDATA.answersCorrect} out of 10 questions right for a score of ${(USERDATA.answersCorrect / 10) * 100}%</p>
      <button type="button" class="restartQuizButton">Click here to try to get a better score.</button>
    </div>`
  );
}
// -check how many questions were answered correctly and display accordingly
// -Maybe have some logic on if they did an okay job, bad job, or great job
// Handle restart-quiz-button
function handleRestartQuizButton() {
  $('.quiz-container').on('click', '.restartQuizButton', e => {
    //e.preventDefault();
    $('.final-page').remove();
    renderStartupPage();
  });

}

function handleAllButtons() {
  handleStartButton();
  handleQuestionSubmitButton();
  handleNextQuestionButton();
  handleRestartQuizButton();
}

$(setupQuiz);
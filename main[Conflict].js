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
  let currentQuestionObj = QUESTIONDATA[USERDATA.currentQuestion-1];

  $('.quiz-container').append(
    `<div class="question-page">
  <h2>Question ${USERDATA.currentQuestion}:</h2>
  <p>${currentQuestionObj.question}</p>

  <form>
    <fieldset class="question-choices">
      <label class="answerOption">
        <input type="radio" name="answer" value="${currentQuestionObj.choices[0]}" required>
        <span>${currentQuestionObj.choices[0]}</span>
      </label>
      <label class="answerOption">
        <input type="radio" name="answer" value=${currentQuestionObj.choices[0]}"required>
        <span>${currentQuestionObj.choices[0]}</span>
      </label>
      <label class="answerOption">
        <input type="radio" name="answer" value="Really?/For Real?"required>
        <span>Really?/For Real?</span>
      </label>
      <label class="answerOption">
        <input type="radio" name="answer" value="Do you know?"required>
        <span>Do you know?</span>
      </label>
      <button type="button" class="submitButton">Submit</button>
    </fieldset>
  </form>

  <p>Current Question: 1 of 10 ~ 0 correct, 0 incorrect</p>
</div>
  `
  );
}

// Handle question-form-radio-choices
// -allows user to click on the questions
// Handle question-submit-button
// -check if the user picked the correct answer or not
function handleQuestionSubmitButton() {
  $('.quiz-container').on('click', '.submitButton', e => {
    if ($('input:radio[name=answer]').is(':checked')) {
      $('.question-page').remove();
      renderFeedbackPage();
    }
  });

}


// Render feedback-page
function renderFeedbackPage() {
  $('.quiz-container').append(
    `<div class="feedback-correct">
      <h2>You were right!</h2>
      <button type="button" class="nextQuestionButton">Next Question</button>
    </div>

    <div class="feedback-wrong">
      <h2>Oh no!</h2>
      <p>The correct answer was ____</p>
      <button type="button">Next Question</button>
    </div>`
  );
}
// -if above question was right, congratulate
// -otherwise they were wrong and you need to display the correct answer
// Handle next-question-button
function handleNextQuestionButton() {
  $('.quiz-container').on('click', '.nextQuestionButton', e => {
    //e.preventDefault();
    $('.feedback-correct').remove();
    $('.feedback-wrong').remove();
    renderFinalPage();
  });

}


// Render final-page
function renderFinalPage() {
  $('.quiz-container').append(
    `<div class="final-page">
      <h2>Congratulations!</h2>
      <p>You got __ out of 10 questions right for a score of __%</p>
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
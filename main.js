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

function renderStartupPage() {
  $('.quiz-container').append(`
  <div class="start-page">
    <header role="header">
        <h1>Mexican Spanish Quiz</h1>
    </header>
    <h2>How many can you get right?</h2>
    <button type="button" class="startButton">Start Quiz</button>
  </div>`);
}

// Render question-page
// -grab the current question from QUIZDATA
// -render out all the choices
function renderQuestionPage() {
  generateQuestion();
}

function generateQuestion() {
  let currentQuestionObj = QUESTIONDATA[USERDATA.currentQuestion - 1];

  $('.quiz-container').append(`
  <div class="question-page">
    <h2>Question ${USERDATA.currentQuestion}:</h2>
    <p>Which is the correct translation for: ${currentQuestionObj.question}</p>

    <form class="question-form">
      <fieldset class="question-choices">
  `);

  for (let i = 0; i < currentQuestionObj.choices.length; i++) {
    $('.question-choices').append(`
      <div class="answerOption">
          <input class="answerButton" type="button" name="answer" value="${currentQuestionObj.choices[i]}" required>
      </div>
  `);
  }

  $('.question-page').append(`
      <div class="feedback-section">
      </div>
      <button type="button" class="submitButton">Submit</button>
      </fieldset>
    </form>
    <progress value="${USERDATA.currentQuestion-1}" max="10"></progress>
    <p>${USERDATA.answersCorrect} correct, ${USERDATA.answersIncorrect} incorrect</p>
  </div>
  `);
}

// Render feedback-page
function renderFeedbackPage(isCorrect) {
  let checkedAnswer = $('input[name=answer].active').val();
  let correctAnswer = QUESTIONDATA[USERDATA.currentQuestion - 1].answer;

  // -if above question was right, congratulate
  // -otherwise they were wrong and you need to display the correct answer 
  if (checkedAnswer === correctAnswer) {
    $('.feedback-section').append(
      `<div class="feedback-correct">
      <h2>You were right!</h2>
      <button type="button" class="nextQuestionButton">Next Question</button>
    </div>`);
    USERDATA.answersCorrect += 1;
  } else {
    $('.feedback-section').append(
      `<div class="feedback-wrong">
      <h2>Oh no!</h2>
      <p>The correct answer was "${QUESTIONDATA[USERDATA.currentQuestion-1].answer}"</p>
      <button type="button" class="nextQuestionButton">Next Question</button>
    </div>`);
    USERDATA.answersIncorrect += 1;
  }
  // Set correct and incorrect backgrounds
  $("span:contains("+QUESTIONDATA[USERDATA.currentQuestion-1].answer+")").addClass("correct");
  $('input[type="button"').attr('disabled', true);
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

function handleAllButtons() {
  // 
  handleStartButton();
  handleOptionButtons();
  handleQuestionSubmitButton();
  handleNextQuestionButton();
  handleRestartQuizButton();
}

function handleStartButton() {
  $('.quiz-container').on('click', '.startButton', function (e) {
    $('.start-page').remove();
    resetUserScore();
    renderQuestionPage();
  });
}

function handleOptionButtons() {
  $('.quiz-container').on('click', '.answerButton', function (e) {
    $('.answerButton').removeClass('active');
    $(this).addClass('active');
  }
  );
}

function handleQuestionSubmitButton() {
  $('.quiz-container').on('click', '.submitButton', e => {
    // Make sure that the user actually clicked on a choice first
    if ($('input:button[name=answer]').hasClass('active')) {
      renderFeedbackPage();
      $('.submitButton').remove();
    }
  });
}

function handleNextQuestionButton() {
  $('.quiz-container').on('click', '.nextQuestionButton', e => {
    $('.question-page').remove();
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

function handleRestartQuizButton() {
  $('.quiz-container').on('click', '.restartQuizButton', e => {
    $('.final-page').remove();
    renderStartupPage();
  });
}

function resetUserScore() {
  USERDATA.currentQuestion = 1;
  USERDATA.answersCorrect = 0;
  USERDATA.answersIncorrect = 0;
}

$(setupQuiz);
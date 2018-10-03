'use strict';

const USERDATA = {
  currentQuestion: 1,
  answersCorrect: 0,
  answersIncorrect: 0
};

/**
 * At the start, add all event listeners to the buttons,
 * and render the first screen: start-page
 */
function setupQuiz() {
  handleAllButtons();
  renderStartupPage();
}

/**
 * start-page will be the title screen that displays
 * the name of the Quiz and includes a start button
 */
function renderStartupPage() {
  $('.quiz-container').append(`
  <div class="start-page col-12">
    <header role="header">
        <h1 class="red-plus-shadow">Mexican Spanish Quiz</h1>
    </header>
    <h2>How many can you get right?</h2>
    <button type="button" class="startButton">Start Quiz</button>
  </div>`);
}

/**
 * question-page is the main content of the QuizApp, It renders out
 * on the fly, each question, including choices as you go through the quiz.
 * Each time a question needs to be generated, it grabs the current question
 * from QUIZDATA, and then grabs each 'choice/answerOption' and displays it.
 */
function renderQuestionPage() {
  // Grab just the current question object to make things easier
  let currentQuestionObj = QUESTIONDATA[USERDATA.currentQuestion - 1];
  let answerOptionHTML = ``;

  // Setup the areas of the Question Page: TOP - MID - BOTTOM
  $('.quiz-container').append(`
  <div class="question-page col-12">
    <div class="question-top"></div>
    <div class="question-mid"></div>
    <div class="question-bottom"></div>
  </div>`);

  // TOP of the Question Page which includes the "Question 1: This is the first question"
  $('.question-top').append(`
      <h2 class="red-plus-shadow">Question ${USERDATA.currentQuestion}:</h2>
      <h3>Which is the correct translation for: <span class="no-wrap" lang="es">${currentQuestionObj.question}</span></h3>
    `);

  // Create the HTML for the Question options that the user can choose from.
  for (let i = 0; i < currentQuestionObj.choices.length; i++) {
    answerOptionHTML +=
      `<div class="answerOption col-6">
        <input class="answerButton" type="button" name="answer" value="${currentQuestionObj.choices[i]}">
      </div>`;
  }

  // MID of the Question Page which includes all options, and the submit/feedback area.
  $('.question-mid').append(`
    <form class="question-form">
      <fieldset class="question-choices">
      <div class="row">
          ${answerOptionHTML}
      </div>
      <div class="row">
        <div class="col-2"></div>
        <button type="button" class="submitButton">Submit</button>
        <div class="col-2"></div>
      </div>
      <div class="row">
        <div class="feedback-section col-12">
      </div>
      </fieldset>
    </form>
  `);

  $('.question-bottom').append(`
      <progress value="${USERDATA.currentQuestion-1}" max="10">1/10</progress>
      <!--<p>${USERDATA.answersCorrect} correct, ${USERDATA.answersIncorrect} incorrect</p>-->
  `);
}

/**
 * Render feedback-page
 * This is called once a questionSubmitButton is pressed
 * It gets the value of the checkedAnswer, and matches it with the
 * correct answer, and displays feedback accordingly.
 */
function renderFeedbackPage() {
  let checkedAnswer = $('input[name=answer].active').val();
  let correctAnswer = QUESTIONDATA[USERDATA.currentQuestion - 1].answer;

  if (checkedAnswer === correctAnswer) {
    $('.feedback-section').append(
      `<div class="feedback-correct">
      <h3>You were right!</h3>
      <button type="button" class="nextQuestionButton">Next Question</button>
    </div>`);
    USERDATA.answersCorrect += 1;
  } else {
    $('.feedback-section').append(
      `<div class="feedback-wrong">
      <h3>Oh no!</h3>
      <p>The correct answer was "${correctAnswer}"</p>
      <button type="button" class="nextQuestionButton">Next Question</button>
    </div>`);
    USERDATA.answersIncorrect += 1;

    $('input[name=answer].active').addClass("incorrect");
  }
  // Set correct and incorrect backgrounds
  $('input[type="button"][value="' + correctAnswer + '"]').addClass("correct");
  $('input[type="button"]').attr('disabled', true);
}

/**
 * Render final-page
 * Once the user is done with all questions,
 * take their score and set an appropriate greeting
 * then offer if they would like to take the quiz again
 */
function renderFinalPage() {
  let finalScore = (USERDATA.answersCorrect / 10) * 100;
  let greeting = ``;


  if (finalScore == 100) {
    //Perfect score
    greeting = `Congrats, PERFECT!`;
  } else if (finalScore >= 80) {
    //Normal Score
    greeting = `Congrats!`;
  } else if (finalScore >= 30) {
    //Need more practice Score
    greeting = `May need more practice`;
  } else if (finalScore < 30) {
    //Bad Score
    greeting = `Oh no! Please try again!`;
  }


  $('.quiz-container').append(
    `<div class="final-page col-12">
      <h2 class="red-plus-shadow">${greeting}</h2>
      <p>You got ${USERDATA.answersCorrect} out of 10 questions right for a score of ${(USERDATA.answersCorrect / 10) * 100}%</p>
      <button type="button" class="restartQuizButton">Click here to try the quiz again!</button>
    </div>`
  );
}

/**
 * Adding all event listeners to each button
 * Each button is handled in a seperate function just for
 * orginizational purposes
 */
function handleAllButtons() {
  handleStartButton();
  handleOptionButtons();
  handleQuestionSubmitButton();
  handleNextQuestionButton();
  handleRestartQuizButton();
}

/**
 * When startButton is clicked
 * remove the start-page,
 * reset the users Score in case this isn't the first time
 * render out the questions Page
 */
function handleStartButton() {
  $('.quiz-container').on('click', '.startButton', function (e) {
    $('.start-page').remove();
    resetUserScore();
    renderQuestionPage();
  });
}

/**
 * When a question choice is clicked on,
 * remove any 'active' buttons and make this button active
 */
function handleOptionButtons() {
  $('.quiz-container').on('click', '.answerButton', function (e) {
    $('.answerButton').removeClass('active');
    $(this).addClass('active');
  });
}

/**
 * When the user is ready to submit their answer
 * Check to make sure they DID choose an answer, then
 * remove the button and show the feedback text
 */
function handleQuestionSubmitButton() {
  $('.quiz-container').on('click', '.submitButton', e => {
    // Make sure that the user actually clicked on a choice first
    if ($('input:button[name=answer]').hasClass('active')) {
      renderFeedbackPage();
      $('.submitButton').remove();
    }
  });
}

/**
 * After the user submits their question and feedback
 * is given, they will click on the next question button
 * which will remove any feedback, and the previous question
 * and will show the next question
 */
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

/**
 * After the user clicks on the restart quiz button
 * remove the final page and show the start page again
 */
function handleRestartQuizButton() {
  $('.quiz-container').on('click', '.restartQuizButton', e => {
    $('.final-page').remove();
    renderStartupPage();
  });
}

/**
 * Reset the scores for the user to retake the quiz
 *
 */
function resetUserScore() {
  USERDATA.currentQuestion = 1;
  USERDATA.answersCorrect = 0;
  USERDATA.answersIncorrect = 0;
}

$(setupQuiz);
'use strict';
// Need const to store all the quiz questions.
// const QUIZDATA
// -question/phrase
// -answer choices
// -correct answer
const QUESTIONDATA = [{
    questionID: 1,
    question: '¿Qué onda?',
    choices: ['What\'s your name?', 'What\'s up?', 'Really?/For Real?', 'Do you know?'],
    answer: 'What\'s up?'
  },
  {
    questionID: 2,
    question: '¿Mande?',
    choices: ['What?/Tell me/Go ahead', 'What\'s up?', 'Really?/For Real?', 'Do you know?'],
    answer: 'What?/Tell me/Go ahead'
  },
  {
    questionID: 3,
    question: '¡No manches!',
    choices: ['Cast the devil out!', 'No Worries!', 'No way!/Come on!', 'Bananas!'],
    answer: 'No way!/Come on!'
  },
  {
    questionID: 4,
    question: '¿Neta?',
    choices: ['Banana?', 'Really?/For Real?', '', ''],
    answer: 'Really?/For Real?'
  },
  {
    questionID: 5,
    question: 'Ni modo',
    choices: ['slang for Banana', '', '', 'it doesn’t matter/it can’t be helped'],
    answer: 'it doesn’t matter/it can’t be helped'
  },
  {
    questionID: 6,
    question: 'Chido',
    choices: ['Cool, when refering to objects or situations', 'A short Child', '', ''],
    answer: 'Cool, when refering to objects or situations'
  },
  {
    questionID: 7,
    question: 'Crudo',
    choices: ['Cruddy', 'Happy', 'Lost', 'Hung over'],
    answer: 'Hung over'
  },
  {
    questionID: 8,
    question: 'Cochino',
    choices: ['', 'dirty/discusting/rude', '', ''],
    answer: 'dirty/discusting/rude'
  },
  {
    questionID: 9,
    question: 'Chela',
    choices: ['', '', 'Beer', ''],
    answer: 'Beer'
  },
  {
    questionID: 10,
    question: 'Chiste',
    choices: ['Joke/trick', 'Spill', '', ''],
    answer: 'Joke/trick'
  }
];

const STARTPAGEDATA =
  ` <div class="start-page">
      <h2>In mexico, there are a lot of interesting phrases you'll come across. How many can you get right?</h2>
      <button type="button" class="start-button">Start Quiz</button>
    </div>
`;
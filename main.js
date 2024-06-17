const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

const quizData = [
    {
      question: "What is the title of the Shogun Raiden within the Seven Archons ?",
      options: ["The Eternal Wanderer", "The God Irremovable", "The Receptacle of Eternity", "The demiurge",],
      answer: "The Receptacle of Eternity",
    },
    {
      question: "What is the name of the main stalking that players control from the start of the game ?",
      options: ["Venti", "Paimon", "Lumine / Aether", "Diluc"],
      answer: "Lumine / Aether",
    },
    {
      question: "Who is the god of freedom (city of Mondstadt) ?",
      options: ["Venti", "Jean", "Diluc", "Kaeya"],
      answer: "Venti",
    },
    {
      question: "How the children of the hearth nickname arlecchino ?",
      options: ["Father", "Mother", "Lady", "Goddess"],
      answer: "Father",
    },
    {
      question: "What is the name of the premium currency used for wishes ?",
      options: ["Mora", "Primogemmes", "Résine originel", "Pierre de destin",],
      answer: "Primogemmes",
    },
    {
      question: "What is the real name of Dainslef ?",
      options: ["The Guardian of the Gates", "The Eternal Twilight", "The Chain Breaker", "The former king of khaenri'ah"],
      answer: "The Eternal Twilight",
    },
    {
      question: "Who is Furina ?",
      options: ["The real Archon Hydro", "The best actress in the world", "A simple human", "A Fatui",],
      answer: "The best actress in the world",
    },
    {
      question: "Who is Arlecchino ?",
      options: ["The goddess of Sheznaya", "An Executioner", "A simple pnj", "The Goddess of Eternity"],
      answer: "An Executioner",
    },
    {
      question: "What is the name of Zhongli's passive talent that increases the durability of his shield ?",
      options: ["Conqueror of evil", "Dominus Lapidis", "Jade's will", "Resolution of Falling Star",],
      answer: "Resolution of Falling Star",
    },
    {
      question: "What is the real name of the Shogun Raiden ?",
      options: ["Ei", "Ayaka", "Yae", "Makoto"],
      answer: "Ei",
    },
];
  
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
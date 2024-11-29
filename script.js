// Questions data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Initialize user answers from session storage or as an empty array
let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || new Array(questions.length).fill(null);

// Render questions
function renderQuestions() {
  const questionsElement = document.getElementById('questions');
  questionsElement.innerHTML = ''; // Clear any previous content
  
  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    question.choices.forEach((choice, j) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if the current choice is selected
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      // Event listener to update answers in session storage
      choiceElement.addEventListener('change', () => {
        userAnswers[i] = choice;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers)); // Save progress
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    });
    questionsElement.appendChild(questionElement);
  });
}

// Calculate score
function calculateScore() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  return score;
}

// Handle submit
document.getElementById("submit").addEventListener("click", () => {
  const score = calculateScore();
  document.getElementById("score").innerText = `Your score is ${score} out of ${questions.length}`;
  
  // Store score in local storage
  localStorage.setItem("score", score);
});

// Display stored score if available
const storedScore = localStorage.getItem("score");
if (storedScore) {
  document.getElementById("score").innerText = `Your last score was ${storedScore} out of ${questions.length}`;
}

// Render questions on page load
renderQuestions();

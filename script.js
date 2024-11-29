// Questions array
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

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Function to render questions
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ""; // Clear any previous questions

  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");

    // Create question text
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    question.choices.forEach((choice, j) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Pre-select the answer if available in sessionStorage
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }

      // Event listener to update answers in session storage
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers)); // Save progress
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Function to submit the quiz
function submitQuiz() {
  let score = 0;
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });

  // Display the score with period at the end
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Store score in localStorage
  localStorage.setItem("score", score);
}

// Render questions when the page loads
renderQuestions();

// Handle submit button click
document.getElementById("submit").addEventListener("click", submitQuiz);

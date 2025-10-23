
const quizData = {
  general: [
    { question: "What is the capital of India?", options: ["Delhi","Mumbai","Chennai","Kolkata"], answer: "Delhi" },
    { question: "How many continents are there?", options: ["5","6","7","8"], answer: "7" },
    { question: "What is the largest ocean?", options: ["Atlantic","Pacific","Indian","Arctic"], answer: "Pacific" },
    { question: "Which country has the maple leaf?", options: ["USA","Canada","UK","Australia"], answer: "Canada" },
    { question: "How many colors in rainbow?", options: ["5","6","7","8"], answer: "7" }
  ],
  science: [
    { question: "Water's chemical formula?", options: ["H2O","CO2","O2","NaCl"], answer: "H2O" },
    { question: "Planet known as Red Planet?", options: ["Earth","Mars","Jupiter","Venus"], answer: "Mars" },
    { question: "Speed of light approx?", options: ["3x10^8 m/s","3x10^6 m/s","3x10^5 km/s","300 m/s"], answer: "3x10^8 m/s" },
    { question: "What gas do plants produce?", options: ["Oxygen","CO2","Nitrogen","Hydrogen"], answer: "Oxygen" },
    { question: "Force = mass x ?", options: ["Velocity","Acceleration","Energy","Power"], answer: "Acceleration" }
  ]
};

let currentCategory = "";
let currentQuestion = 0;
let score = 0;


const categorySection = document.getElementById("category-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const currentQEl = document.getElementById("current-q");
const totalQEl = document.getElementById("total-q");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("final-score");
const nextBtn = document.getElementById("next-btn");


function startQuiz(category){
  currentCategory = category;
  currentQuestion = 0;
  score = 0;
  categorySection.style.display = "none";
  quizSection.style.display = "block";
  totalQEl.textContent = quizData[category].length;
  scoreEl.textContent = score;
  showQuestion();
}


function showQuestion(){
  const q = quizData[currentCategory][currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option, btn);
    optionsEl.appendChild(btn);
  });

  currentQEl.textContent = currentQuestion + 1;
}


function selectAnswer(selected, btn){
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");

  const correct = quizData[currentCategory][currentQuestion].answer;
  if(selected === correct){
    score += 1;
    scoreEl.textContent = score;
  }
}


nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if(currentQuestion < quizData[currentCategory].length){
    showQuestion();
  } else {
    endQuiz();
  }
});


function endQuiz(){
  quizSection.style.display = "none";
  resultSection.style.display = "block";
  finalScoreEl.textContent = score + " / " + quizData[currentCategory].length;
  localStorage.setItem("lastScore", JSON.stringify({ category: currentCategory, score: score }));
}


function resetQuiz(){
  resultSection.style.display = "none";
  categorySection.style.display = "block";
}

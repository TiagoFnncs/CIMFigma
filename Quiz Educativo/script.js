const quizData = [
    {
        question: "Qual das situações abaixo pode ser considerada uma forma de violência psicológica contra a mulher?",
        answers: [
            { text: "A. Brigas ocasionais em um relacionamento", correct: false },
            { text: "B. Críticas construtivas sobre o comportamento da mulher", correct: false },
            { text: "C. Ameaçar tirar os filhos ou dizer que ninguém vai acreditar nela", correct: true },
            { text: "D. Discussões sobre tarefas do lar", correct: false }
        ],
        explanation: "Ameaçar, humilhar, isolar ou manipular são formas de violência psicológica, e devem ser levadas a sério."
    },
    {
        question: "De acordo com a Lei Maria da Penha, qual direito a mulher tem ao denunciar uma situação de violência?",
        answers: [
            { text: "A. Somente ser ouvida por uma delegada mulher", correct: false },
            { text: "B. Escolher entre medidas protetivas, como afastamento do agressor", correct: true },
            { text: "C. Denunciar apenas com testemunhas", correct: false },
            { text: "D. Ter direito a proteção somente após exame médico", correct: false }
        ],
        explanation: "A mulher pode solicitar medidas protetivas de urgência, como afastamento do agressor, proibição de contato e acompanhamento psicológico."
    },
    {
        question: "Por que a informação é uma ferramenta de proteção para mulheres em situação de risco?",
        answers: [
            { text: "A. Porque ajuda a evitar conflitos com o agressor", correct: false },
            { text: "B. Porque permite identificar abusos e tomar decisões seguras", correct: true },
            { text: "C. Porque facilita esconder a situação", correct: false },
            { text: "D. Porque substitui a atuação da polícia", correct: false }
        ],
        explanation: "Ter acesso à informação aumenta a capacidade da mulher de se reconhecer em situação de risco, buscar ajuda e agir com autonomia."
    },
    {
        question: "Qual destas iniciativas pode fortalecer a independência e segurança de uma mulher em situação de vulnerabilidade?",
        answers: [
            { text: "A. Isolamento para evitar novos relacionamentos", correct: false },
            { text: "B. Controle financeiro pelo parceiro para “ajudar a economizar”", correct: false },
            { text: "C. Participar de cursos de capacitação e saber onde buscar ajuda", correct: true },
            { text: "D. Evitar falar sobre os problemas com outras mulheres", correct: false }
        ],
        explanation: "A capacitação profissional, acesso à informação e apoio social são essenciais para fortalecer a mulher e reduzir sua dependência."
    },
    {
        question: "O que é o “Batom de Emergência”, presente no app CIM?",
        answers: [
            { text: "A. Um item de maquiagem com câmera oculta", correct: false },
            { text: "B. Um botão de denúncia embutido no celular da vítima", correct: false },
            { text: "C. Um recurso discreto que envia alerta de risco e localização para contatos de segurança", correct: true },
            { text: "D. Um grupo de WhatsApp secreto para mulheres", correct: false }
        ],
        explanation: "O Batom de Emergência é um botão discreto no app que, em situação de perigo, aciona contatos de segurança ou a polícia, com geolocalização."
    }
];

const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const nextButton = document.getElementById('next-btn');
const questionArea = document.getElementById('question-area');
const startArea = document.getElementById('start-area');
const endArea = document.getElementById('end-area');
const questionTitleElement = document.getElementById('question-title');
const answerButtonsElement = document.getElementById('answer-buttons');
const explanationArea = document.getElementById('explanation-area');
const explanationTextElement = document.getElementById('explanation-text');

let currentQuestionIndex;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    startArea.classList.add('hide');
    endArea.classList.add('hide');
    questionArea.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < quizData.length) {
        showQuestion(quizData[currentQuestionIndex]);
    } else {
        showEndScreen();
    }
}

function showQuestion(question) {
    questionTitleElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    explanationArea.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });

    explanationTextElement.innerText = quizData[currentQuestionIndex].explanation;
    explanationArea.classList.remove('hide');

    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function showEndScreen() {
    questionArea.classList.add('hide');
    endArea.classList.remove('hide');
}


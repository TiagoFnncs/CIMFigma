import confetti from 'canvas-confetti';

const questions = [
    // Bloco I
    { 
        id: 1, text: "O(A) agressor(a) já ameaçou você ou algum familiar com a finalidade de atingi-la?",
        options: [
            { text: "Sim, com arma de fogo", score: 5 },
            { text: "Sim, com faca", score: 4 },
            { text: "Sim, de outra forma", score: 3 },
            { text: "Não", score: 0 }
        ]
    },
    { 
        id: 2, text: "O(A) agressor(a) já praticou alguma destas agressões físicas contra você?",
        options: [
            { text: "Enforcamento / Sufocamento", score: 5 },
            { text: "Queimadura", score: 4 },
            { text: "Tiro / Facada / Paulada", score: 4 },
            { text: "Nenhuma das agressões acima", score: 0 }
        ],
        multiple: true
    },
    { 
        id: 3, text: "O(A) agressor(a) já praticou alguma destas outras agressões físicas contra você?",
        options: [
            { text: "Socos / Chutes", score: 2 },
            { text: "Tapas / Empurrões / Puxões de Cabelo", score: 1 },
            { text: "Nenhuma das agressões acima", score: 0 }
        ],
        multiple: true
    },
    { 
        id: 4, text: "O(A) agressor(a) já obrigou você a fazer sexo ou a praticar atos sexuais contra sua vontade?",
        options: [
            { text: "Sim", score: 4 },
            { text: "Não", score: 0 }
        ]
    },
    { 
        id: 5, text: "O(A) agressor(a) já teve algum destes comportamentos?",
        options: [
            { text: "Disse algo como: 'se não for minha, não será de mais ninguém'", score: 5 },
            { text: "Perseguiu ou vigiou você", score: 3 },
            { text: "Controlou suas amizades, trabalho ou estudos", score: 2 },
            { text: "Controlou seu dinheiro ou bens", score: 2 },
            { text: "Nenhum dos comportamentos acima", score: 0 }
        ],
        multiple: true
    },
    { 
        id: 6, text: "Você já registrou ocorrência policial ou pediu medida protetiva contra essa pessoa?",
        options: [
            { text: "Sim", score: 1 },
            { text: "Não", score: 0 }
        ]
    },
    { 
        id: 7, text: "As ameaças ou agressões se tornaram mais frequentes ou graves nos últimos meses?",
        options: [
            { text: "Sim", score: 4 },
            { text: "Não", score: 0 }
        ]
    },
    // Bloco II
    { 
        id: 8, text: "O(A) agressor(a) faz uso abusivo de álcool ou de drogas?",
        options: [
            { text: "Sim, de álcool", score: 2 },
            { text: "Sim, de drogas", score: 2 },
            { text: "Não / Não sei", score: 0 }
        ]
    },
    { 
        id: 10, text: "O(A) agressor(a) já descumpriu medida protetiva anteriormente?",
        options: [
            { text: "Sim", score: 5 },
            { text: "Não", score: 0 },
            { text: "Não se aplica", score: 0 }
        ]
    },
    { 
        id: 11, text: "O(A) agressor(a) já tentou suicídio ou falou em se suicidar?",
        options: [
            { text: "Sim", score: 3 },
            { text: "Não", score: 0 }
        ]
    },
    { 
        id: 13, text: "O(A) agressor(a) tem acesso a armas de fogo?",
        options: [
            { text: "Sim", score: 5 },
            { text: "Não / Não sei", score: 0 }
        ]
    },
    { 
        id: 14, text: "O(A) agressor(a) já foi violento com outras pessoas (filhos, familiares, animais)?",
        options: [
            { text: "Sim", score: 3 },
            { text: "Não / Não sei", score: 0 }
        ]
    },
    // Bloco III
    { 
        id: 15, text: "Você se separou recentemente do(a) agressor(a) ou tentou se separar?",
        options: [
            { text: "Sim", score: 4 },
            { text: "Não", score: 0 }
        ]
    },
    { 
        id: 17, text: "Existe conflito sobre guarda dos filhos, visitas ou pensão?",
        options: [
            { text: "Sim", score: 2 },
            { text: "Não", score: 0 },
            { text: "Não tenho filhos com o(a) agressor(a)", score: 0 }
        ]
    },
    { 
        id: 18, text: "Seu(s) filho(s) já presenciaram atos de violência do(a) agressor(a) contra você?",
        options: [
            { text: "Sim", score: 2 },
            { text: "Não", score: 0 }
        ]
    },
     // Bloco IV
    { 
        id: 24, text: "Você se considera dependente financeiramente do(a) agressor(a)?",
        options: [
            { text: "Sim", score: 1 },
            { text: "Não", score: 0 }
        ]
    },
    {
        id: 25, text: "Você precisa e aceita ir para um abrigo temporário?",
        options: [
            { text: "Sim, preciso e aceito", score: 3 },
            { text: "Não", score: 0 }
        ]
    }
];

// Simplified some questions for a smoother web experience.

let currentQuestionIndex = 0;
let userScore = 0;

const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const reportScreen = document.getElementById('report-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress-bar');
const reportContent = document.getElementById('report-content');

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    showScreen('question');
    displayQuestion();

    // A small celebration for taking the first step
    confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showReport();
        return;
    }

    updateProgressBar();
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = ''; // Clear previous question

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.classList.add('question-text');
    questionText.textContent = `${currentQuestionIndex + 1}. ${question.text}`;
    questionDiv.appendChild(questionText);

    const optionsGrid = document.createElement('div');
    optionsGrid.classList.add('options-grid');
    if (question.options.length > 3) {
        optionsGrid.classList.add('two-columns');
    }

    // Simplified logic: all questions advance on click
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option.text;
        button.addEventListener('click', () => {
            // Check for the "none of the above" option in multiple-choice questions
            if (question.multiple) {
                // If "Nenhum/Nenhuma..." is clicked, score is 0.
                if (option.score === 0) {
                    handleAnswer(0);
                } else {
                    // For other options, we must determine the max score if it were multiple choice
                    // To simplify while removing the next button, we take the score of the clicked option.
                    // This is an interpretation of the user's will for a simpler flow.
                    // For a more accurate "max score of selection", a next button would be required.
                    // To keep the original scoring intent as much as possible, let's just use the clicked score.
                    // A better approach if multiple selections were to be kept would be to add a "continue" button.
                    // But user explicitly asked to remove it.
                    // So we assume only one option can be picked.
                    handleAnswer(option.score);
                }
            } else {
                handleAnswer(option.score);
            }
        });
        optionsGrid.appendChild(button);
    });
    questionDiv.appendChild(optionsGrid);

    questionContainer.appendChild(questionDiv);
}

function handleAnswer(score) {
    userScore += score;
    currentQuestionIndex++;
    displayQuestion();
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}


function showReport() {
    updateProgressBar(); // To fill the bar
    let riskLevel = '';
    let riskMessage = '';
    let riskClass = '';
    let suggestions = [];

    if (userScore >= 25) {
        riskLevel = 'Risco Gravíssimo';
        riskMessage = 'Sua situação indica um perigo extremo e iminente. Sua vida pode estar em risco. É crucial buscar ajuda imediatamente.';
        riskClass = 'risk-gravissimo';
        suggestions = [
            '<strong>Ligue para a polícia (190) agora, especialmente se o agressor estiver por perto.</strong>',
            'Se possível, saia de casa e vá para um local seguro (casa de familiar, amigo ou um abrigo).',
            'Procure a Delegacia da Mulher ou a delegacia de polícia mais próxima para registrar uma ocorrência e solicitar medidas protetivas de urgência.',
            'Peça ajuda na Defensoria Pública ou em um Centro de Referência da Mulher para orientação jurídica e psicológica.',
            'Ligue para o <strong>180</strong> (Central de Atendimento à Mulher) para obter informações e apoio.'
        ];
    } else if (userScore >= 16) {
        riskLevel = 'Risco Alto';
        riskMessage = 'Sua situação é muito séria e apresenta um alto potencial de agravamento da violência.';
        riskClass = 'risk-alto';
        suggestions = [
            'Procure a Delegacia da Mulher mais próxima para registrar uma ocorrência e solicitar medidas protetivas de urgência.',
            'Busque apoio psicológico. Falar com um profissional pode te fortalecer.',
            'Converse com a Defensoria Pública para conhecer seus direitos.',
            'Ligue para o <strong>180</strong> para orientação. Não hesite em pedir ajuda.'
        ];
    } else if (userScore >= 8) {
        riskLevel = 'Risco Médio';
        riskMessage = 'Você está em uma situação de violência que merece muita atenção e cuidado. O risco pode aumentar.';
        riskClass = 'risk-medio';
        suggestions = [
            'Busque apoio psicológico para lidar com o estresse e a violência emocional.',
            'Ligue para o <strong>180</strong> (Central de Atendimento à Mulher) para conversar e receber orientações sobre seus direitos e os serviços disponíveis.',
            'Considere procurar um Centro de Referência de Atendimento à Mulher (CRAM) em sua cidade para apoio social e jurídico.',
            'Documente as agressões (fotos, mensagens, testemunhas) caso decida fazer uma denúncia no futuro.'
        ];
    } else {
        riskLevel = 'Risco Baixo';
        riskMessage = 'Apesar do risco ser classificado como baixo, qualquer tipo de violência é inaceitável. É importante ficar atenta aos sinais.';
        riskClass = 'risk-baixo';
        suggestions = [
            'Busque informação sobre violência doméstica e relacionamentos saudáveis.',
            'Fortaleça sua rede de apoio com amigos e familiares de confiança.',
            'Considere uma terapia ou aconselhamento para entender e processar o que está acontecendo.',
            'Saiba que o Ligue 180 está disponível para você a qualquer momento, para qualquer dúvida.'
        ];
    }
    
    reportContent.innerHTML = `
        <div id="risk-level-display" class="${riskClass}">
            <span class="level">${riskLevel}</span>
            <span class="message">${riskMessage}</span>
        </div>
        <h3>Sugestões e Próximos Passos</h3>
        <ul id="suggestions-list">
            ${suggestions.map(s => `<li>${s}</li>`).join('')}
        </ul>
    `;

    showScreen('report');
}

function showScreen(screenName) {
    startScreen.classList.remove('active');
    questionScreen.classList.remove('active');
    reportScreen.classList.remove('active');

    document.getElementById(`${screenName}-screen`).classList.add('active');
}
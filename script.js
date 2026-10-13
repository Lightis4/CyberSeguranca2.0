
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    document.querySelectorAll(".threat-toggle").forEach((button) => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling;

            if (!details) return;

            const isHidden = details.hidden;
            details.hidden = !isHidden;
            button.setAttribute("aria-expanded", String(isHidden));
            button.textContent = isHidden
                ? "Ocultar informações"
                : "Saiba como se proteger";
        });
    });

    const siteUrl = "https://lightis4.github.io/Cyber_seguranca/";

    function createQRCode(container, value) {
        if (!container || typeof QRCode === "undefined") {
            return false;
        }

        container.innerHTML = "";

        new QRCode(container, {
            text: value,
            width: 200,
            height: 200,
            colorDark: "#07111f",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        return true;
    }

    function downloadQRCode(container, filename) {
        if (!container) return;

        const canvas = container.querySelector("canvas");
        const image = container.querySelector("img");
        let imageUrl = "";

        if (canvas) {
            imageUrl = canvas.toDataURL("image/png");
        } else if (image && image.src) {
            imageUrl = image.src;
        }

        if (!imageUrl) return;

        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    const siteQr = document.getElementById("site-qr");
    const siteAddress = document.getElementById("site-address");
    const downloadSiteQr = document.getElementById("download-site-qr");

    if (siteQr) {
        const generated = createQRCode(siteQr, siteUrl);

        if (!generated) {
            siteQr.textContent = "Não foi possível carregar o gerador de QR Code.";
        }
    }

    if (siteAddress) {
        siteAddress.textContent = siteUrl;
    }

    if (downloadSiteQr) {
        downloadSiteQr.addEventListener("click", () => {
            downloadQRCode(siteQr, "qrcode-site-cybersecurity.png");
        });
    }

    const qrForm = document.getElementById("qr-form");
    const qrText = document.getElementById("qr-text");
    const customQr = document.getElementById("custom-qr");
    const downloadCustomQr = document.getElementById("download-custom-qr");
    const qrMessage = document.getElementById("qr-message");

    if (qrForm && qrText && customQr) {
        qrForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const value = qrText.value.trim();

            if (!value) {
                qrMessage.textContent = "Digite um link ou texto para gerar o QR Code.";
                return;
            }

            const generated = createQRCode(customQr, value);

            if (!generated) {
                qrMessage.textContent = "O gerador não foi carregado. Verifique sua conexão com a internet.";
                return;
            }

            if (downloadCustomQr) {
                downloadCustomQr.disabled = false;
            }

            qrMessage.textContent = "QR Code gerado! Você já pode baixar a imagem.";
        });
    }

    if (downloadCustomQr) {
        downloadCustomQr.addEventListener("click", () => {
            downloadQRCode(customQr, "meu-qrcode.png");
        });
    }

    const quizContainer = document.getElementById("quiz-container");

    if (!quizContainer) return;

    const quizStart = document.getElementById("quiz-start");
    const quizGame = document.getElementById("quiz-game");
    const quizResults = document.getElementById("quiz-results");
    const startButton = document.getElementById("start-quiz");
    const questionNumber = document.getElementById("question-number");
    const timerDisplay = document.getElementById("timer");
    const currentScoreDisplay = document.getElementById("current-score");
    const progressFill = document.getElementById("progress-fill");
    const questionText = document.getElementById("question-text");
    const answerList = document.getElementById("answer-list");
    const answerFeedback = document.getElementById("answer-feedback");
    const nextButton = document.getElementById("next-question");
    const restartButton = document.getElementById("restart-quiz");

    const finalScore = document.getElementById("final-score");
    const correctCount = document.getElementById("correct-count");
    const wrongCount = document.getElementById("wrong-count");
    const totalTimeDisplay = document.getElementById("total-time");
    const resultMessage = document.getElementById("result-message");

    const questions = [
        {
            question: "O que é cibersegurança?",
            answers: [
                "Uma forma de aumentar a velocidade da internet",
                "A proteção de sistemas, redes e dados digitais",
                "Um tipo de rede social",
                "Um programa para editar imagens"
            ],
            correct: 1
        },
        {
            question: "O que é phishing?",
            answers: [
                "Uma atualização de sistema",
                "Um tipo de armazenamento",
                "Um golpe que tenta roubar informações por meio de engano",
                "Uma ferramenta de programação"
            ],
            correct: 2
        },
        {
            question: "Qual é a melhor prática para criar senhas?",
            answers: [
                "Usar a mesma senha em todas as contas",
                "Usar apenas a data de nascimento",
                "Escolher uma senha curta e simples",
                "Usar senhas longas e diferentes para cada serviço"
            ],
            correct: 3
        },
        {
            question: "Para que serve a autenticação em dois fatores?",
            answers: [
                "Adicionar uma etapa extra de verificação de identidade",
                "Deixar a senha visível para o usuário",
                "Desativar a proteção da conta",
                "Compartilhar a conta com outra pessoa"
            ],
            correct: 0
        },
        {
            question: "O que você deve fazer ao receber um link suspeito?",
            answers: [
                "Abrir imediatamente",
                "Encaminhar para todos os contatos",
                "Evitar abrir e verificar a autenticidade da mensagem",
                "Informar sua senha para confirmar a identidade"
            ],
            correct: 2
        },
        {
            question: "O que é malware?",
            answers: [
                "Um aplicativo oficial de mensagens",
                "Um software malicioso que pode prejudicar dispositivos ou dados",
                "Um tipo de cabo de rede",
                "Uma ferramenta para criar apresentações"
            ],
            correct: 1
        },
        {
            question: "Por que é importante atualizar programas e sistemas?",
            answers: [
                "Para remover todas as senhas",
                "Para impedir o uso da internet",
                "Para compartilhar seus arquivos publicamente",
                "Para corrigir falhas e melhorar a segurança"
            ],
            correct: 3
        },
        {
            question: "Qual é um cuidado importante ao usar Wi-Fi público?",
            answers: [
                "Evitar atividades sensíveis em redes não confiáveis",
                "Usar a mesma senha em todos os sites",
                "Desativar todas as atualizações",
                "Compartilhar dados pessoais com qualquer página"
            ],
            correct: 0
        },
        {
            question: "Como melhorar a segurança de uma câmera residencial conectada?",
            answers: [
                "Manter a senha padrão do fabricante",
                "Desativar as atualizações para sempre",
                "Trocar a senha padrão e manter o dispositivo atualizado",
                "Publicar o endereço de acesso nas redes sociais"
            ],
            correct: 2
        },
        {
            question: "O que fazer se suspeitar que sua conta foi invadida?",
            answers: [
                "Ignorar o ocorrido",
                "Alterar a senha, proteger a conta e verificar acessos suspeitos",
                "Enviar sua senha para amigos",
                "Desativar todas as formas de proteção"
            ],
            correct: 1
        }
    ];

    const questionTime = 15;
    let currentQuestion = 0;
    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let remainingTime = questionTime;
    let totalTime = 0;
    let timerInterval = null;
    let questionAnswered = false;

    function stopTimer() {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function updateScore() {
        currentScoreDisplay.textContent = String(score);
    }

    function startTimer() {
        stopTimer();
        remainingTime = questionTime;
        timerDisplay.textContent = String(remainingTime);

        timerInterval = setInterval(() => {
            remainingTime -= 1;
            timerDisplay.textContent = String(remainingTime);

            if (remainingTime <= 0) {
                stopTimer();
                answerQuestion(null);
            }
        }, 1000);
    }

    function showQuestion() {
        questionAnswered = false;
        const question = questions[currentQuestion];

        questionNumber.textContent = String(currentQuestion + 1);
        questionText.textContent = question.question;
        answerList.innerHTML = "";
        answerFeedback.textContent = "";
        nextButton.hidden = true;
        progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;

        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "answer-option";
            button.textContent = answer;
            button.addEventListener("click", () => answerQuestion(index));
            answerList.appendChild(button);
        });

        startTimer();
    }

    function answerQuestion(selectedAnswer) {
        if (questionAnswered) return;

        questionAnswered = true;
        stopTimer();

        const question = questions[currentQuestion];
        const answerButtons = answerList.querySelectorAll(".answer-option");
        const isCorrect = selectedAnswer === question.correct;

        totalTime += questionTime - remainingTime;

        answerButtons.forEach((button, index) => {
            button.disabled = true;

            if (index === question.correct) {
                button.classList.add("correct");
            }

            if (selectedAnswer === index && !isCorrect) {
                button.classList.add("incorrect");
            }
        });

        if (isCorrect) {
            const pointsEarned = 100 + remainingTime * 10;
            score += pointsEarned;
            correctAnswers += 1;
            answerFeedback.textContent = `Resposta correta! Você ganhou ${pointsEarned} pontos.`;
        } else {
            wrongAnswers += 1;

            if (selectedAnswer === null) {
                answerFeedback.textContent = `Tempo esgotado! A resposta correta era: ${question.answers[question.correct]}.`;
            } else {
                answerFeedback.textContent = `Resposta incorreta. A resposta correta era: ${question.answers[question.correct]}.`;
            }
        }

        updateScore();
        progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
        nextButton.textContent = currentQuestion === questions.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";
        nextButton.hidden = false;
    }

    function showResults() {
        stopTimer();
        quizGame.hidden = true;
        quizResults.hidden = false;

        finalScore.textContent = String(score);
        correctCount.textContent = String(correctAnswers);
        wrongCount.textContent = String(wrongAnswers);
        totalTimeDisplay.textContent = `${totalTime}s`;

        if (correctAnswers === questions.length) {
            resultMessage.textContent = "Excelente! Você acertou todas as perguntas. Continue praticando para manter seus conhecimentos em segurança digital.";
        } else if (correctAnswers >= 7) {
            resultMessage.textContent = "Muito bom! Você demonstrou bons conhecimentos em cibersegurança.";
        } else if (correctAnswers >= 4) {
            resultMessage.textContent = "Bom começo! Revise os conteúdos e tente novamente para melhorar sua pontuação.";
        } else {
            resultMessage.textContent = "Continue estudando! Aprender a identificar ameaças é essencial para navegar com mais segurança.";
        }
    }

    function startQuiz() {
        stopTimer();
        currentQuestion = 0;
        score = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        remainingTime = questionTime;
        totalTime = 0;
        questionAnswered = false;

        updateScore();
        quizStart.hidden = true;
        quizResults.hidden = true;
        quizGame.hidden = false;
        showQuestion();
    }

    function goToNextQuestion() {
        if (!questionAnswered) return;

        currentQuestion += 1;

        if (currentQuestion >= questions.length) {
            showResults();
            return;
        }

        showQuestion();
    }

    if (startButton) {
        startButton.addEventListener("click", startQuiz);
    }

    if (nextButton) {
        nextButton.addEventListener("click", goToNextQuestion);
    }

    if (restartButton) {
        restartButton.addEventListener("click", startQuiz);
    }
});

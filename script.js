document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const btnDecrease = document.getElementById('btn-decrease');
    const btnIncrease = document.getElementById('btn-increase');
    const charCountEl = document.getElementById('char-count');
    
    const chkUppercase = document.getElementById('chk-uppercase');
    const chkLowercase = document.getElementById('chk-lowercase');
    const chkNumbers = document.getElementById('chk-numbers');
    const chkSymbols = document.getElementById('chk-symbols');
    
    const strengthIndicator = document.getElementById('strength-indicator');
    const passwordOutput = document.getElementById('password-output');
    const btnGenerate = document.getElementById('btn-generate');

    // Configuração inicial
    let passwordLength = 12;

    // Listas de caracteres
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Eventos para aumentar e diminuir tamanho
    btnDecrease.addEventListener('click', () => {
        if (passwordLength > 4) {
            passwordLength--;
            charCountEl.textContent = passwordLength;
            generatePassword();
        }
    });

    btnIncrease.addEventListener('click', () => {
        if (passwordLength < 64) {
            passwordLength++;
            charCountEl.textContent = passwordLength;
            generatePassword();
        }
    });

    // Eventos de alteração nas opções e cliques
    [chkUppercase, chkLowercase, chkNumbers, chkSymbols].forEach(checkbox => {
        checkbox.addEventListener('change', generatePassword);
    });

    btnGenerate.addEventListener('click', generatePassword);

    // Função principal de geração de senha
    function generatePassword() {
        let availableChars = '';
        let typesCount = 0;

        if (chkUppercase.checked) {
            availableChars += uppercaseChars;
            typesCount++;
        }
        if (chkLowercase.checked) {
            availableChars += lowercaseChars;
            typesCount++;
        }
        if (chkNumbers.checked) {
            availableChars += numberChars;
            typesCount++;
        }
        if (chkSymbols.checked) {
            availableChars += symbolChars;
            typesCount++;
        }

        // Se nenhuma opção estiver marcada, avisa o usuário e limpa o campo
        if (availableChars === '') {
            passwordOutput.value = 'Selecione pelo menos uma opção!';
            updateStrength(0);
            return;
        }

        let generatedPassword = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            generatedPassword += availableChars[randomIndex];
        }

        passwordOutput.value = generatedPassword;
        evaluateStrength(generatedPassword, typesCount);
    }

    // Função para avaliar a força da senha de acordo com o tamanho e tipos usados
    function evaluateStrength(password, typesCount) {
        let score = 0;
        
        // Critério por tamanho
        if (password.length >= 12) score += 2;
        else if (password.length >= 8) score += 1;
        
        // Critério por diversidade de tipos
        if (typesCount >= 4) score += 2;
        else if (typesCount >= 3) score += 1;

        // Determinação do status
        if (password.length < 6 || score <= 1) {
            updateStrength('weak');
        } else if (score === 2 || score === 3) {
            updateStrength('medium');
        } else {
            updateStrength('strong');
        }
    }

    // Atualiza visualmente a caixa de força
    function updateStrength(status) {
        strengthIndicator.className = 'strength-box'; // Limpa classes
        
        if (status === 'weak') {
            strengthIndicator.classList.add('strength-weak');
            strengthIndicator.textContent = 'Fraca';
        } else if (status === 'medium') {
            strengthIndicator.classList.add('strength-medium');
            strengthIndicator.textContent = 'Média';
        } else if (status === 'strong') {
            strengthIndicator.classList.add('strength-strong');
            strengthIndicator.textContent = 'Forte';
        } else {
            strengthIndicator.style.backgroundColor = '#666';
            strengthIndicator.textContent = '---';
        }
    }

    // Executa a primeira geração ao carregar a página
    generatePassword();
});

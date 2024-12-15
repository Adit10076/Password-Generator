
const inputSlider = document.getElementById('LenSlider');
const passlen = document.getElementById('lenPass');
const strengthColor = document.getElementById('circle');
const upperCaseCheck = document.getElementById('upper');
const lowerCaseCheck = document.getElementById('lower');
const NumCheck = document.getElementById('number');
const symCheck = document.getElementById('symbol');
const ans = document.getElementById('Pass-Ans');
const passwordDisplay = document.getElementById('password');

let password = '';
let passLen = 10;
inputSlider.value = passLen;
passlen.textContent = passLen;

function handSlider() {
    passLen = inputSlider.value;
    passlen.innerText = passLen;
}

function strengthDisplay(color = '#FFFFFF') {
    strengthColor.style.backgroundColor = color;
}

function genRandText(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandNumber() {
    return String.fromCharCode(genRandText(48, 58)); // Numbers (0-9)
}

function getLowercase() {
    return String.fromCharCode(genRandText(97, 123)); // Lowercase letters (a-z)
}

function genUppercase() {
    return String.fromCharCode(genRandText(65, 91)); // Uppercase letters (A-Z)
}

function genSymbol() {
    const symbols = "!@#$%^&*()_+[]{}|;:',.<>?/`~";
    return symbols[genRandText(0, symbols.length)];
}

function setStrength() {
    let hasUpper = upperCaseCheck.checked;
    let hasLower = lowerCaseCheck.checked;
    let hasNum = NumCheck.checked;
    let hasSym = symCheck.checked;

    if (hasUpper && hasLower && hasNum && hasSym && passLen >= 6) {
        strengthDisplay('#00FF00'); // Strong
    } else if ((hasUpper || hasLower || hasNum || hasSym) && passLen > 6) {
        strengthDisplay('#FFFF00'); // Medium
    } else {
        strengthDisplay('#FF0000'); // Weak
    }
}

async function copy() {
    await navigator.clipboard.writeText(copyText);
}

function genPass() {
    let funcArr = [];
    if (upperCaseCheck.checked) funcArr.push(genUppercase);
    if (lowerCaseCheck.checked) funcArr.push(getLowercase);
    if (NumCheck.checked) funcArr.push(getRandNumber);
    if (symCheck.checked) funcArr.push(genSymbol);

    if (funcArr.length === 0) {
        passwordDisplay.innerText = "Select at least one option!";
        strengthDisplay('#FF0000');
        return;
    }

    let str = "";
    for (let i = 0; i < funcArr.length; i++) {
        str += funcArr[i]();
    }
    for (let i = 0; i < passLen - funcArr.length; i++) {
        let randInd = genRandText(0, funcArr.length);
        str += funcArr[randInd]();
    }

    // Shuffle the string
    let arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    password = arr.join('');
    passwordDisplay.innerText = password;
    copyText = password;
    setStrength();
}

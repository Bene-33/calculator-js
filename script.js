const displayInput = document.querySelector('#inputDisplay');
const displaySolution = document.querySelector('#solutionDisplay');
const numberButton = document.querySelectorAll('.number');
const calculate = document.querySelector('#equal');
const divideButton = document.querySelector('#operatorDivide');
const timesButton = document.querySelector('#operatorTimes');
const substractButton = document.querySelector('#operatorSubstract');
const addButton = document.querySelector('#operatorAdd');
const acButton = document.querySelector('#acButton');
const backButton = document.querySelector('#backButton');
const decimalButton = document.querySelector('#dot');
let numberArray1 = [];
let numberArray2 = [];
let number1 = "";
let number2 = "";
let operator = "";
let solution = "";

function updateDisplay(){
    displayInput.textContent = number1 + operator + number2;
}

//reset everything and start with a fresh calculation
acButton.addEventListener('click', () => {
    number1 = "";
    number2 = "";
    operator = "";
    numberArray1 = [];
    numberArray2 = [];
    solution = "";
    displaySolution.textContent = "";
    updateDisplay();
});

//reset everything and start with a fresh calculation with keyinput
document.addEventListener('keydown', (event) => {
    if(event.key === "Escape"){
        number1 = "";
        number2 = "";
        operator = "";
        numberArray1 = [];
        numberArray2 = [];
        solution = "";
        displaySolution.textContent = "";
        updateDisplay();
    };
});

//delete the last input in the array
backButton.addEventListener('click', () => {
    if(number1 !== "" & number2 === ""){
        numberArray1.pop();
        number1 = numberArray1.join("");
        updateDisplay();
    }
    else if(number2 !== ""){
        numberArray2.pop(); 
        number2 = numberArray2.join("");
        updateDisplay();
    };
});

//delete the last input with key input
document.addEventListener('keydown', (event) => {
    if(number1 !== "" & number2 === ""){
        if(event.key === 'Backspace' || event.key === "Delete"){
            numberArray1.pop();
            number1 = numberArray1.join("");
            updateDisplay();
        }
    }
    else if(number2 !== ""){
        if(event.key === 'Backspace' || event.key === "Delete"){
            numberArray2.pop(); 
            number2 = numberArray2.join("");
            updateDisplay();
        }
    };
});

// define number of the calculation
for(let i = 0; i < numberButton.length; i++){
    numberButton[i].addEventListener('click', () => {
        if(operator === ""){
            numberArray1.push(numberButton[i].textContent);
            number1 = numberArray1.join("");
            updateDisplay();
        }
        else if(operator !== ""){
            numberArray2.push(numberButton[i].textContent);
            number2 = numberArray2.join("");
            updateDisplay();
        };
    });
};

//key input Numbers
document.addEventListener('keydown', (event) => {
    if(operator === ""){
        if(event.key >= '0' && event.key <= '9'){
            numberArray1.push(event.key);
            number1 = numberArray1.join("");
            updateDisplay();
        }
    }  
    else if(operator !== ""){
        if(event.key >= '0' && event.key <= '9'){
            numberArray2.push(event.key);
            number2 = numberArray2.join("");
            updateDisplay();
        }
    }   
});

//add decimal point to numbers
decimalButton.addEventListener('click', () => {
    if(operator === "" &! numberArray1.includes(".")){
        numberArray1.push(decimalButton.textContent);
        number1 = numberArray1.join("");
        updateDisplay();
    }
    else if (operator !=="" &! numberArray2.includes(".")){
        numberArray2.push(decimalButton.textContent);
        number2 = numberArray2.join("");
        updateDisplay();
    }
}); 

//add decimal point to numbers with keyinput
document.addEventListener('keydown', (event) => {
    if(event.key === "," || event.key === "."){
        if(operator === "" &! numberArray1.includes(".")){
                numberArray1.push(".");
                number1 = numberArray1.join("");
                updateDisplay();
            }
        else if (operator !=="" &! numberArray2.includes(".")){
            numberArray2.push(".");
            number2 = numberArray2.join("");
            updateDisplay();
        }
    };
});

//update operator variable
divideButton.addEventListener('click', () => {
    if(number1 !== "" & operator !== "" & number2 !== ""){
        operate(number1, number2, operator);
        number1 = solution;
        operator = "/";
        displaySolution.textContent = solution;
    }
    else{
    operator = "/";
    updateDisplay();
    };
});

timesButton.addEventListener('click', () => {
    if(number1 !== "" & operator !== "" & number2 !== ""){
        operate(number1, number2, operator);
        number1 = solution;
        operator = "*";
        displaySolution.textContent = solution;
    }
    else{
    operator = "*";
    updateDisplay();
    };
});

substractButton.addEventListener('click', () => {
    if(number1 !== "" & operator !== "" & number2 !== ""){
        operate(number1, number2, operator);
        number1 = solution;
        operator = "-";
        displaySolution.textContent = solution;
    }
    else{
    operator = "-";
    updateDisplay();
    };
});

addButton.addEventListener('click', () => {
    if(number1 !== "" & operator !== "" & number2 !== ""){
        operate(number1, number2, operator);
        number1 = solution;
        operator = "+";
        displaySolution.textContent = solution;
    }
    else{
    operator = "+";
    updateDisplay();
    };
});

// operator key input
document.addEventListener('keydown', (event) => {
    if(number1 !== "" & operator !== "" & number2 !== ""){
        if(event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/'){
            operate(number1, number2, operator);
            number1 = solution;
            operator = event.key;
            displaySolution.textContent = solution;
        }}
    else{
        if(event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/'){
            operator = event.key;
            updateDisplay();
        }};
});

//calculation functions
function add(x, y) {
    solution = Math.round((parseFloat(x) + parseFloat(y))*100)/100
    number1 = solution;
    number2 = "";
    operator = "";
    numberArray2 = [];
};

function substract(x, y) {
    solution = Math.round((parseFloat(x) - parseFloat(y))*100)/100;
    number1 = solution;
    number2 = "";
    operator = "";
    numberArray2 = [];
};

function multiply(x,y){
    solution = Math.round((parseFloat(x) * parseFloat(y))*100)/100;
    number1 = solution;
    number2 = "";
    operator = "";
    numberArray2 = [];
};

function divide(x,y){
    if(parseInt(y) === 0){
        solution = "error"
        alert("you can not divide with '0'")
    }
    else{
        solution = Math.round((parseFloat(x) / parseFloat(y))*100)/100;
        number1 = solution;
        number2 = "";
        operator = "";
        numberArray2 = [];
    }
};

// make the calculation
function operate(num1, num2, operator) {
    if (operator === '+' ) {
        return add(num1, num2);
    }
    else if (operator === '-') {
        return substract(num1, num2);
    }
    else if (operator === '*' ) {
        return multiply(num1, num2);
    }
    else if (operator === '/' ) {
        return divide(num1, num2);
    }
    else {
        return "error"
    }
};

calculate.addEventListener('click', () => {
    if(number1 === ""){
        number1 = 0;
    }
    operate(number1, number2, operator)
    displaySolution.textContent = solution;
});

//calculate with key Input
document.addEventListener('keydown', (event) => {
    if(event.key === "Enter"){
        if(number1 === ""){
            number1 = 0;
        }
        operate(number1, number2, operator)
        displaySolution.textContent = solution;
    }
});
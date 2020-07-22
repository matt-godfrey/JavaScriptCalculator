
window.addEventListener('load', function() {
const allBtns = document.querySelectorAll('.button')
const numBtns = document.querySelectorAll(`[data-number]`)
const operationBtns = document.querySelectorAll(`[data-operand]`)
const equalsBtn = document.querySelector(`[data-equals]`)
const clearAllBtn = document.querySelector(`[data-clear]`)
const display = document.querySelector(`[data-display]`)
const inputDisplay = document.querySelector(`[data-inputDisplay]`)
const deleteBtn = document.querySelector(`[data-delete]`)


let prevValue = "";
let currentValue = "";
let result = "";
let operator = "";
let operatorHistory = "";


function numToString(num) {
    return num.toString()
}

function stringToNum(num) {
    return parseFloat(num)
}

function handleNum(num) {
    if (currentValue.length >= 15) {
        return
    }
   
   if (currentValue === "" && prevValue === "") {
        
        currentValue = "";
        }
    
  
    if (inputDisplay.textContent === "0" && num === "0") {
        return
    } 
    if (num == "." && currentValue.includes(".")) {
        return
    } 
    if (result != "" && operator === "") {
        clearAll();
    }
    
    
    currentValue += num;
    console.log("prevValue = " + prevValue, "currentValue = " + currentValue, "result = " + result)
    console.log(inputDisplay.textContent.length)
}

  function deleteValue() {
      let lastButtonPressed = inputDisplay.textContent[inputDisplay.textContent.length -1]

        for (let button of numBtns) {
            if (lastButtonPressed === button.textContent) {
                inputDisplay.textContent = inputDisplay.textContent.slice(0, -1);
                currentValue = numToString(currentValue.slice(0, -1));
                result = "";
            }
        }
     }
  function clearAll() {
  display.textContent = "0";
  inputDisplay.textContent = "0";
  prevValue = "";
  currentValue = "";
  result = ""
  operator = "";
};
   
function handleOperation(operation) {
      
    if (display.textContent == "0" && operation == "-") {
        prevValue = 0;
        currentValue = -currentValue
    }
    if (prevValue == "0" && currentValue != "" && operator == "-") {
            result = stringToNum(prevValue) - stringToNum(currentValue)
            currentValue = result;
        }
    if (!isNaN(result) && prevValue != "") {
        
        calculate();
   
    }
            operatorHistory += operation
            operator = operatorHistory[operatorHistory.length - 1];
           
            prevValue = currentValue;
            currentValue = "";
           };

function calculate() {
    prevValue = parseFloat(prevValue);
    currentValue = parseFloat(currentValue);
    
    switch(operator) {
    

                 case "/":
                    result = prevValue / currentValue;
                    break;
                case "*":
                    result = prevValue * currentValue;
                    break;
                case "+": 
                    result = prevValue + currentValue;
                    break;
                case "-":
                    result = prevValue - currentValue;
                    break;
                default: return
                    break;
                    
            }
            if (isNaN(result) && result != "") {
                prevValue = parseFloat(inputDisplay.textContent);
                currentValue = parseFloat(display.textContent);
                return
            } else {
        display.textContent = numToString(result);
        currentValue = result;
        
        // result = "";
        operator = "";
            }      
    }


function updateDisplay(button) {
   
    if (currentValue.length >= 15) {
        return
    }
    if (inputDisplay.textContent.length >= 60) {
        return
    }
    if (inputDisplay.textContent == "0" && button.textContent == "0") {
        return
    } 
    
    if (button.textContent == "." && display.textContent.includes(".")) {
        return
    }   
    if (inputDisplay.textContent == "0" && Object.values(numBtns).includes(button)) {
        inputDisplay.textContent = "";
    }
if (Object.values(operationBtns).includes(button) || Object.values(numBtns).includes(button) || Object.values(equalsBtn).includes(button)) {
    inputDisplay.textContent += button.textContent;
}
if (currentValue) {
    display.textContent = numToString(currentValue);
}

}


equalsBtn.addEventListener("click", function() {
   
    if (isNaN(parseFloat(result)) && operatorHistory.length > 1 && operatorHistory[operatorHistory.length - 1] == "-") {
        operator = operatorHistory[operatorHistory.length - 2];
        inputDisplayValues = inputDisplay.textContent.match(/\d+/g)
        prevValue = parseFloat(prevValue);
        currentValue = -currentValue;
        }
    else if (isNaN(parseFloat(result)) && operatorHistory.length > 1) {
        operator = operatorHistory[operatorHistory.length - 1];
        prevValue = inputDisplay.textContent.match(/\d+/g)
        currentValue = parseFloat(display.textContent);
        result = "";
        }
    calculate()
    operatorHistory = "";
    });

clearAllBtn.addEventListener("click", function() {
    clearAll()
     
});
    
deleteBtn.addEventListener('click', function() {
    deleteValue();
})
    for (let button of numBtns) {
        button.addEventListener("click", function(event) {
            let numButton = event.target.textContent
            
            handleNum(numButton)
        }      
    )}

    for (let button of operationBtns) {
        button.addEventListener("click", function(event) {
            let operationButton = event.target.textContent;
            handleOperation(operationButton)
            
            }
    )}
            
    for (let button of allBtns) {
        button.addEventListener("click", function(event) {
            let buttonPressed = event.target.textContent;

            updateDisplay(button)

        
            }
    )}
  
});




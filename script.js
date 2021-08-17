class Calculator{
    constructor(prevOperandTextElement, currOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement
        this.currOperandTextElement = currOperandTextElement
        this.clear()
    }

    clear(){
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currOperand = this.currOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currOperand === '') return
        if (this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    compute(){
        let computate
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.operation){
            case '+':
                computate = prev+curr
                break
            case '-':
                computate = prev-curr
                break
            case '÷':
                computate = prev/curr
                break
            case '*':
                computate = prev*curr
                break     
            default:
                return
        }
        this.currOperand = computate
        this.operation = undefined
        this.prevOperand = ''
    }
    
     getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

    updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const acButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const prevOperandTextElement = document.querySelector('[data-previous-operand]')
const currOperandTextElement = document.querySelector('[data-current-operand]')

 const calculator = new Calculator(prevOperandTextElement, currOperandTextElement)

 numberButton.forEach(button => {
     button.addEventListener('click', () => {
         calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
     })
 }) 

 operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
       calculator.updateDisplay()
    })
}) 

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

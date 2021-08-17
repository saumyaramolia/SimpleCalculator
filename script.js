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
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
        if (this.prevOperand !== ''){
            this.compute()
        }
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
            case 'x':
                computate = prev*curr
                break     
            default:
                return
        }
        this.currOperand = computate
        this.operation = undefined
        this.prevOperand = ''
    }

    updateDisplay(){
        this.currOperandTextElement.innerText = this.currOperand
        this.prevOperandTextElement.innerText = this.prevOperand
    }
}


const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const AcButton = document.querySelector('[data-all-clear]')
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

AcButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
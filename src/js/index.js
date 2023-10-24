let passwordLength = 8
const inputEl = document.querySelector('#password')
const upperCaseCheckEl = document.querySelector('#uppercase-check')
const numberCheckEl = document.querySelector('#number-check')
const symbolCheckEl = document.querySelector('#symbol-check')
const passwordLengthTextEl = document.querySelector('#password-lenght-text')
const securityIndicatorBarEl = document.querySelector('#security-indicator-bar')
const renewButtonEl = document.querySelector('.renew')
const copyButtonEl = document.querySelector('#copy-password')

function generatePassword() {
    let chars = 'abcdefghijklmnopqrstuvwxyz'

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberChars = '123456789'
    const symbolChars = '?!@&*[]()'

    if(upperCaseCheckEl.checked){chars += upperCaseChars}
    if(numberCheckEl.checked){chars += numberChars}
    if(symbolCheckEl.checked){chars += symbolChars}

    let password = ''

    for (i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    inputEl.value = password

    qualityCalculator()
}

function qualityCalculator(){
    const percentage = Math.round(((passwordLength/64))* 25 + (upperCaseCheckEl.checked? 15 : 0) + (numberCheckEl.checked? 25 : 0) + (symbolCheckEl.checked? 35 : 0))
    securityIndicatorBarEl.style.width = `${percentage}%`

    if(percentage >= 70){
        securityIndicatorBarEl.classList.add('safe')
    }else if( percentage >= 30){
        securityIndicatorBarEl.classList.add('warning')
        securityIndicatorBarEl.classList.remove('safe')
    }else {
        securityIndicatorBarEl.classList.add('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('safe')

    }

}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}


const passwordLengthEl = document.querySelector('#password-lenght')
passwordLengthEl.addEventListener('input', () => {
    passwordLength = passwordLengthEl.value
    passwordLengthTextEl.innerHTML = passwordLength
    generatePassword()
})

upperCaseCheckEl.addEventListener('click',generatePassword)
numberCheckEl.addEventListener('click',generatePassword)
symbolCheckEl.addEventListener('click',generatePassword)
copyButtonEl.addEventListener('click', copy)
renewButtonEl.addEventListener('click', generatePassword)







generatePassword()

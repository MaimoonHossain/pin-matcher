const generateBtn = document.getElementById('generatePin')
const generateInput = document.getElementById('generateInput')
const btnInput = document.getElementById('btnInput')
const btn = document.querySelectorAll('.calc-body .button')
const submitPin = document.querySelector('.input-section .submit-btn')
const submitAttempt = document.querySelector('.input-section .action-left')
const matched = document.querySelector('.notify-section .matched')
const notMatched = document.querySelector('.notify-section .notmatched')

let number = 0
let pinSubmit = 0
let attempt = 3

generateBtn.addEventListener('click', pinGenerated)
btn.forEach((btn) => {
  btn.addEventListener('click', numberInput)
})
submitPin.addEventListener('click', verifyPin)

function pinGenerated() {
  number = Math.floor(1000 + Math.random() * 9000)
  generateInput.value = number
  // generateInput.disabled = true
  generateInput.classList.add('active')
  btnInput.focus()
  btnInput.value = ''
}

function numberInput(e) {
  const { innerText: btnLabel } = e.target
  btnInput.disabled = true

  if (btnLabel === '<') {
    btnInput.value = btnInput.value.slice(0, -1)
  } else if (btnLabel === 'C') {
    btnInput.value = ''
  } else {
    if (btnInput.value.length < 4) {
      btnInput.value += btnLabel
      pinSubmit = parseInt(btnInput.value)
    }
  }
}

function verifyPin() {
  btnInput.value = ''
  btnInput.blur()

  if (number > 0 && pinSubmit > 0) {
    attempt--

    if (number !== pinSubmit) {
      pinSubmit = 0
      submitAttempt.innerHTML = `Attempt left ${attempt}`
      submitAttempt.style.color = '#ff3c5f'

      notMatched.classList.add('active')
      setTimeout(() => {
        notMatched.classList.toggle('active')
      }, 3000)
    }
  }
  if (attempt === 0) {
    submitPin.disabled = true
  }
  if (number > 0 && number === pinSubmit) {
    number = 0
    pinSubmit = 0
    attempt = 3

    generateInput.value = number
    generateInput.disabled = false
    generateInput.classList.remove('active')
    btnInput.disabled = false
    btnInput.value = ''

    submitAttempt.innerHTML = `Attempt left ${attempt}`

    matched.classList.add('active')
    setTimeout(() => {
      matched.classList.toggle('active')
    }, 3000)
  }
}

// const keys = calculator.querySelector('.calculator__keys')

// keys.addEventListener('click', (e) => {
//   if (e.target.matches('button')) {
//     console.log('btn is clicked')
//   }
// })

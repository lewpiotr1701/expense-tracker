const balance = document.querySelector('#balance')
const income = document.querySelector('#income')
const expense = document.querySelector('#expense')

const list = document.querySelector('#list')

const form = document.querySelector('form')
const description = document.querySelector('#description')
const amount = document.querySelector('#amount')

const dummyTransactions = [
  { id: 1, description: 'Flower', amount: -20 },
  { id: 2, description: 'Salary', amount: 300 },
  { id: 3, description: 'Book', amount: -10 },
  { id: 4, description: 'Camera', amount: 150 }
]

let transactions = dummyTransactions

// Add transactions to DOM List
function addTransactionToDOM(transaction) {
  // Get sign of transaction
  const sign = transaction.amount < 0 ? '-' : '+'

  const item = document.createElement('li')

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `
    ${transaction.description}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn">x</button>
  `

  // Append new created item to list
  list.appendChild(item)
}

// Init app
function init() {
  list.innerHTML = ''

  transactions.forEach(addTransactionToDOM)
}

init()
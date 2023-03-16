const balance = document.querySelector('#balance')
const income = document.querySelector('#income')
const expense = document.querySelector('#expense')
const list = document.querySelector('#list')
const form = document.querySelector('form')
const description = document.querySelector('#description')
const amount = document.querySelector('#amount')

// const dummyTransactions = [
//   { id: 1, description: 'Flower', amount: -20 },
//   { id: 2, description: 'Salary', amount: 300 },
//   { id: 3, description: 'Book', amount: -10 },
//   { id: 4, description: 'Camera', amount: 150 }
// ]

// Get transactions from local storage
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorageTransactions !== null ? localStorageTransactions : []


// Event listeners
form.addEventListener('submit', addTransaction)


// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (description.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter a description and amount')
  } else {
    const transaction = {
      id: generateID(),
      description: description.value,
      amount: +amount.value
    }

    transactions.push(transaction)

    addTransactionToDOM(transaction)

    updateValues()

    updateLocalStorage()

    description.value = ''
    amount.value = ''
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 1000000)
}

// Add transactions to DOM list
function addTransactionToDOM(transaction) {
  // Get sign of transaction
  const sign = transaction.amount < 0 ? '-' : '+'

  const item = document.createElement('li')

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `
    ${transaction.description}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `

  // Append new created item to list
  list.appendChild(item)
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id)

  updateLocalStorage()

  init()
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount)

  const totalAmount = amounts.reduce((acc, item) => acc + item, 0).toFixed(2)

  const totalIncome = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2)
  const totalExpense = Math.abs(amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0)).toFixed(2)

  balance.innerHTML = `$${totalAmount}`
  income.innerHTML = `$${totalIncome}`
  expense.innerHTML = `$${totalExpense}`
}

// Init app
function init() {
  list.innerHTML = ''

  transactions.forEach(addTransactionToDOM)
  updateValues()
}

init()
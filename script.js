let yourbalance = document.getElementById("balance");
let textInput = document.getElementById("text");
let amountInput = document.getElementById("amount");
let balance = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
let transactionForm = document.getElementById("transactionForm");
let transactionList = document.getElementById("transactionList");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let text = textInput.value.trim();
  let amount = +amountInput.value.trim();

  if (text === "" && amount === 0) {
    alert("Please enter a valid description and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    text,
    amount,
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  addTransactionDOM(transaction);
  updateSummary();
  textInput.value = "";
  amountInput.value = "";
});

function addTransactionDOM(transaction) {
  const sign = transaction.amount > 0 ? "+" : "-";

  const li = document.createElement("li");
  li.classList.add(transaction.amount > 0 ? "income" : "expense");
  li.innerHTML = `${transaction.text}<span>$${Math.abs(
    transaction.amount
  )}</span>
  <button onclick="deleteTransaction(${transaction.id})">x</button>
  `;
  transactionList.appendChild(li);
}

function updateSummary() {
  const amounts = transactions.map((t) => t.amount);
  const total = amounts.reduce((acc, num) => acc + num, 0).toFixed(2);
  const income = amounts
    .filter((num) => num > 0)
    .reduce((acc, num) => acc + num, 0)
    .toFixed(2);
  const expense = (
    amounts.filter((num) => num < 0).reduce((acc, num) => acc + num, 0) * -1
  ).toFixed(2);
  balance.innerText = `$${total}`;
  expenseEl.innerText = `$${expense}`;
  incomeEl.innerText = `$${income}`;
}

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  console.log(transactions);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  Init();
}
function Init() {
  transactionList.innerHTML = "";
  transactions.forEach(addTransactionDOM);

  updateSummary();
}

Init();

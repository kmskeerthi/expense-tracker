import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");
  const [transactions, setTransactions] = useState(() => {
  const savedTransactions = localStorage.getItem("transactions");

  return savedTransactions
    ? JSON.parse(savedTransactions)
    : [];
});

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = () => {
    if (text === "" || amount === "") {
      alert("Please enter description and amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      text: text,
      amount: Number(amount),
    };

    setTransactions([...transactions, newTransaction]);

    setText("");
    setAmount("");
  };
const deleteTransaction = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this transaction?"
  );

  if (confirmDelete) {
    setTransactions(
      transactions.filter((item) => item.id !== id)
    );
  }
};
useEffect(() => {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}, [transactions]);
  const income = transactions
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income + expense;

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
<div className="menu">
  <button
  className={page === "dashboard" ? "active" : ""}
  onClick={() => setPage("dashboard")}
>
  Dashboard
</button>

<button
  className={page === "add" ? "active" : ""}
  onClick={() => setPage("add")}
>
  Add Transaction
</button>

<button
  className={page === "history" ? "active" : ""}
  onClick={() => setPage("history")}
>
  History
</button>
</div>
{page === "dashboard" && (
<>
      <div className="balance-card">
        <h2>Balance</h2>
        <h3>₹{balance}</h3>
      </div>

      <div className="summary">
        <div className="income">
          <h3>Income</h3>
          <p>₹{income}</p>
        </div>

        <div className="expense">
          <h3>Expense</h3>
          <p>₹{Math.abs(expense)}</p>
        </div>
      </div>
      </>
       )}
       {page === "add" && (
      <>
      <div className="transaction-form">
        <h3>Add Transaction</h3>

        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <p>
          Positive = Income | Negative = Expense
        </p>

        <button onClick={addTransaction}>
          Add Transaction
        </button>
      </div>
       </>
       )}
        {page === "history" && (
       <>
      <div className="transaction-list">
        <h3>Transaction History</h3>
       {transactions.length === 0 ? (
          <p>No Transactions Yet</p>
        ) : (
          <ul>
  {transactions.map((item) => (
    <li key={item.id}>
      <span>
        {item.text} {item.amount > 0 ? "+" : "-"} ₹
        {Math.abs(item.amount)}
      </span>

      <button
  className="delete-btn"
  onClick={() => deleteTransaction(item.id)}
>
  Delete
</button>
    </li>
  ))}
</ul>
        )}
      </div>
      </>
        )}
    </div>
  );
}

export default App;
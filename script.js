let accounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];

function createAccount() {
    const accountNumber = Math.floor(100000 + Math.random() * 900000);
    const name = prompt("Enter account holder's name:");
    const initialBalance = parseFloat(prompt("Enter initial balance:"));
    
    if (name && !isNaN(initialBalance)) {
        accounts.push({
            accountNumber: accountNumber,
            name: name,
            balance: initialBalance,
            transactions: []
        });
        updateLocalStorage();
        showResult(`
            <div class="success">
                <h3>🎉 Account Created!</h3>
                <p>Account Number: <strong>${accountNumber}</strong></p>
                <p>Account Holder: <strong>${name}</strong></p>
                <p>Initial Balance: <strong>$${initialBalance.toFixed(2)}</strong></p>
            </div>
        `);
    } else {
        showResult(`
            <div class="error">
                <h3>❌ Creation Failed</h3>
                <p>Invalid input values provided</p>
            </div>
        `);
    }
}

// ... (keep the previous findAccount, deposit, withdraw functions)

function checkBalance() {
    const accountNumber = parseInt(document.getElementById('accountNumber').value);
    const account = findAccount(accountNumber);

    if (account) {
        showResult(`
            <div class="success">
                <h3>💰 Account Balance</h3>
                <p>Holder: <strong>${account.name}</strong></p>
                <p>Balance: <strong>$${account.balance.toFixed(2)}</strong></p>
            </div>
        `);
    } else {
        showError('Account not found!');
    }
}

function viewTransactions() {
    const accountNumber = parseInt(document.getElementById('accountNumber').value);
    const account = findAccount(accountNumber);
    const history = document.getElementById('transactionHistory');

    if (account) {
        let transactionsHTML = '<h3>📜 Transaction History</h3>';
        if (account.transactions.length === 0) {
            transactionsHTML += '<p>No transactions yet</p>';
        } else {
            transactionsHTML += account.transactions.map(trans => `
                <div class="transaction-item ${trans.includes('+') ? 'deposit' : 'withdrawal'}">
                    <span>${new Date().toLocaleString()}</span>
                    <strong>${trans}</strong>
                </div>
            `).join('');
        }
        history.innerHTML = transactionsHTML;
    } else {
        showError('Account not found!');
    }
}

function showResult(html) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = html;
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function showError(message) {
    showResult(`
        <div class="error">
            <h3>⚠️ Error</h3>
            <p>${message}</p>
        </div>
    `);
}

function updateLocalStorage() {
    localStorage.setItem('bankAccounts', JSON.stringify(accounts));
}

// Initialize account info display
document.getElementById('accountNumber').addEventListener('input', function(e) {
    const account = findAccount(parseInt(e.target.value));
    const infoDiv = document.getElementById('accountInfo');
    
    if (account) {
        infoDiv.innerHTML = `
            <div class="success">
                Account Holder: <strong>${account.name}</strong>
            </div>
        `;
    } else {
        infoDiv.innerHTML = '';
    }
});
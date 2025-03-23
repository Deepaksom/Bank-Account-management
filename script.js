let accounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];

// Create new account
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
        showResult(`Account created!<br>Account Number: ${accountNumber}`);
    } else {
        showError('Invalid input! Account not created.');
    }
}

// Deposit money
function deposit() {
    const accountNumber = getInputNumber('accountNumber');
    const amount = getInputNumber('amount');
    const account = findAccount(accountNumber);

    if (!account || !amount) return;

    account.balance += amount;
    account.transactions.push({
        type: 'deposit',
        amount: amount,
        date: new Date().toLocaleString()
    });
    updateLocalStorage();
    showResult(`Deposited $${amount}. New balance: $${account.balance}`);
}

// Withdraw money
function withdraw() {
    const accountNumber = getInputNumber('accountNumber');
    const amount = getInputNumber('amount');
    const account = findAccount(accountNumber);

    if (!account || !amount) return;
    
    if (account.balance >= amount) {
        account.balance -= amount;
        account.transactions.push({
            type: 'withdrawal',
            amount: amount,
            date: new Date().toLocaleString()
        });
        updateLocalStorage();
        showResult(`Withdrew $${amount}. New balance: $${account.balance}`);
    } else {
        showError('Insufficient funds!');
    }
}

// Check balance
function checkBalance() {
    const accountNumber = getInputNumber('accountNumber');
    const account = findAccount(accountNumber);
    
    if (account) {
        showResult(`Balance for ${account.name}: $${account.balance}`);
    } else {
        showError('Account not found!');
    }
}

// View transactions
function viewTransactions() {
    const accountNumber = getInputNumber('accountNumber');
    const account = findAccount(accountNumber);
    
    if (account) {
        const transactionsHTML = account.transactions.map(trans => `
            <div class="transaction">
                <span>${trans.date}</span>
                <strong>${trans.type}: $${trans.amount}</strong>
            </div>
        `).join('');
        
        showResult(`Transaction history for ${account.name}:${transactionsHTML}`);
    } else {
        showError('Account not found!');
    }
}

// Helper functions
function findAccount(accountNumber) {
    const account = accounts.find(acc => acc.accountNumber === accountNumber);
    if (!account) showError('Account not found!');
    return account;
}

function getInputNumber(elementId) {
    const value = parseFloat(document.getElementById(elementId).value);
    if (isNaN(value)) showError('Please enter valid numbers!');
    return value;
}

function updateLocalStorage() {
    localStorage.setItem('bankAccounts', JSON.stringify(accounts));
}

function showResult(message) {
    document.getElementById('result').innerHTML = `
        <div class="success">${message}</div>
    `;
}

function showError(message) {
    document.getElementById('result').innerHTML = `
        <div class="error">${message}</div>
    `;
}

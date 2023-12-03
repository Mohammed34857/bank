class AccountError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AccountError';
    }
}

class InsufficientFundsError extends AccountError {
    constructor() {
        super('رصيد غير كافٍ للسحب.');
    }
}

class InvalidAmountError extends AccountError {
    constructor() {
        super('يرجى إدخال مبلغ صحيح.');
    }
}

class AuthenticationError extends AccountError {
    constructor() {
        super('خطأ في المصادقة. يرجى تسجيل الدخول أولاً.');
    }
}

class BankAccount {
    constructor(accountHolder, initialBalance = 0) {
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }

    deposit(amount) {
        if (!this.isLoggedIn()) {
            throw new AuthenticationError();
        }

        if (amount <= 0 || isNaN(amount)) {
            throw new InvalidAmountError();
        }

        this.balance += amount;
        return `تم إيداع ${amount}، الرصيد الجديد: ${this.balance}`;
    }

    withdraw(amount) {
        if (!this.isLoggedIn()) {
            throw new AuthenticationError();
        }

        if (amount <= 0 || isNaN(amount)) {
            throw new InvalidAmountError();
        }

        if (amount > this.balance) {
            throw new InsufficientFundsError();
        }

        this.balance -= amount;
        return `تم سحب ${amount}، الرصيد الجديد: ${this.balance}`;
    }

    getBalance() {
        if (!this.isLoggedIn()) {
            throw new AuthenticationError();
        }

        return `حالة الحساب لـ ${this.accountHolder}: ${this.balance}`;
    }

    isLoggedIn() {
        
        return true;
    }
}

let account; // لتخزين الحساب الحالي

function openAccount() {
    let accountHolder = prompt("ادخل اسم صاحب الحساب:");
    account = new BankAccount(accountHolder);
    showMessage(`تم فتح حساب باسم: ${accountHolder}`);
}

function deposit() {
    try {
        showMessage(account.deposit(getValidAmount()));
    } catch (error) {
        showMessage(`خطأ: ${error.name} - ${error.message}`);
    }
}

function withdraw() {
    try {
        showMessage(account.withdraw(getValidAmount()));
    } catch (error) {
        showMessage(`خطأ: ${error.name} - ${error.message}`);
    }
}

function getValidAmount() {
    let amount = prompt("ادخل المبلغ:");
    if (isNaN(amount) || amount === null) {
        throw new InvalidAmountError();
    }
    return parseFloat(amount);
}

function showMessage(message) {
    document.getElementById('output').innerHTML = `<p>${message}</p>`;
}

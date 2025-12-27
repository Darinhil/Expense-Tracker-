// logout(Tim Tola)
if (!localStorage.getItem('userLogged')) {
    window.location.href = "../pages/login.html"
}
function logout() {
    localStorage.removeItem('userLogged');
    window.location.href = "../pages/login.html"
}
// logic seaction
const link_dashboard = document.getElementById('link-dashboard');
const link_transactions = document.getElementById('link-transactions');
const dashboard = document.getElementById('dashboard');
const transaction = document.getElementById('transaction');
function showView(seaction) {
    if (seaction === "dashboard") {
        dashboard.style.display = "block"
        transaction.style.display = "none";
        link_dashboard.className = "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_transactions.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    }
    else if (seaction === "transactions") {
        transaction.style.display = "block"
        dashboard.style.display = "none";
        link_transactions.className = "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_dashboard.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    }
}
// transaction (Tim Tola)
const transaction_form = document.getElementById('transaction-form');
const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
function saveTolocal() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
let editIndex = -1;
const date = document.getElementById('date');
const desc = document.getElementById('desc');
const category = document.getElementById('category');
const type = document.getElementById('type');
const amount = document.getElementById('amount');
transaction_form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (editIndex === -1) {
        transactions.push(
            {
                'date': date.value,
                'description': desc.value,
                'category': category.value,
                'type': type.value,
                'amount': amount.value
            }
        )
    }
    else {
        transactions[editIndex] = {
            'date': date.value,
            'description': desc.value,
            'category': category.value,
            'type': type.value,
            'amount': amount.value
        }
        editIndex = -1;
    }

    saveTolocal();
    renderItems();
    updateDashboard();
    date.value = "";
    desc.value = "";
    category.value = "";
    type.value = "";
    amount.value = "";
})
const transaction_list = document.getElementById('transaction-list');
function renderItems() {
    let transaction_row = "";
    transactions.forEach((tran, index) => {
        transaction_row += `
    <tr>
    <td style = "font-weight: 400;">${tran.date}</td>
    <td style = "font-weight: 400;">${tran.description}</td>
    <td style = "font-weight: 400;">${tran.category}</td>
    <td style="font-weight: 500; color: ${tran.type === 'Income' ? '#0763f7ff' : '#f80808ff'}; ">${tran.type}</td>
    <td style = "font-weight: 400;">$${tran.amount}</td>
    <td><button onclick="updateTran(${index})" style="background: lightblue;color: blue;font-weight: 500; width: 60px;hight:20px; border-radius: 2px;">Update</button>
    <button onclick="deleteTran(${index})" style="background: lightblue;color: red;font-weight: 500; width: 60px;hight:20px; border-radius: 2px;">Delete</button>
    </td>
    </tr>
    `
    });
    transaction_list.innerHTML = transaction_row;
}
function deleteTran(index) {
    if (window.confirm("Are you sure?")) {
        transactions.splice(index, 1)
        saveTolocal();
        renderItems();
        updateDashboard();
    }
}
function updateTran(index) {
    const tran = transactions[index]

    date.value = tran.date;
    desc.value = tran.description;
    category.value = tran.category;
    type.value = tran.type;
    amount.value = tran.amount;

    editIndex = index;
}


// Dashboard (Chem)


// Dashboard elements
const totalBalanceEl = document.getElementById('totalBalance');
const monthlyIncomeEl = document.getElementById('monthlyIncome');
const monthlyExpenseEl = document.getElementById('monthlyExpense');
const savingsRateEl = document.getElementById('savingsRate');

function updateDashboard() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let totalIncome = 0;
    let totalExpense = 0;
    let categoryTotals = {}; // For pie chart

    transactions.forEach(tran => {
        const tranDate = new Date(tran.date);
        const month = tranDate.getMonth();
        const year = tranDate.getFullYear();
        const amount = parseFloat(tran.amount);

        // Monthly only
        if (month === currentMonth && year === currentYear) {
            if (tran.type === "Income") totalIncome += amount;
            else if (tran.type === "Expense") {
                totalExpense += amount;
                // Count by category
                categoryTotals[tran.category] = (categoryTotals[tran.category] || 0) + amount;
            }
        }
    });

    const balance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

    totalBalanceEl.textContent = `$${balance.toFixed(2)}`;
    monthlyIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
    monthlyExpenseEl.textContent = `$${totalExpense.toFixed(2)}`;
    savingsRateEl.textContent = `${savingsRate}%`;

    updateCharts(categoryTotals, totalIncome, totalExpense);
}

// Showing the Pie chart and Bar chart
let spendingChart, overviewChart;

function updateCharts(categoryTotals, income, expense) {
    const ctx1 = document.getElementById('spendingChart').getContext('2d');
    const ctx2 = document.getElementById('overviewChart').getContext('2d');

    // Destroy old charts if exist
    if (spendingChart) spendingChart.destroy();
    if (overviewChart) overviewChart.destroy();

    // Pie Chart - Spending by Category
    spendingChart = new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: [
                    '#ff2d2dff', '#ffd012ff', '#157fffff', '#11ffa8ff', '#7243ffff'
                ],
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#ffffffff' }
                }
            }
        }
    });
    


    // Bar Chart - Monthly Overview
    overviewChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expense'],
            datasets: [{
                label: 'Amount',
                data: [income, expense],
                backgroundColor: ['#0763f7ff', '#f80808ff']
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: { color: '#e5e7eb' },
                    beginAtZero: true
                },
                x: {
                    ticks: { color: '#e5e7eb' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}





renderItems();
updateDashboard();
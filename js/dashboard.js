// logout
if (!localStorage.getItem('userLogged')) {
    window.location.href = "../pages/login.html"
}
function logout() {
    localStorage.removeItem('userLogged');
    window.location.href = "../pages/login.html"
}
// 

lucide.createIcons();

// SPA view switcher
function showView(viewId) {
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    document.getElementById(`link-${viewId}`).classList.add('active');
}

// LocalStorage helpers
function getIncomes() {
    return JSON.parse(localStorage.getItem('incomes') || '[]');
}
function saveIncomes(incomes) {
    localStorage.setItem('incomes', JSON.stringify(incomes));
}

// Modal controls
function openAddIncomeModal() { document.getElementById('incomeModal').classList.remove('hidden'); }
function closeAddIncomeModal() { document.getElementById('incomeModal').classList.add('hidden'); }

// Save income
function saveIncome() {
    const desc = document.getElementById('incomeDesc').value.trim();
    const amount = parseFloat(document.getElementById('incomeAmount').value);
    const type = document.getElementById('incomeType').value;

    if (!desc || isNaN(amount) || amount <= 0) {
        alert('Enter valid income details');
        return;
    }

    const newIncome = { id: Date.now(), desc, amount, type, date: new Date().toISOString() };
    const incomes = getIncomes();
    incomes.push(newIncome);
    saveIncomes(incomes);

    document.getElementById('incomeDesc').value = '';
    document.getElementById('incomeAmount').value = '';
    document.getElementById('incomeType').value = 'Salary';
    closeAddIncomeModal();

    updateDashboard();
}

// Update dashboard numbers
function updateDashboard() {
    const incomes = getIncomes();
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const expenses = 0;
    const totalBalance = totalIncome - expenses;
    const savingRate = totalIncome ? (((totalBalance) / totalIncome) * 100).toFixed(1) : 0;

    document.getElementById('monthlyIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('monthlyExpense').textContent = `$${expenses.toFixed(2)}`;
    document.getElementById('totalBalance').textContent = `$${totalBalance.toFixed(2)}`;
    document.getElementById('savingsRate').textContent = `${savingRate}%`;

    updateCharts(totalIncome, expenses);
}

// Update charts dynamically
function updateCharts(incomeTotal, expenseTotal) {
    const incomes = getIncomes();
    const incomeByType = {};
    incomes.forEach(i => incomeByType[i.type] = (incomeByType[i.type] || 0) + i.amount);

    const labels = Object.keys(incomeByType);
    const data = Object.values(incomeByType);

    spendingChart.data.labels = labels.length ? labels : ['No Income'];
    spendingChart.data.datasets[0].data = data.length ? data : [0];
    spendingChart.update();

    overviewChart.data.datasets[0].data = [incomeTotal];
    overviewChart.data.datasets[1].data = [expenseTotal];
    overviewChart.update();
}

// Chart contexts
const spendingChartCtx = document.getElementById('spendingChart').getContext('2d');
const overviewChartCtx = document.getElementById('overviewChart').getContext('2d');
let spendingChart, overviewChart;

// Initialize charts & dashboard
function initCharts() {
    spendingChart = new Chart(spendingChartCtx, {
        type: 'doughnut',
        data: { labels: [], datasets: [{ data: [], backgroundColor: ['#3b82f6', '#22d3ee', '#a855f7', '#eab308', '#f43f5e', '#10b981', '#6366f1', '#f97316', '#84cc16', '#14b8a6'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#9ca3af' } } } }
    });

    overviewChart = new Chart(overviewChartCtx, {
        type: 'bar',
        data: { labels: ['This Month'], datasets: [{ label: 'Income', data: [0], backgroundColor: '#22d3ee' }, { label: 'Expenses', data: [0], backgroundColor: '#f43f5e' }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } }, x: { ticks: { color: '#9ca3af' }, grid: { display: false } } }, plugins: { legend: { labels: { color: '#9ca3af' } } } }
    });

    updateDashboard();
}

// Run on load
initCharts();
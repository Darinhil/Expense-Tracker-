// logout(Tim Tola)
if (!localStorage.getItem("userLogged")) {
  window.location.href = "../pages/login.html";
}
function logout() {
  localStorage.removeItem("userLogged");
  window.location.href = "../pages/login.html";
}
// logic seaction(Tim Tola)
const greeting = document.getElementById("greeting");
greeting.textContent = "Wellcome " + localStorage.getItem("userLogged") + "!";
const link_dashboard = document.getElementById("link-dashboard");
const link_transactions = document.getElementById("link-transactions");
const link_budgets = document.getElementById("link-budgets");
const link_reports = document.getElementById("link-reports");
const link_savings = document.getElementById("link-savings");
const dashboard = document.getElementById("dashboard");
const transaction = document.getElementById("transaction");
const budget = document.getElementById("budget");
const savings = document.getElementById("savings");
function showView(seaction) {
<<<<<<< HEAD
    if (seaction === "dashboard") {
        dashboard.style.display = "block"
        transaction.style.display = "none";
        budget.style.display = "none";
        link_dashboard.className = "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_transactions.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_budgets.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_reports.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_savings.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    }
    else if (seaction === "transactions") {
        transaction.style.display = "block"
        dashboard.style.display = "none";
        budget.style.display = "none";
        link_transactions.className = "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_dashboard.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_budgets.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_reports.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_savings.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    }
    else if (seaction === "budgets") {
        budget.style.display = "block";
        dashboard.style.display = "none";
        transaction.style.display = "none";
        link_budgets.className = "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_dashboard.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_transactions.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_reports.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_savings.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    }
    else if (seaction === "reports") {
        link_reports.className = "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_budgets.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_dashboard.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_transactions.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_savings.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    }
    else {
        link_savings.className = "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_reports.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_budgets.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_dashboard.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_transactions.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    }
}
// transaction (Tim Tola)
const transaction_form = document.getElementById('transaction-form');
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
=======
  if (seaction === "dashboard") {
    dashboard.style.display = "block";
    transaction.style.display = "none";
    budget.style.display = "none";
    savings.style.display = "none";
    link_dashboard.className =
      "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_transactions.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_budgets.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_reports.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_savings.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
  } else if (seaction === "transactions") {
    transaction.style.display = "block";
    dashboard.style.display = "none";
    budget.style.display = "none";
    savings.style.display = "none";
    link_transactions.className =
      "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_dashboard.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_budgets.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_reports.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_savings.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
  } else if (seaction === "budgets") {
    budget.style.display = "block";
    dashboard.style.display = "none";
    transaction.style.display = "none";
    savings.style.display = "none";
    link_budgets.className =
      "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_dashboard.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_transactions.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_reports.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_savings.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
  } else if (seaction === "reports") {
    link_reports.className =
      "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_budgets.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_dashboard.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_transactions.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_savings.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
  } else {
    savings.style.display = "block";
    dashboard.style.display = "none";
    transaction.style.display = "none";
    budget.style.display = "none";
    link_savings.className =
      "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_reports.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_budgets.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_dashboard.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    link_transactions.className =
      "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
  }
}
// transaction (Tim Tola)
const transaction_form = document.getElementById("transaction-form");
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
>>>>>>> 4c49205b7546291533897178b29b2eefe52b5dc0
function saveTolocal() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
let editIndex = -1;
const date = document.getElementById("date");
const desc = document.getElementById("desc");
const category = document.getElementById("category");
const type = document.getElementById("type");
const amount = document.getElementById("amount");
transaction_form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (editIndex === -1) {
    transactions.push({
      date: date.value,
      description: desc.value,
      category: category.value,
      type: type.value,
      amount: amount.value,
    });
  } else {
    transactions[editIndex] = {
      date: date.value,
      description: desc.value,
      category: category.value,
      type: type.value,
      amount: amount.value,
    };
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
});
const transaction_list = document.getElementById("transaction-list");
function renderItems() {
  let transaction_row = "";
  transactions.forEach((tran, index) => {
    transaction_row += `
    <tr>
    <td style = "font-weight: 400;">${tran.date}</td>
    <td style = "font-weight: 400;">${tran.description}</td>
    <td style = "font-weight: 400;">${tran.category}</td>
    <td style="font-weight: 500; color: ${
      tran.type === "Income" ? "#0763f7ff" : "#f80808ff"
    }; ">${tran.type}</td>
    <td style = "font-weight: 400;">$${tran.amount}</td>
    <td><button onclick="updateTran(${index})" style="background: lightblue;color: blue;font-weight: 500; width: 60px;hight:20px; border-radius: 2px;">Update</button>
    <button onclick="deleteTran(${index})" style="background: lightblue;color: red;font-weight: 500; width: 60px;hight:20px; border-radius: 2px;">Delete</button>
    </td>
    </tr>
<<<<<<< HEAD
    `
    });
    transaction_list.innerHTML = transaction_row;
    transactions = JSON.parse(localStorage.getItem('transactions'));
=======
    `;
  });
  transaction_list.innerHTML = transaction_row;
>>>>>>> 4c49205b7546291533897178b29b2eefe52b5dc0
}
data_budget = renderItems();
function deleteTran(index) {
  if (window.confirm("Are you sure?")) {
    transactions.splice(index, 1);
    saveTolocal();
    renderItems();
    updateDashboard();
  }
}
function updateTran(index) {
  const tran = transactions[index];

  date.value = tran.date;
  desc.value = tran.description;
  category.value = tran.category;
  type.value = tran.type;
  amount.value = tran.amount;

  editIndex = index;
}
<<<<<<< HEAD
renderItems();
=======

>>>>>>> 4c49205b7546291533897178b29b2eefe52b5dc0
// Dashboard (Chem)

// Dashboard elements
const totalBalanceEl = document.getElementById("totalBalance");
const monthlyIncomeEl = document.getElementById("monthlyIncome");
const monthlyExpenseEl = document.getElementById("monthlyExpense");
const savingsRateEl = document.getElementById("savingsRate");

function updateDashboard() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let totalIncome = 0;
  let totalExpense = 0;
  let categoryTotals = {}; // For pie chart

  transactions.forEach((tran) => {
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
        categoryTotals[tran.category] =
          (categoryTotals[tran.category] || 0) + amount;
      }
    }
  });

  const balance = totalIncome - totalExpense;
  const savingsRate =
    totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  totalBalanceEl.textContent = `$${balance.toFixed(2)}`;
  monthlyIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
  monthlyExpenseEl.textContent = `$${totalExpense.toFixed(2)}`;
  savingsRateEl.textContent = `${savingsRate}%`;

  updateCharts(categoryTotals, totalIncome, totalExpense);
}

// Showing the Pie chart and Bar chart
let spendingChart, overviewChart;

function updateCharts(categoryTotals, income, expense) {
  const ctx1 = document.getElementById("spendingChart").getContext("2d");
  const ctx2 = document.getElementById("overviewChart").getContext("2d");

  // Destroy old charts if exist
  if (spendingChart) spendingChart.destroy();
  if (overviewChart) overviewChart.destroy();

  // Pie Chart - Spending by Category
  spendingChart = new Chart(ctx1, {
    type: "pie",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          data: Object.values(categoryTotals),
          backgroundColor: [
            "#ff2d2dff",
            "#ffd012ff",
            "#157fffff",
            "#11ffa8ff",
            "#7243ffff",
          ],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#ffffffff" },
        },
      },
    },
  });

  // Bar Chart - Monthly Overview
  overviewChart = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          label: "Amount",
          data: [income, expense],
          backgroundColor: ["#0763f7ff", "#f80808ff"],
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: { color: "#e5e7eb" },
          beginAtZero: true,
        },
        x: {
          ticks: { color: "#e5e7eb" },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });
}

<<<<<<< HEAD
// Live Search Feature
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function () {
    const keyword = searchInput.value.toLowerCase();

    // Filter transactions based on description, category, or amount
    const filteredTransactions = transactions.filter(tran => {
        return tran.description.toLowerCase().includes(keyword) ||
            tran.category.toLowerCase().includes(keyword) ||
            tran.amount.toString().includes(keyword) ||
            tran.date.toString().includes(keyword);
    });

    renderItemsFiltered(filteredTransactions);
});

// Separate render function for filtered results
function renderItemsFiltered(data) {
    let transaction_row = "";
    if (data.length === 0) {
        transaction_list.innerHTML = `<tr><td colspan="6" style="font-weight:400; text-align:center; color:gray;">No transactions found.</td></tr>`;
        return;
    }

    data.forEach((tran, index) => {
        transaction_row += `
        <tr>
        <td style = "font-weight: 400;">${tran.date}</td>
        <td style = "font-weight: 400;">${tran.description}</td>
        <td style = "font-weight: 400;">${tran.category}</td>
        <td style="font-weight: 500; color: ${tran.type === 'Income' ? '#0763f7ff' : '#f80808ff'}; ">${tran.type}</td>
        <td style = "font-weight: 400;">$${tran.amount}</td>
        <td>
            <button onclick="updateTran(${index})" style="background: lightblue;color: blue;font-weight: 500; width: 60px;hight:20px; border-radius: 2px;">Update</button>
            <button onclick="deleteTran(${index})" style="background: lightblue;color: red;font-weight: 500; width: 60px;hight:20px; border-radius: 2px;">Delete</button>
        </td>
        </tr>
        `;
    });

    transaction_list.innerHTML = transaction_row;
}
updateDashboard();


// budget(Tim Tola)
const add_category = document.getElementById('add-category');
const cancel_add_category = document.getElementById('cancel-add-category');
const addcard = document.getElementById('add-category-form');
const form_category = document.getElementById('submit-category');
const category_select = document.getElementById('category-select');
const budget_amount = document.getElementById('budget-amount');
const cards = document.getElementById('cards');

let budget_plan = JSON.parse(localStorage.getItem('budget_plan')) || [];
add_category.addEventListener('click', () => {
    add_category.style.display = "none";
    addcard.style.display = "block";
});

cancel_add_category.addEventListener('click', () => {
    addcard.style.display = "none";
    add_category.style.display = "block";
});

function saveBudgetplan() {
    localStorage.setItem('budget_plan', JSON.stringify(budget_plan));
}

form_category.addEventListener('submit', function (e) {
    e.preventDefault();
    let spent_food = 0;
    let spent_housing = 0;
    let spent_transportation = 0;
    let spent_entertainment = 0;
    for (let char of transactions) {
        if (char.category === "Food") {
            spent_food += parseInt(char.amount)
        }
        else if (char.category === "Housing") {
            spent_housing += parseInt(char.amount)
        }
        else if (char.category === "Transportation") {
            spent_transportation += parseInt(char.amount)
        }
        else {
            spent_entertainment += parseInt(char.amount)
        }
    }
    if (budget_amount.value > 0) {
        if (category_select.value === "Food") {
            budget_plan.push({
                category: category_select.value,
                budget_amount: Number(budget_amount.value),
                spent: spent_food
            });
        }
        else if (category_select.value === "Housing") {
            budget_plan.push({
                category: category_select.value,
                budget_amount: Number(budget_amount.value),
                spent: spent_housing
            });
        }
        else if (category_select.value === "Transportation") {
            budget_plan.push({
                category: category_select.value,
                budget_amount: Number(budget_amount.value),
                spent: spent_transportation
            });
        }
        else {
            budget_plan.push({
                category: category_select.value,
                budget_amount: Number(budget_amount.value),
                spent: spent_entertainment
            });
        }
    }
    else{
        window.alert('Budget amount must be positive!')
    }
    saveBudgetplan();
    loop_cards();

    category.value = "";
    budget_amount.value = "";

    addcard.style.display = "none";
    add_category.style.display = "block";
});

function getTransactions() {
    return JSON.parse(localStorage.getItem('transactions')) || [];
}

function calculateSpentByCategory(categoryName) {
    const transactions = getTransactions();
    return transactions
        .filter(tx => tx.category === categoryName && tx.type === "Expense")
        .reduce((sum, tx) => sum + Number(tx.amount), 0);
}

function render(item, index) {
    const spent = item.spent;
    const budget = item.budget_amount;
    const remaining = budget - spent;
    const percent = Math.min((spent / budget) * 100, 100);

    const card = document.createElement('div');
    card.className = "bg-[#24262d] p-6 rounded-xl border border-gray-800 shadow-xl";

    card.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-500 text-xl">
                    🍜
                </div>
                <div>
                    <h3 class="font-semibold">${item.category}</h3>
                    <p class="text-sm text-gray-400">Budget: $${budget.toFixed(2)}</p>
                </div>
            </div>

            <button class="delete-btn text-red-400 text-xs hover:text-red-600">
                ✖ Delete
            </button>
        </div>

        <div class="flex justify-between text-sm mb-2">
            <span>Spent: $${spent.toFixed(2)}</span>
            <span>Remaining: $${remaining.toFixed(2)}</span>
        </div>

        <div class="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-3">
            <div class="bg-pink-500 h-full transition-all duration-700"
                 style="width:${percent}%"></div>
        </div>

        <div class="flex justify-between text-[10px] text-gray-500 uppercase tracking-tight">
            <span>${percent.toFixed(0)}% of budget</span>
            <span>$${remaining.toFixed(2)} left</span>
        </div>
    `;

    // DELETE HANDLER
    card.querySelector('.delete-btn').addEventListener('click', () => {
        deleteCategory(index);
    });

    cards.appendChild(card);
}

function deleteCategory(index) {
    if (!confirm("Delete this category?")) return;

    budget_plan.splice(index, 1);
    saveBudgetplan();
    loop_cards();
}


function loop_cards() {
    cards.innerHTML = "";

    budget_plan.forEach((item, index) => {
        item.spent = calculateSpentByCategory(item.category);
        render(item, index);
    });
}

loop_cards();
// saving gaol(DARINHIL)

const STORAGE_KEY = "savingsGoals";

function openGoalModal(index = null) {
  document.getElementById("goalModal").classList.remove("hidden");
  document.getElementById("goalModal").classList.add("flex");

  if (index !== -1) {
    editIndex = index;
    const goals = getGoals();
    const goal = goals[index];

    document.getElementById("modalTitle").textContent = "Edit Savings Goal";
    document.getElementById("goalName").value = goal.name;
    document.getElementById("targetAmount").value = goal.target;
    document.getElementById("savedAmount").value = goal.saved;
    document.getElementById("targetDate").value = goal.date;
  } else {
    editIndex = -1;
    document.getElementById("modalTitle").textContent = "Add Savings Goal";
    document.getElementById("goalForm").reset();
  }
}

function closeGoalModal() {
  document.getElementById("goalModal").classList.add("hidden");
  document.getElementById("goalModal").classList.remove("flex");
}

function getGoals() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveGoals(goals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

function renderGoals() {
  const goals = getGoals();
  const container = document.getElementById("goalsContainer");
  container.innerHTML = "";

  if (goals.length === 0) {
    container.innerHTML =
      '<p class="text-gray-500 text-sm">No savings goals yet.</p>';
    return;
  }

  goals.forEach((goal, index) => {
    const percent = Math.min(Math.round((goal.saved / goal.target) * 100), 100);

    container.innerHTML += `
        <div class="bg-[#24262d] p-6 rounded-xl border border-gray-800 shadow-xl">
          <h3 class="font-bold text-lg text-gray-100">${goal.name}</h3>
          <p class="text-xs text-gray-500 mb-3">Target: $${goal.target}</p>

          <div class="flex justify-between text-sm mb-2">
            <span class="text-green-400 font-semibold">$${
              goal.saved
            } Saved</span>
            <span class="text-gray-400">$${goal.target - goal.saved} Left</span>
          </div>

          <div class="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-3">
            <div class="bg-green-500 h-full" style="width:${percent}%"></div>
          </div>

          <div class="flex justify-between text-[10px] text-gray-500 uppercase">
            <span>${percent}% Complete</span>
            <span>${goal.date}</span>
          </div>

          <div class="flex justify-between mt-4 text-sm">
            <button
              onclick="openGoalModal(${index})"
              class="text-blue-400 hover:text-blue-500"
            >Edit</button>
            <button
              onclick="deleteGoal(${index})"
              class="text-red-400 hover:text-red-500"
            >Delete</button>
          </div>
        </div>
      `;
  });
}

function deleteGoal(index) {
  const goals = getGoals();
  goals.splice(index, 1);
  saveGoals(goals);
  renderGoals();
}

document.getElementById("goalForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const goal = {
    name: goalName.value,
    target: Number(targetAmount.value),
    saved: Number(savedAmount.value),
    date: targetDate.value,
  };

  const goals = getGoals();

  if (editIndex !== null) {
    // Update existing goal
    goals[editIndex] = goal;
  } else {
    // Add new goal
    goals.push(goal);
  }

  saveGoals(goals);
  closeGoalModal();
  renderGoals();
  editIndex = null;
});

// Load goals on page start
renderGoals();
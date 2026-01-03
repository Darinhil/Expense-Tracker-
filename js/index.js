// By Tim Tola
// =================== LOGOUT ===================
if (!localStorage.getItem("userLogged")) {
  window.location.href = "../pages/login.html";
}
function logout() {
  localStorage.removeItem("userLogged");
  window.location.href = "../pages/login.html";
}

// =================== SIDEBAR & VIEWS ===================
const greeting = document.getElementById("greeting");
greeting.textContent = "Welcome " + localStorage.getItem("userLogged") + "!";

const link_dashboard = document.getElementById("link-dashboard");
const link_transactions = document.getElementById("link-transactions");
const link_budgets = document.getElementById("link-budgets");
const link_savings = document.getElementById("link-savings");

const dashboard = document.getElementById("dashboard");
const transaction = document.getElementById("transaction");
const budget = document.getElementById("budget");
const savings = document.getElementById("savings");

function showView(seaction) {
  dashboard.style.display = transaction.style.display = budget.style.display = savings.style.display = "none";
  link_dashboard.className = link_transactions.className = link_budgets.className = link_savings.className =
    "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";

  if (seaction === "dashboard") {
    dashboard.style.display = "block";
    link_dashboard.className += " active";
  } else if (seaction === "transactions") {
    transaction.style.display = "block";
    link_transactions.className += " active";
  } else if (seaction === "budgets") {
    budget.style.display = "block";
    link_budgets.className += " active";
  } else if (seaction === "savings") {
    savings.style.display = "block";
    link_savings.className += " active";
  }
}

// =================== TRANSACTIONS ===================
const transaction_form = document.getElementById("transaction-form");
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
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
      amount: Number(amount.value),
    });
  } else {
    transactions[editIndex] = {
      date: date.value,
      description: desc.value,
      category: category.value,
      type: type.value,
      amount: Number(amount.value),
    };
    editIndex = -1;
  }

  saveTolocal();
  renderItems();
  loop_cards(); // Update budgets when transactions change
  updateDashboard();
  date.value = desc.value = category.value = type.value = amount.value = "";
});

function saveTolocal() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

const transaction_list = document.getElementById("transaction-list");

function renderItems() {
  let transaction_row = "";
  transactions.forEach((tran, index) => {
    transaction_row += `
      <tr>
        <td style="font-weight:400">${tran.date}</td>
        <td style="font-weight:400">${tran.description}</td>
        <td style="font-weight:400">${tran.category}</td>
        <td style="font-weight:500; color:${tran.type === "Income" ? "#0763f7ff" : "#f80808ff"}">${tran.type}</td>
        <td style="font-weight:400">$${tran.amount}</td>
        <td>
          <button onclick="updateTran(${index})" style="background:lightblue;color:blue;font-weight:500;width:60px;height:20px;border-radius:2px;">Update</button>
          <button onclick="deleteTran(${index})" style="background:lightblue;color:red;font-weight:500;width:60px;height:20px;border-radius:2px;">Delete</button>
        </td>
      </tr>
    `;
  });
  transaction_list.innerHTML = transaction_row || `<tr><td colspan="6" style="text-align:center;color:gray;">No transactions yet.</td></tr>`;
}

function deleteTran(index) {
  if (confirm("Are you sure?")) {
    transactions.splice(index, 1);
    saveTolocal();
    renderItems();
    loop_cards(); // Update budgets after deletion
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

renderItems();

// =================== DASHBOARD ===================
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
  let categoryTotals = {};

  transactions.forEach((tran) => {
    const tranDate = new Date(tran.date);
    if (tranDate.getMonth() === currentMonth && tranDate.getFullYear() === currentYear) {
      const amt = Number(tran.amount);
      if (tran.type === "Income") totalIncome += amt;
      else if (tran.type === "Expense") {
        totalExpense += amt;
        categoryTotals[tran.category] = (categoryTotals[tran.category] || 0) + amt;
      }
    }
  });

  // Total saved in goals
  const goals = getGoals();
  const totalSavedGoals = goals.reduce((sum, goal) => sum + Number(goal.saved), 0);

  const availableBalance = totalIncome - totalExpense - totalSavedGoals;
  const savingsRate = totalIncome > 0 ? ((availableBalance / totalIncome) * 100).toFixed(1) : 0;

  totalBalanceEl.textContent = `$${availableBalance.toFixed(2)}`;
  monthlyIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
  monthlyExpenseEl.textContent = `$${totalExpense.toFixed(2)}`;
  savingsRateEl.textContent = `${savingsRate}%`;

  updateCharts(categoryTotals, totalIncome, totalExpense);
}
// By Khoeurn Chem
// =================== CHARTS ===================
let spendingChart, overviewChart;

function updateCharts(categoryTotals, income, expense) {
  const ctx1 = document.getElementById("spendingChart").getContext("2d");
  const ctx2 = document.getElementById("overviewChart").getContext("2d");
  const isMobile = window.innerWidth < 768; // if it Mobile

  if (spendingChart) spendingChart.destroy();
  if (overviewChart) overviewChart.destroy();

  spendingChart = new Chart(ctx1, {
    type: isMobile ? 'bar' : 'pie',
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{ data: Object.values(categoryTotals), backgroundColor: ["#ff2d2dff","#ffd012ff","#157fffff","#11ffa8ff","#7243ffff"], barPercentage: 0.8,  categoryPercentage: 1.0  }]
    },
    
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: isMobile ? { top: 20, bottom: 20 } : {}
      },
      plugins: {
        legend: {
          display: true,
          position: isMobile ? 'none' : 'left',
          labels: {
            font: { size: isMobile ? 10 : 14 },
            boxWidth: isMobile ? 10 : 20,
            padding: isMobile ? 8 : 20,
            usePointStyle: true
          }
        }
      },
      scales: isMobile ? {
        x: { ticks: { font: { size: 10 }, color: 'white' } },
        y: { ticks: { font: { size: 10 }, color: 'white' } }
      } : {}
    }
  });

  overviewChart = new Chart(ctx2, {
    type: "bar",
    data: { labels:["Income","Expense"], datasets:[{label:"Amount",data:[income,expense],backgroundColor:["#0763f7ff","#f80808ff"]}] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: isMobile ? { top: 20, bottom: 20 } : {}
      },
      plugins: {
        legend: {
          display: true,
          position: isMobile ? 'none' : 'none',
          labels: {
            font: { size: isMobile ? 10 : 14 },
            boxWidth: isMobile ? 10 : 20,
            padding: isMobile ? 8 : 20,
            usePointStyle: true
          }
        }
      },
      scales: isMobile ? {
        x: { ticks: { font: { size: 10 }, color: 'white' } },
        y: { ticks: { font: { size: 10 }, color: 'white' } }
      } : {}
    }
  });
}

// =================== SAVINGS GOALS ===================
const STORAGE_KEY = "savingsGoals";

function openGoalModal(index = null) {
  document.getElementById("goalModal").classList.remove("hidden");
  document.getElementById("goalModal").classList.add("flex");

  if (index !== -1 && index !== null) {
    editIndex = index;
    const goals = getGoals();
    const goal = goals[index];

    document.getElementById("modalTitle").textContent = "Edit Savings Goal";
    document.getElementById("goalName").value = goal.name;
    document.getElementById("targetAmount").value = goal.target;
    document.getElementById("savedAmount").value = goal.saved;
    document.getElementById("targetDate").value = goal.date;
  } else {
    editIndex = null;
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
    container.innerHTML = '<p class="text-gray-500 text-sm">No savings goals yet.</p>';
    return;
  }

  goals.forEach((goal, index) => {
    const percent = Math.min(Math.round((goal.saved / goal.target) * 100), 100);

    container.innerHTML += `
      <div class="bg-[#24262d] p-6 rounded-xl border border-gray-800 shadow-xl">
        <h3 class="font-bold text-lg text-gray-100">${goal.name}</h3>
        <p class="text-xs text-gray-500 mb-3">Target: $${goal.target}</p>
        <div class="flex justify-between text-sm mb-2">
          <span class="text-green-400 font-semibold">$${goal.saved} Saved</span>
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
          <button onclick="openGoalModal(${index})" class="text-blue-400 hover:text-blue-500">Edit</button>
          <button onclick="deleteGoal(${index})" class="text-red-400 hover:text-red-500">Delete</button>
        </div>
      </div>
    `;
  });
}

document.getElementById("goalForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const goalNameVal = goalName.value;
  const targetAmountVal = Number(targetAmount.value);
  const savedAmountVal = Number(savedAmount.value || 0);
  const targetDateVal = targetDate.value;

  // Total income
  let totalIncome = 0;
  transactions.forEach((tran) => { if(tran.type==="Income") totalIncome+=Number(tran.amount); });

  const goals = getGoals();
  let incomeAvailable = totalIncome;
  if(editIndex !== null) incomeAvailable += goals[editIndex].saved || 0;

  if(savedAmountVal > incomeAvailable) return alert("Not enough income to allocate this saved amount!");

  const newGoal = { name: goalNameVal, target: targetAmountVal, saved: savedAmountVal, date: targetDateVal };

  if(editIndex !== null) goals[editIndex] = newGoal;
  else goals.push(newGoal);

  saveGoals(goals);
  closeGoalModal();
  renderGoals();
  editIndex = null;
  updateDashboard();
});

function deleteGoal(index){
  const goals = getGoals();
  goals.splice(index,1);
  saveGoals(goals);
  renderGoals();
  updateDashboard();
}

renderGoals();

// Profile image upload and display logic
const profileContainer = document.getElementById('profileImageContainer');
const uploadInput = document.getElementById('uploadInput');
const profileImage = document.getElementById('profileImage');
const defaultIcon = document.getElementById('defaultIcon');

// When user clicks the profile circle
profileContainer.addEventListener('click', () => {
  uploadInput.click();
});

// When user selects an image
uploadInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageData = e.target.result;

      // Show the image and hide the icon
      profileImage.src = imageData;
      profileImage.classList.remove('hidden');
      defaultIcon.classList.add('hidden');

      // Save to localStorage
      localStorage.setItem('userProfileImage', imageData);
    };
    reader.readAsDataURL(file);
  }
});
console.log(profileImage)
// Load saved image on page load
window.addEventListener('load', () => {
  const savedImage = localStorage.getItem('userProfileImage');
  if (savedImage) {
    profileImage.src = savedImage;
    profileImage.classList.remove('hidden');
    defaultIcon.classList.add('hidden');
  }
});
document.getElementById('deleteImage').addEventListener('click', function(){
  localStorage.removeItem('userProfileImage');
  location.reload()
})

// By Tha Darilnheil
// =================== BUDGET PLAN ===================
const add_category = document.getElementById("add-category");
const cancel_add_category = document.getElementById("cancel-add-category");
const addcard = document.getElementById("add-category-form");
const form_category = document.getElementById("submit-category");
const category_select = document.getElementById("category-select");
const budget_amount = document.getElementById("budget-amount");
const cards = document.getElementById("cards");

let budget_plan = JSON.parse(localStorage.getItem("budget_plan")) || [];

add_category.addEventListener("click", () => {
  add_category.style.display = "none";
  addcard.style.display = "block";
});
cancel_add_category.addEventListener("click", () => {
  addcard.style.display = "none";
  add_category.style.display = "block";
});

function saveBudgetplan() {
  localStorage.setItem("budget_plan", JSON.stringify(budget_plan));
}

function getTransactions() {
  return JSON.parse(localStorage.getItem("transactions")) || [];
}

function calculateSpentByCategory(categoryName) {
  const transactions = getTransactions();
  return transactions
    .filter((tx) => tx.category === categoryName && tx.type === "Expense")
    .reduce((sum, tx) => sum + Number(tx.amount), 0);
}

function renderBudgetCard(item, index) {
  const spent = item.spent;
  const budget = item.budget_amount;
  const emoji = item.emoji;
  const remaining = budget - spent;
  const percent = Math.min((spent / budget) * 100, 100);

  const card = document.createElement("div");
  card.className = "bg-[#24262d] p-6 rounded-xl border border-gray-800 shadow-xl";

  card.innerHTML = `
      <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center text-pink-500 text-xl">
                  ${emoji}
              </div>
              <div>
                  <h3 class="font-semibold">${item.category}</h3>
                  <p class="text-sm text-gray-400">Budget: $${budget.toFixed(2)}</p>
              </div>
          </div>
          <button class="delete-btn text-red-400 text-xs hover:text-red-600">✖ Delete</button>
      </div>
      <div class="flex justify-between text-sm mb-2">
          <span>Spent: $${spent.toFixed(2)}</span>
          <span>Remaining: $${remaining.toFixed(2)}</span>
      </div>
      <div class="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-3">
          <div class="bg-teal-500 h-full transition-all duration-700" style="width:${percent}%"></div>
      </div>
      <div class="flex justify-between text-[10px] text-gray-500 uppercase tracking-tight">
          <span>${percent.toFixed(0)}% of budget</span>
          <span>$${remaining.toFixed(2)} left</span>
      </div>
  `;
  card.querySelector(".delete-btn").addEventListener("click", () => deleteCategory(index));
  cards.appendChild(card);
}

function deleteCategory(index){
  if(!confirm("Delete this category?")) return;
  budget_plan.splice(index,1);
  saveBudgetplan();
  loop_cards();
}

function loop_cards(){
  cards.innerHTML = "";
  budget_plan.forEach((item,index)=>{
    item.spent = calculateSpentByCategory(item.category);
    renderBudgetCard(item,index);
  });
}

form_category.addEventListener("submit",(e)=>{
  e.preventDefault();
  const cat = category_select.value;
  const amountVal = Number(budget_amount.value);
  if(amountVal<=0) return alert("Budget amount must be positive");

  let spent = calculateSpentByCategory(cat);
  let emoji="🎠";
  if(cat==="Food") emoji="🍜";
  else if(cat==="Housing") emoji="🏠";
  else if(cat==="Transportation") emoji="🚌";

  budget_plan.push({category:cat,budget_amount:amountVal,spent:spent,emoji:emoji});
  saveBudgetplan();
  loop_cards();

  category_select.value = budget_amount.value = "";
  addcard.style.display = "none";
  add_category.style.display = "block";
}

);

loop_cards();

// =================== EXPORT ===================
function exportTransactionsToCSV(){
  if(!transactions.length) return alert("No transactions to export");
  const headers = ["Amount","Category","Date","Description","Type"];
  const escapeCSV = (v)=>`"${String(v).replace(/"/g,'""')}"`;
  let csv = headers.join(",")+"\n";
  transactions.forEach(t=>{
    csv += [escapeCSV(t.amount),escapeCSV(t.category),escapeCSV(t.date),escapeCSV(t.description),escapeCSV(t.type)].join(",")+"\n";
  });
  const link=document.createElement("a");
  link.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));
  link.download="transactions.csv";
  link.click();
}

function exportTransactionsToJSON(){
  if(!transactions.length) return alert("No transactions to export");
  const link=document.createElement("a");
  link.href=URL.createObjectURL(new Blob([JSON.stringify(transactions,null,2)],{type:"application/json"}));
  link.download="transactions.json";
  link.click();
}

// =================== LIVE SEARCH ===================
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.toLowerCase();

  // Filter transactions by description, category, type, amount, or date
  const filteredTransactions = transactions.filter((tran) => {
    return (
      tran.description.toLowerCase().includes(keyword) ||
      tran.category.toLowerCase().includes(keyword) ||
      tran.type.toLowerCase().includes(keyword) ||
      tran.amount.toString().includes(keyword) ||
      tran.date.toString().includes(keyword)
    );
  });

  renderItemsFiltered(filteredTransactions);
});

// Separate render function for filtered transactions
function renderItemsFiltered(data) {
  let transaction_row = "";
  if (data.length === 0) {
    transaction_list.innerHTML = `<tr><td colspan="6" style="font-weight:400; text-align:center; color:gray;">No transactions found.</td></tr>`;
    return;
  }

  data.forEach((tran, index) => {
    transaction_row += `
      <tr>
        <td style="font-weight:400">${tran.date}</td>
        <td style="font-weight:400">${tran.description}</td>
        <td style="font-weight:400">${tran.category}</td>
        <td style="font-weight:500; color:${tran.type === "Income" ? "#0763f7ff" : "#f80808ff"}">${tran.type}</td>
        <td style="font-weight:400">$${tran.amount}</td>
        <td>
          <button onclick="updateTran(${index})" style="background:lightblue;color:blue;font-weight:500;width:60px;height:20px;border-radius:2px;">Update</button>
          <button onclick="deleteTran(${index})" style="background:lightblue;color:red;font-weight:500;width:60px;height:20px;border-radius:2px;">Delete</button>
        </td>
      </tr>
    `;
  });

  transaction_list.innerHTML = transaction_row;
}


// =================== INITIAL LOAD ===================
renderItems();
loop_cards();
renderGoals();
updateDashboard();

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
function showView(seaction){
    if(seaction === "dashboard"){
        dashboard.style.display = "block"
        transaction.style.display = "none";
        link_dashboard.className = "sidebar-link active flex items-center gap-3 p-3 rounded-lg transition-colors";
        link_transactions.className = "sidebar-link flex items-center gap-3 p-3 rounded-lg transition-colors";
    }
    else if(seaction === "transactions"){
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
    <td>${tran.date}</td>
    <td>${tran.description}</td>
    <td>${tran.category}</td>
    <td>${tran.type}</td>
    <td>$${tran.amount}</td>
    <td><button onclick="deleteTran(${index})" style="background: lightblue;color: blue;font-weight: 600; width: 50px;hight:20px; border-radius: 4px;">Delete</button>
    <button onclick="updateTran(${index})" style="background: lightblue;color: blue;font-weight: 600; width: 50px;hight:20px; border-radius: 4px;">Update</button></td>
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
renderItems();
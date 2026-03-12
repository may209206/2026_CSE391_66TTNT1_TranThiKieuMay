let students = []; 
let sortDirection = 0;

const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('tableBody');

// Tính xếp loại
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// Xử lý bộ lọc và render
function applyFilters() {
    const keyword = document.getElementById('searchName').value.toLowerCase();
    const rankFilter = document.getElementById('filterRank').value;

    let filtered = students.filter(sv => {
        const matchesName = sv.name.toLowerCase().includes(keyword);
        const matchesRank = rankFilter === "all" || getRank(sv.score) === rankFilter;
        return matchesName && matchesRank;
    });

    if (sortDirection !== 0) {
        filtered.sort((a, b) => sortDirection === 1 ? a.score - b.score : b.score - a.score);
    }

    render(filtered);
}

function render(data) {
    tableBody.innerHTML = "";
    let total = 0;

    data.forEach((sv, index) => {
        total += sv.score;
        const tr = document.createElement('tr');
        if (sv.score < 5) tr.className = 'bg-yellow';
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score.toFixed(1)}</td>
            <td>${getRank(sv.score)}</td>
            <td><button onclick="remove(${sv.id})">Xóa</button></td>
        `;
        tableBody.appendChild(tr);
    });

    document.getElementById('totalSV').innerText = data.length;
    document.getElementById('avgScore').innerText = data.length ? (total / data.length).toFixed(2) : 0;
}

// Thêm SV
btnAdd.onclick = () => {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (!name || isNaN(score) || score < 0 || score > 10) {
        alert("Nhập thông tin hợp lệ!");
        return;
    }

    students.push({ id: Date.now(), name, score });
    nameInput.value = ""; scoreInput.value = ""; nameInput.focus();
    applyFilters();
};

// Xóa SV
window.remove = (id) => {
    students = students.filter(s => s.id !== id);
    applyFilters();
};

// Tìm kiếm & Sắp xếp
document.getElementById('searchName').oninput = applyFilters;
document.getElementById('filterRank').onchange = applyFilters;
document.getElementById('sortScore').onclick = () => {
    sortDirection = sortDirection === 1 ? -1 : 1;
    document.getElementById('sortIcon').innerText = sortDirection === 1 ? "▲" : "▼";
    applyFilters();
};
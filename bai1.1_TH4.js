// 1. Khởi tạo mảng lưu trữ
let students = [];

const nameInput = document.getElementById('txtName');
const scoreInput = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('tableBody');
const statsArea = document.getElementById('statsArea');

// 2. Hàm xếp loại và lấy class CSS
function getRank(score) {
    if (score >= 8.5) return { text: "Giỏi", class: "" };
    if (score >= 7.0) return { text: "Khá", class: "" };
    if (score >= 5.0) return { text: "Trung bình", class: "" };
    return { text: "Yếu", class: "bg-yellow" };
}

// 3. Hàm vẽ lại bảng (Render)
function renderTable() {
    tableBody.innerHTML = "";
    let totalScore = 0;

    students.forEach((sv, index) => {
        const rankInfo = getRank(sv.score);
        totalScore += sv.score;

        const row = `
            <tr class="${rankInfo.class}">
                <td>${index + 1}</td>
                <td>${sv.name}</td>
                <td>${sv.score.toFixed(1)}</td>
                <td>${rankInfo.text}</td>
                <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Cập nhật thống kê
    const avg = students.length > 0 ? (totalScore / students.length).toFixed(2) : 0;
    statsArea.innerHTML = `Tổng số SV: ${students.length} | Điểm trung bình: ${avg}`;
}

// 4. Hàm thêm sinh viên
function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    // Kiểm tra hợp lệ
    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    // Thêm vào mảng
    students.push({ name, score });

    // Reset form
    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();

    renderTable();
}

// 5. Xử lý sự kiện
btnAdd.addEventListener('click', addStudent);

// Nhấn Enter ở ô điểm
scoreInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

// Event Delegation cho nút Xóa
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1); // Xóa khỏi mảng
        renderTable(); // Vẽ lại
    }
});
// 1. Dữ liệu giá sản phẩm
const prices = {
    "Laptop": 20000000,
    "Iphone": 25000000,
    "iPad": 15000000
};

const form = document.getElementById('orderForm');
const productSelect = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const totalPriceEl = document.getElementById('totalPrice');
const noteArea = document.getElementById('note');
const charCountEl = document.getElementById('charCount');

// 2. Tính tổng tiền tự động
function updatePrice() {
    const product = productSelect.value;
    const qty = parseInt(quantityInput.value) || 0;
    const price = prices[product] || 0;
    const total = price * qty;
    totalPriceEl.innerText = total.toLocaleString('vi-VN') + "đ";
}

productSelect.onchange = updatePrice;
quantityInput.oninput = updatePrice;

// 3. Đếm ký tự realtime
noteArea.oninput = function() {
    const len = this.value.length;
    charCountEl.innerText = `${len}/200`;
    if (len > 200) {
        charCountEl.classList.add('char-error');
        showError(this, "Ghi chú không được vượt quá 200 ký tự");
    } else {
        charCountEl.classList.remove('char-error');
        clearError(this);
    }
};

// 4. Các hàm Validate
function showError(el, msg) {
    const parent = el.closest('.form-control');
    parent.classList.add('error');
    parent.querySelector('.error-msg').innerText = msg;
}

function clearError(el) {
    const parent = el.closest('.form-control');
    parent.classList.remove('error');
    parent.querySelector('.error-msg').innerText = '';
}

function validateForm() {
    let isValid = true;

    // Validate Sản phẩm
    if (!productSelect.value) {
        showError(productSelect, "Vui lòng chọn sản phẩm");
        isValid = false;
    } else clearError(productSelect);

    // Validate Số lượng
    const qty = parseInt(quantityInput.value);
    if (isNaN(qty) || qty < 1 || qty > 99) {
        showError(quantityInput, "Số lượng từ 1 đến 99");
        isValid = false;
    } else clearError(quantityInput);

    // Validate Ngày giao hàng (Phức tạp)
    const dateInput = document.getElementById('deliveryDate');
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (!dateInput.value) {
        showError(dateInput, "Vui lòng chọn ngày giao");
        isValid = false;
    } else if (selectedDate < today) {
        showError(dateInput, "Ngày giao không được ở quá khứ");
        isValid = false;
    } else if (selectedDate > maxDate) {
        showError(dateInput, "Ngày giao không được quá 30 ngày tới");
        isValid = false;
    } else clearError(dateInput);

    // Validate Địa chỉ
    const addr = document.getElementById('address');
    if (addr.value.trim().length < 10) {
        showError(addr, "Địa chỉ phải từ 10 ký tự trở lên");
        isValid = false;
    } else clearError(addr);

    // Validate Thanh toán
    const pay = document.querySelector('input[name="payment"]:checked');
    if (!pay) {
        document.getElementById('paymentError').innerText = "Chọn phương thức thanh toán";
        isValid = false;
    } else document.getElementById('paymentError').innerText = "";

    return isValid;
}

// 5. Xử lý Submit & Modal
form.onsubmit = function(e) {
    e.preventDefault();
    if (validateForm()) {
        const content = `
            <p><strong>Sản phẩm:</strong> ${productSelect.value}</p>
            <p><strong>Số lượng:</strong> ${quantityInput.value}</p>
            <p><strong>Tổng tiền:</strong> ${totalPriceEl.innerText}</p>
            <p><strong>Ngày giao:</strong> ${document.getElementById('deliveryDate').value}</p>
        `;
        document.getElementById('summaryContent').innerHTML = content;
        document.getElementById('confirmBox').classList.remove('hidden');
    }
};

document.getElementById('btnCancel').onclick = () => {
    document.getElementById('confirmBox').classList.add('hidden');
};

document.getElementById('btnFinalConfirm').onclick = () => {
    document.getElementById('confirmBox').classList.add('hidden');
    form.classList.add('hidden');
    document.getElementById('finalSuccess').classList.remove('hidden');
};
const form = document.getElementById('registerForm');
const successDiv = document.getElementById('successMsg');

// Các hàm tiện ích
function showError(input, message) {
    const parent = input.parentElement;
    parent.classList.add('error');
    const small = parent.querySelector('.error-msg');
    small.innerText = message;
}

function clearError(input) {
    const parent = input.parentElement;
    parent.classList.remove('error');
    const small = parent.querySelector('.error-msg');
    small.innerText = '';
}

// 1. Validate Họ tên
function checkFullname() {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/; // Chỉ chữ và khoảng trắng
    if (val === "") {
        showError(document.getElementById('fullname'), "Họ tên không được để trống");
        return false;
    } else if (val.length < 3) {
        showError(document.getElementById('fullname'), "Họ tên phải ít nhất 3 ký tự");
        return false;
    } else if (!regex.test(val)) {
        showError(document.getElementById('fullname'), "Họ tên chỉ được chứa chữ cái");
        return false;
    }
    clearError(document.getElementById('fullname'));
    return true;
}

// 2. Validate Email
function checkEmail() {
    const email = document.getElementById('email');
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.trim() === "") {
        showError(email, "Email không được để trống");
        return false;
    } else if (!regex.test(email.value.trim())) {
        showError(email, "Định dạng email không hợp lệ");
        return false;
    }
    clearError(email);
    return true;
}

// 3. Validate SĐT
function checkPhone() {
    const phone = document.getElementById('phone');
    const regex = /^0\d{9}$/;
    if (!regex.test(phone.value.trim())) {
        showError(phone, "SĐT phải 10 số và bắt đầu bằng số 0");
        return false;
    }
    clearError(phone);
    return true;
}

// 4. Validate Mật khẩu
function checkPassword() {
    const pass = document.getElementById('password');
    // Regex: ít nhất 1 hoa, 1 thường, 1 số, >= 8 ký tự
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(pass.value)) {
        showError(pass, "Mật khẩu yếu (>=8 ký tự, có chữ hoa, thường, số)");
        return false;
    }
    clearError(pass);
    return true;
}

// 5. Validate Xác nhận mật khẩu
function checkConfirm() {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword');
    if (confirm.value !== pass || confirm.value === "") {
        showError(confirm, "Mật khẩu xác nhận không khớp");
        return false;
    }
    clearError(confirm);
    return true;
}

// 6. Validate Giới tính & Điều khoản
function checkOthers() {
    const genderChecked = document.querySelector('input[name="gender"]:checked');
    const terms = document.getElementById('terms');
    let valid = true;

    if (!genderChecked) {
        document.getElementById('genderError').innerText = "Vui lòng chọn giới tính";
        valid = false;
    } else {
        document.getElementById('genderError').innerText = "";
    }

    if (!terms.checked) {
        showError(terms, "Bạn phải đồng ý với điều khoản");
        valid = false;
    } else {
        clearError(terms);
    }
    return valid;
}

// SỰ KIỆN REALTIME (Blur & Input)
const inputs = form.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.id === 'fullname') checkFullname();
        if (input.id === 'email') checkEmail();
        if (input.id === 'phone') checkPhone();
        if (input.id === 'password') checkPassword();
        if (input.id === 'confirmPassword') checkConfirm();
    });

    input.addEventListener('input', () => {
        clearError(input);
        if (input.name === 'gender') document.getElementById('genderError').innerText = "";
    });
});

// SỰ KIỆN SUBMIT
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Dùng toán tử bitwise & để ép tất cả hàm đều chạy (không dừng sớm)
    const isNameValid = checkFullname();
    const isEmailValid = checkEmail();
    const isPhoneValid = checkPhone();
    const isPassValid = checkPassword();
    const isConfirmValid = checkConfirm();
    const isOtherValid = checkOthers();

    if (isNameValid && isEmailValid && isPhoneValid && isPassValid && isConfirmValid && isOtherValid) {
        const name = document.getElementById('fullname').value;
        form.classList.add('hidden');
        successDiv.classList.remove('hidden');
        document.getElementById('displayUser').innerText = name;
    }
});
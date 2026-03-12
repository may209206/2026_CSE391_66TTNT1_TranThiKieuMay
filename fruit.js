// Kịch bản:
// Kho sẽ chứa 1 số loại trái cây: 
// - Người dùng nhập tên trái cây vào ô input
// - Khi người dùng click vào nút Show Fruit, nếu có loại trái cây đó trong kho thì sẽ hiển thị tên trái cây đó, nếu không có sẽ hiển thị "Nothing to display"
// Bước 1: Xác định các phần từ sẽ tác động
let inputFruit = document.getElementById("fruitSearch");
let btnShowFruit = document.querySelector(".search-fruit button");
let displayFruit = document.querySelector(".display-fruit p");
let showFruit = document.querySelector(".display-fruit .show-fruit");

// Bước 2: Thêm sự kiện click vào nút Show Fruit
btnShowFruit.addEventListener("click", function() {
    // Bước 3: Lấy giá trị người dùng nhập vào ô input
    let fruitName = inputFruit.value.trim().toLowerCase();
    // Bước 4: Kiểm tra xem loại trái cây đó có trong kho hay không
    let fruitStock = ["apple", "banana", "orange", "grape", "mango"];
    if (fruitStock.includes(fruitName)) {
        // Nếu có, hiển thị tên trái cây đó
        displayFruit.textContent = "We have " + fruitName + " in stock!";
        // Hiển thị hình ảnh của trái cây
        showFruit.innerHTML = '<img src="images/' + fruitName + '.jpg" alt="' + fruitName + '" style="width:200px">';
    } else {
        // Nếu không, hiển thị "Nothing to display"
        displayFruit.textContent = "Nothing to display";
        // Hiển thị hình ảnh mặc định
        showFruit.innerHTML = '<img src="images/no-image.jpg" alt="No Image" style="width:200px">';
    }   
    // Bước 5: Xóa giá trị trong ô input sau khi hiển thị kết quả
    inputFruit.value = "";
});

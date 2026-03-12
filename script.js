// Kịch bản:Nhấp chọn Add New Paragraph
// Kết quả:Thêm một đoạn văn mới vào cuối phần tử có class là parent

// Bước 1: Xác định các phần từ sẽ tác động
let parent = document.getElementsByClassName("parent")[0];
let btnAddNew = document.getElementsByTagName("button")[0];

// Bước 2: Thêm sự kiện click vào nút Add New Paragraph
btnAddNew.addEventListener("click", function(){
    // Tạo một phần tử p mới
    let newParagraph = document.createElement("p");
    newParagraph.textContent = "New Paragraph";
    newParagraph.style.color = "blue";
     // Gán nút mới lên cây DOM
    parent.appendChild(newParagraph);
});
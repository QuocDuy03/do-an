// Tạo một mảng chứa thông tin về quần áo với hình ảnh
alert('helloo')


const gioHang = [
  {
    idSanPham: 1,
    ten: "Áo sơ mi",
    size: "M",
    color: "Trắng",
    GiaSP: 350000,
    hinhAnh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGoPxIUZ-B9U5vdDJoZD_nSp2ME3VexsFx4Q0hDwSHj-YkOU1V1SqCBLjWOWOJVbmpL0&usqp=CAU"
  },
  {
    idSanPham: 2,
    ten: "Quần jeans",
    size: "L",
    color: "Xanh đậm",
    GiaSP: 450000,
    hinhAnh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAOz-_fGi90DO5YQenEfjhOO0njQD14LTL1A&usqp=CAU"
  },
  {
    idSanPham: 3,
    ten: "Áo khoác",
    size: "XL",
    color: "Đen",
    GiaSP: 150000,
    hinhAnh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgvLB2TKOxFSadehyeP4VcODSe2LHPvm-b2A&usqp=CAU"
  }
];
//cắt 
// Chuyển dữ liệu thành chuỗi JSON
const gioHangJSON = JSON.stringify(gioHang);

// Lưu dữ liệu vào Local Storage với tên là "clothingData"
localStorage.setItem("gioHang", gioHangJSON);



function TaoDoiTuongSanPham(hinhAnh, ten, color, GiaSP, size, idSanPham) {
  var sanPham = new Object();
  /* bước 1: gắn các thuộc tính cho đối tượng */
  sanPham.hinhAnh = hinhAnh;
  sanPham.ten = ten;
  console.log(sanPham.ten)
  sanPham.color = color;
  sanPham.GiaSP = GiaSP;
  sanPham.size = size;
  sanPham.idSanPham = idSanPham;


 sanPham.amount = 1; // Khởi tạo giá trị amount ban đầu

  // Bước 2: Viết phương thức cho đối tượng
  sanPham.tinhGiaBan = function () {
    // Tính giá dựa trên giá sản phẩm và số lượng (amount)
    var giaBan = this.GiaSP *1;
    return giaBan;
  }

  sanPham.toJson = function () {
    var json = JSON.stringify(this);
    return json;
  }
  /* Từ json chuyển thành một đối tượng đầy đủ các phương thức
  
  input: json
  output: đối tượng đầy đủ */
  sanPham.fromJSON = function (json) {
    var doiTuongDayDu = new Object();

    var doiTuong = JSON.parse(json);
    /* Bước 2: Chuyển đối tượng thành đối tượng đầy đủ phương thức */
    var doiTuongDayDu = TaoDoiTuongSanPham(doiTuong.hinhAnh, doiTuong.ten, doiTuong.color, doiTuong.GiaSP, doiTuong.size, doiTuong.idSanPham);
    return doiTuongDayDu;
  }
  /* Từ json cầu danh sách sản phẩm trả về một danh sách sản phẩm có đầy đủ các phương thức
  Input: json của danh sách sản phẩm
  output: danh sách sản pẩm đầy đủ */
  sanPham.fromJSONS = function (jsonDanhSachSanPham) {
    var danhSachSanPhamDayDu = new Array();
    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
    for (var i = 0; i < danhSachSanPham.length; i++) {
      var sanPham = danhSachSanPham[i];
      var sanPhamDayDu = TaoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.color, sanPham.GiaSP, sanPham.size, sanPham.idSanPham);
      danhSachSanPhamDayDu[i] = sanPhamDayDu;

    }
    return danhSachSanPhamDayDu;

  }
  return sanPham;
}




function laySanPhamTheoId(idSanPham) {
  var sanPham = new Object();
  /* Bước 1: Load toàn bộ danh sách sản phẩm dưới local storage lên */
  var danhSachSanPham = layDanhSachSanPhamDuoiLocalStorage();
  console.log(danhSachSanPham)
  /* Bước 2: Tìm ra đối tượng nào trong danh sách mà có id = idsanPhạm */
  for (var i = 0; i < danhSachSanPham.length; i++) {
    var sanPhamHienTai = danhSachSanPham[i];
    console.log(sanPhamHienTai.idSanPham)
    console.log(idSanPham)
    if (sanPhamHienTai.idSanPham == idSanPham) {
      sanPham = sanPhamHienTai;
      console.log(sanPham)

    }
  }
  console.log(sanPham)

  /* BƯỚC 3: Chuyển đối tượng thành đối tượng đầy đủ */
  sanPham = TaoDoiTuongSanPham(sanPham.hinhAnh, sanPham.ten, sanPham.color, sanPham.GiaSP, sanPham.size, sanPham.idSanPham);
  console.log(sanPham)// chưa lấy dc
  return sanPham;
}
/* Mô tả: lấy toàn bộ danh sách sp dưới local storage lên */
function layDanhSachSanPhamDuoiLocalStorage() {
  /* Bước 1: load json */
  var jsonDanhSachSanPham = localStorage.getItem('gioHang');
  /* Bước 2: Chuyển json thành đối tượng */
  var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);
  return danhSachSanPham;
}



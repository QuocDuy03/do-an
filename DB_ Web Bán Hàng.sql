CREATE TABLE `Roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20)
);

CREATE TABLE `Users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `fullname` varchar(50),
  `email` varchar(150),
  `phone_number` varchar(20),
  `address` varchar(200),
  `password` varchar(100),
  `role_id` int,
  `created_at` datetime,
  `updated_at` datetime,
  `deleted` int
);

CREATE TABLE `Categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100)
);

CREATE TABLE `Products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category_id` int,
  `title` varchar(250),
  `price` int,
  `discount` int,
  `thumbnail` varchar(500),
  `description` longtext,
  `created_at` datetime,
  `updated_at` datetime,
  `deleted` int
);

CREATE TABLE `Galeries` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int,
  `thumbnail` varchar(500)
);

CREATE TABLE `Orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `fullname` varchar(50),
  `email` varchar(150),
  `phone_number` varchar(20),
  `address` varchar(200),
  `note` varchar(1000),
  `order_date` datetime,
  `status` int,
  `total_money` int
);

CREATE TABLE `Order_Details` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `order_id` int,
  `product_id` int,
  `price` int,
  `num` int,
  `total_money` int
);

ALTER TABLE `Users` ADD FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`);

ALTER TABLE `Products` ADD FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`);

ALTER TABLE `Order_Details` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Galeries` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Order_Details` ADD FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);


-- Cập nhật trường created_at và updated_at cho bảng User
ALTER TABLE Users
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


-- Cập nhật trường created_at và updated_at cho bảng Product
ALTER TABLE Products
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


---------------------------------------------------------


-- Thêm dữ liệu mẫu cho bảng Roles
INSERT INTO Roles (id, name) VALUES
(1, 'Admin'),
(2, 'User');


-- Thêm dữ liệu mẫu cho bảng Users
INSERT INTO Users (id, fullname, email, phone_number, address, password, role_id, created_at, updated_at)
VALUES
(1, 'Đặng Quốc Duy', 'G5_tech1@gmail.com', '405893', 'KTX B, DHQG HCM', 'Dalatech@1', 2, '2023-01-08', '2023-01-12'),
(2, 'Nguyễn Văn Anh Huy', 'G5_tech2@gmail.com', '338542', 'Tân Lâp, Dĩ An, Bình Dương', 'Dalatech@2', 2, '2023-04-08', '2023-05-03'),
(3, 'Lê Quốc Kiệt', 'G5_tech3@gmail.com', '257598', 'Man Thiện, Thủ Đức', 'Dalatech@3', 2, '2023-03-03', '2023-04-04'),
(4, 'Tưởng Quang Minh', 'G5_tech4@gmail.com', '985421', 'KTX A, DHQG HCM', 'Dalatech@4', 2, '2023-01-03', '2023-03-04'),
(5, 'Nguyễn Thành Đạt', 'G5_tech5@gmail.com', '128975', '29 Lê Văn Việt, Hiệp Phú, Thủ Đức', 'Dalatech@5', 2, '2022-01-04', '2023-02-04'),
(6, 'Lê Quang Hoàng', 'G5_tech6@gmail.com', '654192', 'KTX B, DHQG HCM', 'Dalatech@6', 2, '2023-03-05', '2023-04-04'),
(7, 'Phan Anh Tuấn', 'G5_tech7@gmail.com', '908124', 'Tân Lâp, Dĩ An, Bình Dương', 'Dalatech@7', 2, '2023-02-12', '2023-03-03'),
(8, 'Đào Duy Tuấn', 'G5_tech8@gmail.com', '276589', 'Tân Lâp, Dĩ An, Bình Dương', 'Dalatech@8', 2, '2023-02-02', '2023-03-04');

-- Thêm dữ liệu mẫu cho bảng Categories
INSERT INTO Categories (id, name)
VALUES
(1, 'Nam'),
(2, 'Nữ'),
(3, 'Trẻ em');


-- Thêm dữ liệu mẫu cho bảng Products
INSERT INTO Products (id, category_id, title, price, discount, thumbnail, description, created_at, updated_at, deleted)
VALUES
(1, 1, 'AIRism Áo Polo Cổ Thường', 489000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/448947/item/goods_09_448947.jpg?width=320', 'Mô tả về sản phẩm 1', '2023-01-08', '2023-01-12', 0),
(2, 1, 'AIRism Áo Polo Gài Nút', 489000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/441604/item/goods_00_441604.jpg?width=750', 'Mô tả về sản phẩm 2', '2023-01-08', '2023-01-12', 0),
(3, 1, 'Áo Polo Dry-Ex Ngắn Tay', 391000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433041/item/goods_69_433041.jpg?width=750', 'Mô tả về sản phẩm 3', '2023-01-08', '2023-01-12', 0),
(4, 1, 'DRY-EX Áo Polo Ngắn Tay', 244000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464897/item/goods_63_464897.jpg?width=750', 'Mô tả về sản phẩm 4', '2023-01-08', '2023-01-12', 0),
(5, 1, 'Áo Sơ Mi Vải Jersey Kẻ Sọc Dài Tay', 784000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/456227/item/goods_65_456227.jpg?width=750', 'Mô tả về sản phẩm 5', '2023-01-08', '2023-01-12', 0),
(6, 1, 'Áo Sơ Mi Co Giãn Kẻ Caro', 790000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/456250/item/goods_68_456250.jpg?width=750', 'Mô tả về sản phẩm 6', '2023-01-08', '2023-01-12', 0),
(7, 1, 'EZY Quần Jean Siêu Co Giãn', 784000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/439178/item/goods_68_439178.jpg?width=750', 'Mô tả về sản phẩm 7', '2023-01-08', '2023-01-12', 0),
(8, 1, 'Quần Jean Siêu Co Giãn', 980000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455472/item/goods_09_455472.jpg?width=750', 'Mô tả về sản phẩm 8', '2023-01-08', '2023-01-12', 0),
(9, 1, 'Quần Jeans Dáng Slim Fit Co Giãn', 980000, 0, 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/447649/item/vngoods_09_447649.jpg?width=750', 'Mô tả về sản phẩm 9', '2023-01-08', '2023-01-12', 0),
(10, 1, 'Quần Jeans Slim Fit', 980000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/452524/item/goods_63_452524.jpg?width=750', 'Mô tả về sản phẩm 10', '2023-01-08', '2023-01-12', 0),
(11, 1, 'Quần Smart Pants', 588000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/451818/item/goods_07_451818.jpg?width=750', 'Mô tả về sản phẩm 11', '2023-01-08', '2023-01-12', 0),
(12, 1, 'AirSense Quần Dài', 980000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462618/item/goods_09_462618.jpg?width=750', 'Mô tả về sản phẩm 12', '2023-01-08', '2023-01-12', 0),
(13, 2, 'Áo Thun Cổ Tròn', 293000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462666/item/goods_31_462666.jpg?width=750', 'Mô tả về sản phẩm 13', '2023-01-08', '2023-01-12', 0),
(14, 2, 'HEATTECH Áo Nỉ', 980000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/449878/item/goods_12_449878.jpg?width=750', 'Mô tả về sản phẩm 14', '2023-01-08', '2023-01-12', 0),
(15, 2, 'Áo Nỉ Có Mũ Dài', 784000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/419503/item/goods_09_419503.jpg?width=750', 'Mô tả về sản phẩm 15', '2023-01-08', '2023-01-12', 0),
(16, 2, 'Áo Len Cổ Tròn', 588000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/450509001/item/goods_11_450509001.jpg?width=750', 'Mô tả về sản phẩm 16', '2023-01-08', '2023-01-12', 0),
(17, 2, 'Áo Kiểu Vải Rayon', 489000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/446846/item/goods_69_446846.jpg?width=750', 'Mô tả về sản phẩm 17', '2023-01-08', '2023-01-12', 0),
(18, 2, 'PEACE FOR ALL (Hana Tajima)', 391000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/457857/item/goods_10_457857.jpg?width=750', 'Mô tả về sản phẩm 18', '2023-01-08', '2023-01-12', 0),
(19, 2, 'Quần Dài Vải Tweed Xếp Ly Ống Rộng', 980000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462077001/sub/goods_462077001_sub14.jpg?width=750', 'Mô tả về sản phẩm 19', '2023-01-08', '2023-01-12', 0),
(20, 2, 'Quần Dài Vải Nhung Xếp Ly Ống Rộng', 784000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460541/sub/goods_460541_sub14.jpg?width=750', 'Mô tả về sản phẩm 20', '2023-01-08', '2023-01-12', 0),
(21, 2, 'Quần Xếp Ly Ống Rộng', 784000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460311/sub/goods_460311_sub14.jpg?width=750', 'Mô tả về sản phẩm 21', '2023-01-08', '2023-01-12', 0),
(22, 2, 'Quần Ống Suông Dáng Rộng Túi Hộp (Quần Cargo)', 784000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/461643/sub/goods_461643_sub14.jpg?width=750', 'Mô tả về sản phẩm 22', '2023-01-08', '2023-01-12', 0),
(23, 2, 'Quần Dài Vải Brushed Jersey Dáng Rộng', 784000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463706/sub/goods_463706_sub14.jpg?width=750', 'Mô tả về sản phẩm 23', '2023-01-08', '2023-01-12', 0),
(24, 2, 'Quần Easy Pants Dáng Rộng Ống Suông', 784000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/466000/sub/goods_466000_sub14.jpg?width=750', 'Mô tả về sản phẩm 24', '2023-01-08', '2023-01-12', 0),
(25, 3, 'Áo Khoác Giả Lông Cừu Kéo Khóa Dài Tay', 391000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464673/sub/goods_464673_sub14.jpg?width=750', 'Mô tả về sản phẩm 25', '2023-01-08', '2023-01-12', 0),
(26, 3, 'Áo Khoác Giả Lông Cừu Kéo Khóa Dài Tay', 391000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463190/sub/goods_463190_sub14.jpg?width=750', 'Mô tả về sản phẩm 26', '2023-01-08', '2023-01-12', 0),
(27, 3, 'BÉ GÁI ÁO NỈ CÓ MŨ CHUI ĐẦU', 489000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/467878/sub/goods_467878_sub14.jpg?width=750', 'Mô tả về sản phẩm 27', '2023-01-08', '2023-01-12', 0),
(28, 3, 'Áo Hoodie Nỉ Dáng Lửng Dài Tay', 489000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/467876/sub/goods_467876_sub14.jpg?width=750', 'Mô tả về sản phẩm 28', '2023-01-08', '2023-01-12', 0),
(29, 3, 'UT Mickey Shines Áo Thun Ngắn Tay', 244000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/466424/sub/goods_466424_sub14.jpg?width=750', 'Mô tả về sản phẩm 29', '2023-01-08', '2023-01-12', 0),
(30, 3, 'KAWS Áo Nỉ Dài Tay', 489000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/467776/sub/goods_467776_sub14.jpg?width=750', 'Mô tả về sản phẩm 30', '2023-01-08', '2023-01-12', 0),
(31, 3, 'Quần Jeans Baggy', 580000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462976/sub/goods_462976_sub14.jpg?width=750', 'Mô tả về sản phẩm 31', '2023-01-08', '2023-01-12', 0),
(32, 3, 'Quần Denim Siêu Co Giãn Ống Ôm Dần', 580000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/454364/sub/goods_454364_sub14.jpg?width=750', 'Mô tả về sản phẩm 32', '2023-01-08', '2023-01-12', 0),
(33, 3, 'Quần Nỉ Dry Siêu Co Giãn', 391000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463500/sub/goods_463500_sub14.jpg?width=750', 'Mô tả về sản phẩm 33', '2023-01-08', '2023-01-12', 0),
(34, 3, 'Quần Váy Xếp Ly Kẻ Caro', 489000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460668003/sub/goods_460668003_sub14.jpg?width=750', 'Mô tả về sản phẩm 34', '2023-01-08', '2023-01-12', 0),
(35, 3, 'Quần Jean Mềm Siêu Co Giãn', 391000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/454371/sub/goods_454371_sub14.jpg?width=750', 'Mô tả về sản phẩm 35', '2023-01-08', '2023-01-12', 0);


-- Thêm dữ liệu mẫu cho bảng Galeries
INSERT INTO Galeries (id, product_id, thumbnail)
VALUES
(1, 1, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/448947/item/goods_09_448947.jpg?width=320'),
(2, 2, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/441604/item/goods_00_441604.jpg?width=750'),
(3, 3, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433041/item/goods_69_433041.jpg?width=750'),
(4, 4, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464897/item/goods_63_464897.jpg?width=750'),
(5, 5, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/456227/item/goods_65_456227.jpg?width=750'),
(6, 6, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/456250/item/goods_68_456250.jpg?width=750'),
(7, 7, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/439178/item/goods_68_439178.jpg?width=750'),
(8, 8, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455472/item/goods_09_455472.jpg?width=750'),
(9, 9, 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/447649/item/vngoods_09_447649.jpg?width=750'),
(10, 10, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/452524/item/goods_63_452524.jpg?width=750'),
(11, 11, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/451818/item/goods_07_451818.jpg?width=750'),
(12, 12, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462618/item/goods_09_462618.jpg?width=750'),
(13, 13, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462666/item/goods_31_462666.jpg?width=750'),
(14, 14, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/449878/item/goods_12_449878.jpg?width=750'),
(15, 15, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/419503/item/goods_09_419503.jpg?width=750'),
(16, 16, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/450509001/item/goods_11_450509001.jpg?width=750'),
(17, 17, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/446846/item/goods_69_446846.jpg?width=750'),
(18, 18, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/457857/item/goods_10_457857.jpg?width=750'),
(19, 19, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462077001/sub/goods_462077001_sub14.jpg?width=750'),
(20, 20, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460541/sub/goods_460541_sub14.jpg?width=750'),
(21, 21, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460311/sub/goods_460311_sub14.jpg?width=750'),
(22, 22, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/461643/sub/goods_461643_sub14.jpg?width=750'),
(23, 23, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463706/sub/goods_463706_sub14.jpg?width=750'),
(24, 24, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/466000/sub/goods_466000_sub14.jpg?width=750'),
(25, 25, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464673/sub/goods_464673_sub14.jpg?width=750');

-- Thêm dữ liệu mẫu cho bảng Orders
INSERT INTO Orders (id, user_id, fullname, email, phone_number, address, note)
VALUES
(1, 1, 'Đặng Quốc Duy', 'G5_tech1@gmail.com', 405893, 'KTX B, DHQG HCM', 'Giao đến trước 12h ngày 12/11'),
(2, 1, 'Đặng Quốc Duy', 'G5_tech1@gmail.com', 405893, 'KTX B, DHQG HCM', 'Giao ngày 15/11'),
(3, 2, 'Nguyễn Văn Anh Huy', 'G5_tech2@gmail.com', 338582814, 'Tân Lâp, Dĩ An, Bình Dương', 'Giao trong 48h'),
(4, 3, 'Lê Quốc Kiệt', 'G5_tech3@gmail.com', 938478595, 'Man Thiện,Thủ Đức', 'Giao trong 48h'),
(5, 3, 'Lê Quốc Kiệt', 'G5_tech3@gmail.com', 948574954, 'Man Thiện,Thủ Đức', 'Tặng mẹ'),
(6, 7, 'Phan Anh Tuấn', 'G5_tech7@gmail.com', 6734847365, 'Tân Lâp, Dĩ An, Bình Dương', 'Giao trong 48h'),
(8, 1, 'Đặng Quốc Duy', 'G5_tech1@gmail.com', 405893, 'KTX B, DHQG HCM', 'Giao đến trước 12h ngày 12/11'),
(9, 4, 'Tưởng Quang Minh', 'G5_tech4@gmail.com', 985421, 'KTX A, DHQG HCM', 'Giao trong ngày'),
(11, 7, 'Phan Anh Tuấn', 'G5_tech7@gmail.com', 908124, 'Tân Lâp, Dĩ An, Bình Dương', 'Giao trong 72h'),
(14, 7, 'Phan Anh Tuấn', 'G5_tech7@gmail.com', 908124, 'Tân Lâp, Dĩ An, Bình Dương', 'Giao trong 72h'),
(15, 6, 'Lê Quang Hoàng', 'G5_tech6@gmail.com', 654192, 'KTX B, DHQG HCM', 'Chúc bạn 8/3 vui vẻ'),
(16, 8, 'Đào Duy Tuấn', 'G5_tech8@gmail.com', 276589, 'Tân Lâp, Dĩ An, Bình Dương', 'Giao trong vòng 48h'),
(17, 5, 'Nguyễn Thành Đạt', 'G5_tech5@gmail.com', 128975, '29 Lê Văn Việt, Hiệp Phú, Thủ Đức', 'Tặng bạn nè!'),
(18, 7, 'Phan Anh Tuấn', 'G5_tech7@gmail.com', 908124, 'Tân Lâp, Dĩ An, Bình Dương', 'Giao trong 72h'),
(19, 6, 'Lê Quang Hoàng', 'G5_tech6@gmail.com', 654192, 'KTX B, DHQG HCM', 'Giao trong 48h'),
(20, 5, 'Nguyễn Thành Đạt', 'G5_tech5@gmail.com', 128975, '29 Lê Văn Việt, Hiệp Phú, Thủ Đức', 'Giao trong 72h');


-- Thêm dữ liệu mẫu cho bảng Order_Details
INSERT INTO Order_Details (id, order_id, product_id, price, num, total_money)
VALUES
(1, 1, 2, 489000, 3, 1467000),
(2, 2, 8, 980000, 2, 1960000),
(3, 3, 11, 588000, 1, 588000),
(4, 4, 24, 784000, 1, 784000),
(5, 5, 19, 980000, 3, 2940000),
(8, 8, 10, 980000, 1, 980000),
(11, 11, 23, 784000, 1, 784000),
(14, 14, 17, 489000, 1, 489000),
(15, 15, 24, 784000, 2, 1568000),
(18, 18, 18, 391000, 1, 391000),
(20, 20, 13, 293000, 2, 586000);

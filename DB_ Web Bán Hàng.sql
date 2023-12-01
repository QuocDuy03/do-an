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
  `deleted` int,
  `quantity` int DEFAULT 0,
  `type` varchar(10),
  CONSTRAINT `fk_products_category_id` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`)
);

CREATE TABLE `ProductSizes` (
  `product_id` int,
  `size` varchar(10),
  `quantity` int,
  PRIMARY KEY (`product_id`, `size`),
  FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`),
);

DELIMITER //
CREATE TRIGGER update_product_quantity
AFTER INSERT ON ProductSizes
FOR EACH ROW
BEGIN
    UPDATE Products
    SET quantity = (SELECT SUM(quantity) FROM ProductSizes WHERE product_id = NEW.product_id)
    WHERE id = NEW.product_id;
END;
//
DELIMITER ;


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
  `status` text, 
  `total_money` int
);

CREATE TABLE `Order_Details` (
  `order_id` int,
  `product_id` int,
  `price` int,
  `quantity` int,
  `total_money` int,
  PRIMARY KEY (`order_id`, `product_id`),
  FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`)
);

CREATE TABLE `Carts` (
  `user_id` int PRIMARY KEY,
  `created_at` datetime,
  `product_id` int,
  `quantity` int,
  FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
   FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`)
);




ALTER TABLE `Users` ADD FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`);

ALTER TABLE `Products` ADD FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`);

ALTER TABLE `Order_Details` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Order_Details` ADD FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);


-- Cập nhật trường created_at và updated_at cho bảng User
ALTER TABLE Users
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


-- Cập nhật trường created_at và updated_at cho bảng Products
ALTER TABLE Products
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
MODIFY COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Cập nhật trường created_at và updated_at cho bảng Carts
ALTER TABLE Carts
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Cập nhật trường created_at và updated_at cho bảng CartItems
ALTER TABLE CartItems
MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


---------------------------------------------------------


-- Thêm dữ liệu mẫu cho bảng Roles
INSERT INTO Roles (id, name) VALUES
(1, 'Admin'),
(2, 'User');


-- Thêm dữ liệu mẫu cho bảng Categories
INSERT INTO Categories (id, name)
VALUES
(1, 'Nam'),
(2, 'Nữ'),
(3, 'Trẻ em');


-- Thêm dữ liệu mẫu cho bảng Products với trường type
INSERT INTO Products (id, category_id, type, title, price, discount, thumbnail, description, created_at, updated_at, deleted)
VALUES
(1, 1, 'Áo', 'AIRism Áo Polo Cổ Thường', 489000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/448947/item/goods_09_448947.jpg?width=320', 'Mô tả về sản phẩm 1', '2023-01-08', '2023-01-12', 0),
(2, 1, 'Áo', 'AIRism Áo Polo Gài Nút', 489000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/441604/item/goods_00_441604.jpg?width=750', 'Mô tả về sản phẩm 2', '2023-01-08', '2023-01-12', 0),
(3, 1, 'Áo', 'Áo Polo Dry-Ex Ngắn Tay', 391000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/433041/item/goods_69_433041.jpg?width=750', 'Mô tả về sản phẩm 3', '2023-01-08', '2023-01-12', 0),
(4, 1, 'Áo', 'DRY-EX Áo Polo Ngắn Tay', 244000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/464897/item/goods_63_464897.jpg?width=750', 'Mô tả về sản phẩm 4', '2023-01-08', '2023-01-12', 0),
(7, 1, 'Quần', 'EZY Quần Jean Siêu Co Giãn', 784000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/439178/item/goods_68_439178.jpg?width=750', 'Mô tả về sản phẩm 7', '2023-01-08', '2023-01-12', 0),
(8, 1, 'Quần', 'Quần Jean Siêu Co Giãn', 980000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455472/item/goods_09_455472.jpg?width=750', 'Mô tả về sản phẩm 8', '2023-01-08', '2023-01-12', 0),
(11, 1, 'Quần', 'Quần Smart Pants', 588000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/451818/item/goods_07_451818.jpg?width=750', 'Mô tả về sản phẩm 11', '2023-01-08', '2023-01-12', 0),
(12, 1, 'Quần', 'AirSense Quần Dài', 980000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462618/item/goods_09_462618.jpg?width=750', 'Mô tả về sản phẩm 12', '2023-01-08', '2023-01-12', 0),
(13, 2, 'Áo', 'Áo Thun Cổ Tròn', 293000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462666/item/goods_31_462666.jpg?width=750', 'Mô tả về sản phẩm 13', '2023-01-08', '2023-01-12', 0),
(14, 2, 'Áo', 'HEATTECH Áo Nỉ', 980000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/449878/item/goods_12_449878.jpg?width=750', 'Mô tả về sản phẩm 14', '2023-01-08', '2023-01-12', 0),
(15, 2, 'Áo', 'Áo Nỉ Có Mũ Dài', 784000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/419503/item/goods_09_419503.jpg?width=750', 'Mô tả về sản phẩm 15', '2023-01-08', '2023-01-12', 0),
(16, 2, 'Áo', 'Áo Len Cổ Tròn', 588000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/450509001/item/goods_11_450509001.jpg?width=750', 'Mô tả về sản phẩm 16', '2023-01-08', '2023-01-12', 0),
(31, 3, 'Quần', 'Quần Jeans Baggy', 580000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462976/sub/goods_462976_sub14.jpg?width=750', 'Mô tả về sản phẩm 31', '2023-01-08', '2023-01-12', 0),
(32, 3, 'Quần', 'Quần Denim Siêu Co Giãn Ống Ôm Dần', 580000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/454364/sub/goods_454364_sub14.jpg?width=750', 'Mô tả về sản phẩm 32', '2023-01-08', '2023-01-12', 0),
(33, 3, 'Quần', 'Quần Nỉ Dry Siêu Co Giãn', 391000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/463500/sub/goods_463500_sub14.jpg?width=750', 'Mô tả về sản phẩm 33', '2023-01-08', '2023-01-12', 0),
(34, 3, 'Quần', 'Quần Váy Xếp Ly Kẻ Caro', 489000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/460668003/sub/goods_460668003_sub14.jpg?width=750', 'Mô tả về sản phẩm 34', '2023-01-08', '2023-01-12', 0),
(35, 3, 'Quần', 'Quần Jean Mềm Siêu Co Giãn', 391000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/454371/sub/goods_454371_sub14.jpg?width=750', 'Mô tả về sản phẩm 35', '2023-01-08', '2023-01-12', 0);



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


INSERT INTO `ProductTypes` (`name`) VALUES
('Áo'),
('Quần');

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

-- Chèn dữ liệu vào bảng ProductSizes
INSERT INTO ProductSizes (product_id, size, quantity)
VALUES
(1, 'S', 10),
(1, 'M', 17),
(1, 'L', 18),
(2, 'S', 3),
(2, 'M', 2),
(2, 'L', 15),
(3, 'S', 14),
(3, 'M', 19),
(3, 'L', 10),
(4, 'S', 5),
(4, 'M', 13),
(4, 'L', 15),
(5, 'S', 12),
(5, 'M', 13),
(5, 'L', 7),
(6, 'S', 14),
(6, 'M', 6),
(6, 'L', 6),
(7, 'S', 16),
(7, 'M', 9),
(7, 'L', 10),
(8, 'S', 4),
(8, 'M', 10),
(8, 'L', 13),
(9, 'S', 10),
(9, 'M', 18),
(9, 'L', 19),
(10, 'S', 11),
(10, 'M', 15),
(10, 'L', 2),
(11, 'S', 12),
(11, 'M', 18),
(11, 'L', 16),
(12, 'S', 6),
(12, 'M', 15),
(12, 'L', 14),
(13, 'S', 14),
(13, 'M', 9),
(13, 'L', 12),
(14, 'S', 12),
(14, 'M', 17),
(14, 'L', 6),
(15, 'S', 1),
(15, 'M', 10),
(15, 'L', 15),
(16, 'S', 12),
(16, 'M', 13),
(16, 'L', 12),
(17, 'S', 3),
(17, 'M', 2),
(17, 'L', 7),
(18, 'S', 9),
(18, 'M', 3),
(18, 'L', 1),
(19, 'S', 1),
(19, 'M', 17),
(19, 'L', 2),
(20, 'S', 18),
(20, 'M', 6),
(20, 'L', 1),
(21, 'S', 10),
(21, 'M', 14),
(21, 'L', 6),
(22, 'S', 4),
(22, 'M', 11),
(22, 'L', 17),
(23, 'S', 3),
(23, 'M', 15),
(23, 'L', 3),
(24, 'S', 3),
(24, 'M', 16),
(24, 'L', 2),
(25, 'S', 12),
(25, 'M', 1),
(25, 'L', 17),
(26, 'S', 12),
(26, 'M', 9),
(26, 'L', 3),
(27, 'S', 18),
(27, 'M', 17),
(27, 'L', 2),
(28, 'S', 17),
(28, 'M', 17),
(28, 'L', 11),
(29, 'S', 9),
(29, 'M', 14),
(29, 'L', 18),
(30, 'S', 1),
(30, 'M', 6),
(30, 'L', 3),
(31, 'S', 15),
(31, 'M', 14),
(31, 'L', 19),
(32, 'S', 9),
(32, 'M', 5),
(32, 'L', 3),
(33, 'S', 9),
(33, 'M', 18),
(33, 'L', 18),
(34, 'S', 2),
(34, 'M', 3),
(34, 'L', 11),
(35, 'S', 19),
(35, 'M', 13),
(35, 'L', 1),
(36, 'S', 12),
(36, 'M', 15),
(36, 'L', 2);


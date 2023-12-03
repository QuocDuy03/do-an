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
  `status` varchar(20) DEFAULT 'In stock', -- Thêm trường status với giá trị mặc định là 'In stock'
  CONSTRAINT `fk_products_category_id` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`)
);

CREATE TABLE `ProductSizes` (
  `product_id` int,
  `size` varchar(10),
  `quantity` int,
  PRIMARY KEY (`product_id`, `size`),
  CONSTRAINT `fk_productSizes_products` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`)
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
  FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
   FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`)
);




ALTER TABLE `Users` ADD FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`);

ALTER TABLE `Products` ADD FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`);

ALTER TABLE `Order_Details` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Galeries` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Order_Details` ADD FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `ProductSizes` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);


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


-- Trigger cho bảng Products
DELIMITER //
CREATE TRIGGER before_update_product_quantity
BEFORE UPDATE ON Products
FOR EACH ROW
BEGIN
    IF NEW.quantity = 0 THEN
        SET NEW.status = 'Hết hàng';
    ELSE
        SET NEW.status = 'In stock';
    END IF;
END;
//
DELIMITER ;

/* đặt giá trị của quantity thành tổng của các giá trị quantity trong bảng ProductSizes cho product_id mới được chèn. */
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

-- Trigger cho bảng ProductSizes khi xóa
DELIMITER //
CREATE TRIGGER after_delete_product_size
AFTER DELETE ON ProductSizes
FOR EACH ROW
BEGIN
    UPDATE Products
    SET quantity = (SELECT SUM(quantity) FROM ProductSizes WHERE product_id = OLD.product_id)
    WHERE id = OLD.product_id;
END;
//
DELIMITER ;

-- Trigger cho bảng ProductSizes khi sửa
DELIMITER //
CREATE TRIGGER after_update_product_size
AFTER UPDATE ON ProductSizes
FOR EACH ROW
BEGIN
    UPDATE Products
    SET quantity = (SELECT SUM(quantity) FROM ProductSizes WHERE product_id = NEW.product_id)
    WHERE id = NEW.product_id;
END;
//
DELIMITER ;

-- Trigger cho bảng ProductSizes
DELIMITER //
CREATE TRIGGER before_update_product_size_quantity
BEFORE UPDATE ON ProductSizes
FOR EACH ROW
BEGIN
    IF NEW.quantity = 0 THEN
        UPDATE Products
        SET quantity = (SELECT SUM(quantity) FROM ProductSizes WHERE product_id = NEW.product_id),
            status = 'Hết hàng'
        WHERE id = NEW.product_id;
    ELSE
        UPDATE Products
        SET quantity = (SELECT SUM(quantity) FROM ProductSizes WHERE product_id = NEW.product_id),
            status = 'In stock'
        WHERE id = NEW.product_id;
    END IF;
END;
//
DELIMITER ;
-- -------------------------------------------------------


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
(18, 2, 'Áo PEACE FOR ALL (Hana Tajima)', 391000, 0, 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/457857/item/goods_10_457857.jpg?width=750', 'Mô tả về sản phẩm 18', '2023-01-08', '2023-01-12', 0),
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
-- Bổ sung cột type dựa vào tên sản phẩm
UPDATE Products
SET type = CASE
    WHEN title LIKE '%Áo%' THEN 'Áo'
    WHEN title LIKE '%Quần%' THEN 'Quần'
    ELSE NULL
END;


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
(35, 'L', 1);


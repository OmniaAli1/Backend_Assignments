const express = require("express");
const {connection, connectDB} = require("./db");  
connectDB();

const app = express();
app.use(express.json());

//===========================================================================
/* 1. Create Tables */

connection.execute(`
CREATE TABLE IF NOT EXISTS suppliers (
  supplier_id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_name TEXT,
  contact_number TEXT
)
`);

connection.execute(`
CREATE TABLE IF NOT EXISTS products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  product_name TEXT,
  price DECIMAL(10,2),
  stock_quantity INT,
  supplier_id INT,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
)
`);

connection.execute(`
CREATE TABLE IF NOT EXISTS sales (
  sale_id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT,
  quantity_sold INT,
  sale_date DATE,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
)
`);

/* 2. Add category column */
connection.execute(`
ALTER TABLE products ADD category TEXT
`);

/* 3. Remove category column */
connection.execute(`
ALTER TABLE products DROP COLUMN category
`);

/* 4. Modify contact_number */
connection.execute(`
ALTER TABLE suppliers MODIFY contact_number VARCHAR(15)
`);

/* 5. Add NOT NULL constraint */
connection.execute(`
ALTER TABLE products MODIFY product_name TEXT NOT NULL
`);

console.log("Schema created & modified");

/* 6. Inserts */

// supplier
connection.execute(`
INSERT INTO suppliers (supplier_name, contact_number)
VALUES ('FreshFoods', '01001234567')
`);

// products
connection.execute(`
INSERT INTO products (product_name, price, stock_quantity, supplier_id)
VALUES
('Milk', 15.00, 50, 1),
('Bread', 10.00, 30, 1),
('Eggs', 20.00, 40, 1)
`);

// sale
connection.execute(`
INSERT INTO sales (product_id, quantity_sold, sale_date)
VALUES (1, 2, '2025-05-20')
`);

/* 7. Update price */
connection.execute(`
UPDATE products
SET price = 25.00
WHERE product_name = 'Bread'
`);

/* 8. Delete product */
connection.execute(`
DELETE FROM products
WHERE product_name = 'Eggs'
`);

/* 9. Total quantity sold per product */
connection.execute(`
SELECT 
  p.product_name,
  IFNULL(SUM(s.quantity_sold), 0) AS total_quantity_sold
FROM products p
LEFT JOIN sales s ON p.product_id = s.product_id
GROUP BY p.product_id
`, (err, results) => {
  console.table(results);
});

/* 10. Product with highest stock */
connection.execute(`
SELECT product_name, stock_quantity
FROM products
ORDER BY stock_quantity DESC
LIMIT 1
`);

/* 11. Suppliers starting with F */
connection.execute(`
SELECT *
FROM suppliers
WHERE supplier_name LIKE 'F%'
`);

/* 12. Products never sold */
connection.execute(`
SELECT p.*
FROM products p
LEFT JOIN sales s ON p.product_id = s.product_id
WHERE s.sale_id IS NULL
`);

/* 13. Sales with product name */
connection.execute(`
SELECT 
  p.product_name,
  s.quantity_sold,
  s.sale_date
FROM sales s
JOIN products p ON s.product_id = p.product_id
`);

/* 14. Create user + grant permissions */
connection.execute(`
CREATE USER IF NOT EXISTS 'store_manager'@'localhost'
IDENTIFIED BY '123'
`);

connection.execute(`
GRANT SELECT, INSERT, UPDATE
ON retail_store.*
TO 'store_manager'@'localhost'
`);

/* 15. Revoke UPDATE */
connection.execute(`
REVOKE UPDATE
ON retail_store.*
FROM 'store_manager'@'localhost'
`);

/* 16. Grant DELETE on sales only */
connection.execute(`
GRANT DELETE
ON retail_store.sales
TO 'store_manager'@'localhost'
`);

//==================================================================================================

const port = 3000;

app.listen(port, () => {
    console.log("Application is running on port", port);
});
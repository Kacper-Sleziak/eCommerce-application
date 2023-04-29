CREATE TABLE category (
    category_id serial PRIMARY KEY,
    name varchar(255) NOT NULL
);

CREATE TABLE address (
    address_id serial PRIMARY KEY,
    country varchar(255) NOT NULL,
    region varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    postal_code varchar(255) NOT NULL,
    street varchar(255) NOT NULL,
    building int NOT NULL,
    flat varchar(3),
    latitude varchar(10),
    longitude varchar(10)
);

CREATE TABLE role (
    role_id serial PRIMARY KEY,
    name varchar(255) NOT NULL
);

CREATE TABLE user_ (
    user_id serial PRIMARY KEY,
    role_id int NOT NULL,
    address_id int NOT NULL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE sale_order (
    order_id serial PRIMARY KEY,
    buyer_id int NOT NULL,
    seller_id int NOT NULL,
    order_date date NOT NULL,
    total_price  decimal(8, 2) NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES user_(user_id),
    FOREIGN KEY (seller_id) REFERENCES user_(user_id)
);

CREATE TABLE review (
    review_id serial PRIMARY KEY,
    seller_id int NOT NULL,
    reviewer_id int NOT NULL,
    review int NOT NULL,
    review_description varchar(255) NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES user_(user_id),
    FOREIGN KEY (reviewer_id) REFERENCES user_(user_id)
);

CREATE TABLE product (
    product_id serial PRIMARY KEY,
    seller_id int NOT NULL,
    name varchar(255) NOT NULL,
    product_description varchar(255) NOT NULL,
    quantity int NOT NULL,
    total_price decimal(8,2) NOT NULL,
    sale_type varchar(20),
    FOREIGN KEY (seller_id) REFERENCES user_(user_id)
);

CREATE TABLE question_answer (
    qa_id serial PRIMARY KEY,
    product_id int NOT NULL,
    question varchar(255) NOT NULL,
    answer varchar(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE photo (
    photo_id serial PRIMARY KEY,
    photo_url varchar(255) NOT NULL,
    product_id int NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE product_category (
    category_id int NOT NULL,  
    product_id int NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE order_product (
    order_id int NOT NULL,
    product_id int NOT NULL,
    quantity int NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES sale_order(order_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE auction (
    auction_id serial PRIMARY KEY,
    product_id int NOT NULL,
    highest_bidder_id int NOT NULL,
    current_price decimal(8,2) NOT NULL,
    highest_bid decimal(8,2) NOT NULL,
    minimal_bump decimal(5,2) NOT NULL,
    end_date date NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (highest_bidder_id) REFERENCES user_(user_id)
);

INSERT INTO category(name) VALUES ('Car'), ('Desk'), ('Chair');

INSERT INTO address(country, region, city, postal_code, street, building, flat, latitude, longitude) VALUES ('Poland', 'Lower Silesia', 'Wroclaw', '51-000', 'Grunwaldzka', 16, 2, null, null);

INSERT INTO role(name) VALUES ('Admin'), ('User');

INSERT INTO user_(role_id, address_id, username, email, password) VALUES (1, 1, 'adm', 'adm@pwr.pl', 'p0o9i8u7'), (2, 1, 'pickle', 'pickle@pwr.pl', '1q2w3e4r5t');

INSERT INTO sale_order(buyer_id, seller_id, order_date, total_price) VALUES (2, 1, '2023-03-03', 599.98);

INSERT INTO review(seller_id, reviewer_id, review, review_description) VALUES (1, 2, 8, 'Pretty good');

INSERT INTO product(seller_id, name, product_description, quantity, total_price, sale_type) VALUES (1, 'Office chair', 'Pretty comfy chair', 6, 299.99, 'Regular'), (1, 'Volvo V4', 'Not used much to be honest', 1, 52299.99, 'Regular'), (1, 'Tesla T100', 'Exploited, barely usable', 1, 263299.99, 'Regular'), (1, 'Bentley B1', 'A classic, pristine condition. No scratches, not even used. Without tires', 1, 300000.00, 'Auction');

INSERT INTO question_answer(product_id, question, answer) VALUES (4, 'Is it red?', 'It is white');

INSERT INTO photo(photo_url, product_id) VALUES ('photo_1.pl', 1), ('photo_2.pl', 2), ('photo_3.pl', 3), ('photo_4.pl', 4);

INSERT INTO product_category(category_id, product_id) VALUES (3, 1), (1, 2), (1, 3), (1, 4);

INSERT INTO order_product(order_id, product_id, quantity) VALUES (1, 1, 2);

INSERT INTO auction(product_id, highest_bidder_id, current_price, highest_bid, minimal_bump, end_date) VALUES (4, 2, 301000.00, 350000.00, 500, '2023-06-30');

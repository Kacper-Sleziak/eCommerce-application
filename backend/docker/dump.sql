CREATE TABLE category (
    category_id serial PRIMARY KEY,
    Name varchar(255) NOT NULL
);

CREATE TABLE address (
    address_id serial PRIMARY KEY,
    country varchar(255) NOT NULL,
    region varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    postal_code varchar(255) NOT NULL,
    street varchar(255) NOT NULL,
    bulding int NOT NULL,
    flat varchar(3),
    latitude varchar(10),
    longitude varchar(10)
);

CREATE TABLE role (
    role_id serial PRIMARY KEY,
    Name varchar(255) NOT NULL
);

CREATE TABLE user_ (
    user_id serial PRIMARY KEY,
    role_id int NOT NULL,
    address_id int NOT NULL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
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


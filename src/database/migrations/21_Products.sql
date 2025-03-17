CREATE TABLE IF NOT EXISTS Products (
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    product_value DECIMAL(12,2) NOT NULL,
    amount INT NOT NULL,
    product_description VARCHAR(1000) NOT NULL,
    img BYTEA NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
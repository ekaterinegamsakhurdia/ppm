-- only one table for orders
-- end < now() - past order
-- when creating an order start > now (you can't book in the past)

-- Create a table for upcoming orders
drop table orders
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_email VARCHAR NOT NULL REFERENCES users(email) ON UPDATE CASCADE ON DELETE CASCADE,
    post_id INT NOT NULL REFERENCES posts(post_id) ON UPDATE CASCADE ON DELETE CASCADE,
    rental_start TIMESTAMP,
    rental_duration_hours REAL NOT NULL CHECK (rental_duration_hours > 0),
    calculated_price DECIMAL(10,2) ,
    calculated_end_time TIMESTAMP GENERATED ALWAYS AS (rental_start + (rental_duration_hours * INTERVAL '1 hour')) STORED,
    order_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chrono_check CHECK (rental_start >= CURRENT_TIMESTAMP)
);



drop table upcoming_orders
drop table past_orders

-- Create a table for past/completed orders
CREATE TABLE past_orders (
    order_id INT PRIMARY KEY,
    user_email VARCHAR NOT NULL,
    post_id INT NOT NULL,
    rental_start TIMESTAMP NOT NULL,
    rental_end TIMESTAMP NOT NULL,
    rental_duration_hours INT NOT NULL,
    calculated_price DECIMAL(10,2) NOT NULL,
    order_created_at TIMESTAMP NOT NULL,
    order_completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Trigger function to calculate price based on rental duration
CREATE OR REPLACE FUNCTION calculate_rental_price()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate price based on hours (you can adjust this formula as needed)
    -- Here I'm using a simple linear pricing model: price per hour * duration
    -- Using the original product price as the base price per hour
    SELECT product_price * NEW.rental_duration_hours 
    INTO NEW.calculated_price
    FROM posts
    WHERE post_id = NEW.post_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to calculate price before insert or update
CREATE TRIGGER trg_calculate_price
BEFORE INSERT OR UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION calculate_rental_price();

-- Trigger function to move completed orders to past_orders
CREATE OR REPLACE FUNCTION move_completed_orders()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if rental period has ended
    IF NEW.calculated_end_time <= CURRENT_TIMESTAMP THEN
        -- Insert into past_orders
        INSERT INTO past_orders (
            order_id, user_email, post_id, rental_start, 
            rental_end, rental_duration_hours, 
            calculated_price, order_created_at
        )
        VALUES (
            NEW.order_id, NEW.user_email, NEW.post_id, 
            NEW.rental_start, NEW.calculated_end_time, 
            NEW.rental_duration_hours, NEW.calculated_price, 
            NEW.order_created_at
        );
        
        -- Delete from upcoming_orders
        DELETE FROM upcoming_orders WHERE order_id = NEW.order_id;
        
        RETURN NULL; -- Since we're deleting, return NULL to cancel the update
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check for completed orders on update (could be run periodically)
CREATE TRIGGER trg_move_completed_orders
AFTER UPDATE ON upcoming_orders
FOR EACH ROW
EXECUTE FUNCTION move_completed_orders();



-- Insert test users
INSERT INTO users (first_name, last_name, phone_number, email, password) VALUES
('John', 'Doe', '555-0101', 'john@kiu.edu.ge', 'password123'),
('Jane', 'Smith', '555-0102', 'jane@kiu.edu.ge', 'password456'),
('Mike', 'Johnson', '555-0103', 'mike@kiu.edu.ge', 'password789');

-- Insert test products
INSERT INTO posts (user_email, product_name, product_price, product_description, product_type) VALUES
('john@kiu.edu.ge', 'Mountain Bike', 15, 'Great for campus transportation', 'Transportation'),
('jane@kiu.edu.ge', 'Projector', 20, 'HD projector for presentations', 'Other'),
('mike@kiu.edu.ge', 'Mini Fridge', 10, 'Compact fridge for dorms', 'Home Appliances');

-- Current time for reference (adjust as needed)
SELECT NOW() AS current_time;

-- Insert test rentals (past, current, and future)
-- Past rental (should move to past_orders immediately)
INSERT INTO orders (user_email, post_id, rental_start, rental_duration_hours)
VALUES ('john@kiu.edu.ge', 1, NOW(), (1./60));

-- Current rental (in progress)
INSERT INTO upcoming_orders (user_email, post_id, rental_start, rental_duration_hours)
VALUES ('jane@kiu.edu.ge', 2, NOW() - INTERVAL '1 hour', 4);

-- Future rental (upcoming)
INSERT INTO upcoming_orders (user_email, post_id, rental_start, rental_duration_hours)
VALUES ('mike@kiu.edu.ge', 3, NOW() + INTERVAL '1 day', 2);

-- Another future rental with different duration
INSERT INTO upcoming_orders (user_email, post_id, rental_start, rental_duration_hours)
VALUES ('john@kiu.edu.ge', 2, NOW() + INTERVAL '3 hours', 5);

select * from upcoming_orders
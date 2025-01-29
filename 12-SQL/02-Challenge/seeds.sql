USE employee_db;

-- Insert departments first
INSERT INTO departments (name) VALUES ('Engineering'), ('Sales'), ('Finance');

-- Insert roles after departments
INSERT INTO roles (title, salary, department_id) VALUES 
('Software Engineer', 100000, 1),
('Sales Manager', 90000, 2),
('Accountant', 80000, 3);

-- Insert employees after roles
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Emily', 'Jones', 3, NULL);
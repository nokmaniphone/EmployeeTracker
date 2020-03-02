USE employees_db;

INSERT INTO departments (department_name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Marketing');

INSERT INTO `roles` (role_title, salary, department_id) VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Software Engineer', 120000, 2),
  ('Lead Engineer', 150000, 2),
  ('Accounting Manager', 160000, 3),
  ('Accountant', 70000, 3),
  ('Lawyer', 190000, 4),
  ('Legal Team Lead', 250000, 4),
  ('Marketing Manager', 90000, 5),
  ('Marketing Associate', 55000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('Jonh', 'Deo', 1, 2),
  ('Jamie', 'Chang', 2, 1),
  ('Nicky', 'Linh', 3, null),
  ('Dma', 'Strib', 4, 3),
  ('Tommy', 'Roo', 5, null),
  ('Lett', 'Son', 6, null),
  ('Bob', 'Xinh', 7, 5),
  ('George', 'Do', 8, 8),
  ('Chann', 'Jake', 9,7),
  ('Brad', 'Sayavong', 10, null),
  ('Merry', 'Robin', 11, 9),
  ('Nok', 'Sayavong', 12, null);
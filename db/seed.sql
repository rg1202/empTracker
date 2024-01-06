use employees;

INSERT INTO serviceLine
    (name)
VALUES
    ('Dietetics'),
    ('Operations'),
    ('Therapy'),
    ('Coaching');

INSERT INTO role
    (title, salary, serviceLine_id)
VALUES
    ('Lead Therapist', 100000, 3),
    ('Therapist', 80000, 3),
    ('Lead Dietitian', 100000, 1),
    ('Dietitian', 80000, 1),
    ('Operations Manager', 150000, 2),
    ('Lead Coach', 100000, 4),
    ('Coach', 65000, 4),
    ('Engineer', 160000, 2), 
    ('Accountant', 125000, 2),
    ('Legal Team Lead', 250000, 2),
    ('Lawyer', 190000, 2);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Glenn', 'Goulsby', 2, 1),
    ('Meghan', 'Forsyth', 3, NULL),
    ('Noir', 'Iyani', 4, 3),
    ('Chris', 'Chan', 5, NULL),
    ('Adam', 'Stinet', 6, NULL),
    ('TheBig', 'Lebowski', 7, 6),
    ('Tim', 'Timmerson', 8, 2),
    ('Sally', 'Sallyson', 9, 2),
    ('Sue', 'Sueson', 10, NULL),
    ('Bob', 'Bobson', 11, 10);
    

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
    ('John', 'Doe', 1, 3),
    ('Glenn', 'Goulsby', 3, 1),
    ('Meghan', 'Forsyth', 3, NULL),
    ('Noir', 'Iyani', 4, 6),
    ('Chris', 'Chan', 6, NULL),
    ('Adam', 'Stinet', 2, 5),
    ('TheBig', 'Lebowski', 2, NULL),
    ('Tim', 'Timmerson', 10, 11);
    ('Sally', 'Sallyson', 11, NULL),
    ('Sue', 'Sueson', 8, NULL),
    ('Bob', 'Bobson', 10, NULL);
    

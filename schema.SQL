DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;
USE employees_DB;

CREATE TABLE department
(
  id INT NOT NULL
  AUTO_INCREMENT,
    name VARCHAR
  (30),
  PRIMARY KEY
  (id)
);

  INSERT INTO department
    (name)
  VALUES
    ("sales"),
    ("accounting"),
    ("marketing"),
    ("technology");
  SELECT *
  FROM department;


  CREATE TABLE role
  (
    id INT NOT NULL
    AUTO_INCREMENT,
    title VARCHAR
    (30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY
    (department_id) REFERENCES department
    (id),
  PRIMARY KEY
    (id)
);

    INSERT INTO role
      (title, salary, department_id)
    VALUES
      ("sales manager", 100000, 1),
      ("accounting manager", 150000, 2),
      ("marketing manager", 120000, 3)
,
      ("tech manager", 300000, 4),
      ("salesman", 75000, 1),
      ("accountant", 175000, 2)
,
      ("marketing assistant", 125000, 3),
      ("senior developer", 500000, 4);
    SELECT *
    FROM role;

    CREATE TABLE employee
    (
      id INT NOT NULL
      AUTO_INCREMENT,
    first_name VARCHAR
      (30),
    last_name VARCHAR
      (30),
    role_id INT,
    manager_id INT,
      PRIMARY KEY
      (id),
       FOREIGN KEY
      (role_id) REFERENCES role
      (id),
          FOREIGN KEY
      (manager_id) REFERENCES employee
      (id)

);

      INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
      VALUES
        ("lauren", "hutchinson", 1, NULL),
        ("mackenzie", "hutchinson", 2, NULL),
        ("marcela", "hernandez", 5, 1),
        ("Libby", "Harrison", 3, NULL),
        ("chace", "schornstein", 7, 5);


      SELECT *
      FROM employee;

      SELECT department.id AS departmentID, department.name, role.id AS roleID, role.title
      FROM department LEFT JOIN role ON role.department_id = department.id;

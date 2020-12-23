DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;
USE employees_DB;

// employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
  PRIMARY KEY (id)
);

// role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
  PRIMARY KEY (id)
);

// department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
  PRIMARY KEY (id)
);
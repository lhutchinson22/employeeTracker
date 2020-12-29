// call once somewhere in the beginning of the app
const cTable = require("console.table");
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "universe",
  database: "employees_DB",
});
connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});
const mainMenu = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "view all employees",
        "view all employees by department",
        "view all employees by manager",
        "add employee",
        // "remove employee",
        // "update employee",
        "update employee role",
        // "update employee manager",
        "exit",
      ],
    })
    .then((userResponse) => {
      switch (userResponse.action) {
        case "view all employees":
          employeeSearch();
          break;
        case "view all employees by department":
          deparmentSearch();
          break;
        case "view all employees by manager":
          console.log("view by manager");
          break;
        case "add employee":
          addEmployee();
          break;
        // case "remove employee":
        //   console.log("remove employee");
        //   break;
        // case "update employee":
        //   console.log("update employee");
        //   break;
        case "update employee role":
          console.log("update employee role");
          break;
        // case "update employee manager":
        //   console.log("update employee manager");
        // break;
        default:
          connection.end();
          process.exit(0);
          break;
      }
    });
};
// function to search all employees
const employeeSearch = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// function to search for employees by their department
const deparmentSearch = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which department",
          name: "deptChoices",
          choices: res,
        },
      ])
      .then((deptData) => {
        console.log(deptData);
        connection.query(
          `SELECT department.id, department.name, role.id, employee.first_name 
        FROM department 
        INNER JOIN role ON role.department_id = department.id
        INNER JOIN employee ON role.id = employee.role_id
        WHERE department.name = "${deptData.deptChoices}";`,
          (err, data) => {
            if (err) throw err;
            console.table(data);
          }
        );
      });
  });
  mainMenu();
};

// function to add Employee, role, department
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "first name of new employee?",
      },
      {
        name: "last_name",
        type: "input",
        message: "last name of new employee?",
      },
      {
        name: "role",
        type: "input",
        message: "role of new employee?",
      },
      {
        name: "department",
        type: "input",
        message: "department of new employee?",
      },
    ])
    .then(({ first, last, roleID, department }) => {
      ///console tables the input
      console.table(newEmployee);

      //connection to workbench table
      connection.query(function (err) {
        if (err) throw err;
        console.log("Connected to employee table!");
        //inseting into the table what is captured by node
        var sql =
          "INSERT INTO employee (first_name, last_name, role_id, department) VALUES ?";
        {
          first, last, roleID, department;
        }
        // error:  ReferenceError: newEmployee is not defined
        data.forEach((item) => {
          console.log("Employee record inserted");
          console.table(item.first, item.last, item.roleID, item.department);
        });
      });
      mainMenu();
    });
};

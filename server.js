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
        "add employee",
        "update employee role",
        "exit",
      ],
    })
    .then((userResponse) => {
      switch (userResponse.action) {
        case "view all employees":
          employeeSearch();
          break;
        case "view all employees by department":
          departmentSearch();
          break;
        case "add employee":
          addEmployee();
          break;
        case "update employee role":
          updateEmployeeRole();
          break;
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
const departmentSearch = () => {
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
  connection.query("SELECT title FROM role", (err, roleRes) => {
    if (err) throw err;

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
          type: "list",
          message: "role id of new employee?",
          choices: [1, 2, 3, 4, 5, 6, 7, 8],
        },
        {
          name: "manager",
          type: "list",
          message: "manager id of new employee?",
          choices: [1, 2, 3, 4, 5, 6, 7, 8],
        },
      ])
      .then(({ first_name, last_name, role, manager }) => {
        if (err) throw err;
        console.log("Connected to employee table!");
        console.log("first: " + first_name);
        console.log("last: " + last_name);

        //inserting into the table what is captured by node
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: first_name,
            last_name: last_name,
            role_id: role,
            manager_id: manager,
          },
          (err, res) => {
            if (err) throw err;
            console.table(res.affectedRows);
            console.log("Added employee to table successful");
            // console.log("res test: " + res);
            mainMenu();
          }
        );
      });
  });
};

// function to update Employee, role, department
const updateEmployeeRole = () => {
  console.log("Updating employee role --------");

  connection.query("SELECT * FROM role", (err, res2) => {
    if (err) throw err;
    console.table(res2);
    inquirer
      .prompt([
        {
          type: "list",
          message: "which role?",
          name: "roleChoices",
          choices: res2,
        },
      ])
      .then((roleData) => {
        console.log(roleData);
        // connection.query(
        //   "UPDATE role SET ? WHERE ?",
        //   [
        //     {
        //       name: res2,
        //     },
        //     {
        //       name: res2.roleChoices,
        //     },
        //   ],
        //   (err, data) => {
        //     if (err) throw err;
        //     console.table(data);
        //   }
        // );
        // mainMenu();
      });
  });
};

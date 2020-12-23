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
        "remove employee",
        "update employee",
        "update employee role",
        "update employee manager",
        "exit",
      ],
    })
    .then((userResponse) => {
      switch (userResponse.action) {
        case "view all employees":
          employeeSearch();
          break;
        case "view all employees by department":
          console.log("view by department");
          break;
        case "view all employees by manager":
          console.log("view by manager");
          break;
        case "add employee":
          console.log("view by add employee");
          break;
        case "remove employee":
          console.log("remove employee");
          break;
        case "update employee":
          console.log("update employee");
          break;
        case "update employee role":
          console.log("update employee role");
          break;
        case "update employee manager":
          console.log("update employee manager");
          break;
        default:
          connection.end();
          process.exit(0);
          break;
      }
    });
};
const employeeSearch = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log(res);
    mainMenu();
    // connection.end();
  });
};

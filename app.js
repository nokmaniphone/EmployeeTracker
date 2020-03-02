const db = require('./config/db.js');
const prompt = require('inquirer').createPromptModule();

const initChoices = [
  "View all employees",
  "View all departments",
  "View all roles",
  "Add employee",
  "Add department",
  "Add role",
  "Update employee role",
  "Exit"
];

function viewAllEmp() {
  db.query(`SELECT employees.employee_id, employees.first_name, employees.last_name, employees.role_id, employees.manager_id FROM employees`, (err, employees) => {
    if (err) throw err;
    console.log('');
    console.table(employees);
    init();
  })
}
function viewAllDep() {
  db.query('SELECT departments.department_name FROM departments', (err, departments) => {
    if (err) throw err;
    console.log('');
    console.table(departments);
    init();
  })
}

function viewAllRoles() {
  db.query(`SELECT * FROM roles`, (err, role) => {
    if (err) throw err;
    console.log('');
    console.table(roles);
    role.forEach(elem => { roles.push(elem) });
    init();
  })
}
function addEmp() {
  prompt([
    {
      type: 'input',
      name: 'empFN',
      message: "What is the Employee's first name?"
    },
    {
      type: 'input',
      name: 'empLN',
      message: "What is the Employee's last name?"
    },
    {
      type: 'number',
      name: 'empRole',
      message: "What is the Employee's Role ID#?"
    },
    {
      type: 'number',
      name: 'empMan',
      message: "Who is the Employee's manager ID#?"
    }
  ])
    .then(({ empFN, empLN, empRole, empMan }) => {
      db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
            ('${empFN}','${empLN}','${empRole}','${empMan}')`, (err) => {
        if (err) throw err;
        console.log('Successfully Added!');
        init();
      })
    })
    .catch(e => console.error(e));
}

function addDep() {
  prompt([
    {
      type: 'input',
      name: 'newDep',
      message: 'What is the name of the department?'
    }
  ])
    .then(({ newDep }) => {
      db.query(`INSERT INTO departments (department_name) VALUES ('${newDep}')`, (err) => {
        if (err) throw err;
        console.log('Department Created!');
        init();
      })
    })
    .catch(e => console.error(e));
}

function addRole() {
  prompt([
    {
      type: 'input',
      name: 'newRole',
      message: 'What is the name of the role?'
    },
    {
      type: 'input',
      name: 'newSalary',
      message: 'What is the salary for this role?'
    }
  ])
    .then(({ newRole, newSalary, newRoleId }) => {
      db.query(`INSERT INTO roles (role_title, salary, department_id) VALUES 
            ('${newRole}','${newSalary}','${newRoleId}')`, (err) => {
        if (err) throw err;
        console.log('New Role Successfully Created!');
        init();
      })
    })
    .catch(e => console.error(e));
}



function updateEmpRole() {
  db.query(`SELECT * FROM employees`, (err, emp) => {

    const empChoices = emp.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    prompt([
      {
        type: "list",
        name: "empId",
        message: "Which employee's role do you want to update?",
        choices: empChoices
      }
    ]).then((response) => {
      db.query('SELECT * FROM roles', (err, role) => {
        const roleChoice = role.map(({ id, role_title }) => ({
          name: role_title,
          value: id
        }));

        prompt([
          {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the employee?",
            choices: roleChoice
          }
        ]).then(resp => {

          db.query("UPDATE employee SET role_id = ? WHERE id = ?", [resp.roleId, response.empId], (err) => {
            if (err) throw err;
            console.log('Employee role updated!');
            init();
          })
        });
      });
    })
  })

}


function init() {
  prompt([
    {
      type: 'list',
      name: 'listlist',
      message: 'What would you like to do?',
      choices: initChoices
    }
  ]).then(({ listlist }) => {

    switch (listlist) {
      case "View all employees":
        viewAllEmp();
        break;
      case "View all departments":
        viewAllDep();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "Add employee":
        addEmp();
        break;
      case "Add department":
        addDep();
        break;
      case "Add role":
        addRole();
        break;
      case "Update employee role":
        updateEmpRole();
        break;
      case "Exit":
        process.exit();
        break;

      default:
        process.exit();
        break;
    }


  }).catch(e => console.log(e))
}

init();
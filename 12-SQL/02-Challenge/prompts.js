const inquirer = require('inquirer');

const mainMenu = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View Employees by Manager',
        'View Employees by Department',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'View Department Budget',
        'Exit'
      ]
    }
  ]);
};

const employeeDetails = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter employee first name:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter employee last name:'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter employee role ID:'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter manager ID (if any):'
    }
  ]);
};

const employeeId = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter employee ID:'
    }
  ]);
};

const employeeRole = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter new role ID:'
    }
  ]);
};

const employeeManager = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter new manager ID:'
    }
  ]);
};

const roleDetails = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter role salary:'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter department ID for the role:'
    }
  ]);
};

const departmentDetails = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter department name:'
    }
  ]);
};

const departmentId = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter department ID:'
    }
  ]);
};

const roleId = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'Enter role ID:'
    }
  ]);
};

module.exports = {
  mainMenu,
  employeeDetails,
  employeeId,
  employeeRole,
  employeeManager,
  roleDetails,
  departmentDetails,
  departmentId,
  roleId
};
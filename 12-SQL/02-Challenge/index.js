require('dotenv').config();
const { mainMenu, employeeDetails, employeeId, employeeRole, employeeManager, roleDetails, departmentDetails, departmentId, roleId } = require('./prompts');
const { getAllEmployees, createEmployee, updateEmployeeRole, updateEmployeeManager, getAllRoles, createRole, getAllDepartments, createDepartment, deleteDepartment, deleteRole, deleteEmployee, viewEmployeesByManager, viewEmployeesByDepartment, viewDepartmentBudget } = require('./employeeController');
const connection = require('./connection');

const runApp = async () => {
  let exit = false;

  while (!exit) {
    const { action } = await mainMenu();

    switch (action) {
      case 'View All Employees':
        getAllEmployees((employees) => {
          console.table(employees.map(({ id, first_name, last_name, title, department, salary, manager }) => ({
            id, first_name, last_name, title, department, salary, manager
          })));
        });
        break;

      case 'Add Employee':
        const newEmployee = await employeeDetails();
        createEmployee(newEmployee, (result) => {
          console.log('Employee added successfully.');
        });
        break;

      case 'Update Employee Role':
        const { id: roleId } = await employeeId();
        const { role_id } = await employeeRole();
        updateEmployeeRole(roleId, role_id, (result) => {
          console.log('Employee role updated successfully.');
        });
        break;

      case 'Update Employee Manager':
        const { id: empId } = await employeeId();
        const { manager_id } = await employeeManager();
        updateEmployeeManager(empId, manager_id, (result) => {
          console.log('Employee manager updated successfully.');
        });
        break;

      case 'View Employees by Manager':
        const { id: managerId } = await employeeId();
        viewEmployeesByManager(managerId, (employees) => {
          console.table(employees.map(({ id, first_name, last_name, title, department, salary }) => ({
            id, first_name, last_name, title, department, salary
          })));
        });
        break;

      case 'View Employees by Department':
        const { id: deptId } = await departmentId();
        viewEmployeesByDepartment(deptId, (employees) => {
          console.table(employees.map(({ id, first_name, last_name, title, salary, manager }) => ({
            id, first_name, last_name, title, salary, manager
          })));
        });
        break;

      case 'View All Roles':
        getAllRoles((roles) => {
          console.table(roles.map(({ id, title, salary, department }) => ({
            id, title, salary, department
          })));
        });
        break;

      case 'Add Role':
        const newRole = await roleDetails();
        createRole(newRole, (result) => {
          console.log('Role added successfully.');
        });
        break;

      case 'View All Departments':
        getAllDepartments((departments) => {
          console.table(departments.map(({ id, name }) => ({
            id, name
          })));
        });
        break;

      case 'Add Department':
        const newDepartment = await departmentDetails();
        createDepartment(newDepartment, (result) => {
          console.log('Department added successfully.');
        });
        break;

      case 'Delete Department':
        const { id: delDeptId } = await departmentId();
        deleteDepartment(delDeptId, (result) => {
          console.log('Department deleted successfully.');
        });
        break;

      case 'Delete Role':
        const { id: delRoleId } = await roleId();
        deleteRole(delRoleId, (result) => {
          console.log('Role deleted successfully.');
        });
        break;

      case 'Delete Employee':
        const { id: delEmpId } = await employeeId();
        deleteEmployee(delEmpId, (result) => {
          console.log('Employee deleted successfully.');
        });
        break;

      case 'View Department Budget':
        const { id: budgetDeptId } = await departmentId();
        viewDepartmentBudget(budgetDeptId, (budget) => {
          console.table(budget.map(({ department, utilized_budget }) => ({
            department, utilized_budget
          })));
        });
        break;

      case 'Exit':
        exit = true;
        connection.end();
        break;
    }
  }
};

runApp();
const connection = require('./connection');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllDepartments() {
    return this.connection.promise().query('SELECT * FROM departments');
  }

  findAllRoles() {
    return this.connection.promise().query(`
      SELECT roles.id, roles.title, roles.salary, departments.name AS department
      FROM roles
      LEFT JOIN departments ON roles.department_id = departments.id
    `);
  }

  findAllEmployees() {
    return this.connection.promise().query(`
      SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employees
      LEFT JOIN roles ON employees.role_id = roles.id
      LEFT JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees manager ON manager.id = employees.manager_id
    `);
  }

  createDepartment(department) {
    return this.connection.promise().query('INSERT INTO departments SET ?', department);
  }

  createRole(role) {
    return this.connection.promise().query('INSERT INTO roles SET ?', role);
  }

  createEmployee(employee) {
    return this.connection.promise().query('INSERT INTO employees SET ?', employee);
  }

  updateEmployeeRole(employeeId, roleId) {
    return this.connection.promise().query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  }
}

module.exports = new DB(connection);
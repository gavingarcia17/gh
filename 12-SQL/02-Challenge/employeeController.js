const connection = require('./connection');

const getAllEmployees = (callback) => {
  const query = `
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON manager.id = employees.manager_id;
  `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const createEmployee = (employee, callback) => {
  const { first_name, last_name, role_id, manager_id } = employee;
  connection.query('INSERT INTO employees SET ?', { first_name, last_name, role_id, manager_id }, (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const updateEmployeeRole = (id, role_id, callback) => {
  connection.query('UPDATE employees SET role_id = ? WHERE id = ?', [role_id, id], (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const updateEmployeeManager = (id, manager_id, callback) => {
  connection.query('UPDATE employees SET manager_id = ? WHERE id = ?', [manager_id, id], (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const getAllRoles = (callback) => {
  const query = `
    SELECT roles.id, roles.title, roles.salary, departments.name AS department
    FROM roles
    LEFT JOIN departments ON roles.department_id = departments.id;
  `;
  connection.query(query, (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const createRole = (role, callback) => {
  const { title, salary, department_id } = role;
  connection.query('INSERT INTO roles SET ?', { title, salary, department_id }, (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const getAllDepartments = (callback) => {
  connection.query('SELECT * FROM departments', (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const createDepartment = (department, callback) => {
  const { name } = department;
  connection.query('INSERT INTO departments SET ?', { name }, (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const deleteDepartment = (id, callback) => {
  connection.query('DELETE FROM departments WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const deleteRole = (id, callback) => {
  connection.query('DELETE FROM roles WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const deleteEmployee = (id, callback) => {
  connection.query('DELETE FROM employees WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const viewEmployeesByManager = (manager_id, callback) => {
  const query = `
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    WHERE employees.manager_id = ?;
  `;
  connection.query(query, [manager_id], (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const viewEmployeesByDepartment = (department_id, callback) => {
  const query = `
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees manager ON manager.id = employees.manager_id
    WHERE roles.department_id = ?;
  `;
  connection.query(query, [department_id], (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

const viewDepartmentBudget = (department_id, callback) => {
  const query = `
    SELECT departments.name AS department, SUM(roles.salary) AS utilized_budget
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    WHERE departments.id = ?;
  `;
  connection.query(query, [department_id], (err, results) => {
    if (err) throw err;
    callback(results);
  });
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  getAllRoles,
  createRole,
  getAllDepartments,
  createDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  viewDepartmentBudget
};
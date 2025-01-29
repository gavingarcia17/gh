class Employee {
    constructor(connection) {
        this.connection = connection;
    }

    createEmployee(employeeData) {
        return this.connection.promise().query('INSERT INTO employees SET ?', employeeData);
    }

    getAllEmployees() {
        return this.connection.promise().query('SELECT * FROM employees');
    }

    updateEmployee(employeeId, updatedData) {
        return this.connection.promise().query('UPDATE employees SET ? WHERE id = ?', [updatedData, employeeId]);
    }

    deleteEmployee(employeeId) {
        return this.connection.promise().query('DELETE FROM employees WHERE id = ?', employeeId);
    }
}

module.exports = Employee;
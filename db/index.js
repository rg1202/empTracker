const connection = require("./connection");

class DB {
	// Keeping a reference to the connection on the class in case we need it later
	constructor(connection) {
		this.connection = connection;
	}

	// Find all employees, join with roles and service line to display their roles, salaries, service line, and managers
	findAllEmployees() {
		return this.connection
			.promise()
			.query(
				"SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, serviceLine.name AS serviceLine, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN serviceLine on role.serviceLine_id = serviceLine.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
			);
	}

	// Find all employees except the given employee id
	findAllPossibleManagers(employeeId) {
		return this.connection
			.promise()
			.query(
				"SELECT id, first_name, last_name FROM employee WHERE id != ?",
				employeeId
			);
	}

	// Create a new employee
	createEmployee(employee) {
		return this.connection
			.promise()
			.query("INSERT INTO employee SET ?", employee);
	}

	// Remove an employee with the given id
	removeEmployee(employeeId) {
		return this.connection
			.promise()
			.query("DELETE FROM employee WHERE id = ?", employeeId);
	}

	// Update the given employee's role
	updateEmployeeRole(employeeId, roleId) {
		return this.connection
			.promise()
			.query("UPDATE employee SET role_id = ? WHERE id = ?", [
				roleId,
				employeeId,
			]);
	}

	// Update the given employee's manager
	updateEmployeeManager(employeeId, managerId) {
		return this.connection
			.promise()
			.query("UPDATE employee SET manager_id = ? WHERE id = ?", [
				managerId,
				employeeId,
			]);
	}

	// Find all roles, join with serviceLine s to display the serviceLine name
	findAllRoles() {
		return this.connection
			.promise()
			.query(
				"SELECT role.id, role.title, serviceLine.name AS serviceLine, role.salary FROM role LEFT JOIN serviceLine on role.serviceLine_id = serviceLine.id;"
			);
	}

	// Create a new role
	createRole(role) {
		return this.connection.promise().query("INSERT INTO role SET ?", role);
	}

	// Remove a role from the db
	removeRole(roleId) {
		return this.connection
			.promise()
			.query("DELETE FROM role WHERE id = ?", roleId);
	}

	// Find all serviceLines
	findAllserviceLines() {
		return this.connection
			.promise()
			.query("SELECT serviceLine.id, serviceLine.name FROM serviceLine;");
	}

	// Find all serviceLine, join with employees and roles and sum up utilized serviceLine budget
	viewserviceLineBudgets() {
		return this.connection
			.promise()
			.query(
				"SELECT serviceLine.id, serviceLine.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN serviceLine on role.serviceLine_id = serviceLine.id GROUP BY serviceLine.id, serviceLine.name;"
			);
	}

	// Create a new serviceLine
	createserviceLine(serviceLine) {
		return this.connection
			.promise()
			.query("INSERT INTO serviceLine SET ?", serviceLine);
	}

	// Remove a serviceLine
	remove(serviceLineId) {
		return this.connection
			.promise()
			.query("DELETE FROM serviceLine WHERE id = ?", serviceLineId);
	}

	// Find all employees in a given serviceLine, join with roles to display role titles
	findAllEmployeesByserviceLine(serviceLineId) {
		return this.connection
			.promise()
			.query(
				"SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN serviceLine serviceLine on role.serviceLine_id = serviceLine.id WHERE serviceLine.id = ?;",
				serviceLineId
			);
	}

	// Find all employees by manager, join with serviceLines and roles to display titles and serviceLine names
	findAllEmployeesByManager(managerId) {
		return this.connection
			.promise()
			.query(
				"SELECT employee.id, employee.first_name, employee.last_name, serviceLine.name AS serviceLine, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN serviceLine ON serviceLine.id = role.serviceLine_id WHERE manager_id = ?;",
				managerId
			);
	}
}

module.exports = new DB(connection);

const {prompt} = require("inquirer");
const db = require("./db");
const menuArt = require("asciiart-logo");

init();
//ascii art for menu
function init() {
	const logo = menuArt({ name: "######### Employee Manager #########" }).render();
	console.log(logo);
	loadMainPrompts();
}

function loadMainPrompts() {
	prompt([
		{
			type: "list",
			name: "choice",
			message: "Select an option to view, add, remove, or update:",
			choices: [
				{
					name: "Employees",
					value: "VIEW_EMP",
				},
				{
					name: "Employee By Service Line",
					value: "VIEW_EMP_BY_SL",
				},
				{
					name: "Employees By Manager",
					value: "VIEW_EMP_BY_MAN",
				},
				{
					name: "Add Employee",
					value: "ADD_EMP",
				},
				{
					name: "Remove Employee",
					value: "REMOVE_EMP",
				},
				{
					name: "Update Employee Role",
					value: "UPDATE_ROLE",
				},
				{
					name: "Update Employee Manager",
					value: "UPDATE_EMP_MAN",
				},
				{
					name: "View All Roles",
					value: "VIEW_ROLES",
				},
				{
					name: "Add Role",
					value: "ADD_ROLE",
				},
				{
					name: "Remove Role",
					value: "REMOVE_ROLE",
				},
				{
					name: "View All Serivce Lines",
					value: "VIEW_SL",
				},
				{
					name: "Add Service Line",
					value: "ADD_SL",
				},
				{
					name: "Remove Service Line",
					value: "REMOVE_SL",
				},
				{
					name: "View Total Utilization",
					value: "VIEW_UTIL",
				},
				{
					name: "exit",
					value: "EXIT",
				},
			],
		},
	]).then((res) => {
		let choice = res.choice;
		//based upon above selection, call appropriate function
		switch (choice) {
			case "VIEW_EMP":
				viewEmployees();
				break;
			case "VIEW_EMP_BY_SL":
				viewEmployeesByServiceLine();
				break;
			case "VIEW_EMP_BY_MAN":
				viewEmployeesByManager();
				break;
			case "ADD_EMP":
				addEmployee();
				break;
			case "REMOVE_EMP":
				removeEmployee();
				break;
			case "UPDATE_ROLE":
				updateEmployeeRole();
				break;
			case "UPDATE_EMP_MAN":
				updateEmployeeManager();
				break;
			case "VIEW_ROLES":
				viewRoles();
				break;
			case "ADD_ROLE":
				addRole();
				break;
			case "REMOVE_ROLE":
				removeRole();
				break;
			case "VIEW_SL":
				viewServiceLines();
				break;
			case "ADD_SL":
				addServiceLine();
				break;
			case "REMOVE_SL":
				removeServiceLine();
				break;
			case "VIEW_UTIL":
				viewUtilization();
				break;
			case "EXIT":
				db.end();
				break;
		}
	});
}
//functions
//employees
function viewEmployees() {
	db.findAllEmployees()
		.then(([rows]) => {
			let employees = rows;
			console.log("\n");
			console.table(employees);
		})
		.then(() => loadMainPrompts());
}

//employees by service line
function viewEmployeesByServiceLine() {
	db.findAllServiceLines().then(([rows]) => {
		let serviceLines = rows;
		const serviceLineChoices = serviceLines.map(({ id, name }) => ({
			name: name,
			value: id,
		}));
		prompt({
			type: "list",
			name: "serviceLineId",
			message: "Which Service Line?",
			choices: serviceLineChoices,
		})
			.then((res) => db.findAllEmployeesByServiceLine(res.serviceLineId))
			.then(([rows]) => {
				let employees = rows;
				console.log("\n");
				console.table(employees);
			})
			.then(() => loadMainPrompts());
	});
}

//employees by manager
function viewEmployeesByManager() {
	db.findAllEmployees().then(([rows]) => {
		let managers = rows;
		const managerChoices = managers.map(({ id, first_name, last_name }) => ({
			name: `${first_name} ${last_name}`,
			value: id,
		}));
		prompt({
			type: "list",
			name: "managerId",
			message: "Managed employees?",
			choices: managerChoices,
		})
			.then((res) => db.findAllEmployeesByManager(res.managerId))
			.then(([rows]) => {
				let employees = rows;
				console.log("\n");
				if (employees.length === 0) {
					console.log("No Reports");
				} else {
					console.table(employees);
				}
			})
			.then(() => loadMainPrompts());
	});
}

//delete employee
function removeEmployee() {
	db.findAllEmployees().then(([rows]) => {
		let employees = rows;
		const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
			name: `${first_name} ${last_name}`,
			value: id,
		}));
		prompt({
			type: "list",
			name: "employeeId",
			message: "Remove Which Employee?",
			choices: employeeChoices,
		})
			.then((res) => db.removeEmployee(res.employeeId))
			.then(() => console.log("Employee Removed!"))
			.then(() => loadMainPrompts());
	});
}

//update employee role
function updateEmployeeRole() {
	db.findAllEmployees().then(([rows]) => {
		let employees = rows;
		const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
			name: `${first_name} ${last_name}`,
			value: id,
		}));
		prompt({
			type: "list",
			name: "employeeId",
			message: "Update Which Employee?",
			choices: employeeChoices,
		}).then((res) => {
			let employeeId = res.employeeId;
			db.findAllRoles().then(([rows]) => {
				let roles = rows;
				const roleChoices = roles.map(({ id, title }) => ({
					name: title,
					value: id,
				}));
				prompt({
					type: "list",
					name: "roleId",
					message: "Which Role?",
					choices: roleChoices,
				})
					.then((res) => db.updateEmployeeRole(employeeId, res.roleId))
					.then(() => console.log("Role Updated!"))
					.then(() => loadMainPrompts());
			});
		});
	});
}
//update employee manager
function updateEmployeeManager() {
	db.findAllEmployees().then(([rows]) => {
		let employees = rows;
		const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
			name: `${first_name} ${last_name}`,
			value: id,
		}));
		prompt({
			type: "list",
			name: "employeeId",
			message: "Update Which Employee?",
			choices: employeeChoices,
		}).then((res) => {
			let employeeId = res.employeeId;
			db.findAllPossibleManagers(employeeId).then(([rows]) => {
				let managers = rows;
				const managerChoices = managers.map(
					({ id, first_name, last_name }) => ({
						name: `${first_name} ${last_name}`,
						value: id,
					})
				);
				prompt({
					type: "list",
					name: "managerId",
					message:
						"Select Manager?",
					choices: managerChoices,
				})
					.then((res) => db.updateEmployeeManager(employeeId, res.managerId))
					.then(() => console.log("Manager Updated"))
					.then(() => loadMainPrompts());
			});
		});
	});
}

//roles
function viewRoles() {
	db.findAllRoles()
		.then(([rows]) => {
			let roles = rows;
			console.log("\n");
			console.table(roles);
		})
		.then(() => loadMainPrompts());
}

//add role
function addRole() {
	db.findAllServiceLines().then(([rows]) => {
		let serviceLines = rows;
		const serviceLineChoices = serviceLines.map(({ id, name }) => ({
			name: name,
			value: id,
		}));
		prompt([
			{
				name: "title",
				message: "Name?",
			},
			{
				name: "salary",
				message: "Salary?",
			},
			{
				type: "list",
				name: "serviceLineId",
				message: "Service Line?",
				choices: serviceLineChoices,
			},
		]).then((role) => {
			db.createRole(role)
				.then(() => console.log(`${role.title} Added!`))
				.then(() => loadMainPrompts());
		});
	});
}

//delete role
function removeRole() {
	db.findAllRoles().then(([rows]) => {
		let roles = rows;
		const roleChoices = roles.map(({ id, title }) => ({
			name: title,
			value: id,
		}));
		prompt({
			type: "list",
			name: "roleId",
			message:
				"Remove which Role? (Warning: employees will be removed)",
			choices: roleChoices,
		})
			.then((res) => db.removeRole(res.roleId))
			.then(() => console.log("Role Removed!"))
			.then(() => loadMainPrompts());
	});
}

//service lines
function viewServiceLines() {
	db.findAllServiceLines()
		.then(([rows]) => {
			let serviceLines = rows;
			console.log("\n");
			console.table(serviceLines);
		})
		.then(() => loadMainPrompts());
}

//add service line
function addServiceLine() {
	prompt({
		name: "name",
		message: "Name?",
	}).then((res) => {
		let name = res;
		db.createServiceLine(name)
			.then(() => console.log(`${name.name} added!`))
			.then(() => loadMainPrompts());
	});
}

//delete service line
function removeServiceLine() {
	db.findAllServiceLines().then(([rows]) => {
		let serviceLines = rows;
		const serviceLineChoices = serviceLines.map(({ id, name }) => ({
			name: name,
			value: id,
		}));
		prompt({
			type: "list",
			name: "serviceLineId",
			message:
				"Remove which SL? (Warning: employees will be removed)",
			choices: serviceLineChoices,
		})
			.then((res) => db.removeServiceLine(res.serviceLineId))
			.then(() => console.log("Service Line Removed!"))
			.then(() => loadMainPrompts());
	});
}

//utilization
function viewUtilization() {
	db.findAllEmployees()
		.then(([rows]) => {
			let employees = rows;
			console.log("\n");
			console.table(employees);
		})
		.then(() => loadMainPrompts());
}

//add employee
function addEmployee() {
	prompt([
		{
			name: "first_name",
			message: "First Name?",
		},
		{
			name: "last_name",
			message: "Last Name?",
		},
	]).then((res) => {
		let firstName = res.first_name;
		let lastName = res.last_name;

		db.findAllRoles().then(([rows]) => {
			let roles = rows;
			const roleChoices = roles.map(({ id, title }) => ({
				name: title,
				value: id,
			}));
			prompt({
				type: "list",
				name: "roleId",
				message: "Role?",
				choices: roleChoices,
			}).then((res) => {
				let roleId = res.roleId;

				db.findAllEmployees().then(([rows]) => {
					let employees = rows;
					const managerChoices = employees.map(
						({ id, first_name, last_name }) => ({
							name: `${first_name} ${last_name}`,
							value: id,
						})
					);
					managerChoices.unshift({ name: "None", value: null });

					prompt({
						type: "list",
						name: "managerId",
						message: "Manager?",
						choices: managerChoices,
					})
						.then((res) => {
							let employee = {
								manager_id: res.managerId,
								role_id: roleId,
								first_name: firstName,
								last_name: lastName,
							};

							db.createEmployee(employee);
						})
						.then(() =>
							console.log(`${firstName} ${lastName} has been added`)
						)
						.then(() => loadMainPrompts());
				});
			});
		});
	});
}

//exit
function exit() {
	console.log("End Session!");
	process.exit();
}

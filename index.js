const inquirer = require('inquirer');
const db = require('./db');
const menuArt = require('asciiart-logo');

init();
function init() {
    const logo = menuArt({ name: "Employee Manager 1.0" }).render();
    console.log(logo);
    loadMainPrompts();
}

function loadMainPrompts() {
    promptUser({
        {
            type: 'list',
            name: 'choice',
            message: 'Select an option to view, add, remove, or update:',
            choices: [
                {
                    name: 'Employees',
                    value: 'VIEW_EMP'
                },
                {
                    name: 'Employee By Service Line',
                    value: 'VIEW_EMP_BY_SL'
                },
                {
                    name: 'Employees By Manager',
                    value: 'VIEW_EMP_BY_MAN'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMP'
                },
                {
                    name: 'Remove Employee',
                    value: 'REMOVE_EMP'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_ROLE'
                },
                {
                    name: 'Update Employee Manager',
                    value: 'UPDATE_EMP_MAN'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Remove Role',
                    value: 'REMOVE_ROLE'
                },
                {
                    name: 'View All Serivce Lines',
                    value: 'VIEW_SL'
                },
                {
                    name: 'Add Service Line',
                    value: 'ADD_SL'
                },
                {
                    name: 'Remove Service Line',
                    value: 'REMOVE_SL'
                },
                {
                    name: 'exit',
                    value: 'EXIT'
                }
            ]
        }
    }

    )
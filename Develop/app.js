const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function addMember() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter team member name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter team member ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter your team member email address:"
        },
        {
            type: "list",
            name: "role",
            message: "Choose team member role:",
            choices: [
                "Intern",
                "Engineer",
                "Manager"
            ]
        }
    ]).then(function ({ name, id, email, role }) {
        let roleReturn = "";
        if (role === "Intern") {
            roleReturn = "school name";
        } else if (role === "Engineer") {
            roleReturn = "Github username"
        } else {
            roleReturn = "office phone number"
        }
        inquirer.prompt([
            {
                type: "input",
                name: "roleReturn",
                message: `Please enter ${roleReturn} associated with team member:`
            },
            {
                type: "list",
                name: "member",
                message: "Would you like to add additional team members?",
                choices: [
                    "Yes",
                    "No"
                ]
            }
        ]).then(function ({ roleReturn, addTeamMember }) {
            let newMember;
            if (role === "Intern") {
                newMember = new Intern(name, id, email, roleReturn);
            } else if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleReturn);
            } else {
                newMember = new Manager(name, id, email, roleReturn);
            }
            employees.push(newMember);
            render(newMember)
            .then(function () {
                    if (addTeamMember === "yes") {
                        addMember();
                    } else (
                        fs.appendFile(outputPath, function (err) {
                            if (err) throw err;
                        })
                    );
                    console.log("Team member information uploaded to HTML");
                });
        });
    });
};

addMember();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

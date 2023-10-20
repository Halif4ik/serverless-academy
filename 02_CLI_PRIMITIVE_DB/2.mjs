import {stdin as input, stdout as output,} from 'node:process';
import inquirer from 'inquirer';
import * as path from 'node:path';
import * as fs from 'node:fs';

async function addUser(newUser) {
    const parseJsonData = await getAllFromBd();
    parseJsonData.push(newUser);
    return writeToBd(parseJsonData);
}

function getAllFromBd() {
    return new Promise(function (resolve, reject) {
        fs.readFile(
            path.join('db.txt'),
            'utf-8',
            (err, content) => {
                if (err) reject(err);
                else resolve(JSON.parse(content));
            }
        );
    })
}

function writeToBd(parseJsonData) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(
            path.join('db.txt'),
            JSON.stringify(parseJsonData),
            (err, content) => {
                if (err) reject(err);
                else resolve(true);
            }
        );
    })
}

async function createUser() {
    const createdUser = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter a name. To cancel Press Enter: ',
        },
        {
            type: 'list',
            name: 'gender',
            message: 'Choose your Gender:',
            choices: ['male', 'female',],
            when: (answers) => answers.name !== '',
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter your age:',
            when: (answers) => answers.name !== '',
        },
    ])
    return createdUser;
}

async function findUser() {
    const isFinding = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'search',
            message: 'Would you like search id db:',
        },
        {
            type: 'input',
            name: 'name',
            message: `Enter user's name which you going to find?`,
            when: (answers) => answers.search === true,
        }
    ])
    return isFinding;
}

!async function run() {
    const createdUser = await createUser();
    if (!createdUser.name) {
        const allUsers = await getAllFromBd();
        console.log(allUsers);
        const isFinding = await findUser();
        if (isFinding.search === true) {
            const parseBdData = await getAllFromBd();
            const result = parseBdData.find((user) => user.name.toLowerCase().trim() === isFinding.name.toLowerCase().trim())
            result ? console.log(`Founded user`,result) : console.log(`Didnt find user ${isFinding.name}`);
        } else console.log('Goodbye!');
    } else {
        console.log('writeToBd-.', createdUser);
        await addUser(createdUser);
        run();
    }
}()





import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output,} from 'node:process';

const rl = readline.createInterface({input, output});
const variationsEctions = {
    '1': 'Sort words alphabetically',
    '2': 'Show numbers from lesser to greater',
    '3': 'Show numbers from bigger to smaller',
    '4': 'Display words in ascending order by number of letters in the word',
    '5': 'Show only unique words',
    '6': 'Display only unique values from the set of words and numbers entered by the user',
    'exit': 'To exit the program, the user need to enter exit',
}

const wordsFromUser = await rl.question('To entering a few words or numbers separated by a space!');
console.log(`How would you like sort this words?`);
for (let key in variationsEctions) console.log(`${key}.`, variationsEctions[key]);

let typeSorting = await rl.question('Select (1-6) and press ENTER:');

while (true) {
    if (typeSorting.toLowerCase().trim() === 'exit') break;
    else if (variationsEctions[typeSorting]) {
        let arrWordsFromUser = wordsFromUser.split(' ');
        let result = [];
        switch (typeSorting) {
            case '1': {
                arrWordsFromUser = arrWordsFromUser.filter(word => !parseInt(word));
                result = arrWordsFromUser.sort((firstChar, second) => firstChar.localeCompare(second));
                break;
            }
            case '2': {
                arrWordsFromUser = arrWordsFromUser.filter(word => parseInt(word));
                result = arrWordsFromUser.sort((firstChar, second) => firstChar - second);
                break;
            }
            case '3': {
                arrWordsFromUser = arrWordsFromUser.filter(word => parseInt(word));
                result = arrWordsFromUser.sort((firstChar, second) => second - firstChar);
                break;
            }
            case '4': {
                arrWordsFromUser = arrWordsFromUser.filter(word => !parseInt(word));
                result = arrWordsFromUser.sort((firstChar, second) => firstChar.length - second.length);
                break;
            }
            case '5': {
                arrWordsFromUser = arrWordsFromUser.filter(word => !parseInt(word));
                for (let i = 0; i < arrWordsFromUser.length; i++) {
                    if (!result.includes(arrWordsFromUser[i])) result.push(arrWordsFromUser[i]);
                }
                break;
            }
            case '6': {
                for (let i = 0; i < arrWordsFromUser.length; i++) {
                    if (!result.includes(arrWordsFromUser[i])) result.push(arrWordsFromUser[i]);
                }
                break;
            }
        }

        console.log(`Result: ${result}`);
        break;
    } else {
        typeSorting = await rl.question('Select (1-5) and press ENTER:');
    }
}
console.log(`Goodbye!`);
rl.close();




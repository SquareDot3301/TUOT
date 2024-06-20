"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const searchWithName_1 = require("./searchWithName");
const searchByPseudo_1 = require("./searchByPseudo");
const checkDomains_1 = require("./checkDomains");
const inquirer = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function main() {
    inquirer.question("Witch method do you want to use ?\n1 = Name & Firstname\n2 = Pseudonym\n3 = Check Domains availability\n4 = Exit\n\nAnswer: ", (option) => {
        if (option === "1") {
            inquirer.question("Enter the name of the person you are looking for\n\nAnswer: ", (name) => {
                inquirer.question("Enter the firstname of the person you are looking for\n\nAnswer: ", (firstname) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, searchWithName_1.searchWithName)(name, firstname);
                    yield main();
                }));
            });
        }
        else if (option === "2") {
            inquirer.question("Enter the pseudonym of the person you are looking for\n\nAnswer : ", (pseudo) => __awaiter(this, void 0, void 0, function* () {
                yield (0, searchByPseudo_1.searchByPseudo)(pseudo);
                yield main();
            }));
        }
        else if (option === "3") {
            inquirer.question("Enter the domain names you are looking for\n\nAnswer : ", (domain) => __awaiter(this, void 0, void 0, function* () {
                yield (0, checkDomains_1.checkDomainAvailability)(domain);
                yield main();
            }));
        }
        else if (option === "4") {
            console.log("Ok, bye bye !");
            inquirer.close();
        }
        else {
            console.log("---- This is not an option, please select an option betweeb 1, 2, 3 or 4 ----\n");
            main();
        }
    });
}
main();
inquirer.on("close", () => {
    process.exit(0);
});

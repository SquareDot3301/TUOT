import readline from "readline";
import { searchWithName } from "./searchWithName";
import { searchByPseudo } from "./searchByPseudo";
import { checkDomainAvailability } from "./checkDomains";

const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  inquirer.question(
    "Witch method do you want to use ?\n1 = Name & Firstname\n2 = Pseudonym\n3 = Check Domains availability\n4 = Exit\n\nAnswer: ",
    (option: string) => {
      if (option === "1") {
        inquirer.question(
          "Enter the name of the person you are looking for\n\nAnswer: ",
          (name: string) => {
            inquirer.question(
              "Enter the firstname of the person you are looking for\n\nAnswer: ",
              async (firstname: string) => {
                await searchWithName(name, firstname);
                await main();
              }
            );
          }
        );
      } else if (option === "2") {
        inquirer.question(
          "Enter the pseudonym of the person you are looking for\n\nAnswer : ",
          async (pseudo: string) => {
            await searchByPseudo(pseudo);
            await main();
          }
        );
      } else if (option === "3") {
        inquirer.question(
          "Enter the domain names you are looking for\n\nAnswer : ",
          async (domain: string) => {
            await checkDomainAvailability(domain);
            await main();
          }
        );
      } else if (option === "4") {
        console.log("Ok, bye bye !");
        inquirer.close();
      } else {
        console.log(
          "---- This is not an option, please select an option betweeb 1, 2, 3 or 4 ----\n"
        );
        main();
      }
    }
  );
}

main();

inquirer.on("close", () => {
  process.exit(0);
});

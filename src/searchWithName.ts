import { searchTelPerson } from "./components/searchFromTelFR";
import { searchFromCopainsDavant } from "./components/searchFromCopainsDavant";

export async function searchWithName(name: string, firstname: string) {
  console.log(
    `----------------------------- Google -----------------------------\n`
  );
  console.log(`https://www.google.fr/search?q=${name}+${firstname}\n`);
  console.log(
    `----------------------------- Bing -----------------------------\n`
  );
  console.log(`https://www.bing.com/search?q=${name}+${firstname}\n`);
  console.log(
    `----------------------------- DuckDuckGo -----------------------------\n`
  );
  console.log(`https://duckduckgo.com/html?q=${name}+${firstname}\n`);

  await searchFromCopainsDavant(name, firstname).then();

  await searchTelPerson(`${name} ${firstname}`).then((info) => {
    if (info) {
      console.log(
        `----------------------------- Tel.fr -----------------------------\n`
      );
      console.log("Name:", info.name);
      console.log("Adress:", info.address);
      console.log("Postal code:", info.postalCode);
      console.log("City:", info.city);
      console.log("Phone number:", info.phone);
    }
  });
}

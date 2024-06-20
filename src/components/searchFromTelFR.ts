import * as cheerio from "cheerio";

export async function searchTelPerson(
  name: string,
  country: string = "France"
): Promise<PersonInfo | null> {
  const url = `https://www.tel.fr/pro/search?q=${encodeURIComponent(
    name
  )}&w=${country}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const personInfo: PersonInfo = {
      name: "",
      address: "",
      postalCode: "",
      city: "",
      phone: "",
    };

    // Rechercher et extraire les informations
    const infoDiv = $(".row.info");

    if (infoDiv.length > 0) {
      personInfo.name = infoDiv.find("h2[data-place-name] a").text().trim();

      // Extraire l'adresse et le code postal
      const addressElement = infoDiv
        .find("address h3")
        .contents()
        .filter(function () {
          return this.nodeType === 3; // 3 est le type de noeud pour les textes
        })
        .text()
        .trim()
        .split("\n");

      if (addressElement.length > 1) {
        personInfo.address = addressElement[0].trim();
        personInfo.postalCode = addressElement[1].trim();
      } else {
        personInfo.address = addressElement[0].trim();
      }

      personInfo.city = infoDiv.find("span[data-place-city]").text().trim();
      personInfo.phone = infoDiv
        .find(".svaphone .phone")
        .text()
        .replace("Téléphone : ", "")
        .replace(/&nbsp;/g, " ")
        .trim();

      return personInfo;
    } else {
      console.log(`No informations found for "${name}"`);
      return null;
    }
  } catch (error) {
    console.error("Error during the recuperation of the data : ", error);
    return null;
  }
}

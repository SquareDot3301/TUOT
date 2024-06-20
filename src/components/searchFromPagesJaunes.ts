import cheerio from "cheerio";

export async function searchPagesBlanches(
  name: string
): Promise<PersonInfoPagesJaunes | null> {
  const url = `https://www.pagesjaunes.fr/pagesblanches/recherche?quoiqui=${encodeURIComponent(
    name
  )}&ou=&univers=pagesblanches&idOu=`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP ${response.status} - ${response.statusText}`
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const personInfo: PersonInfoPagesJaunes = {
      name: "",
      address: "",
    };

    // Rechercher et extraire les informations
    const infoLi = $(".bi-list .bi-generic");

    if (infoLi.length > 0) {
      personInfo.name = infoLi.find("a.bi-denomination h3").text().trim();

      // Extraire l'adresse
      personInfo.address = infoLi
        .find(".bi-address a")
        .contents()
        .filter(function () {
          return this.nodeType === 3; // 3 est le type de noeud pour les textes
        })
        .text()
        .replace(/\s+/g, " ")
        .trim();

      return personInfo;
    } else {
      console.log(`Aucune information trouvée pour "${name}"`);
      return null;
    }
  } catch (error: any) {
    console.error("Erreur lors de la récupération des données:", error.message);
    return null;
  }
}

import * as cheerio from "cheerio";

export async function searchFromCopainsDavant(name: string, firstname: string) {
  const reponse = await fetch(
    `https://copainsdavant.linternaute.com/s/?full=&q=${name} ${firstname}&ty=1&xhr=`
  );
  const data = await reponse.json();
  const html = data.html;

  const $ = cheerio.load(html);

  const users: any = [];
  $(".app_list--result__search li").each((i, elem) => {
    const name = $(elem).find("h3 a").text().trim();
    const location = $(elem)
      .find(".app_list--result__search__place")
      .text()
      .trim();
    users.push({ name, location });
  });

  if (users.length > 0) {
    console.log(
      `----------------------------- CopainsDavant -----------------------------\n`
    );
    users.forEach((user: any) => {
      console.log(`Nom: ${user.name}, Location: ${user.location}\n`);
    });
  } else {
    console.log(
      `----------------------------- CopainsDavant -----------------------------\n`
    );
    console.log("No users found on Copains Davant");
  }
}

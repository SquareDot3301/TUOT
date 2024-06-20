export async function searchByPseudo(pseudo: string) {
  console.log(
    `----------------------------- Twitter -----------------------------\n`
  );
  console.log(`https://twitter.com/${pseudo}\n`);

  console.log(
    `----------------------------- Instagram -----------------------------\n`
  );
  console.log(`https://snapchat.com/add/${pseudo}\n`);
  console.log(
    `----------------------------- Instagram -----------------------------\n`
  );
  console.log(`https://instagram.com/${pseudo}/\n`);
  console.log(
    `----------------------------- Facebook -----------------------------\n`
  );
  console.log(`https://facebook.com/${pseudo}/\n`);
  console.log(
    `----------------------------- Reddit -----------------------------\n`
  );
  console.log(`https://reddit.com/user/${pseudo}/\n`);
}

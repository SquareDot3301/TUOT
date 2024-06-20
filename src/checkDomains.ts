import dns from "dns";

export async function checkDomainAvailability(domain: string) {
  const tlds = [
    ".com",
    ".net",
    ".org",
    ".io",
    ".co",
    ".fr",
    ".social",
    ".space",
    ".de",
    ".tv",
    ".app",
  ];

  console.log(
    `----------------------------- Domains -----------------------------`
  );

  for (const tld of tlds) {
    const fullDomain = `${domain}${tld}`;

    try {
      await dns.promises.resolve(fullDomain);
      console.log(`${fullDomain} is already taken.`);
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).code === "ENOTFOUND") {
        console.log(`${fullDomain} is available.`);
      } else if (error instanceof Error) {
        console.error(
          `Error during the verification of ${fullDomain}:`,
          error.message
        );
      } else {
        console.error(`Unkown error during the verification of ${fullDomain}`);
      }
    }
  }
}

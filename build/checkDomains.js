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
exports.checkDomainAvailability = void 0;
const dns_1 = __importDefault(require("dns"));
function checkDomainAvailability(domain) {
    return __awaiter(this, void 0, void 0, function* () {
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
        console.log(`----------------------------- Domains -----------------------------`);
        for (const tld of tlds) {
            const fullDomain = `${domain}${tld}`;
            try {
                yield dns_1.default.promises.resolve(fullDomain);
                console.log(`${fullDomain} is already taken.`);
            }
            catch (error) {
                if (error instanceof Error && error.code === "ENOTFOUND") {
                    console.log(`${fullDomain} is available.`);
                }
                else if (error instanceof Error) {
                    console.error(`Error during the verification of ${fullDomain}:`, error.message);
                }
                else {
                    console.error(`Unkown error during the verification of ${fullDomain}`);
                }
            }
        }
    });
}
exports.checkDomainAvailability = checkDomainAvailability;

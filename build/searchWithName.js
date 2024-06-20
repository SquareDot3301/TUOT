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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchWithName = void 0;
const searchFromTelFR_1 = require("./components/searchFromTelFR");
const searchFromCopainsDavant_1 = require("./components/searchFromCopainsDavant");
function searchWithName(name, firstname) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`----------------------------- Google -----------------------------\n`);
        console.log(`https://www.google.fr/search?q=${name}+${firstname}\n`);
        console.log(`----------------------------- Bing -----------------------------\n`);
        console.log(`https://www.bing.com/search?q=${name}+${firstname}\n`);
        console.log(`----------------------------- DuckDuckGo -----------------------------\n`);
        console.log(`https://duckduckgo.com/html?q=${name}+${firstname}\n`);
        yield (0, searchFromCopainsDavant_1.searchFromCopainsDavant)(name, firstname).then();
        yield (0, searchFromTelFR_1.searchTelPerson)(`${name} ${firstname}`).then((info) => {
            if (info) {
                console.log(`----------------------------- Tel.fr -----------------------------\n`);
                console.log("Name:", info.name);
                console.log("Adress:", info.address);
                console.log("Postal code:", info.postalCode);
                console.log("City:", info.city);
                console.log("Phone number:", info.phone);
            }
        });
    });
}
exports.searchWithName = searchWithName;

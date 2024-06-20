"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.searchTelPerson = void 0;
const cheerio = __importStar(require("cheerio"));
function searchTelPerson(name_1) {
    return __awaiter(this, arguments, void 0, function* (name, country = "France") {
        const url = `https://www.tel.fr/pro/search?q=${encodeURIComponent(name)}&w=${country}`;
        try {
            const response = yield fetch(url);
            const html = yield response.text();
            const $ = cheerio.load(html);
            const personInfo = {
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
                }
                else {
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
            }
            else {
                console.log(`Aucune information trouvée pour "${name}"`);
                return null;
            }
        }
        catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            return null;
        }
    });
}
exports.searchTelPerson = searchTelPerson;

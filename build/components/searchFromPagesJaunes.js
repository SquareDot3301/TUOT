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
exports.searchPagesBlanches = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
function searchPagesBlanches(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://www.pagesjaunes.fr/pagesblanches/recherche?quoiqui=${encodeURIComponent(name)}&ou=&univers=pagesblanches&idOu=`;
        try {
            const response = yield fetch(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                },
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status} - ${response.statusText}`);
            }
            const html = yield response.text();
            const $ = cheerio_1.default.load(html);
            const personInfo = {
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
            }
            else {
                console.log(`Aucune information trouvée pour "${name}"`);
                return null;
            }
        }
        catch (error) {
            console.error("Erreur lors de la récupération des données:", error.message);
            return null;
        }
    });
}
exports.searchPagesBlanches = searchPagesBlanches;

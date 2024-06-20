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
exports.searchFromCopainsDavant = void 0;
const cheerio = __importStar(require("cheerio"));
function searchFromCopainsDavant(name, firstname) {
    return __awaiter(this, void 0, void 0, function* () {
        const reponse = yield fetch(`https://copainsdavant.linternaute.com/s/?full=&q=${name} ${firstname}&ty=1&xhr=`);
        const data = yield reponse.json();
        const html = data.html;
        const $ = cheerio.load(html);
        const users = [];
        $(".app_list--result__search li").each((i, elem) => {
            const name = $(elem).find("h3 a").text().trim();
            const location = $(elem)
                .find(".app_list--result__search__place")
                .text()
                .trim();
            users.push({ name, location });
        });
        if (users.length > 0) {
            console.log(`----------------------------- CopainsDavant -----------------------------\n`);
            users.forEach((user) => {
                console.log(`Nom: ${user.name}, Location: ${user.location}\n`);
            });
        }
        else {
            console.log(`----------------------------- CopainsDavant -----------------------------\n`);
            console.log("No users found on Copains Davant");
        }
    });
}
exports.searchFromCopainsDavant = searchFromCopainsDavant;

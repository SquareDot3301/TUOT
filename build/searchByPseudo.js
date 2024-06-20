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
exports.searchByPseudo = void 0;
function searchByPseudo(pseudo) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`----------------------------- Twitter -----------------------------\n`);
        console.log(`https://twitter.com/${pseudo}\n`);
        console.log(`----------------------------- Instagram -----------------------------\n`);
        console.log(`https://snapchat.com/add/${pseudo}\n`);
        console.log(`----------------------------- Instagram -----------------------------\n`);
        console.log(`https://instagram.com/${pseudo}/\n`);
        console.log(`----------------------------- Facebook -----------------------------\n`);
        console.log(`https://facebook.com/${pseudo}/\n`);
        console.log(`----------------------------- Reddit -----------------------------\n`);
        console.log(`https://reddit.com/user/${pseudo}/\n`);
    });
}
exports.searchByPseudo = searchByPseudo;

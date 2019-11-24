"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* imports */
const board_json_1 = require("./data/board.json");
const dictionary_json_1 = __importDefault(require("./data/dictionary.json"));
const shuffle_1 = __importDefault(require("./struc/shuffle"));
const trie_1 = __importDefault(require("./struc/trie"));
/**
 * @class Game
 * @description : Contains all the necessary functions for the letters-game
 */
class Game {
    constructor() {
        this.words = dictionary_json_1.default.words;
        this.board = shuffle_1.default(board_json_1.board);
        this.dictionary = new trie_1.default(dictionary_json_1.default.words);
    }
    /**
     * @param string
     * @param GameState
     * @param boolean
     * @returns { found: boolean, completeWord: boolean }
     * @description : validate user's move
     */
    validate(word, meta) {
        if (!word.length) {
            return { found: false };
        }
        const wordFind = this.dictionary.has(word);
        return wordFind;
    }
}
exports.default = Game;
//# sourceMappingURL=game.js.map
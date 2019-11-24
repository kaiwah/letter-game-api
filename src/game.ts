"use strict";

/* imports */
import { board } from "./data/board.json";
import dictionary from "./data/dictionary.json";
import Shuffle from "./struc/shuffle";
import Trie from "./struc/trie";

/* interface */
interface GameState {
  selected: number[];
}

/**
 * @class Game
 * @description : Contains all the necessary functions for the letters-game
 */
class Game {
  public words: string[];
  public board: string[];
  public dictionary: any;
  constructor() {
    this.words = dictionary.words;
    this.board = Shuffle(board);
    this.dictionary = new Trie(dictionary.words);
  }
  /**
   * @param string
   * @param GameState
   * @param boolean
   * @returns { found: boolean, completeWord: boolean }
   * @description : validate user's move
   */
  public validate(word: string, meta: GameState) {
    if (!word.length) {
      return { found: false };
    }
    const wordFind = this.dictionary.has(word);
    return wordFind;
  }
}
export default Game;

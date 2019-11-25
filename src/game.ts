'use strict';

/* imports */
import Trie from "./struc/trie";
import Shuffle from "./struc/shuffle";
import { board } from "./data/board.json";
import dictionary from "./data/dictionary.json";

/* interface */
interface GameState {
  selected: number[]
};

/**
 * @class Game
 * @description : Contains all the necessary functions for the letters-game
 */
class Game {
  public words: string[];
  public board : string[];
  public boardMap: { [key: string] : number };
  public dictionary: any;
  constructor(){
    this.words = dictionary.words;
    this.dictionary = new Trie(dictionary.words);
    // PART2: Check if at least one dictionary word is in shuffled board
    this.shuffleAndVerify();
    console.log(this.boardMap);
  }
  /**
   * @returns boolean 
   * @description : validates and shuffles the board using a DP+iterative solution
   */
  shuffleAndVerify(){
    const shuffled = Shuffle((this.board) ? this.board : board);
    this.board = shuffled.array;
    this.boardMap = shuffled.map;
    let wordFound : boolean = false,
        letterA : string, 
        letterB : string,
        pairRecords : { [key: string]: boolean } = {};
    // check each word to see if they are legal on board
    for (const word of this.words){
      wordFound = true;
      for (let i = 0; i < word.length-1; ++i){
        letterA = word[i];
        letterB = word[i+1];
        if (!pairRecords.hasOwnProperty(letterA+letterB))
          pairRecords[letterA+letterB] = this.isNeighbor(this.boardMap[letterA], this.boardMap[letterB]);
        if (pairRecords[letterA+letterB] === false){
          wordFound = false;
          break;
        }   
      }
      if (wordFound){
        console.log(`${word} has been found on the board!`);
        return true;
      } 
    }
    console.log('No words found in board -- reshuffling');
    this.shuffleAndVerify(); // keep shuffling until returns true
    return false;
  }
  /**
   * @param GameState
   * @returns { found: boolean, completeWord: boolean }
   * @description : validate user's move
   */
  validate(meta: GameState){
    // PART2: first validate if moves are legal (neighbors only)
    const word = this.areNeighbors(meta.selected);
    console.log('Word is : '+word);
    // PART1: validate if word is in dictionary
    if (!word)
      return { found: false, legal: false };
    const wordFind = this.dictionary.has(word);
    return { ...wordFind, legal: true };
  }
  /**
   * @param number
   * @returns numbers[]
   * @description : returns the neighbors of a given origin position
   *  assumptions:
   *    - neighbors cannot wrap around
   *    - 4x4 grid only, not compatible with any larger
   */
  neighbors(origin: number){
    if (origin <= 0 || origin > 15)
      return [];
    let neighbors = [];
    // NORTH : in bounds
    if (origin > 3)
      neighbors.push(origin-4);
    // EAST : in bounds && not edge
    if (origin < 15 && origin % 4 !== 3)
      neighbors.push(origin+1);
    // WEST : in bounds & not edge
    if (origin > 0 && origin % 4 !== 0)
      neighbors.push(origin-1);
    // SOUTH : in bounds
    if (origin < 12)
      neighbors.push(origin+4);
    return neighbors;
  }
  /**
   * @param number
   * @param number
   * @returns boolean
   * @description : checks to see if a target is a neighbor of an origin
   */
  isNeighbor(origin: number, target: number){
    // if target < origin, can only be two possibilities, WEST or NORTH
    if (target < origin){
      if (target === origin-1 && origin > 0 && origin % 4 !== 0)
        return true;
      else if (target === origin-4 && origin > 3)
        return true;
    } else {
    // if target > origin, can only be two possibilities, EAST or SOUTH
      if (target === origin+1 && origin < 15 && origin % 4 !== 3)
        return true;
      else if (target === origin+4 && origin < 12)
        return true;
    }
    return false;
  }
  /**
   * @param number[]
   * @param boolean | optional
   * @returns string|boolean
   * @description : checks to see a sequence are neighbors to each other
   */
  areNeighbors(wordLocations: number[], buildWord: boolean = true){
    let word = '';
    for (let i = 0; i < wordLocations.length - 1; ++i){
      if (!this.isNeighbor(wordLocations[i], wordLocations[i+1]))
        return false;
      else
        word += this.board[wordLocations[i]];
    }
    word += this.board[wordLocations[wordLocations.length-1]];
    return (buildWord) ? word : true;
  }
}
export default Game;

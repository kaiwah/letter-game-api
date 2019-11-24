
/**
 * TrieNode Structure
 * @class : TrieNode
 * @description : Basic node for trie
 */
class TrieNode {
  public value: string;
  public children: object;
  public complete: boolean;
  constructor(value: string = "") {
    this.value = value || "";
    this.children = {};
    this.complete = false;
  }
}

/**
 * Trie Structure
 * @class Trie
 * @description : Basic trie structure for quick word validations
 */

class Trie {
  public dict: any;
  public count: number;
  constructor(words: string[]|null = null) {
    this.dict = new TrieNode();
    this.count = 0;
    if (words.length) {
      for (const word of words) {
        this.add(word);
      }
    }
  }
  /**
   * add()
   * @param string
   * @returns boolean
   * @description : add a word to the trie
   */
  public add(word: string) {
    let node = this.dict;
    word = word.toLowerCase();
    for (const char of word) {
      if (node.children[char]) {
        node = node.children[char];
      } else {
        node.children[char] = new TrieNode(char);
        node = node.children[char];
      }
    }
    node.complete = true;
    ++this.count;
    // console.log(`Word: ${word} added to dictionary!`);
    return true;
  }
  /**
   * has()
   * @param string
   * @returns object
   * @description : check if a word exists in trie
   */
  public has(word: string) {
    let node = this.dict;
    word = word.toLowerCase();
    for (const char of word) {
      if (!node.children[char]) {
        return { found: false };
      } else {
        node = node.children[char];
      }
    }
    return { found: true, completeWord: node.complete };
  }
  /**
   * remove()
   * @description: not implementing -- unneeded for this exercise
   */
  public remove() { return; }
}
export default Trie;

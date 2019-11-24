"use strict";

/**
 * YatesShuffle()
 * @returns string[]
 * @description : Fisher-Yates Shuffle function
 */
const YatesShuffle = (arr: string[]) => {
  let ind = arr.length,
      temporal, indRandom;
  while (ind) {
    indRandom = Math.floor(Math.random() * ind--);
    temporal = arr[ind];
    arr[ind] = arr[indRandom];
    arr[indRandom] = temporal;
  }
  return arr;
};
export default YatesShuffle;

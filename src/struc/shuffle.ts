"use strict";

/**
 * YatesShuffle()
 * @returns object
 * @description : Fisher-Yates Shuffle function
 */
const YatesShuffle = (arr: string[]) => {
  let ind = arr.length,
      map : { [key: string]: number } = {},
      temporal, indRandom;
  while (ind) {
    indRandom = Math.floor(Math.random() * ind--);
    temporal = arr[ind];
    arr[ind] = arr[indRandom];
    map[arr[ind].toLowerCase()] = ind;
    arr[indRandom] = temporal;
  }
  return { array: arr, map: map };
};
export default YatesShuffle;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * YatesShuffle()
 * @returns string[]
 * @description : Fisher-Yates Shuffle function
 */
const YatesShuffle = (arr) => {
    let ind = arr.length, temporal, indRandom;
    while (ind) {
        indRandom = Math.floor(Math.random() * ind--);
        temporal = arr[ind];
        arr[ind] = arr[indRandom];
        arr[indRandom] = temporal;
    }
    return arr;
};
exports.default = YatesShuffle;
//# sourceMappingURL=shuffle.js.map
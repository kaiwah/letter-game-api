"use strict";

/* modules */
import express from "express";
import bodyParser from "body-parser";
import LetterGame from "./game";
const app = express();

/* env globals */
const PORT = "3000";

/* server setup */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('src/data'));

/* Game Instantiation */
const game = new LetterGame();

/**
 * Route Helpers
 * @description: functions to help with route handling
 */
const isValidRequest = (body: object)=>{
  // simple function here but allows for expandability
  if (!body.hasOwnProperty('selected'))
    return false;
  if (!body.hasOwnProperty('playerId'))
    return false;
  return true;
};
const response = (statusCode: number, resObj: any, err: string = null, msg: string = null, extendedData: object = {})=>{
  resObj.status(statusCode);
  resObj.json({
    err: err,
    message: msg,
    status: statusCode,
    ...extendedData
  });
  return;
};
/**
 * Route Handling
 * @description: handle each api endpoint
 */

app.get("/", (req, res) => {
  return res.json(game.board);
});

app.get("/words", (req, res) => {
  return res.json(game.words);
});
// PART2B : api endpoint for scores
app.get("/scoreboard", (req, res) => {
  return res.json(game.displayScores());
});

app.post("/move", (req, res) => {
  if (isValidRequest(req.body)){
    const isValidMove = game.validate(req.body);
    let message;
    if (!isValidMove.legal)
      message = 'This move is illegal. Please select neighbors only.';
    else if (!isValidMove.found)
      message = 'This move is invalid.';
    else {
      if (isValidMove.completeWord)
        message = 'You have found a word!';
      else
        message = 'This move is valid. You\'re on the right track!';
    }
    return response(200, res, null, message, isValidMove);
  } else {
    return response(400, res, 'Bad Request');
  }
});

/* server start */
app.listen(PORT, () => {
  console.log( `Server started at http://localhost:${ PORT }` );
});

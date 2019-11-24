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
const isValidRequest = (urlParams: { [key: string]: string }, body: object)=>{
  if (!urlParams['0'].length)
    return false;
  if (!body.hasOwnProperty('selected'))
    return false;
  console.log(body);
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

app.post("/move/*", (req, res) => {
  if (isValidRequest(req.params, req.body)){
    const isValidMove = game.validate(req.params['0'], req.body.selected);
    let message;
    if (!isValidMove.found)
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

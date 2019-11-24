"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* modules */
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const game_1 = __importDefault(require("./game"));
const app = express_1.default();
/* env globals */
const PORT = "3000";
/* server setup */
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.static("data"));
/* Game Instantiation */
const game = new game_1.default();
/**
 * Route Helpers
 * @description: functions to help with route handling
 */
const isValidRequest = (urlParams, body) => {
    if (!urlParams["0"].length) {
        return false;
    }
    if (!body.hasOwnProperty("selected")) {
        return false;
    }
    console.log(body);
    return true;
};
const response = (statusCode, resObj, err = null, msg = null, extendedData = {}) => {
    resObj.status(statusCode);
    resObj.json(Object.assign({ err, message: msg, status: statusCode }, extendedData));
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
    if (isValidRequest(req.params, req.body)) {
        const isValidMove = game.validate(req.params["0"], req.body.selected);
        let message;
        if (!isValidMove.found) {
            message = "This move is invalid.";
        }
        else {
            if (isValidMove.completeWord) {
                message = "You have found a word!";
            }
            else {
                message = "This move is valid. You're on the right track!";
            }
        }
        return response(200, res, null, message, isValidMove);
    }
    else {
        return response(400, res, "Bad Request");
    }
});
/* server start */
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=resolver.js.map
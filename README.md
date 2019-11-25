# Letter Game API

To run:
0. Clone this directory
1. `npm install`
2. `npm start`
3. Access API @ localhost:3000

---

### API Endpoints

`GET localhost:3000`
Retrieves the current board

`GET localhost:3000/dictionary.json`
Retrieves the current dictionary

`GET localhost:3000/scoreboard`
Retrieves the current scoreboard

`POST localhost:3000/move`
Submits a move via player. Following JSON request must be passed:
```
{
  selected: [0,1,2,3], // array of selected tile location (in order)
  playerId: "jacky" // can be any string
}
```

--- 

### Key Assumptions
1. The board is always 4x4 in size. In order to make this board dynamic, we need to set a global env of board size and modify the in-bound/edge checks for neighbor functions
2. There are no repeating letters. In order to have repeating letters, we will need to change the boardMap to have option for array type as value

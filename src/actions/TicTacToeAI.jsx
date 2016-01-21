const players = {me: 2, you: 1, none: null};
const figures = ['col', 'row', 'backDiag', 'forwDiag'];
const figuresLength = 4;
let squares;
let move = 0;
let lastStarter = 0;
let myLastPlay = {};
let yourLastPlay = {};

function mod(base, mod) {
  return ((base % mod) + mod) % mod;
}

function playChoose(what, where) {
  let rotate, i, sinRotate, cosRotate, x, y, candidates = [], myPlay;

  if (((what === undefined) || (what.center !== undefined)) && (squares[4] === null) && (validPlay(playStats(1, 1), where))) {
    candidates.push({x: 1, y: 1});
  }

  for (rotate = 0; rotate < 4; rotate++) {
    sinRotate = (mod(rotate + 1, 2)) * ((rotate > 1) ? -1 : 1);
    cosRotate = mod(rotate, 2) * ((rotate > 1) ? 1 : -1);

    for (i = 0; i < 2; i++) {
      x = mod(i * cosRotate - 2 * sinRotate + 1, 3);
      y = mod(i * sinRotate + 2 * cosRotate + 1, 3);

      if ((squares[y * 3 + x] === null) && ((what === undefined) || (((what.corner !== undefined) && isCorner(x, y)) || ((what.wall !== undefined) && isWall(x, y)))) && validPlay(playStats(x, y), where)) {
        candidates.push({x: x, y: y});
      }
    }
  }

  if (candidates.length > 0) {
    myPlay = candidates[Math.floor(Math.random() * candidates.length)];
    return myPlay.y * 3 + myPlay.x;
  } else {
    return false;
  }
}

function validPlay(plays, where) {
  let player, i, res = [];

  if (where !== undefined) {
    switch (where.what) {
    case 'anything':
      for (player in players) {
        if (players.hasOwnProperty(player) && where[player] !== undefined) {
          for (i = 0; i < 4; i++) {
            if (plays[figures[i]][player] === where[player]) {
              res.push(true);
            }
          }
        }
      }

      break;

    case 'rowOrCol':
      let inRow = [], inCol = [], finalRow = true, finalCol = true;
      for (player in players) {
        if (players.hasOwnProperty(player) && where[player] !== undefined) {
          if (plays.row[player] === where[player]) {
            inRow.push(true);
          } else {
            inRow.push(false);
          }

          if (plays.col[player] === where[player]) {
            inCol.push(true);
          } else {
            inCol.push(false);
          }
        }
      }

      for (i = 0; i < inRow.length; i++) {
        if (!inRow[i]) {
          finalRow = false;
          break;
        }
      }

      for (i = 0; i < inCol.length; i++) {
        if (!inCol[i]) {
          finalCol = false;
          break;
        }
      }

      res.push(finalRow || finalCol);

      break;

    case 'rowAndCol':
      for (player in players) {
        if (players.hasOwnProperty(player) && where[player] !== undefined) {
          if ((plays.row[player] === where[player]) && (plays.col[player] === where[player])) {
            res.push(true);
          } else {
            res.push(false);
          }
        }
      }

      break;
    }

    if (res.length > 0) {
      for (i = 0; i < res.length; i++) {
        if (!res[i]) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  return true;
}

function playStats(x, y) {
  let i, j, player, plays = {};

  for (i = 0; i < figuresLength; i++) {
    plays[figures[i]] = {};
    for (player in players) {
      if (players.hasOwnProperty(player)) {
        plays[figures[i]][player] = countPlays(x, y, figures[i], players[player]);
      }
    }
  }

  return plays;
}

function countPlays(x, y, where, who) {
  if (where === 'row') {
    return ((squares[y * 3 + mod(x - 1, 3)] === who) ? 1 : 0) + ((squares[y * 3 + mod(x - 2, 3)] === who) ? 1 : 0);
  } else if (where === 'col') {
    return ((squares[mod(y - 1, 3) * 3 + x] === who) ? 1 : 0) + ((squares[mod(y - 2, 3) * 3 + x] === who) ? 1 : 0);
  } else if (where === 'backDiag') {
    if (x === y) {
      return ((squares[mod(y - 1, 3) * 3 + mod(x - 1, 3)] === who) ? 1 : 0) + ((mod(y - 2, 3) * 3 + squares[mod(x - 2, 3)] === who) ? 1 : 0);
    } else {
      return null;
    }
  } else if (where === 'forwDiag') {
    if (x === Math.abs(y - 2)) {
      return ((squares[mod(y - 1, 3) * 3 + mod(x + 1, 3)] === who) ? 1 : 0) + ((squares[mod(y - 2, 3) * 3 + mod(x + 2, 3)] === who) ? 1 : 0);
    } else {
      return null;
    }
  }

  return null;
}

function strategicPlay() {
  if (lastStarter === 0) {
    switch (move) {
      case 0:
        playChoose({corner: true, center: true});
        break;
  
      case 1:
        if ((myLastPlay.x === 1) && (myLastPlay.y === 1)) {
          if ((yourLastPlay.x === yourLastPlay.y) || (yourLastPlay.x === Math.abs(yourLastPlay.y - 2))) {
            return Math.abs(yourLastPlay.y - 2) * 3 + Math.abs(yourLastPlay.x - 2);
          } else {
            if (yourLastPlay.x !== 1) {
              return Math.floor(Math.random() * 2) * 2 * 3 + Math.abs(yourLastPlay.x - 2);
            } else {
              return Math.abs(yourLastPlay.y - 2) * 3 + Math.floor(Math.random() * 2) * 2;
            }
          }
        } else {
          if ((yourLastPlay.x === 1) && (yourLastPlay.y === 1)) {
            return Math.abs(myLastPlay.y - 2) * 3 + Math.abs(myLastPlay.x - 2);
          } else {
            if ((squares[myLastPlay.y * 3 + Math.abs(myLastPlay.x - 2)] === null) && (squares[myLastPlay.y * 3 + Math.abs(myLastPlay.x - 1)] === null)) {
              return myLastPlay.y * 3 + Math.abs(myLastPlay.x - 2);
            } else {
              return myLastPlay.y * 3 + Math.abs(myLastPlay.x - 2);
            }
          }
        }
        break;
  
      case 2:
        return playChoose({corner: true}, {what: "rowOrCol", me: 1, you: 0});
        break;
  
      case 3:
      case 4:
        return playChoose();
        break;
    }
  } else {
    switch (move) {
      case 0:
        if (squares[4] === 1) {
          return Math.floor(Math.random() * 2) * 2 * 3 + Math.floor(Math.random() * 2) * 2;
        } else {
          return 4;
        }
        break;
  
      case 1:
        if ((myLastPlay.x !== 1) || (myLastPlay.y !== 1)) {
          if ((yourLastPlay.x === Math.abs(myLastPlay.x - 2)) && (yourLastPlay.y === Math.abs(myLastPlay.y - 2))) {
            return playChoose({corner: true});
          }
        } else {
          if ((squares[Math.abs(yourLastPlay.y - 2) * 3 + Math.abs(yourLastPlay.x - 2)] === 1) && (yourLastPlay.x !== 1) && (yourLastPlay.y !== 1)) {
            return playChoose({wall: true});
          } else {
            let play = playChoose({corner: true}, {what: "rowAndCol", you: 1}); 
            if (!!play) {
              return play;
            } else {
              return playChoose({corner: true}, {what: "rowOrCol", you: 1});
            }
          }
        }
        break;
      case 2:
      case 3:
        return playChoose();
        break;
    }
  }
}

function isCorner(x, y) {
  return (x !== 1) && (y !== 1);
}

function isWall(x, y) {
  return (x === 1) || (y === 1);
}

export function init(initSquares, initMyLastPlay, initYourLastPlay) {
  squares = initSquares;
  move = Math.floor(squares.reduce((moveCnt, square) => (moveCnt + ((square !== null) ? 1 : 0)), 0) / 2);
  lastStarter = (squares.reduce((playerCnt, square) => playerCnt + ((square === 1) ? 1 : 0)) === move) ? 0 : 1;
  myLastPlay = initMyLastPlay;
  yourLastPlay = initYourLastPlay;
}

export function hasWon() {
  let i;
  
  for (i = 0; i < 3; i++) {
    if ((squares[i * 3] === squares[i * 3 + 1]) &&
        (squares[i * 3] === squares[i * 3 + 2]) &&
        (squares[i * 3] !== null)) {
      return [i * 3, i * 3 + 1, i * 3 + 2];
    }
  }
  
  for (i = 0; i < 3; i++) {
    if ((squares[i % 3] === squares[i % 3 + 3]) &&
        (squares[i % 3] === squares[i % 3 + 6]) &&
        (squares[i % 3] !== null)) {
      return [i % 3, i % 3 + 3, i % 3 + 6];
    }
  }
  
  if (squares[4] !== null) {
    if ((squares[4] === squares[0]) && (squares[4] === squares[8])) {
      return [0, 4, 8];
    } else if ((squares[4] === squares[2]) && (squares[4] === squares[6])) {
      return [2, 4, 6];
    }
  }
  
  return false;
}

export function isTied() {
  return !squares.reduce(
    (hasAvailable, square) => hasAvailable || (square === null),
    false
  );
}

export function play() {
  let playForWin = playChoose(undefined, {what: "anything", me: 2});
    
  if (!!playForWin) {
    return playForWin;
  } else {
    let playForDefense = playChoose(undefined, {what: "anything", you: 2});
      
    if (!!playForDefense) {
      return playForDefense;
    } else {
      return strategicPlay();
    }
  }
}
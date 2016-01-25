import * as types from '../constants/ActionTypes';
import * as TicTacToeAI from './TicTacToeAI';

export function play(x, y, player) {
  return {type: types.PLAY, x, y, player}
}

export function registerWin(positions) {
  return {type: types.REGISTER_WIN, positions: positions}
}

export function registerLoss(positions) {
  return {type: types.REGISTER_LOSS, positions: positions}
}

export function registerTie() {
  return {type: types.REGISTER_TIE}
}

export function resetBoard() {
  return {type: types.RESET_BOARD}
}

export function changeLanguage(language) {
  return {type: types.CHANGE_LANGUAGE, language: language}
}

export function gameEnd() {
  return (dispatch, getState) => {
    const prevState = getState();
    let newSquares = [null, null, null, null, null, null, null, null, null];
    
    dispatch(resetBoard());
    
    if (prevState.gameAux.starter === 1) {
      TicTacToeAI.init(newSquares, {}, {}, 0);
      let aiPlay = TicTacToeAI.play();
      dispatch(play(aiPlay % 3, Math.floor(aiPlay / 3), false));
    }
  }
}

export function playerPlay(x, y) {
  return (dispatch, getState) => {
    const prevState = getState();
    let myLastPlay = prevState.gameAux.myLastPlay;
    let yourLastPlay = prevState.gameAux.yourLastPlay;
    let newSquares = prevState.squares.map(square => {
      if ((square.status === 'player') || ((square.x === x) && (square.y === y))) {
        return 1;
      } else if (square.status === 'available') {
        return null;
      } else {
        return 2;
      }
    });

    dispatch(play(x, y, true));
    newSquares[y * 3 + x] = 1;
    yourLastPlay = {x: x, y: y};

    TicTacToeAI.init(newSquares, myLastPlay, yourLastPlay, prevState.gameAux.starter);
    
    let won = TicTacToeAI.hasWon(); 
    
    if (!!won) {
      dispatch(registerWin(won));
    } else if (TicTacToeAI.isTied()) {
      dispatch(registerTie());
    } else {
      let aiPlay = TicTacToeAI.play();
      dispatch(play(aiPlay % 3, Math.floor(aiPlay / 3), false));
      newSquares[Math.floor(aiPlay / 3) * 3 + (aiPlay % 3)] = 2;
      myLastPlay = {x: aiPlay % 3, y: Math.floor(aiPlay / 3)};
      
      TicTacToeAI.init(newSquares, myLastPlay, yourLastPlay, prevState.gameAux.starter);
      
      won = TicTacToeAI.hasWon();
      if(!!won) {
        dispatch(registerLoss(won));
      } else if (TicTacToeAI.isTied()) {
        dispatch(registerTie());
      }
    }
  };
}
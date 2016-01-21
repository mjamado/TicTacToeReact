import * as types from '../constants/ActionTypes';

const initialState = [
  {status: 'available', x: 0, y: 0},
  {status: 'available', x: 1, y: 0},
  {status: 'available', x: 2, y: 0},
  {status: 'available', x: 0, y: 1},
  {status: 'available', x: 1, y: 1},
  {status: 'available', x: 2, y: 1},
  {status: 'available', x: 0, y: 2},
  {status: 'available', x: 1, y: 2},
  {status: 'available', x: 2, y: 2}
];

export default function SquaresReducer(state = initialState, action) {
  switch (action.type) {
    case types.PLAY:
      return state.map(item => {
        if ((item.x === action.x) && (item.y === action.y)) {
          return {
            status: action.player ? 'player' : 'ai',
            x: item.x, y: item.y
          };
        }
        else {
          return item;
        }
      });
    
    case types.RESET_BOARD:
      return [...initialState];
      
    default:
      return state;
  }
}
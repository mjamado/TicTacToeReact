import * as types from '../constants/ActionTypes';

const initialState = {
  language: 'pt',
  playerRound: false,
  status: 'playing',
  starter: 0,
  myLastPlay: {},
  yourLastPlay: {}
};

export default function GameAuxReducer(state = initialState, action) {
  switch (action.type) {
    case types.PLAY:
      return Object.assign({},
        state,
        {
          playerRound: !action.player,
          myLastPlay: action.player ? state.myLastPlay : {x: action.x, y: action.y},
          yourLastPlay: action.player ? {x: action.x, y: action.y} : state.yourLastPlay
        }
      );
    
    case types.CHANGE_LANGUAGE:
      return Object.assign({},
        state,
        { language: action.language }
      );
      
    case types.REGISTER_WIN:
      return Object.assign({},
        state,
        { status: 'win' }
      );
      
    case types.REGISTER_LOSS:
      return Object.assign({},
        state,
        { status: 'loss' }
      );
      
    case types.REGISTER_TIE:
      return Object.assign({},
        state,
        { status: 'tie' }
      );
      
    case types.RESET_BOARD:
      return Object.assign({},
        state,
        {
          myLastPlay: {},
          yourLastPlay: {},
          starter: (state.starter === 0) ? 1 : 0,
          status: 'playing',
          playerRound: (state.starter === 0) ? true : false,
        }
      );
    
    default:
      return state;
  }
}
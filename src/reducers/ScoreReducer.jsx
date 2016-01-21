import * as types from '../constants/ActionTypes';

const initialState = {
  victories: 0,
  losses: 0,
  ties: 0
};

export default function ScoresReducer(state = initialState, action) {
  switch (action.type) {
    case types.REGISTER_WIN:
      return Object.assign({},
        state,
        { victories: state.victories + 1 }
      );
    
    case types.REGISTER_LOSS:
      return Object.assign({},
        state,
        { losses: state.losses + 1 }
      );
      
    case types.REGISTER_TIE:
      return Object.assign({},
        state,
        { ties: state.ties + 1 }
      );
      
    default:
      return state;
  }
}
import { Types, TypeOfAction, Iitem } from "../actions/users";

export interface initialState {
  items: Iitem[];
  error?: string;
}
const INITIAL_STATE = {
  items: [],
};

export default function users(
  state = INITIAL_STATE,
  action: TypeOfAction
): initialState {
  switch (action.type) {
    // case Types.GET_USERS_REQUEST: {
    //   console.log("reducer store");
    //   return { ...state };
    // }
    case Types.GET_USERS_SUCCESS: {
      return {
        items: action.payload.items,
      };
    }
    case Types.USERS_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}

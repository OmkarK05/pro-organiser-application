import {
  SET_CARD,
  SET_COLUMN,
  VIEW_CARD,
  GET_DATA,
  SELECTED_BOARD_KEY,
  CARD_KEY,
  COLUMN_KEY,
  GET_BOARD_COLUMN_DATA,
  EDIT_CARD,
  DRAG_DROP,
  USER_AUTH,
  USER_AUTH_ERROR,
  LOADER,
} from "./ActionTypes";

export default (state, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        boards: action.payload,
      };
    case SELECTED_BOARD_KEY:
      return {
        ...state,
        selectedBoardKey: action.payload.key,
        selectedBoardValue: action.payload.value,
      };
    case VIEW_CARD:
      return {
        ...state,
        viewCard: action.payload.viewCard,
        setCardKey: action.payload.key,
        setColumnKey: action.payload.columnKey,
        setCardValue: action.payload.value,
      };
    case EDIT_CARD:
      return {
        ...state,
        editCard: action.payload.editCard,
        setCardKey: action.payload.key,
        setColumnKey: action.payload.columnKey,
        setCardValue: action.payload.value,
      };
    case SET_CARD:
      return {
        ...state,
        editCard: false,
        setCard: action.payload.addCard,
        setColumnKey: action.payload.columnKey,
      };
    case LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case DRAG_DROP:
      return {
        ...state,
        draggesCardData: action.payload.draggesCardData,
        dragggedColumnKey: action.payload.columnKey,
        complete: action.payload.complete,
      };
    case USER_AUTH:
      return {
        ...state,
        setUser: action.payload,
      };
    case USER_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_COLUMN:
      return {
        ...state,
        setColumn: action.payload,
      };

    case CARD_KEY:
      return {
        ...state,
        setCardKey: action.payload.key,
      };
    case COLUMN_KEY:
      return {
        ...state,
        setColumnKey: action.payload,
      };
    case GET_BOARD_COLUMN_DATA:
      return {
        ...state,
        boardColumnsData: action.payload,
      };

    // case SELECTED_BOARD_VALUES:
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     selectedBoardValue: action.payload,
    //   };

    default:
      return state;
  }
};

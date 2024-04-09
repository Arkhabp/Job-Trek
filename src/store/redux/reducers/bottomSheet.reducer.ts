// reducers.ts
import { types } from "../../../constans/botttomSheet.constan";

const initialState = {
  isOpen: false
};

const bottomSheetReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.OPEN_BOTTOM_SHEET:
      return {
        ...state,
        isOpen: true
      };
    case types.CLOSE_BOTTOM_SHEET:
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
};

export default bottomSheetReducer;

import { types } from "../../../constans/botttomSheet.constan";

export const openBottomSheet = () => ({
  type: types.OPEN_BOTTOM_SHEET
});

export const closeBottomSheet = () => ({
  type: types.CLOSE_BOTTOM_SHEET
});

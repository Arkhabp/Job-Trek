import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

// Define Android breakpoints
const androidBreakpoints = {
  small: 360, // Breakpoint untuk perangkat Android dengan layar kecil
  medium: 420, // Breakpoint untuk perangkat Android dengan layar menengah
  large: 600 // Breakpoint untuk perangkat Android dengan layar besar
};

// NOTE: a helper class to consistently scale margins,paddings
//       on different screen size

export default class Helper {
  static normalize(size: number) {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  }

  static fontSize = (size: number) => {
    // Precalculate Device Dimensions for better performance
    const x = Dimensions.get("window").width;

    // Calculating ratio from iPhone breakpoints
    const ratioX = x < 375 ? (x < 320 ? 0.55 : 0.8) : 1;

    // We're simulating EM by changing font size according to Ratio
    const unit = size * ratioX;

    return unit;
  };
}

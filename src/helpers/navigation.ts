import {
  createNavigationContainerRef,
  StackActions,
  CommonActions
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

const replace = (routeName: any, params: any) => {
  navigationRef.dispatch(StackActions.replace(routeName, params));
};

const reset = (routeName: any, params: any) => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName }]
    })
  );
};

export const NavigationRoot = {
  navigate: navigationRef.navigate,
  back: navigationRef.goBack,
  replace,
  reset
};

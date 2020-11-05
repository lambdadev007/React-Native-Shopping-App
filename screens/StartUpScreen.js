import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";
import Colours from "../constants/Colours";

const StartUpScreen = props => {
  const dispatch = useDispatch();

  // Check the AsyncStorage for a valid token
  useEffect(() => {
    const tryLogin = async () => {
      // Note: getItem is asynchronous, so we get a promise
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate); // expiryDate is string in ISO format...

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      const expirationTime = expirationDate.getTime - new Date().getTime;
      props.navigation.navigate("Shop");
      dispatch(authActions.authenticate(token, userId, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colours.chocolate} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StartUpScreen;

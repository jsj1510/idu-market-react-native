import React, { useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ThemeContext } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import MainTab from "./MainTab";
import {
  Main,
  Market,
  NoticeBoard,
  DetailView,
  PostWrite,
  Login,
  Signup,
  Find,
  PurchaseList,
  SaleList,
  ProfileUpdate,
  Inquiry,
} from "../screens";

const Stack = createStackNavigator();

const MainStack = () => {
  const [isFontReady, setIsFontReady] = useState(false);
  const theme = useContext(ThemeContext);

  async function _loadFonts() {
    await Font.loadAsync({
      BM_HANNA_PRO: require("../../assets/fonts/BMHANNAPro.ttf"),
    });
  }

  return isFontReady ? (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitle: "IDU",
        headerTitleStyle: {
          fontFamily: "BM_HANNA_PRO",
        },
        headerTintColor: theme.headerTintColor,
        headerBackTitleVisible: false,
        headerStyle: {
          height: 80,
          borderBottomWidth: 1,
          borderBottomColor: theme.headerBottomColor,
        },
        headerRight: ({ tintColor }) => (
          <MaterialIcons
            name="notifications-none"
            size={30}
            style={{ marginRight: 11 }}
            color={theme.headerIconColor}
            onPress={() => alert("준비중인 서비스입니다.")}
          />
        ),
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainTab}
        options={{
          headerTitle: "아이두",
          headerTitleStyle: {
            color: theme.headerTintColor,
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "BM_HANNA_PRO",
          },
          headerTitleAlign: "left",
        }}
      />
      <Stack.Screen
        name="DetailView"
        component={DetailView}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          headerTitle: "",
        }}
      />
      <Stack.Screen name="PostWrite" component={PostWrite} />
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="NoticeBoard" component={NoticeBoard} />
      <Stack.Screen name="PurchaseList" component={PurchaseList} />
      <Stack.Screen name="SaleList" component={SaleList} />
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
      <Stack.Screen name="Inquiry" component={Inquiry} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        // 회원가입화면 뒤로가기 버튼 제거
        options={{ headerBackTitleVisible: false, title: "회원가입" }}
      />
      <Stack.Screen name="Find" component={Find} />
    </Stack.Navigator>
  ) : (
    <AppLoading
      startAsync={_loadFonts}
      onFinish={() => setIsFontReady(true)}
      onError={console.error}
    />
  );
};

export default MainStack;

import React from "react";
import { Stack } from "expo-router";

export default function AuthStackLayout() {
  return (
    <Stack
      initialRouteName="OnBoarding"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#FFFFFF" },
      }}
    >
      <Stack.Screen name="OnBoarding" />
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="ThankYou" />
      <Stack.Screen name="MyProfile" />
      <Stack.Screen name="GenderSelection" />
      <Stack.Screen name="SelfieTime" />
      <Stack.Screen name="Congratulation" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="Otp" />
    </Stack>
  );
}

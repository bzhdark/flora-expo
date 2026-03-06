import { Foundation } from "@expo/vector-icons";
import { Tabs } from "expo-router";
// import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";

export default function RucherTabs() {
  // return (
  //   <NativeTabs>
  //     <NativeTabs.Trigger name='index' options={{ title: "Dashboard2" }}>
  //       <Label>Home</Label>
  //       <Icon sf='house.fill' drawable='ic_notification_overlay' />
  //     </NativeTabs.Trigger>
  //     <NativeTabs.Trigger name='ruchers' options={{ title: "Ruchers" }}>
  //       <Icon sf='gear' drawable='custom_settings_drawable' />
  //       <Label>Ruchers</Label>
  //     </NativeTabs.Trigger>
  //   </NativeTabs>
  // );
  return (
    <Tabs initialRouteName='ruchers' screenOptions={{ tabBarActiveTintColor: "teal" }}>
      <Tabs.Screen
        name='ruchers'
        options={{
          title: "Ruchers",
          tabBarIcon: ({ color, size, focused }) => <Foundation name='trees' color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name='ruches'
        options={{
          title: "Ruches",
          tabBarIcon: ({ color, size, focused }) => <Foundation name='trees' color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

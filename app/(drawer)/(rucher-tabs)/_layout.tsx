import { Tabs } from "expo-router";
import React from "react";

export default function RucherTabs() {
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{ title: "Dashboard2" }} />
      <Tabs.Screen name='ruchers' options={{ title: "Ruchers" }} />
    </Tabs>
  );
}

import { clsx } from "clsx";
import React from "react";
import { View, ViewProps } from "react-native";

interface ThemedViewProps extends ViewProps {
  children: React.ReactNode;
}

export default function ThemedView({ children, className, ...props }: ThemedViewProps) {
  return (
    <View className={clsx("flex-1", className)} {...props}>
      {children}
    </View>
  );
}

import { clsx } from "clsx";
import React from "react";
import { View } from "react-native";

interface InputWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function InputWrapper({ children, className }: InputWrapperProps) {
  return (
    <View
      className={clsx("bg-white rounded-3xl p-4 border border-slate-200", className)}
      style={{
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 2,
      }}
    >
      {children}
    </View>
  );
}

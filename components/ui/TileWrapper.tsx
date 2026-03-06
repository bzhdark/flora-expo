import { clsx } from "clsx";
import React from "react";
import { View } from "react-native";

interface TileWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function TileWrapper({ children, className }: TileWrapperProps) {
  return (
    <View
      className={clsx("bg-white rounded-3xl border border-slate-200", className)}
      style={{
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 18,
        elevation: 2,
      }}
    >
      {children}
    </View>
  );
}

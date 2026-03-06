import { clsx } from "clsx";
import React from "react";
import { ActivityIndicator, Pressable, PressableProps, Text } from "react-native";

interface ThemedButtonProps extends PressableProps {
  title: string;
  className?: string;
  loading?: boolean;
  type?: "primary" | "secondary" | "danger" | "neutral" | "warning";
}

export default function ThemedButton({
  title,
  className,
  type = "primary",
  loading = false,
  ...props
}: ThemedButtonProps) {
  return (
    <Pressable
      disabled={loading || props.disabled}
      className={clsx(
        "h-14 rounded-2xl flex items-center justify-center border active:opacity-90",
        {
          "bg-emerald-600 active:bg-emerald-700 border-transparent": type === "primary",
          "bg-slate-500 active:bg-slate-600 border-transparent": type === "secondary",
          "bg-rose-500 active:bg-rose-600 border-transparent": type === "danger",
          "bg-amber-500 active:bg-amber-600 border-transparent": type === "warning",
          "bg-white active:bg-slate-50 border-slate-200": type === "neutral",
        },
        className
      )}
      style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.985 : 1 }] }]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={type === "neutral" ? "#64748B" : "white"} />
      ) : (
        <Text className={clsx("text-base font-semibold", { "text-white": type !== "neutral", "text-slate-700": type === "neutral" })}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

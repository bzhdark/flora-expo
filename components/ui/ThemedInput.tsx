import { clsx } from "clsx";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface ThemedInputProps extends TextInputProps {
  className?: string;
  label?: string;
  error?: string;
  variant?: "default" | "outlined" | "filled";
}

export default function ThemedInput({ className = "", label, error, variant = "default", ...props }: ThemedInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  // const [isFocused, setIsFocused] = useState(false);

  // const handleFocus = (e: any) => {
  //   setIsFocused(true);
  //   onFocus?.(e);
  // };

  // const handleBlur = (e: any) => {
  //   setIsFocused(false);
  //   onBlur?.(e);
  // };

  // Create a stable key that doesn't change based on error state
  const stableKey = `input-${label || "default"}`;

  // Use inline styles for dynamic properties to avoid className changes
  const dynamicStyles = StyleSheet.create({
    input: {
      borderColor: error
        ? variant === "outlined" || variant === "default"
          ? "#EF4444"
          : undefined
        : variant === "outlined" || variant === "default"
          ? "#E5E7EB"
          : undefined,
      backgroundColor: error && variant === "filled" ? "#FEF2F2" : "white",
      shadowColor: error && variant === "default" ? "#FEE2E2" : undefined,
      shadowOffset: error && variant === "default" ? { width: 0, height: 1 } : undefined,
      shadowOpacity: error && variant === "default" ? 0.1 : undefined,
      shadowRadius: error && variant === "default" ? 2 : undefined,
    },
  });

  return (
    <View className='w-full'>
      {label && <Text className='text-md font-medium text-gray-700 mb-1'>{label}</Text>}
      <TextInput
        key={stableKey}
        className={clsx(
          "text-gray-900 h-14 rounded-xl px-4 py-3",
          {
            "border-2 bg-transparent": variant === "outlined",
            "border-0": variant === "filled",
            "border bg-white": variant === "default",
          },
          className
        )}
        style={dynamicStyles.input}
        placeholderTextColor='#9CA3AF'
        selectTextOnFocus={false}
        {...props}
      />

      {error && <Text className='text-sm text-red-500 mt-1'>{error}</Text>}
    </View>
  );
}

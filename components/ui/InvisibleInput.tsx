import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface InvisibleInputProps extends TextInputProps {
  className?: string;
}

export default function InvisibleInput({ className, ...props }: InvisibleInputProps) {
  return (
    <TextInput className={`border-none bg-transparent placeholder:text-gray-400 p-2 text-md ${className}`} {...props} />
  );
}

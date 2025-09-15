import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface ThemedInputProps extends TextInputProps {
    className?: string;
}

export default function ThemedInput({ className, ...props }: ThemedInputProps) {
  return (
    <TextInput
    className={`border border-gray-300 rounded-md p-3 bg-white text-black ${className}`}
    {...props}
  />
  )
}
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface FormInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  rightElement?: React.ReactNode;
}

export function FormInput({
  control,
  name,
  label,
  placeholder,
  type = "text",
  rightElement,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1.5">
          <div className="flex items-center justify-between">
            <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
              {label}
            </FormLabel>
            {rightElement}
          </div>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              className="h-11 bg-white border-zinc-300 text-zinc-900 focus-visible:border-zinc-900 focus-visible:ring-0 transition-all rounded-md px-3.5 shadow-none text-[15px]"
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-500 text-[11px] font-medium" />
        </FormItem>
      )}
    />
  );
}

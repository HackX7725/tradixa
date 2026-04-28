"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
  const baseInputClasses = "h-12 bg-white border-zinc-200 text-zinc-900 focus-visible:border-black focus-visible:ring-4 focus-visible:ring-black/5 transition-all rounded-xl px-4 shadow-sm text-[15px] placeholder:text-zinc-300";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2 flex flex-col">
          <div className="flex items-center justify-between px-1">
            <FormLabel className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              {label}
            </FormLabel>
            {rightElement}
          </div>
          
          <FormControl>
            {type === "date" ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      baseInputClasses,
                      "justify-start text-left font-normal",
                      !field.value && "text-zinc-400"
                    )}
                  >
                    <CalendarIcon className="mr-3 h-4 w-4 text-zinc-400" />
                    {field.value ? format(field.value, "PPP") : <span>{placeholder}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none shadow-2xl rounded-2xl overflow-hidden" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="bg-white"
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <Input
                placeholder={placeholder}
                type={type}
                className={baseInputClasses}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage className="text-red-500 text-[11px] font-medium px-1" />
        </FormItem>
      )}
    />
  );
}

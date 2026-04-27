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
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1.5 flex flex-col">
          <div className="flex items-center justify-between">
            <FormLabel className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
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
                      "h-11 w-full justify-start text-left font-normal border-zinc-300 rounded-md px-3.5 shadow-none text-[15px]",
                      !field.value && "text-zinc-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-zinc-400" />
                    {field.value ? format(field.value, "PPP") : <span>{placeholder}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <Input
                placeholder={placeholder}
                type={type}
                className="h-11 bg-white border-zinc-300 text-zinc-900 focus-visible:border-zinc-900 focus-visible:ring-0 transition-all rounded-md px-3.5 shadow-none text-[15px]"
                {...field}
              />
            )}
          </FormControl>
          <FormMessage className="text-red-500 text-[11px] font-medium" />
        </FormItem>
      )}
    />
  );
}

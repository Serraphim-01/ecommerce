"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  onCreate?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  onCreate,
  placeholder = "Select an option...",
  emptyMessage = "No option found.",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleCreate = () => {
    if (onCreate && inputValue) {
      onCreate(inputValue);
      setInputValue("");
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value
            ? options.find((option) => option.value.toLowerCase() === value.toLowerCase())?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandEmpty>
            {onCreate ? (
              <div
                onClick={handleCreate}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                Create "{inputValue}"
              </div>
            ) : (
              emptyMessage
            )}
          </CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  onChange(currentValue.toLowerCase() === value.toLowerCase() ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.toLowerCase() === option.value.toLowerCase() ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

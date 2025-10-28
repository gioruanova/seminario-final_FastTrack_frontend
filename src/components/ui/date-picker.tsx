"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import "react-day-picker/style.css";

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  disabled?: boolean;
  minDate?: Date;
  disabledDays?: ((date: Date) => boolean) | Date[];
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  disabled = false,
  minDate,
  disabledDays,
  placeholder = "Seleccionar fecha",
  className,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value + "T00:00:00") : undefined
  );

  const [month, setMonth] = React.useState<Date>(
    value ? new Date(value + "T00:00:00") : new Date()
  );

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (value) {
      const newDate = new Date(value + "T00:00:00");
      setDate(newDate);
      setMonth(newDate);
    }
  }, [value]);

  const onDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    onChange(format(selectedDate, "yyyy-MM-dd"));
    setOpen(false);
  };

  const getDisabledDays = () => {
    const disabled = [];

    if (minDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      disabled.push((date: Date) => {
        return date < today;
      });
    }

    if (disabledDays) {
      if (typeof disabledDays === 'function') {
        disabled.push(disabledDays);
      } else {
        disabled.push(...disabledDays);
      }
    }

    return disabled;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: es }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="single"
          selected={date}
          onSelect={onDateSelect}
          disabled={getDisabledDays()}
          fromDate={minDate ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : undefined}
          month={month}
          onMonthChange={setMonth}
          locale={es}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
}

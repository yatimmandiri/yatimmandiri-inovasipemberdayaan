import { cn } from '@/lib/utils';
import { CalendarIcon, ChevronDownIcon, InfoIcon } from 'lucide-react';
import moment from 'moment-timezone';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Field, FieldDescription, FieldLabel } from '../ui/field';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const variants: any = {
    default: 'border-input focus:border-blue-500 focus:ring-blue-500',
    info: 'border-sky-300 focus:border-sky-500',
    success: 'border-emerald-300 focus:border-emerald-500',
    warning: 'border-amber-300 focus:border-amber-500',
    danger: 'border-destructive focus:border-destructive text-destructive',
};

interface Props {
    placeholder?: string;
    className?: string;
    value?: any;
    label?: string;
    errors?: any;
    error?: any;
    helperText?: string;
    group?: boolean;
    color?: keyof typeof variants;
    handleOnChange?: (val: any) => void;
    onChange?: (val: any) => void;
    required?: boolean;
    [key: string]: any;
}

export const DatePickerComponent = ({
    placeholder = 'Pilih Tanggal',
    className = '',
    value,
    label,
    errors,
    error,
    helperText,
    group = false,
    color = 'default',
    handleOnChange,
    onChange,
    required = false,
}: Props) => {
    const isError = !!(errors || error);
    const activeColor = isError ? 'danger' : color;
    const errorMessage = error || helperText;

    const [open, setOpen] = useState(false);
    const [internalDate, setInternalDate] = useState<Date | undefined>();
    const [internalRange, setInternalRange] = useState<any>();

    // Parse value to Date object if string passed
    const parsedDate = useMemo(() => {
        if (!value) return internalDate;
        if (value instanceof Date) return value;
        const d = new Date(value);
        return isNaN(d.getTime()) ? internalDate : d;
    }, [value, internalDate]);

    const selectedDate = group ? null : parsedDate;
    const selectedRange = group ? (value ?? internalRange) : null;

    const emitChange = (val: any) => {
        if (typeof handleOnChange === 'function') {
            handleOnChange(val);
        }
        if (typeof onChange === 'function') {
            onChange(val);
        }
    };

    const handleSelect = (val: any) => {
        if (group) {
            setInternalRange(val);
            emitChange(val);

            if (val?.from && val?.to) {
                setOpen(false);
            }
        } else {
            setInternalDate(val);
            if (val instanceof Date) {
                const formattedStr = moment(val).tz('Asia/Jakarta').format('YYYY-MM-DD');
                emitChange(formattedStr);
            } else {
                emitChange(val || '');
            }
            setOpen(false);
        }
    };

    const formatted = useMemo(() => {
        if (group) {
            if (!selectedRange?.from) return placeholder;

            const from = moment(selectedRange.from)
                .tz('Asia/Jakarta')
                .format('DD MMM YYYY');

            if (selectedRange.to) {
                const to = moment(selectedRange.to)
                    .tz('Asia/Jakarta')
                    .format('DD MMM YYYY');

                return `${from} - ${to}`;
            }

            return from;
        }

        if (!selectedDate) return placeholder;

        return moment(selectedDate).tz('Asia/Jakarta').format('DD MMMM YYYY');
    }, [group, selectedDate, selectedRange, placeholder]);

    useEffect(() => {
        if (!value) return;

        if (group) {
            if (value?.from) setInternalRange(value);
        } else {
            const d = value instanceof Date ? value : new Date(value);
            if (!isNaN(d.getTime())) {
                setInternalDate(d);
            }
        }
    }, [value, group]);

    return (
        <Field data-invalid={isError}>
            {label && (
                <FieldLabel className="mb-1 block text-sm font-medium text-foreground">
                    {label} {required && <span className="text-destructive">*</span>}
                </FieldLabel>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            'w-full justify-between font-normal bg-background px-3 py-2 text-sm shadow-xs border',
                            !selectedDate &&
                                !selectedRange &&
                                'text-muted-foreground',
                            variants[activeColor],
                            className,
                        )}
                    >
                        <span className="flex items-center gap-2 truncate">
                            <CalendarIcon className="h-4 w-4 opacity-70" />
                            {formatted}
                        </span>
                        <ChevronDownIcon className="h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-auto p-0 z-50">
                    {group ? (
                        <Calendar
                            mode="range"
                            selected={selectedRange}
                            onSelect={handleSelect}
                            numberOfMonths={2}
                        />
                    ) : (
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleSelect}
                            initialFocus
                        />
                    )}
                </PopoverContent>
            </Popover>

            {errorMessage && (
                <FieldDescription
                    className={cn(
                        'flex items-center space-x-1.5 mt-1 text-xs',
                        isError ? 'text-destructive' : 'text-muted-foreground',
                    )}
                >
                    <InfoIcon className="h-3.5 w-3.5" />
                    <span>{errorMessage}</span>
                </FieldDescription>
            )}
        </Field>
    );
};

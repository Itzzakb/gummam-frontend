import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const pad2 = (n: number) => String(n).padStart(2, '0');

const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const parseDateValue = (value: string): Date | null => {
  if (!value) return null;

  const iso = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) {
    const parsed = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const dmy = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (dmy) {
    const parsed = new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const fallback = new Date(value);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
};

export interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
}) => {
  const selected = useMemo(() => parseDateValue(value), [value]);
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => startOfDay(selected ?? new Date()));
  const containerRef = useRef<HTMLDivElement>(null);
  const today = useMemo(() => startOfDay(new Date()), []);

  useEffect(() => {
    if (open) {
      setViewMonth(startOfDay(selected ?? new Date()));
    }
  }, [open, selected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const monthLabel = viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const startWeekday = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();
  const calendarDays: (Date | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1)
    ),
  ];
  while (calendarDays.length % 7 !== 0) calendarDays.push(null);

  const selectDay = (day: Date) => {
    onChange(toIsoDate(day));
    setOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 focus:outline-none focus:border-[#4885FF] text-sm text-left bg-white flex items-center justify-between gap-2"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={selected ? 'text-slate-800' : 'text-slate-400'}>
          {selected ? formatDate(selected) : placeholder}
        </span>
        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 w-[280px] bg-white border border-slate-200 rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() =>
                setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
              }
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0B2C5C] hover:bg-[#F0F4F9] transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold text-[#0B2C5C]">{monthLabel}</span>
            <button
              type="button"
              onClick={() =>
                setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
              }
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0B2C5C] hover:bg-[#F0F4F9] transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-[10px] font-semibold text-slate-400 text-center py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="h-8" />;
              }

              const isSelected = selected ? isSameDay(day, selected) : false;
              const isToday = isSameDay(day, today);

              return (
                <button
                  key={toIsoDate(day)}
                  type="button"
                  onClick={() => selectDay(day)}
                  className={`h-8 text-xs font-medium rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-[#035096] text-white'
                      : isToday
                        ? 'text-[#035096] bg-[#E8F1FB] hover:bg-[#d7e7f8]'
                        : 'text-[#0B2C5C] hover:bg-[#F0F4F9]'
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

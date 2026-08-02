import React, { useEffect, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const formatDisplayDate = (date: Date) => formatDate(date);

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export interface DashboardRangeFilterProps {
  value: string;
  onChange: (value: string) => void;
  customStart: Date | null;
  customEnd: Date | null;
  onCustomRangeChange: (start: Date, end: Date) => void;
}

export const DashboardRangeFilter: React.FC<DashboardRangeFilterProps> = ({
  value,
  onChange,
  customStart,
  customEnd,
  onCustomRangeChange,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => startOfDay(new Date()));
  const [pendingStart, setPendingStart] = useState<Date | null>(customStart);
  const [pendingEnd, setPendingEnd] = useState<Date | null>(customEnd);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
        setPendingStart(customStart);
        setPendingEnd(customEnd);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [customStart, customEnd]);

  const openCustomRange = () => {
    onChange('Custom Range');
    setPendingStart(customStart);
    setPendingEnd(customEnd);
    setViewMonth(customStart ? startOfDay(customStart) : startOfDay(new Date()));
    setIsCalendarOpen(true);
  };

  const handlePresetClick = (option: string) => {
    setIsCalendarOpen(false);
    onChange(option);
  };

  const handleDayClick = (day: Date) => {
    if (!pendingStart || (pendingStart && pendingEnd)) {
      setPendingStart(day);
      setPendingEnd(null);
      return;
    }

    if (day < pendingStart) {
      setPendingStart(day);
      setPendingEnd(pendingStart);
      onCustomRangeChange(day, pendingStart);
      setIsCalendarOpen(false);
      return;
    }

    setPendingEnd(day);
    onCustomRangeChange(pendingStart, day);
    setIsCalendarOpen(false);
  };

  const monthLabel = viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstDayOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const startWeekday = firstDayOfMonth.getDay();
  const calendarDays: (Date | null)[] = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i + 1)
    ),
  ];

  const rangeStart = pendingStart;
  const rangeEnd = pendingEnd;
  const customLabel =
    customStart && customEnd
      ? `${formatDisplayDate(customStart)} - ${formatDisplayDate(customEnd)}`
      : null;

  return (
    <div className="relative w-full sm:w-auto sm:shrink-0 self-stretch sm:self-auto" ref={containerRef}>
      <div className="grid grid-cols-2 sm:flex sm:items-center w-full sm:w-auto gap-1 bg-[#F0F4F9] border border-[#E2E8F0] rounded-[8px] p-1">
        <button
          type="button"
          onClick={() => handlePresetClick('Last Month')}
          className={`px-2.5 sm:px-3.5 py-2 rounded-[8px] text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap ${
            value === 'Last Month'
              ? 'bg-[#035096] text-white shadow-sm'
              : 'text-[#0B2C5C] hover:bg-white/80'
          }`}
        >
          Last Month
        </button>
        <button
          type="button"
          onClick={() => handlePresetClick('This Quarter')}
          className={`px-2.5 sm:px-3.5 py-2 rounded-[8px] text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap ${
            value === 'This Quarter'
              ? 'bg-[#035096] text-white shadow-sm'
              : 'text-[#0B2C5C] hover:bg-white/80'
          }`}
        >
          This Quarter
        </button>
        <button
          type="button"
          onClick={openCustomRange}
          className={`col-span-2 sm:col-span-1 px-2.5 sm:px-3.5 py-2 rounded-[8px] text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 min-w-0 ${
            value === 'Custom Range'
              ? 'bg-[#035096] text-white shadow-sm'
              : 'text-[#0B2C5C] hover:bg-white/80'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {value === 'Custom Range' && customLabel
              ? `Custom Range | ${customLabel}`
              : 'Custom Range'}
          </span>
        </button>
      </div>

      {isCalendarOpen && (
        <div className="absolute left-0 right-0 sm:left-auto sm:right-0 top-full mt-2 z-50 w-full sm:w-[300px] bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() =>
                setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
              }
              className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#0B2C5C] hover:bg-[#F0F4F9] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold text-[#0B2C5C]">{monthLabel}</span>
            <button
              type="button"
              onClick={() =>
                setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
              }
              className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#0B2C5C] hover:bg-[#F0F4F9] transition-colors"
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

              const isStart = rangeStart ? isSameDay(day, rangeStart) : false;
              const isEnd = rangeEnd ? isSameDay(day, rangeEnd) : false;
              const inRange =
                rangeStart &&
                rangeEnd &&
                day.getTime() > rangeStart.getTime() &&
                day.getTime() < rangeEnd.getTime();

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={`h-8 text-xs font-medium rounded-lg transition-colors ${
                    isStart || isEnd
                      ? 'bg-[#035096] text-white'
                      : inRange
                        ? 'bg-[#E8F1FB] text-[#035096]'
                        : 'text-[#0B2C5C] hover:bg-[#F0F4F9]'
                  }`}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 mt-3 text-center">
            {!pendingStart
              ? 'Select start date'
              : !pendingEnd
                ? 'Select end date'
                : `${formatDisplayDate(pendingStart)} - ${formatDisplayDate(pendingEnd)}`}
          </p>
        </div>
      )}
    </div>
  );
};

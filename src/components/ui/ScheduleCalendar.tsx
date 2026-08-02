import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { formatDate } from '@/lib/utils';

type ScheduleStatus = 'Scheduled' | 'Pending' | 'Follow-up' | 'Completed';

interface ScheduleEvent {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  title: string;
  type: 'Site Visit' | 'Follow-up' | 'Callback' | 'Meeting';
  status: ScheduleStatus;
  leadName: string;
}

const STATUS_STYLES: Record<ScheduleStatus, string> = {
  Scheduled: 'bg-slate-100 text-slate-600',
  Pending: 'bg-orange-50 text-orange-600',
  'Follow-up': 'bg-blue-50 text-blue-600',
  Completed: 'bg-green-50 text-green-600',
};

const formatKey = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

const getTodayKey = () => {
  const now = new Date();
  return formatKey(now.getFullYear(), now.getMonth(), now.getDate());
};

const addDaysKey = (base: Date, offset: number) => {
  const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + offset);
  return formatKey(d.getFullYear(), d.getMonth(), d.getDate());
};

const buildMockEvents = (): ScheduleEvent[] => {
  const now = new Date();
  const today = addDaysKey(now, 0);
  const tomorrow = addDaysKey(now, 1);
  const day2 = addDaysKey(now, 2);
  const day3 = addDaysKey(now, 3);
  const day4 = addDaysKey(now, 4);
  const day5 = addDaysKey(now, 5);
  const day6 = addDaysKey(now, 6);
  const day7 = addDaysKey(now, 7);

  return [
    {
      id: 'e1',
      date: today,
      time: '11:00 AM',
      title: 'Follow-up Call - Jubilee Hills',
      type: 'Follow-up',
      status: 'Pending',
      leadName: 'Meera Iyer',
    },
    {
      id: 'e2',
      date: today,
      time: '4:00 PM',
      title: 'Budget Confirmation',
      type: 'Callback',
      status: 'Scheduled',
      leadName: 'Karan Desai',
    },
    {
      id: 'e3',
      date: tomorrow,
      time: '2:00 PM',
      title: 'Luxury 3BHK Apartment',
      type: 'Site Visit',
      status: 'Scheduled',
      leadName: 'Priya Verma',
    },
    {
      id: 'e4',
      date: tomorrow,
      time: '4:30 PM',
      title: 'Commercial Office Space',
      type: 'Follow-up',
      status: 'Pending',
      leadName: 'Rahul Sharma',
    },
    {
      id: 'e5',
      date: day2,
      time: '11:00 AM',
      title: 'Villa Site Visit',
      type: 'Site Visit',
      status: 'Scheduled',
      leadName: 'Anjali Mehta',
    },
    {
      id: 'e6',
      date: day3,
      time: '3:15 PM',
      title: 'Token Discussion',
      type: 'Meeting',
      status: 'Follow-up',
      leadName: 'Vikram Patel',
    },
    {
      id: 'e7',
      date: day4,
      time: '10:30 AM',
      title: 'Callback - Budget Review',
      type: 'Callback',
      status: 'Pending',
      leadName: 'Sneha Reddy',
    },
    {
      id: 'e8',
      date: day4,
      time: '5:00 PM',
      title: 'Gachibowli Plot Visit',
      type: 'Site Visit',
      status: 'Scheduled',
      leadName: 'Arjun Nair',
    },
    {
      id: 'e9',
      date: day5,
      time: '12:00 PM',
      title: 'Kondapur Flat Walkthrough',
      type: 'Site Visit',
      status: 'Scheduled',
      leadName: 'Neha Kapoor',
    },
    {
      id: 'e10',
      date: day6,
      time: '9:30 AM',
      title: 'Loan Document Review',
      type: 'Meeting',
      status: 'Follow-up',
      leadName: 'Suresh Pillai',
    },
    {
      id: 'e11',
      date: day6,
      time: '3:45 PM',
      title: 'Callback - Pricing Negotiation',
      type: 'Callback',
      status: 'Pending',
      leadName: 'Divya Rao',
    },
    {
      id: 'e12',
      date: day7,
      time: '1:00 PM',
      title: 'Hitech City Office Visit',
      type: 'Site Visit',
      status: 'Scheduled',
      leadName: 'Amit Joshi',
    },
  ];
};

const truncate = (text: string, max = 12) =>
  text.length > max ? `${text.slice(0, max)}...` : text;

export const ScheduleCalendar: React.FC = () => {
  const todayKey = useMemo(() => getTodayKey(), []);
  const mockEvents = useMemo(() => buildMockEvents(), []);
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [dailySchedule, setDailySchedule] = useState(true);
  const [meetingAlert, setMeetingAlert] = useState(true);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const selectedLabel = useMemo(() => formatDate(selectedDate), [selectedDate]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (days.length % 7 !== 0) days.push(null);
    return days;
  }, [year, month]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, ScheduleEvent[]> = {};
    mockEvents.forEach((event) => {
      if (!map[event.date]) map[event.date] = [];
      map[event.date].push(event);
    });
    return map;
  }, [mockEvents]);

  const selectedEvents = eventsByDate[selectedDate] ?? [];

  const goMonth = (delta: number) => {
    setViewDate(new Date(year, month + delta, 1));
  };

  return (
    <div className="bg-white rounded-[12px] border border-gray-200/60 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-[#0B2C5C] tracking-tight">Schedule Calendar</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            View site visits, follow-ups, and scheduled lead activities.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_1fr]">
        {/* Monthly calendar */}
        <div className="p-4 sm:p-5 border-b xl:border-b-0 xl:border-r border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => goMonth(-1)}
              className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#0B2C5C] hover:bg-[#F0F4F9] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h4 className="text-sm font-semibold text-[#0B2C5C]">{monthLabel}</h4>
            <button
              type="button"
              onClick={() => goMonth(1)}
              className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#0B2C5C] hover:bg-[#F0F4F9] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1.5 mb-1.5">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-[10px] font-semibold text-slate-400 text-center py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="min-h-[72px] sm:min-h-[84px]" />;
              }

              const key = formatKey(year, month, day);
              const dayEvents = eventsByDate[key] ?? [];
              const isSelected = selectedDate === key;
              const isToday = key === todayKey;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedDate(key)}
                  className={`min-h-[72px] sm:min-h-[84px] rounded-[8px] border p-1.5 flex flex-col items-start justify-start text-left transition-all ${
                    isSelected
                      ? 'border-[#035096] bg-[#F0F7FF] shadow-sm'
                      : isToday
                        ? 'border-[#035096]/60 bg-[#F8FBFF]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span
                    className={`block self-start min-w-[18px] h-[18px] px-1 rounded-full text-[11px] font-semibold leading-[18px] text-center ${
                      isToday || isSelected
                        ? 'bg-[#035096] text-white'
                        : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </span>
                  <div className="mt-1 w-full space-y-0.5">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="bg-[#EBF3FE] text-[#035096] text-[9px] font-medium px-1 py-0.5 rounded truncate text-left"
                        title={event.title}
                      >
                        {truncate(event.title)}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] text-slate-400 font-medium px-0.5 text-left">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily schedule sidebar */}
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          <h4 className="text-sm font-semibold text-[#0B2C5C]">{selectedLabel}</h4>

          <div className="space-y-3 flex-1">
            {selectedEvents.length === 0 ? (
              <div className="border border-dashed border-gray-200 rounded-[8px] p-6 text-center">
                <p className="text-xs text-gray-500">No scheduled leads for this day.</p>
              </div>
            ) : (
              selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-200 rounded-[8px] p-3.5 bg-white"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-semibold text-[#035096]">{event.time}</p>
                      <h5 className="text-sm font-semibold text-gray-900 mt-1 leading-snug">
                        {event.title}
                      </h5>
                      <p className="text-[11px] text-gray-500 mt-1">
                        {event.type} · {event.leadName}
                      </p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-[4px] shrink-0 ${STATUS_STYLES[event.status]}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-gray-700">Daily schedule</span>
              <button
                type="button"
                role="switch"
                aria-checked={dailySchedule}
                onClick={() => setDailySchedule((prev) => !prev)}
                className={`relative w-8 h-4 rounded-full transition-colors shrink-0 ${
                  dailySchedule ? 'bg-[#035096]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                    dailySchedule ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-gray-700">Meeting Alert</span>
              <button
                type="button"
                role="switch"
                aria-checked={meetingAlert}
                onClick={() => setMeetingAlert((prev) => !prev)}
                className={`relative w-8 h-4 rounded-full transition-colors shrink-0 ${
                  meetingAlert ? 'bg-[#035096]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                    meetingAlert ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold py-2.5 rounded-[8px] transition-colors"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.99L2 22l5.23-1.372a9.907 9.907 0 0 0 4.781 1.226h.004c5.505 0 9.99-4.478 9.99-9.985a9.93 9.93 0 0 0-2.927-7.06A9.917 9.917 0 0 0 12.012 2zm5.72 14.158c-.313.88-1.534 1.576-2.128 1.69-.533.102-1.22.186-3.57-.79-2.925-1.218-4.805-4.186-4.95-4.382-.146-.195-1.185-1.574-1.185-3.003 0-1.43.75-2.13.99-2.4.24-.27.53-.338.7-.338.172 0 .346.002.497.01.155.008.364-.06.57.447.212.52.723 1.764.785 1.892.062.127.104.276.02.446-.082.17-.123.276-.245.42-.124.143-.26.32-.37.43-.125.127-.255.265-.11.513.146.248.65.1.07 1.07.69.615 1.28 1.018 1.956 1.34.677.32.96.223 1.153.002.193-.22.842-.98.988-1.316.146-.33.29-.276.495-.2.203.076 1.29.61 1.512.72.22.11.367.165.42.257.054.09.054.52-.16 1.4z" />
              </svg>
              WhatsApp
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0088FF] hover:bg-[#0077e0] text-white text-xs font-semibold py-2.5 rounded-[8px] transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

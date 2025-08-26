"use client";
import { useState } from "react";
import "../../styles/calendar.css";

import ReactCalendar from "react-calendar";
import { add, format } from "date-fns";

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

const CustomCalendar = () => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  const getTimes = () => {
    if (!date.justDate) return;

    const { justDate } = date;

    const beginning = add(justDate, { hours: 9 });
    const end = add(justDate, { hours: 17 });
    const interval = 60;

    const times = [];

    for (
      let i = new Date(beginning);
      i <= end;
      i = new Date(i.getTime() + interval * 60000)
    ) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes();

  console.log(date);

  return (
    <div className="flex justify-center items-center h-screen">
      {date.justDate ? (
        <div className="flex max-w-lg flex-wrap gap-4">
          {times?.map((time, i) => (
            <div className="rounded-sm bg-gray-100 p-2" key={`time-${i}`}>
              <button
                onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}
                type="button">
                {format(time, "kk:mm")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className="react-calendar p-2"
          view="month"
          onClickDay={(selectedDate) =>
            setDate((prev) => ({ ...prev, justDate: selectedDate }))
          }
        />
      )}
    </div>
  );
};

export default CustomCalendar;

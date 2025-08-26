"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { days, hours } from "@/constants";
import { Schedule } from "../types/types-event";

interface AvailabilityDaysProps {
  setSchedules: React.Dispatch<React.SetStateAction<Record<string, Schedule>>>;
  schedules: Record<string, Schedule>;
}

export function EditAvailabilityDays({
  setSchedules,
  schedules,
}: AvailabilityDaysProps) {
  const handleSwitchChange = (day: string) => {
    setSchedules((prev) => {
      const isActive = !prev[day].active;
      return {
        ...prev,
        [day]: {
          ...prev[day],
          active: isActive,
          from: isActive ? prev[day].from || "09:00" : "",
          to: isActive ? prev[day].to || "17:00" : "",
        },
      };
    });
  };

  const handleTimeChange = (
    day: string,
    type: "from" | "to",
    value: string
  ) => {
    setSchedules((prev) => {
      const updatedSchedule = { ...prev[day], [type]: value };
      if (type === "from" && value >= prev[day].to) {
        updatedSchedule.to = hours.find((hour) => hour > value) || value;
      }
      if (type === "to" && value <= prev[day].from) {
        updatedSchedule.from = hours.find((hour) => hour < value) || value;
      }
      return { ...prev, [day]: updatedSchedule };
    });
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Día</TableHead>
              <TableHead>Disponible</TableHead>
              <TableHead>Desde</TableHead>
              <TableHead>Hasta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {days.map((day, index) => (
              <TableRow key={day}>
                <TableCell className="font-medium">{day}</TableCell>
                <TableCell>
                  <Switch
                    checked={schedules[day]?.active || false}
                    onCheckedChange={() => handleSwitchChange(day)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={schedules[day]?.from || ""}
                    onValueChange={(value) =>
                      handleTimeChange(day, "from", value)
                    }
                    disabled={!schedules[day]?.active}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Inicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {hours.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    value={schedules[day]?.to || ""}
                    onValueChange={(value) =>
                      handleTimeChange(day, "to", value)
                    }
                    disabled={!schedules[day]?.active}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Fin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {hours
                          .filter((hour) => hour > schedules[day]?.from)
                          .map((hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

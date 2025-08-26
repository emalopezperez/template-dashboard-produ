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
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { days, hours } from "@/constants";
import { Schedule } from "./types/types-event";

interface AvailabilityDaysProps {
  setSchedules: React.Dispatch<React.SetStateAction<Record<string, Schedule>>>;
  schedules: Record<string, Schedule>;
}

export function AvailabilityDays({
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
    <Card>
      <CardHeader>
        <CardTitle>Establecer Disponibilidad</CardTitle>
        <CardDescription>
          Define los días y horarios en los que estarás disponible para las
          citas.
        </CardDescription>
      </CardHeader>
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
              <motion.tr
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}>
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
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona hora de inicio" />
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
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona hora de fin" />
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
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookingTimes, WeekdayName } from "./types/types-event";

interface ScheduleModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  bookingTimes: BookingTimes;
}

const weekdays: WeekdayName[] = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

export function ScheduleModal({
  isOpen,
  setIsOpen,
  bookingTimes,
}: ScheduleModalProps) {
  const availableDays = weekdays.filter((day) => bookingTimes[day].active);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Horarios de Trabajo</DialogTitle>
          <DialogDescription>
            Detalle de los horarios disponibles para la semana.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {availableDays.length > 0 ? (
            availableDays.map((day) => {
              const schedule = bookingTimes[day];
              return (
                <div key={day} className="mb-4 last:mb-0">
                  <h3 className="font-semibold capitalize ">{day}</h3>
                  <p className="text-sm text-muted-foreground">
                    {schedule.from} - {schedule.to}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground">
              No hay días disponibles para este evento.
            </p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EditCreateNewEvent } from "./edit-create-events";
import { EditAvailabilityDays } from "./edit-availability-days";
import { Schedule } from "../types/types-event";
import { days } from "@/constants";
import { toast } from "sonner";
import { UpdateEvent } from "@/app/actions/admin.actions";

interface EditEventProps {
  onOpenChange: (open: boolean) => void;
  event: any;
}

export function EditEvent({ onOpenChange, event }: EditEventProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [data, setData] = useState({
    title: event.title,
    url: event.uri,
    description: event.description,
    duration: event.length,
  });
  const [schedules, setSchedules] = useState<Record<string, Schedule>>(() => {
    const initialSchedules = days.reduce((acc, day) => {
      const bookingTime = event.bookingTimes[day] || {};
      return {
        ...acc,
        [day]: {
          active: bookingTime.active || false,
          from: bookingTime.from || "09:00",
          to: bookingTime.to || "17:00",
        },
      };
    }, {});
    return initialSchedules;
  });

  const handleOnSubmit = async () => {
    const newData = {
      title: data.title,
      url: data.url,
      description: data.description,
      duration: data.duration,
      bookingTimes: schedules,
    };
    try {
      const result = await UpdateEvent(event._id, newData);
      if (result) {
        toast.success("Evento editado correctamente", {
          description: "El evento ha sido actualizado.",
        });
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error al crear el evento:", error);
      toast.error("Error al crear el evento", {
        description: "Por favor, intenta nuevamente más tarde.",
      });
    }
  };

  const isFormComplete = () => {
    return (
      Object.values(data).every((value) => value !== "") &&
      Object.values(schedules).some((schedule) => schedule.active)
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto pt-2 ">
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full ">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalles del Evento</TabsTrigger>
            <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <EditCreateNewEvent data={data} setData={setData} />
          </TabsContent>
          <TabsContent value="availability" className="mt-4">
            <EditAvailabilityDays
              setSchedules={setSchedules}
              schedules={schedules}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={!isFormComplete()}
              className="bg-primary text-primary-foreground hover:bg-primary/90">
              Agregar Evento
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estás seguro que deseas agregar este evento?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Este evento se agregará a la lista de eventos disponibles para
                los usuarios.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <AlertDialogAction
                onClick={handleOnSubmit}
                className="bg-primary text-primary-foreground hover:bg-primary/90">
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

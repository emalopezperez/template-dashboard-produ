"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Calendar, ArrowLeft } from "lucide-react";
import CreateNewEvent from "./create-new-event";
import { AvailabilityDays } from "./availability-days";
import { Button } from "@/components/ui/button";
import { days } from "@/constants";
import { Schedule } from "./types/types-event";
import { toast } from "sonner";
import { CreateEvent } from "@/app/actions/admin.actions";
import { useRouter } from "next/navigation";

export function EventManagementTabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("create-events");
  const [data, setData] = useState({
    title: "",
    url: "",
    description: "",
    duration: "60",
    platform: { status: true, name: "Google Meet" },
    presential: { status: false, address: "Montevideo, Uruguay" },
  });
  const [schedules, setSchedules] = useState<Record<string, Schedule>>(
    days.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { active: true, from: "09:00", to: "17:00" },
      }),
      {}
    )
  );

  const handleOnSubmit = async () => {
    const newData = {
      title: data.title,
      url: data.url,
      description: data.description,
      duration: data.duration,
      bookingTimes: schedules,
      platform: data.platform,
      presential: data.presential,
    };
    try {
      const result = await CreateEvent(newData);
      if (result) {
        toast.success("Evento creado correctamente", {
          description: "El evento ha sido agregado a tu lista de eventos.",
        });
        router.push("/dashboard/events");
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
    <div className="container mx-auto  ">
      <Card className="w-full bg-card">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold ">
            Agregar un nuevo evento
          </CardTitle>
          <CardDescription className="font-sans">
            Crea un nuevo evento para que los usuarios puedan agendar citas
            contigo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="create-events"
                className="flex items-center justify-center py-3 text-base">
                <PlusCircle className="w-5 h-5 mr-2 text-primary" />
                Detalles del Evento
              </TabsTrigger>
              <TabsTrigger
                value="availability"
                className="flex items-center justify-center py-3 text-base">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Disponibilidad
              </TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}>
                <TabsContent value="create-events" className="mt-6 space-y-4">
                  <CreateNewEvent data={data} setData={setData} />
                </TabsContent>
                <TabsContent value="availability" className="mt-6 space-y-4">
                  <AvailabilityDays
                    setSchedules={setSchedules}
                    schedules={schedules}
                  />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
        <CardContent className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
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
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleOnSubmit}
                  className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}

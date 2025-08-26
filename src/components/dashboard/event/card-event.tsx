"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Trash2,
  Edit3,
  MapPin,
  LinkIcon,
  Copy,
  Check,
  Users,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteEvent } from "@/app/actions/admin.actions";
import { CardEventsType, WeekdayName } from "./types/types-event";
import CustomAlertDialog from "@/components/shared/custom-alert-dialog";
import { ScheduleModal } from "./schedule-modal";
import CustomSheet from "@/components/shared/custom-sheet";
import { EditEvent } from "./edit-event/edit-event";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type EventType = {
  event: CardEventsType;
  setIsOpenAlert: (isOpen: boolean) => void;
  isOpenAlert: boolean;
};

const handleDeleteEvent = async (id: string) => {
  await DeleteEvent(id);
};

const CardEvent = ({ event, setIsOpenAlert, isOpenAlert }: EventType) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const activeDays = Object.entries(event.bookingTimes)
    .filter(([_, schedule]) => schedule.active)
    .map(([day]) => day as WeekdayName);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/bookins/${event?.uri}`
    );
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto">
      <Card className=" overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[350px] flex flex-col relative">
        <div className="absolute top-0 right-0 z-10">
          <Link href={`/bookins/${event?.uri}`}>
            <Badge
              variant={event.presential?.status ? "default" : "secondary"}
              className={`text-xs font-semibold px-3 py-1 rounded-bl-lg ${
                event.presential?.status
                  ? "bg-green-800 text-white"
                  : "bg-purple-800 text-white"
              }`}>
              {event.presential?.status ? "Presencial" : "Online"}
            </Badge>
          </Link>
        </div>
        <CardHeader className="p-6 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white flex-shrink-0">
          <div className="flex flex-col space-y-2">
            <CardTitle
              className="text-xl font-bold line-clamp-1"
              title={event.title}>
              {event.title}
            </CardTitle>
            <CardDescription
              className="text-gray-600 dark:text-gray-300 line-clamp-2"
              title={event.description}>
              {event.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col flex-grow justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span>{event.length} min</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{activeDays.length} días activos</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              {event.presential?.status ? (
                <>
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className="truncate cursor-help"
                          title={event.presential?.address}>
                          {event.presential?.address}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{event.presential?.address}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">agenda.com/{event?.uri}.com</span>
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    size="sm"
                    className="ml-auto p-0 h-8 w-8 rounded-full">
                    <AnimatePresence mode="wait" initial={false}>
                      {isCopied ? (
                        <motion.div
                          key="copied"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}>
                          <Check className="w-4 h-4 text-green-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}>
                          <Copy className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-4">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <Avatar
                  key={i}
                  className="w-8 h-8 border-2 border-white dark:border-gray-800">
                  <AvatarImage src={`https://i.pravatar.cc/32?img=${i + 1}`} />
                  <AvatarFallback>U{i + 1}</AvatarFallback>
                </Avatar>
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                +5
              </div>
            </div>
            <Button
              onClick={() => setIsScheduleModalOpen(true)}
              variant="outline"
              size="sm"
              className="text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              Ver horarios <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-gray-50 dark:bg-gray-800 flex justify-between flex-shrink-0">
          <Button
            onClick={() => setIsEditModalOpen(!isEditModalOpen)}
            variant="outline"
            size="sm"
            className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
            <Edit3 className="w-4 h-4 mr-1" /> Actualizar
          </Button>
          <Button
            onClick={() => setIsOpenAlert(!isOpenAlert)}
            size="sm"
            className="flex items-center">
            <Trash2 className="w-4 h-4 mr-1" /> Eliminar
          </Button>
        </CardFooter>
      </Card>
      <CustomAlertDialog
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        title="¿Estás seguro que deseas eliminar este evento?"
        description="Este evento se eliminará de la lista de eventos disponibles para los usuarios."
        fc={() => handleDeleteEvent(event._id)}
        destructive={true}
      />
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        setIsOpen={setIsScheduleModalOpen}
        bookingTimes={event.bookingTimes}
      />
      <CustomSheet
        title="Editar evento"
        description="Edita los detalles del evento"
        children={<EditEvent onOpenChange={setIsEditModalOpen} event={event} />}
        onOpenChange={setIsEditModalOpen}
        open={isEditModalOpen}
      />
    </motion.div>
  );
};

export default CardEvent;

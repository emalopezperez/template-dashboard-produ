"use client";

import { useState } from "react";

import { CardEventsType } from "./types/types-event";
import CardEvent from "./card-event";

interface ListEventsProps {
  dataEvents: CardEventsType[];
}

const ListEvents = ({ dataEvents }: ListEventsProps) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
      {dataEvents?.length > 0 ? (
        dataEvents?.map((event: CardEventsType) => (
          <CardEvent
            key={event._id}
            event={event}
            setIsOpenAlert={setIsOpenAlert}
            isOpenAlert={isOpenAlert}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-muted-foreground text-lg">
          No tienes eventos programados
        </p>
      )}
    </div>
  );
};

export default ListEvents;

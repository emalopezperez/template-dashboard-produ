export interface Schedule {
  active: boolean;
  from: string;
  to: string;
}

export type WeekdayName =
  | "lunes"
  | "martes"
  | "miércoles"
  | "jueves"
  | "viernes"
  | "sábado"
  | "domingo";

export type FromTo = {
  from: string;
  to: string;
  active: boolean;
};

export type BookingTimes = {
  [key in WeekdayName]: FromTo;
};

export type CardEventsType = {
  _id: string;
  uri?: string;
  title: string;
  description: string;
  length: number;
  bookingTimes: BookingTimes;
  presential?: PresentialType;
  online?: OnlineType;
};

interface PresentialType {
  status: boolean;
  address: string;
}

interface OnlineType {
  status: boolean;
  uri: string;
}

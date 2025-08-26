"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const EditCreateNewEvent = ({
  data,
  setData,
}: {
  data: any;
  setData: any;
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDurationChange = (value: string) => {
    setData({ ...data, duration: value });
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <form noValidate className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título del Evento</Label>
            <Input
              id="title"
              name="title"
              value={data.title}
              placeholder="Ej: Consulta Legal"
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL Personalizada</Label>
            <div className="flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                agenda.com/
              </span>
              <Input
                type="text"
                id="url"
                name="url"
                value={data.url}
                placeholder="tu-url-personalizada"
                className="rounded-l-none"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={data.description}
              placeholder="Describe el propósito de este tipo de cita"
              className="h-24"
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duración</Label>
            <Select
              name="duration"
              value={data.duration}
              defaultValue={data.duration}
              onValueChange={handleDurationChange}
              required>
              <SelectTrigger>
                <SelectValue>
                  {data.duration
                    ? `${data.duration} ${
                        data.duration === "60" ? "hora" : "minutos"
                      }`
                    : "Selecciona la duración"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="45">45 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

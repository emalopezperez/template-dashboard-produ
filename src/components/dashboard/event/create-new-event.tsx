import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Platform = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

const CreateNewEvent = ({ data, setData }: { data: any; setData: any }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDurationChange = (value: string) => {
    setData({ ...data, duration: value });
  };

  const handleMeetingTypeChange = (value: string) => {
    console.log(value);
    if (value === "virtual") {
      setData({
        ...data,
        platform: {
          ...data.platform,
          status: true,
          name: data.platform.name || "Google Meet",
        },
        presential: { ...data.presential, status: false, address: "" },
      });
    } else if (value === "presential") {
      setData({
        ...data,
        platform: { ...data.platform, status: false },
        presential: {
          ...data.presential,
          status: true,
          address: data.presential.address || "",
        },
      });
    }
  };

  const handlePlatformChange = (value: string) => {
    setData({
      ...data,
      platform: { ...data.platform, name: value },
    });
  };

  const handlePresentialAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({
      ...data,
      presential: { ...data.presential, address: e.target.value },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles del Evento</CardTitle>
        <CardDescription>
          Proporciona la información básica para tu nuevo evento.
        </CardDescription>
      </CardHeader>
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
            <Label>Tipo de Reunión</Label>
            <RadioGroup
              value={data.platform.status ? "virtual" : "presential"}
              onValueChange={handleMeetingTypeChange}
              className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="virtual" id="virtual" />
                <Label htmlFor="virtual">Virtual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="presential" id="presential" />
                <Label htmlFor="presential">Presencial</Label>
              </div>
            </RadioGroup>
          </div>

          {data.platform.status ? (
            <div className="space-y-2">
              <Label htmlFor="platform">Plataforma de reunión virtual</Label>
              <Select
                value={data.platform.name}
                onValueChange={handlePlatformChange}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Selecciona una plataforma" />
                </SelectTrigger>
                <SelectContent className="cursor-pointer">
                  <SelectGroup>
                    <SelectItem value="Zoom">Zoom</SelectItem>
                    <SelectItem value="Google Meet">Google Meet</SelectItem>
                    <SelectItem value="Microsoft Teams">
                      Microsoft Teams
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="presential">Dirección</Label>
              <Input
                id="presential"
                name="presential"
                value={data.presential.address}
                placeholder="Ingresa la dirección de la reunión"
                onChange={handlePresentialAddressChange}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="duration">Duración</Label>
            <Select
              name="duration"
              value={data.duration}
              onValueChange={handleDurationChange}
              required>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Selecciona la duración" />
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

export default CreateNewEvent;

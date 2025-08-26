"use client";
import * as React from "react";

import { CardSumary } from "@/components/dashboard/shared/card-sumary";
import { dataCardSumary } from "@/constants";

import { TrendingUp, Calendar, Ticket, Users, DollarSign } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HeaderTitle } from "@/components/shared/header-title";

// Datos actualizados para el negocio de tickets
const ticketSalesData = [
  { month: "January", ventas: 450, eventos: 12 },
  { month: "February", ventas: 620, eventos: 18 },
  { month: "March", ventas: 580, eventos: 15 },
  { month: "April", ventas: 720, eventos: 22 },
  { month: "May", ventas: 890, eventos: 28 },
  { month: "June", ventas: 1200, eventos: 35 },
];

const eventosData = [
  { evento: "Concierto Rock", vendidos: 320, disponibles: 80 },
  { evento: "Teatro Musical", vendidos: 180, disponibles: 20 },
  { evento: "Conferencia Tech", vendidos: 250, disponibles: 50 },
  { evento: "Festival Jazz", vendidos: 450, disponibles: 150 },
  { evento: "Stand Up Comedy", vendidos: 120, disponibles: 30 },
  { evento: "Opera Clásica", vendidos: 90, disponibles: 60 },
];

const ingresosPorEvento = [
  { mes: "Enero", ingresos: 28500 },
  { mes: "Febrero", ingresos: 42300 },
  { mes: "Marzo", ingresos: 35600 },
  { mes: "Abril", ingresos: 48200 },
  { mes: "Mayo", ingresos: 56800 },
  { mes: "Junio", ingresos: 75400 },
];

const chartConfig = {
  ventas: {
    label: "Tickets Vendidos",
    color: "hsl(var(--chart-1))",
  },
  eventos: {
    label: "Eventos Activos",
    color: "hsl(var(--chart-2))",
  },
  vendidos: {
    label: "Vendidos",
    color: "hsl(var(--chart-1))",
  },
  disponibles: {
    label: "Disponibles",
    color: "hsl(var(--chart-3))",
  },
  ingresos: {
    label: "Ingresos ($)",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

// Datos para las tarjetas de resumen
const ticketSummaryData = [
  {
    icon: Ticket,
    total: "2,847",
    avarage: 15.3,
    title: "Tickets Vendidos",
    tooltipText: "Total de tickets vendidos este mes",
  },
  {
    icon: Calendar,
    total: "28",
    avarage: 12.5,
    title: "Eventos Activos",
    tooltipText: "Eventos con ventas activas",
  },
  {
    icon: Users,
    total: "1,634",
    avarage: 8.2,
    title: "Clientes Únicos",
    tooltipText: "Compradores únicos este mes",
  },
  {
    icon: DollarSign,
    total: "$75,400",
    avarage: 22.8,
    title: "Ingresos Totales",
    tooltipText: "Ingresos generados este mes",
  },
];

export default function Page() {
  return (
    <main className="">
      <HeaderTitle
        title="Dashboard Tickets"
        contentToolTip="Panel de Control de Tickets"
        description="Resumen general de ventas, eventos y estadísticas"
      />

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-x-6 mt-10">
        {ticketSummaryData.map((item, index) => (
          <CardSumary
            key={index}
            icon={item.icon}
            total={item.total}
            avarage={item.avarage}
            title={item.title}
            tooltipText={item.tooltipText}
          />
        ))}
      </div>

      {/* Gráficas principales */}
      <div className="flex lg:flex-row flex-col lg:gap-10 gap-5 mt-12">
        {/* Gráfica de ventas mensuales */}
        <Card className="w-full lg:w-[400px]">
          <CardHeader>
            <CardTitle>Ventas de Tickets</CardTitle>
            <CardDescription>Enero - Junio 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={ticketSalesData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="ventas" fill="var(--color-ventas)" radius={4} />
                <Bar dataKey="eventos" fill="var(--color-eventos)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Crecimiento del 34.7% este mes <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Mostrando ventas y eventos de los últimos 6 meses
            </div>
          </CardFooter>
        </Card>

        {/* Gráfica de línea - Ingresos */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Ingresos por Mes</CardTitle>
            <CardDescription>Tendencia de ingresos 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={ingresosPorEvento}
                margin={{
                  left: 12,
                  right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="mes"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="ingresos"
                  type="natural"
                  stroke="var(--color-ingresos)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-ingresos)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Aumento del 164% en ingresos <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Comparación de ingresos mensuales en dólares
            </div>
          </CardFooter>
        </Card>

        {/* Gráfica horizontal - Eventos populares */}
        <Card className="w-full lg:w-[400px]">
          <CardHeader>
            <CardTitle>Eventos Populares</CardTitle>
            <CardDescription>Tickets vendidos por evento</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={eventosData}
                layout="vertical"
                margin={{
                  right: 16,
                }}>
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="evento"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.split(" ")[0]}
                  hide
                />
                <XAxis dataKey="vendidos" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="vendidos"
                  layout="vertical"
                  fill="var(--color-vendidos)"
                  radius={4}>
                  <LabelList
                    dataKey="evento"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={11}
                    formatter={(value: any) => value.split(" ")[0]}
                  />
                  <LabelList
                    dataKey="vendidos"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Festival Jazz lidera las ventas <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Ranking de eventos por tickets vendidos
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">🎫 Eventos en Vivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Festival Jazz
                </span>
                <span className="font-medium">En curso</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Concierto Rock
                </span>
                <span className="font-medium">En curso</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Stand Up Comedy
                </span>
                <span className="font-medium">Próximamente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">👥 Socios Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Teatro Nacional
                </span>
                <span className="font-medium">Premium</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Centro de Eventos
                </span>
                <span className="font-medium">Gold</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Auditorio Central
                </span>
                <span className="font-medium">Standard</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">📊 Métricas del Día</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Tickets vendidos hoy
                </span>
                <span className="font-medium">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Ingresos del día
                </span>
                <span className="font-medium">$3,845</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Eventos nuevos
                </span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

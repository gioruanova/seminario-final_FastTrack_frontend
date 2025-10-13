"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { config } from "@/lib/config";
import { SUPER_API } from "@/lib/superApi/config";
import { format, subDays, subMonths, startOfMonth, isAfter, parseISO } from "date-fns";
import { es } from "date-fns/locale";

const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ReclamoData {
  reclamo_id: number;
  created_at: string;
  reclamo_estado: string;
}

type FilterType = "7d" | "30d" | "3m" | "1y";

const chartConfig = {
  abiertos: {
    label: "Abiertos",
    color: "#6366f1",
  },
  cerrados: {
    label: "Cerrados",
    color: "#818cf8",
  },
} satisfies ChartConfig;

export function ReclamosChart() {
  const [reclamos, setReclamos] = useState<ReclamoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("1y");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(SUPER_API.GET_RECLAMOS);
        setReclamos(response.data);
      } catch (error) {
        console.error("Error obteniendo reclamos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    if (!reclamos.length) return [];

    const now = new Date();
    let startDate: Date;

    switch (filter) {
      case "7d":
        startDate = subDays(now, 7);
        break;
      case "30d":
        startDate = subDays(now, 30);
        break;
      case "3m":
        startDate = subMonths(now, 3);
        break;
      case "1y":
        startDate = subMonths(now, 12);
        break;
      default:
        startDate = subMonths(now, 1);
    }

    const filteredReclamos = reclamos.filter(r => {
      const reclamoDate = parseISO(r.created_at);
      return isAfter(reclamoDate, startDate);
    });

    const groupedByMonth = filteredReclamos.reduce((acc, reclamo) => {
      const date = parseISO(reclamo.created_at);
      const monthKey = format(date, "yyyy-MM");
      const monthLabel = format(date, "MMM yyyy", { locale: es });

      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthLabel,
          monthKey,
          abiertos: 0,
          cerrados: 0,
        };
      }

      if (reclamo.reclamo_estado === "ABIERTO") {
        acc[monthKey].abiertos += 1;
      } else {
        acc[monthKey].cerrados += 1;
      }

      return acc;
    }, {} as Record<string, { month: string; monthKey: string; abiertos: number; cerrados: number }>);

    return Object.values(groupedByMonth).sort((a, b) => a.monthKey.localeCompare(b.monthKey));
  }, [reclamos, filter]);

  const totalReclamos = reclamos.length;
  const totalAbiertos = reclamos.filter(r => r.reclamo_estado === "ABIERTO").length;
  const totalCerrados = reclamos.filter(r => r.reclamo_estado !== "ABIERTO").length;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded w-64"></div>
        <Card className="animate-pulse">
          <CardHeader className="h-24 bg-muted/50"></CardHeader>
          <CardContent className="h-80 bg-muted/30"></CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tendencia reclamos</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Expandir
            </>
          ) : (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Colapsar
            </>
          )}
        </Button>
      </div>

      {!isCollapsed && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between md:flex-row flex-col text-center md:text-left">
              <div>
                <CardTitle>Reclamos por Mes</CardTitle>
                <CardDescription>
                  Total: {totalReclamos} | Abiertos: {totalAbiertos} | Cerrados: {totalCerrados}
                </CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap md:flex-no-wrap justify-center md:justify-start mt-4 md:mt-0">
                <Button
                  variant={filter === "7d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("7d")}
                >
                  7 días
                </Button>
                <Button
                  variant={filter === "30d" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("30d")}
                >
                  30 días
                </Button>
                <Button
                  variant={filter === "3m" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("3m")}
                >
                  3 meses
                </Button>
                <Button
                  variant={filter === "1y" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("1y")}
                >
                  Ultimo año
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pl-0 md:px-4">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillAbiertos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillCerrados" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="cerrados"
              type="monotone"
              fill="url(#fillCerrados)"
              stroke="#818cf8"
              strokeWidth={2}
              stackId="1"
            />
            <Area
              dataKey="abiertos"
              type="monotone"
              fill="url(#fillAbiertos)"
              stroke="#6366f1"
              strokeWidth={2}
              stackId="1"
            />
          </AreaChart>
        </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


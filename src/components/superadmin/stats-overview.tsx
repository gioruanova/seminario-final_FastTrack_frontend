"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, Label } from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { config } from "@/lib/config";
import { SUPER_API } from "@/lib/superApi/config";

const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface UserData {
  user_id: number;
  user_role: string;
  user_status: number;
}

interface EspecialidadData {
  id_especialidad: number;
  nombre_especialidad: string;
  estado_especialidad: number;
}

const CHART_COLORS = [
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

export function StatsOverview() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [especialidades, setEspecialidades] = useState<EspecialidadData[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, especialidadesRes] = await Promise.all([
          apiClient.get(SUPER_API.GET_USERS),
          apiClient.get(SUPER_API.GET_ESPECIALIDADES),
        ]);
        
        setUsers(usersRes.data);
        setEspecialidades(especialidadesRes.data);
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const nonSuperAdminUsers = users.filter(u => u.user_role !== "superadmin");
  
  const activeUsers = nonSuperAdminUsers.filter(u => u.user_status === 1).length;
  const inactiveUsers = nonSuperAdminUsers.filter(u => u.user_status === 0).length;
  const totalUsers = nonSuperAdminUsers.length;

  const ownerUsers = nonSuperAdminUsers.filter(u => u.user_role === "owner").length;
  const operadorUsers = nonSuperAdminUsers.filter(u => u.user_role === "operador").length;
  const profesionalUsers = nonSuperAdminUsers.filter(u => u.user_role === "profesional").length;

  const statusData = [
    { name: "Activos", value: activeUsers, fill: "#10b981" },
    { name: "Inactivos", value: inactiveUsers, fill: "#ef4444" },
  ];

  const rolesData = [
    { name: "Owners", value: ownerUsers, fill: "#8b5cf6" },
    { name: "Operadores", value: operadorUsers, fill: "#3b82f6" },
    { name: "Profesionales", value: profesionalUsers, fill: "#f59e0b" },
  ];

  const especialidadesGrouped = especialidades.reduce((acc, esp) => {
    const existing = acc.find(item => item.name === esp.nombre_especialidad);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({
        name: esp.nombre_especialidad,
        value: 1,
        fill: CHART_COLORS[acc.length % CHART_COLORS.length],
      });
    }
    return acc;
  }, [] as Array<{ name: string; value: number; fill: string }>);

  const especialidadesData = especialidadesGrouped;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-muted animate-pulse rounded w-64"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-20 bg-muted/50"></CardHeader>
              <CardContent className="h-48 bg-muted/30"></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Estadísticas Generales</h2>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Gráfico 1: Usuarios Activos vs Inactivos */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de Usuarios</CardTitle>
              <CardDescription>Activos vs Inactivos</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-0">
              <ChartContainer
                config={{
                  activos: { label: "Activos", color: "#10b981" },
                  inactivos: { label: "Inactivos", color: "#ef4444" },
                }}
                className="mx-auto aspect-square h-[250px]"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                {totalUsers}
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                Total
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Gráfico 2: Usuarios por Rol */}
          <Card>
            <CardHeader>
              <CardTitle>Usuarios por Rol</CardTitle>
              <CardDescription>Distribución de roles</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-0">
              <ChartContainer
                config={{
                  owners: { label: "Owners", color: "#8b5cf6" },
                  operadores: { label: "Operadores", color: "#3b82f6" },
                  profesionales: { label: "Profesionales", color: "#f59e0b" },
                }}
                className="mx-auto aspect-square h-[250px]"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={rolesData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    {rolesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                {ownerUsers + operadorUsers + profesionalUsers}
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                Usuarios
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Gráfico 3: Especialidades */}
          <Card>
            <CardHeader>
              <CardTitle>Especialidades</CardTitle>
              <CardDescription>Por nombre</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-0">
              <ChartContainer
                config={especialidadesGrouped.reduce((acc, esp, index) => {
                  acc[esp.name.toLowerCase()] = {
                    label: esp.name,
                    color: esp.fill,
                  };
                  return acc;
                }, {} as ChartConfig)}
                className="mx-auto aspect-square h-[250px]"
              >
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={especialidadesData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    {especialidadesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                              <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                {especialidades.length}
                              </tspan>
                              <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                Total
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

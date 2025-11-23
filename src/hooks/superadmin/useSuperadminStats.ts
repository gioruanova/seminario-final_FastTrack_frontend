"use client";

import { useState, useEffect, useMemo } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { API_ROUTES } from "@/lib/api_routes";
import { SUPER_API } from "@/lib/superApi/config";
import { apiClient } from "@/lib/apiClient";
import { Especialidad } from "@/types/especialidades";
import {
  SuperadminUserData,
  SuperadminCompanyData,
  SuperadminReclamoData,
} from "@/types/superadmin";
import { processCompanyStats } from "@/utils/superadmin/processCompanyStats";

export function useSuperadminStats() {
  const { refreshTrigger } = useDashboard();
  const [users, setUsers] = useState<SuperadminUserData[]>([]);
  const [companies, setCompanies] = useState<SuperadminCompanyData[]>([]);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [reclamos, setReclamos] = useState<SuperadminReclamoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [usersRes, companiesRes, especialidadesRes, reclamosRes] = await Promise.all([
          apiClient.get(API_ROUTES.GET_USERS),
          apiClient.get(API_ROUTES.GET_COMPANIES),
          apiClient.get(API_ROUTES.GET_ESPECIALIDADES),
          apiClient.get(SUPER_API.GET_RECLAMOS),
        ]);

        setUsers(usersRes.data);
        setCompanies(companiesRes.data);
        setEspecialidades(especialidadesRes.data);
        setReclamos(reclamosRes.data);
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  const companyStats = useMemo(
    () => processCompanyStats(companies, users, especialidades, reclamos),
    [companies, users, especialidades, reclamos]
  );

  return {
    users,
    companies,
    especialidades,
    reclamos,
    companyStats,
    isLoading,
  };
}


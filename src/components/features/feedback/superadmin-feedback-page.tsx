"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { FeedbackDetailSheet } from "@/components/features/feedback/feedback-detail-sheet";
import { toast } from "sonner";
import axios from "axios";
import { config } from "@/lib/config";
import { SUPER_API } from "@/lib/superApi/config";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const apiClient = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface FeedbackData {
  feedback_id: number;
  user_id: number;
  user_name: string;
  company_id: number;
  company_name: string;
  user_role: string;
  user_email: string;
  feedback_message: string;
  created_at: string;
  updated_at: string;
}

export function SuperadminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState<FeedbackData | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(SUPER_API.GET_FEEDBACKS);

      const sortedFeedbacks = response.data.sort((a: FeedbackData, b: FeedbackData) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      setFeedbacks(sortedFeedbacks);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
      toast.error("Error al cargar los feedbacks");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedFeedbacks = feedbacks.slice(startIndex, endIndex);

  const handleViewDetails = (feedback: FeedbackData) => {
    setSelectedFeedback(feedback);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedFeedback(null);
  };

  const handleDeleteClick = (feedback: FeedbackData) => {
    setFeedbackToDelete(feedback);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!feedbackToDelete) return;

    try {
      setIsDeleting(true);
      const endpoint = SUPER_API.DELETE_FEEDBACK.replace("{feedback_id}", feedbackToDelete.feedback_id.toString());
      
      await apiClient.delete(endpoint);
      
      toast.success("Feedback eliminado correctamente");
      fetchData();
      setIsDeleteDialogOpen(false);
      setFeedbackToDelete(null);
    } catch (error) {
      console.error("Error eliminando feedback:", error);
      toast.error("Error al eliminar el feedback");
    } finally {
      setIsDeleting(false);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner":
        return "default";
      case "operador":
        return "secondary";
      case "profesional":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start md:items-center justify-start md:justify-between flex-col md:flex-row gap-2">
            <div>
              <CardTitle className="text-2xl">Gestión de Feedback</CardTitle>
              <p className="text-sm text-muted-foreground mt-1 text-balance">
                Visualiza y gestiona todos los feedbacks del sistema
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              {feedbacks.length} {feedbacks.length === 1 ? "feedback" : "feedbacks"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No hay feedbacks registrados
            </div>
          ) : (
            <>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedFeedbacks.map((feedback) => (
                      <TableRow key={feedback.feedback_id}>
                        <TableCell>
                          <div className="text-sm">
                            {format(parseISO(feedback.created_at), "dd/MM/yyyy", { locale: es })}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(parseISO(feedback.created_at), "HH:mm", { locale: es })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{feedback.user_name}</div>
                          <div className="text-xs text-muted-foreground">{feedback.user_email}</div>
                        </TableCell>
                        <TableCell>{feedback.company_name}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(feedback.user_role)}>
                            {feedback.user_role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleViewDetails(feedback)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteClick(feedback)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <div className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
                  Mostrando {startIndex + 1}-{Math.min(endIndex, feedbacks.length)} de {feedbacks.length} feedbacks
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center gap-1 md:gap-2 justify-center md:justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="text-xs md:text-sm px-2 md:px-3"
                    >
                      <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="hidden sm:inline ml-1">Anterior</span>
                    </Button>

                    <div className="flex flex-wrap items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-6 h-6 md:w-8 md:h-8 p-0 text-xs md:text-sm"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="text-xs md:text-sm px-2 md:px-3"
                    >
                      <span className="hidden sm:inline mr-1">Siguiente</span>
                      <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <FeedbackDetailSheet
        feedback={selectedFeedback}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente este feedback del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}


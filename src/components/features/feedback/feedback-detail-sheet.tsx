"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Building2, Mail, Calendar, Clock, FileText } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

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

interface FeedbackDetailSheetProps {
  feedback: FeedbackData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackDetailSheet({ feedback, isOpen, onClose }: FeedbackDetailSheetProps) {
  if (!feedback) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[90%] sm:max-w-2xl overflow-y-auto md:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Detalles del Feedback</SheetTitle>
        </SheetHeader>
        <Separator />

        <div className="mt-1 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Nombre:</span>
              </div>
              <span className="font-medium">{feedback.user_name}</span>
            </div>

            <div className="flex items-start flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Email:</span>
              </div>
              <a 
                href={`mailto:${feedback.user_email}`} 
                className="font-medium text-primary hover:underline"
              >
                {feedback.user_email}
              </a>
            </div>

            <div className="flex items-start flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Empresa:</span>
              </div>
              <span className="font-medium">{feedback.company_name}</span>
            </div>

            <div className="flex items-start flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Rol:</span>
              </div>
              <span className="font-medium capitalize">{feedback.user_role}</span>
            </div>

            <Separator />

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Fecha de creación:</span>
              <span className="font-medium">
                {format(parseISO(feedback.created_at), "dd/MM/yyyy", { locale: es })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Hora de creación:</span>
              <span className="font-medium">
                {format(parseISO(feedback.created_at), "HH:mm", { locale: es })}
              </span>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Mensaje del Feedback
              </Label>
              <div className="mt-2 rounded-md border bg-muted/50 p-4 text-sm whitespace-pre-wrap">
                {feedback.feedback_message}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


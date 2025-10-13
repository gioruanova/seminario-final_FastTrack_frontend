"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const images = [
  "/assets/step-1.jpg",
  "/assets/step-2.jpg",
  "/assets/step-3.jpg",
  "/assets/step-4.jpg",
];

interface InstallInstructionsModalProps {
  onClose: () => void;
}

export const InstallInstructionsModal = ({
  onClose,
}: InstallInstructionsModalProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-[85%] gap-0.5">
        <DialogHeader>
          <DialogTitle className="text-sm md:text-2xl">
            Instalar FastTrack en iOS/macOS
          </DialogTitle>
          <DialogClose className="cursor-pointer" />
        </DialogHeader>
        <ol className="list-decimal ml-0 mb-4 ">
          <li className="text-xs md:text-lg/5 text-foreground">
            Toca el botón Compartir 📤
          </li>
          <li className="text-xs md:text-lg/5 text-foreground">
            Elegi los 3 ... 📱
          </li>
          <li className="text-xs md:text-lg/5 text-foreground">
            Elegi Añadir a pantalla de inicio ➕
          </li>
          <li className="text-xs md:text-lg/5 text-foreground">
            Tu aplicación ya esta en tu pantalla de inicio ✅
          </li>
        </ol>
        <Carousel>
          <CarouselContent>
            {images.map((src, idx) => (
              <CarouselItem key={idx}>
                <Image
                  src={src}
                  alt={`Step ${idx + 1}`}
                  width={150}
                  height={200}
                  className="rounded-lg mx-auto max-h-75 md:max-h-200 w-auto size-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

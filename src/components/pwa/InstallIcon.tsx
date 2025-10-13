import { Button } from "../ui/button";

import { CloudDownload } from "lucide-react";


interface InstallIconProps {
  onClick: () => void;
}

export default function InstallIcon({ onClick }: InstallIconProps) {
  return (
    <div className="fixed bottom-2 right-2 z-999" id="install-btn">
      <Button
        variant={"default"}
        onClick={onClick}
        className="group inline-flex items-center gap-2 md:gap-0 overflow-hidden
               w-auto md:w-10 md:hover:w-36 md:hover:gap-2 transition-all duration-300 ease-in-out"
      >
        <CloudDownload
          aria-hidden="true"
          className="size-6 text-white flex-shrink-0"
        />

        <span
          className="hidden md:inline-block
                     max-w-0 md:group-hover:max-w-[160px] 
                     overflow-hidden 
                     whitespace-nowrap 
                     transition-[max-width] duration-300 ease-in-out"
        >
          Instalar App
        </span>

        <span className="inline md:hidden">Instalar App</span>
      </Button>
    </div>
  );
}

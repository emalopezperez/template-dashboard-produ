import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CardHeader, CardTitle } from "../ui/card";

interface CustomSheetProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const CustomSheet = ({
  title,
  description,
  children,
  onOpenChange,
  open,
}: CustomSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            <CardTitle className="text-3xl font-bold">{title}</CardTitle>
          </SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="mt-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CustomSheet;

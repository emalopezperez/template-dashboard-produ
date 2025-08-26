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

import { AlertCircle, CheckCircle } from "lucide-react";

interface CustomAlertDialogProps {
  isOpenAlert: boolean;
  setIsOpenAlert: (isOpen: boolean) => void;
  title: string;
  description: string;
  fc: () => void;
  destructive?: boolean;
  success?: boolean;
}

const CustomAlertDialog = ({
  isOpenAlert,
  setIsOpenAlert,
  title,
  description,
  fc,
  destructive,
}: CustomAlertDialogProps) => {
  return (
    <AlertDialog open={isOpenAlert} onOpenChange={setIsOpenAlert}>
      <AlertDialogContent>
        {destructive && <AlertCircle className="h-5 w-5 text-red-500" />}
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            className="transition-all duration-300  text-white hover:bg-gray-500 hover:text-white"
            onClick={fc}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;

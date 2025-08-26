"use client"

import { toast } from "@/hooks/use-toast";

export const showCustomToast = ({
  message,
  description,
  variant = "default",
}: {
  message: string;
  description: string;
  variant?: "default" | "destructive";
}) => {
  toast({
    title: message,
    description: description,
    variant: variant as "default" | "destructive",
  })
}


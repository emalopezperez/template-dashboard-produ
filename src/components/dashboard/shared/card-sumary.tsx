import { LucideIcon, MoveUpRight } from "lucide-react";
import { cn } from "@/utils/utils";
import CustomToolTip from "@/components/shared/custom-toolTip";
import CustomIcon from "@/components/shared/custom-icon";

interface CardSumaryProps {
  icon: LucideIcon;
  total: string;
  avarage: number;
  title: string;
  tooltipText: string;
}

export const CardSumary = (props: CardSumaryProps) => {
  const { icon, total, avarage, title, tooltipText } = props;
  return (
    <div className="shadow-md bg-background rounded-lg p-5 py-3 hover:shadow-lg transition">
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <CustomIcon icon={icon} />
          {title}
        </div>
        <CustomToolTip content={tooltipText} />
      </div>

      <div className="flex gap-4 m-2 items-center">
        <p className="2xl">{total}</p>
        <div
          className={cn(
            `flex items-center gap-1  px-2 text-white rounded-lg text-xs h-[20px] bg-black dark:bg-secondary`
          )}>
          {avarage}% <MoveUpRight strokeWidth={2} className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

import CustomToolTip from "@/components/shared/custom-toolTip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HeaderTitleProps {
  title: string;
  contentToolTip: string;
  description: string;
}

export const HeaderTitle = (props: HeaderTitleProps) => {
  const { title, contentToolTip, description } = props;
  return (
    <Card className="">
      <CardHeader className="">
        <div className="flex justify-between items-center">
          <CardTitle className="text-3xl font-semibold ">{title}</CardTitle>
          <CustomToolTip content={contentToolTip} />
        </div>

        <CardDescription className="mt-4 font-sans">
          Create a new appointment type that allows people to book times.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

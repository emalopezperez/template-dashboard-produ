import { GetEvents } from "@/app/actions/admin.actions";
import ListEvents from "@/components/dashboard/event/list-events";
import { HeaderTitle } from "@/components/shared/header-title";

export default async function Events() {
  return (
    <>
      <HeaderTitle
        title="Todos los eventos"
        contentToolTip="Eventos"
        description="Eventos"
      />
    </>
  );
}

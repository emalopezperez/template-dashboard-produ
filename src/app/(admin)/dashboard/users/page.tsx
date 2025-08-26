import { getUsers } from "@/app/actions/user.actions";
import { TableUsers } from "@/components/dashboard/users/table-users";
import { HeaderTitle } from "@/components/shared/header-title";

export default async function Page() {
  const users = await getUsers();
  return (
    <div>
      <HeaderTitle
        title="Usuarios"
        contentToolTip="Usuarios"
        description="Usuarios"
      />
      <TableUsers users={users || []} />
    </div>
  );
}

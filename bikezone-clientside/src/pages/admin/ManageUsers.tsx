import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllUsersQuery,
  useUpdateUserActiveStatusMutation,
} from "@/redux/features/user/userApi";
import LoadAnimation from "@/components/menu/LoadAnimation";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { TUser } from "@/types/global.type";
// import { useUpdateUserActiveStatusMutation } from "@/redux/features/user/userApi";

const ManageUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useGetAllUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateUserStatus, { isLoading: userUpdating }] =
    useUpdateUserActiveStatusMutation();

  const handleToggleStatus = async (userId: string) => {
    const toastId = toast.loading("Updating...");
    try {
      await updateUserStatus(userId).unwrap();
      toast.success("User Status Update!", { id: toastId });
      refetch();
    } catch (error) {
      toast.error("User status not update!", { id: toastId });
      console.error("Failed to update user status:", error);
    }
  };

  if (isLoading) {
    return <LoadAnimation />;
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6 text-center">
        <h3 className="text-2xl font-bold">Error Loading Users</h3>
        <p className="text-muted-foreground mt-2">
          Failed to load user data. Please try again later.
        </p>
      </div>
    );
  }
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold">Manage Users</h3>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.data?.map((user: TUser, i: number) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell className="capitalize">{user?.role}</TableCell>
                <TableCell className="">
                  <div className="flex gap-2">
                    <Button
                      disabled={userUpdating}
                      onClick={() => handleToggleStatus(user?._id)}
                      style={
                        user?.isActive
                          ? { backgroundColor: "green" }
                          : { backgroundColor: "red" }
                      }
                      size="sm"
                    >
                      {userUpdating && <Loader className="animate-spin" />}
                      {user?.isActive ? "Active" : "Blocked"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageUsers;

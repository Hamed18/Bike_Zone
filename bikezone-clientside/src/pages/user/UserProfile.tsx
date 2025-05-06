import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Edit, Save, X, Lock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGeSingletUserQuery,
} from "@/redux/features/user/userApi";
import { toast } from "sonner";
import LoadAnimation from "@/components/menu/LoadAnimation";
import { ApiError } from "@/types/global.type";

const UserProfile = () => {
  const currentData = useAppSelector(selectCurrentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const {
    data: userData,
    isLoading: userLoading,
    refetch: userRefetch,
  } = useGeSingletUserQuery(currentData?._id, {
    refetchOnMountOrArgChange: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (userData?.data) {
      setFormData({
        name: userData.data.name || "",
        email: userData.data.email || "",
      });
    }
  }, [userData]);
  const [updateProfile, { isLoading: isUserUpdate }] =
    useUpdateProfileMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const toastId = toast.loading("Updating...");

    try {
      const res = await updateProfile({
        id: userData?.data?._id,
        formData,
      }).unwrap();

      console.log("update", res);
      userRefetch();

      toast.success("Profile updated successfully", { id: toastId });
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile", { id: toastId });
      console.error("Update error:", error);
    }
  };

  const handlePasswordUpdate = async () => {
    const toastId = toast.loading("Password updating...");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Please confirm the new password.", { id: toastId });
      return;
    }

    try {
      const res = await updatePassword({
        id: userData?.data?._id,
        data: passwordData,
      }).unwrap();

      console.log("update passowrd", res);

      toast.success("Password updated successfully", { id: toastId });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(
        apiError?.data?.message ||
          "Failed to update password. Check your current password.",
        { id: toastId }
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userData?.data?.name || "",
      email: userData?.data?.email || "",
    });
    setIsEditing(false);
  };

  if (userLoading) {
    return <LoadAnimation />;
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <CardTitle className="text-2xl font-bold">User Profile</CardTitle>

        {isEditing ? (
          <div className="flex gap-2">
            <Button onClick={handleCancel} className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              disabled={isUserUpdate}
              onClick={handleSave}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button
            disabled={userLoading}
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">User Information</h4>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {userData?.data?.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {userData?.data?.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Account Status</Label>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      userData?.data?.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <p className="text-sm text-muted-foreground">
                    {userData?.data?.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Password Update Section */}
        <CardFooter className="flex flex-col gap-4 pt-6 border-t">
          {!showPasswordForm ? (
            <Button onClick={() => setShowPasswordForm(true)} className="gap-2">
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
          ) : (
            <div className="w-full space-y-4">
              <h4 className="font-medium">Update Password</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowPasswordForm(false)}>
                  Cancel
                </Button>
                <Button
                  disabled={isUpdatingPassword}
                  onClick={handlePasswordUpdate}
                >
                  Update Password
                </Button>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;

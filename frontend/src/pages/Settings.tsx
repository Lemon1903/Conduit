import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod/v4";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BASE_PROFILE_KEY } from "@/constants";
import { logout, updateProfile } from "@/lib/api";
import { clearAccessToken } from "@/lib/auth";
import profileSchema from "@/schemas/profileSchema";
import { pageStore } from "@/stores/pageStore";
import { userStore } from "@/stores/userStore";

function Settings() {
  const navigate = useNavigate();
  const { user, setUser } = userStore();
  const clearPages = pageStore((state) => state.clearPages);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    values: {
      image: user?.image ?? "",
      username: user?.username ?? "",
      bio: user?.bio ?? "",
      email: user?.email ?? "",
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out succesfully!");
      setUser(null);
      clearAccessToken();
      // queryClient.clear();
      clearPages();
      navigate("/login", { replace: true });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      toast.success("Profile updated successfully!");
      setUser(user);
      queryClient.invalidateQueries({
        queryKey: [BASE_PROFILE_KEY, user.username],
      });
    },
    onError: () => {
      toast.error("Failed to update profile. Please try again.");
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    updateProfileMutation.mutate(values);
  }

  return (
    <div className="settings-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="form-control-lg"
                          placeholder="URL of profile picture"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="form-control-lg" placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="form-control-lg"
                          placeholder="Short bio about you"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="form-control-lg" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          className="form-control-lg"
                          placeholder="New Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <hr />
                <div className="flex items-center justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="!border-destructive !text-destructive hover:!bg-destructive hover:!text-white"
                    disabled={logoutMutation.isPending || updateProfileMutation.isPending}
                    onClick={() => logoutMutation.mutate()}
                  >
                    {logoutMutation.isPending ? "Logging out..." : "Or click here to logout"}
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={logoutMutation.isPending || updateProfileMutation.isPending}
                  >
                    {updateProfileMutation.isPending ? "Updating..." : "Update Settings"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

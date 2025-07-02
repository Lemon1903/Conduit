import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod/v4";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api, clearAccessToken } from "@/lib/api";
import { userStore } from "@/stores/userStore";
import type { Profile } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  image: z.string().refine((val) => val === "" || z.url().safeParse(val).success, {
    message: "Must be a valid URL",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string(),
  email: z.email(),
  password: z
    .string()
    .refine((password) => password === "" || password.length >= 8, {
      message: "Password must be at least 8 characters.",
    })
    .refine((password) => password === "" || /[A-Z]/.test(password), {
      message: "Password must contain an uppercase letter.",
    })
    .refine((password) => password === "" || /[0-9]/.test(password), {
      message: "Password must contain a number.",
    })
    .refine((password) => password === "" || /[!@#$%^&*]/.test(password), {
      message: "Password must contain a special character.",
    }),
});

function Settings() {
  const navigate = useNavigate();
  const { user, setUser } = userStore();
  const { data, isPending, isError } = useQuery<Profile>({
    queryKey: ["user"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User is not authenticated");
      }

      try {
        const response = await api.get(`/profiles/${user.username}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/users/logout/");
    },
    onSuccess: () => {
      toast.success("Logged out succesfully!");
      setUser(null);
      clearAccessToken();
      navigate("/");
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      console.log("Updating profile with values:", values);
      const response = await api.patch("/user/", values);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      setUser({ username: data.username, email: data.email });
      form.reset();
    },
    onError: () => {
      toast.error("Failed to update profile. Please try again.");
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        image: data.image ?? "",
        bio: data.bio ?? "",
        password: "",
      });
    }
  }, [data]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateProfileMutation.mutate(values);
  }

  if (isPending) {
    return <div className="h-full text-center align-middle text-xl">Loading...</div>;
  }

  if (isError) {
    return <div className="h-full text-center align-middle text-xl">Error loading the page.</div>;
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
                    className="!border-destructive !text-destructive hover:bg-destructive hover:!text-white"
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod/v4";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain an uppercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain a number.",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Password must contain a special character.",
    }),
});

async function registerUser(userData: z.infer<typeof formSchema>) {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register/`, userData);
  return response.data;
}

function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: AxiosError) => {
      console.error(error);
      if (error.status === 400) {
        toast.error("Registration failed: Please check your credentials and try again.");
        const messages = error.response?.data;
        if (messages) {
          Object.entries(messages).forEach(([key, value]) => {
            const message = value[0];
            form.setError(key as keyof z.infer<typeof formSchema>, {
              type: "manual",
              message: message.charAt(0).toUpperCase() + message.slice(1),
            });
          });
        }
      } else if (error.code === "ERR_BAD_REQUEST") {
        toast.error("Network error: Please try again.");
      } else {
        toast.error(error.message);
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="auth-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="/login">Have an account?</a>
            </p>

            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="form-control-lg" placeholder="Username" {...field} />
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
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="float-right"
                  disabled={mutation.isPending}
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod/v4";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/api";
import { getErrorMessage } from "@/lib/utils";
import registerSchema from "@/schemas/registerSchema";

function Register() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      form.reset();
      toast.success("Account created successfully! You can now log in.");
      setErrorMessage("");
      navigate("/login");
    },
    onError: (error: AxiosError) => {
      if (error.status === 400) {
        setErrorMessage(getErrorMessage(error.response?.data));
      }
      // if (error.status === 400) {
      //   const messages = error.response?.data;
      //   if (messages) {
      //     Object.entries(messages).forEach(([key, value]) => {
      //       const message = value[0];
      //       form.setError(key as keyof z.infer<typeof formSchema>, {
      //         type: "manual",
      //         message: message.charAt(0).toUpperCase() + message.slice(1),
      //       });
      //     });
      //   }
      // }
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="auth-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ul className="error-messages">
              <li className="text-center">{errorMessage}</li>
            </ul>

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
                  {mutation.isPending ? "Signing up..." : "Sign up"}
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

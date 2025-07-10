import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { Link, useNavigate } from "react-router";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "@/components/GoogleLogin";

const LogIn = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, "Password field required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    //TODO Chec
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/login`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        credentials: "include", //if you want to receive a cookie from the backend and have the browser store it in cookies, especially in a cross-origin (frontend ≠ backend) setup
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        showToast("error", data.message || "Login failed");
        return; // 👈 prevent further execution if login fails
      }

      showToast("success", data.message || "Login successful");
      navigate(RouteIndex);
    } catch (error) {
      console.log(error);
      showToast("error", error.message);
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-[450px] p-5">
        <h1 className="text-2xl font-bold text-center mb-5">
          Login Into Your Account
        </h1>

        

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">
              <Button type="submit" className="w-full">
                Log In
              </Button>
              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>Don&apos;t have an account?</p>
                <Link
                  className="text-blue-500 hover:underline"
                  to={RouteSignUp}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LogIn;

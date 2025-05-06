import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import logo from "@/assets/logo.png"; // Make sure to import your logo

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
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

const formSchema = z.object({
  email: z.string().min(3, {
    message: "Email must be at least 3 characters.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("User Login....");
  
    try {
      const res = await loginUser(data).unwrap();
      dispatch(setUser({ user: res.data, token: res.token }));
      toast.success("User Logged In!", { id: toastId });
      form.reset();
      if (res?.data?.role === "admin") {
        navigate("/admin/dash");
      } else {
        navigate("/");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle different error structures
      let errorMessage = "Login failed. Please try again.";
  
      // Check for Zod validation errors
      if (error?.data?.error?.name === 'ZodError') {
        const firstError = error.data.error.issues[0];
        errorMessage = firstError.message || "Validation error";
      } 
      // Check for the specific stringified JSON case
      else if (error?.data?.message) {
        try {
          const parsedMessages = JSON.parse(error.data.message);
          if (Array.isArray(parsedMessages) && parsedMessages[0]?.message) {
            errorMessage = parsedMessages[0].message;
          } else {
            errorMessage = error.data.message;
          }
        } catch {
          errorMessage = error.data.message;
        }
      }
      // Check for issues array format
      else if (error?.data?.issues?.length > 0) {
        errorMessage = error.data.issues[0].message;
      }
  
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Login Form */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border">
          <div className="">
            <div className="flex items-center justify-center gap-2 border border-black bg-gray-200 p-2 rounded-xl">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 md:w-16 md:h-16"
              />
              <h2 className="flex flex-col justify-center uppercase">
                <span className="font-bold text-xl md:text-3xl">Bike Zone</span>
                <span className="-mt-1 font-normal text-xs md:text-sm tracking-widest">
                  Upgrade your ride
                </span>
              </h2>
            </div>
            <h1 className="text-lg font-bold text-center my-8">Login</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <Button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader className="animate-spin" /> logging...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

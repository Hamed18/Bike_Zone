import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import logo from "@/assets/logo.png";
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
import { toast } from "sonner";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { Loader } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters.",
  }),
});

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  interface ApiResponse {
    error?: {
      data?: {
        success?: boolean;
        message?: string;
        // Add other possible error response fields here
      };
    };
    // Add other possible success response fields here
  }
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("User creating....");
  
    try {
      const res = await register(data) as ApiResponse;
  
      if (res?.error?.data?.success === false) {
        // Show error message from response or fallback
        toast.error(res?.error?.data?.message || "User registration failed!", { 
          id: toastId 
        });
        console.log("Registration error:", res.error.data);
        return;
      }
  
      form.reset();
      navigate("/login");
      toast.success("User Registered!", { id: toastId });
    } catch (error: unknown) {
      console.error("Registration error:", error);
      
      // Handle different error types
      let errorMessage = "User registration failed!";
      
      if (typeof error === 'object' && error !== null) {
        const apiError = error as { data?: { message?: string } };
        if (apiError?.data?.message) {
          errorMessage = apiError.data.message;
        }
      }
  
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Registration Form */}
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
            <div className=" text-2xl font-bold text-center my-8">
              Create Account
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
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
                    <Loader className="animate-spin" /> Creating...
                  </span>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;

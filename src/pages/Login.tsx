import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import qualogyLogo from "@/assets/qualogy-logo.png";
import loginBg from "@/assets/login-bg.jpg";

type AuthMode = "signin" | "signup" | "forgot";

const Login = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, loading, signIn, signUp, signInWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to /home
  useEffect(() => {
    if (!loading && user) {
      navigate("/home", { replace: true });
    }
  }, [user, loading, navigate]);

  // If already authenticated, show nothing while redirecting
  if (!loading && user) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "forgot") {
        const { error } = await resetPassword(email);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Password reset email sent! Check your inbox.");
          setMode("signin");
        }
      } else if (mode === "signup") {
        if (!fullName.trim()) {
          toast.error("Please enter your full name");
          setIsLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("This email is already registered. Please sign in instead.");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Account created successfully!");
          navigate("/home", { replace: true });
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Welcome back!");
          navigate("/home", { replace: true });
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error.message);
      }
    } catch (err) {
      toast.error("Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setEmail("");
    setPassword("");
    setFullName("");
  };

  const getIcon = () => {
    if (mode === "forgot") return <LogIn className="w-8 h-8 text-primary" />;
    if (mode === "signup") return <UserPlus className="w-8 h-8 text-primary" />;
    return <LogIn className="w-8 h-8 text-primary" />;
  };

  const getTitle = () => {
    if (mode === "forgot") return "Reset Password";
    if (mode === "signup") return "Create Account";
    return "Welcome to Q-AI Hub";
  };

  const getSubtitle = () => {
    if (mode === "forgot") return "Enter your email to receive a reset link";
    if (mode === "signup") return "Join Q-AI Hub today";
    return "Sign in to continue";
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Background with subtle blur and overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${loginBg})` }}
      />
      <div className="absolute inset-0 backdrop-blur-[3px] bg-foreground/30" />

      {/* Login Card - centered, not full height */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md mx-4 bg-card/95 backdrop-blur-md rounded-3xl shadow-2xl border border-border/50"
      >
        {/* Decorative top gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />

        {/* Header with logo */}
        <div className="relative px-8 pt-8 pb-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <img src={qualogyLogo} alt="Qualogy" className="h-10 object-contain" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-2xl font-bold text-foreground">{getTitle()}</h1>
                <p className="text-sm text-muted-foreground mt-2">{getSubtitle()}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          <AnimatePresence mode="wait">
            {mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FloatingInput id="fullName" label="Full Name" type="text" value={fullName} onChange={setFullName} />
              </motion.div>
            )}
          </AnimatePresence>

          <FloatingInput id="email" label="Email" type="email" value={email} onChange={setEmail} />

          {mode !== "forgot" && (
            <FloatingInput
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              showPasswordToggle
            />
          )}

          {mode === "signin" && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => switchMode("forgot")}
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                Loading...
              </span>
            ) : mode === "signup" ? (
              "Create Account"
            ) : mode === "forgot" ? (
              "Send Reset Link"
            ) : (
              "Sign In"
            )}
          </Button>

          {mode !== "forgot" && (
            <>
              {/* Divider */}
              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-4 text-muted-foreground">or continue with</span>
                </div>
              </div>

              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base rounded-xl border-2 hover:bg-muted/50 transition-all flex items-center justify-center gap-3"
                size="lg"
                disabled={isLoading}
                onClick={handleGoogleSignIn}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {mode === "signup" ? "Sign up with Google" : "Continue with Google"}
              </Button>
            </>
          )}

          {/* Toggle between modes */}
          <p className="text-center text-sm text-muted-foreground pt-2">
            {mode === "forgot" ? (
              <>
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signin")}
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signin")}
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </p>

          {mode !== "forgot" && (
            <p className="text-center text-xs text-muted-foreground pt-2">
              By signing in, you agree to Qualogy's{" "}
              <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

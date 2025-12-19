import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Chrome, UserPlus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingInput } from '@/components/ui/floating-input';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          toast.error('Please enter your full name');
          setIsLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in instead.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account created successfully!');
          onClose();
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome back!');
          onClose();
        }
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-foreground/30 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md mx-4 bg-gradient-to-b from-card to-card/95 rounded-3xl shadow-2xl border border-border/50 overflow-hidden"
      >
        {/* Decorative top gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
        
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2.5 hover:bg-muted rounded-xl transition-all duration-200 hover:scale-105"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {isSignUp ? (
                <UserPlus className="w-8 h-8 text-primary" />
              ) : (
                <LogIn className="w-8 h-8 text-primary" />
              )}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignUp ? 'signup' : 'signin'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-foreground">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  {isSignUp 
                    ? 'Join Q-AI Hub today' 
                    : 'Sign in to continue to Q-AI Hub'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
          <AnimatePresence mode="wait">
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FloatingInput
                  id="fullName"
                  label="Full Name"
                  type="text"
                  value={fullName}
                  onChange={setFullName}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <FloatingInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
          />

          <FloatingInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            showPasswordToggle
          />

          {!isSignUp && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary hover:underline">
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
            {isLoading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
          </Button>

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
            className="w-full h-12 text-base rounded-xl border-2 hover:bg-muted/50 transition-all"
            size="lg"
            disabled={isLoading}
          >
            <Chrome className="w-5 h-5 mr-3" />
            {isSignUp ? 'Sign up with Google' : 'Login with Google'}
          </Button>

          {/* Toggle between Sign In and Sign Up */}
          <p className="text-center text-sm text-muted-foreground pt-2">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary font-medium hover:underline"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>

          <p className="text-center text-xs text-muted-foreground pt-2">
            By signing in, you agree to Qualogy's{' '}
            <span className="text-primary hover:underline cursor-pointer">Terms of Service</span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginModal;

import { useEffect, useMemo, useState } from "react";
import type { AuthError, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

type AuthMode = "sign-in" | "sign-up";

type FieldErrors = {
  email?: string;
  password?: string;
};

const MIN_PASSWORD_LENGTH = 6;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getAuthErrorMessage = (error: AuthError) => {
  const normalizedMessage = error.message.toLowerCase();

  if (normalizedMessage.includes("invalid login credentials")) {
    return "The email or password is incorrect.";
  }

  if (normalizedMessage.includes("user already registered")) {
    return "This email is already registered. Try signing in instead.";
  }

  if (normalizedMessage.includes("email not confirmed")) {
    return "Check your inbox and confirm your email before signing in.";
  }

  return error.message;
};

const validateCredentials = (email: string, password: string): FieldErrors => {
  const nextErrors: FieldErrors = {};
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    nextErrors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!password) {
    nextErrors.password = "Password is required.";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    nextErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  return nextErrors;
};

export const useAuth = (initialMode: AuthMode = "sign-up") => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const isConfigured = Boolean(supabase);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) {
        return;
      }

      if (error) {
        setFeedback(getAuthErrorMessage(error));
        return;
      }

      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = Boolean(session?.user);
  const title = mode === "sign-up" ? "Create your account" : "Welcome back";
  const submitLabel = mode === "sign-up" ? "Create account" : "Log in";
  const switchLabel =
    mode === "sign-up"
      ? "Already have an account?"
      : "Need an account?";
  const switchActionLabel =
    mode === "sign-up" ? "Log in instead" : "Create one";

  const canSubmit = useMemo(() => {
    const nextErrors = validateCredentials(email, password);
    return !isLoading && Object.keys(nextErrors).length === 0;
  }, [email, isLoading, password]);

  const resetFeedback = () => setFeedback(null);

  const updateEmail = (value: string) => {
    setEmail(value);
    if (errors.email || feedback) {
      setErrors((current) => ({ ...current, email: undefined }));
      resetFeedback();
    }
  };

  const updatePassword = (value: string) => {
    setPassword(value);
    if (errors.password || feedback) {
      setErrors((current) => ({ ...current, password: undefined }));
      resetFeedback();
    }
  };

  const toggleMode = () => {
    setMode((current) => (current === "sign-up" ? "sign-in" : "sign-up"));
    setErrors({});
    setFeedback(null);
  };

  const submit = async () => {
    const nextErrors = validateCredentials(email, password);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return false;
    }

    if (!supabase) {
      setFeedback(
        "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
      );
      return false;
    }

    setIsLoading(true);
    setFeedback(null);

    const normalizedEmail = email.trim().toLowerCase();
    const authAction =
      mode === "sign-up"
        ? supabase.auth.signUp({ email: normalizedEmail, password })
        : supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
          });

    const { data, error } = await authAction;
    setIsLoading(false);

    if (error) {
      setFeedback(getAuthErrorMessage(error));
      return false;
    }

    setSession(data.session ?? null);
    setPassword("");
    setFeedback(
      mode === "sign-up"
        ? "Account created. Check your email if confirmation is enabled."
        : "Logged in successfully.",
    );

    return true;
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    setIsLoading(false);

    if (error) {
      setFeedback(getAuthErrorMessage(error));
      return;
    }

    setSession(null);
    setFeedback("Signed out.");
  };

  return {
    canSubmit,
    email,
    errors,
    feedback,
    isAuthenticated,
    isConfigured,
    isLoading,
    mode,
    password,
    session,
    signOut,
    submit,
    submitLabel,
    switchActionLabel,
    switchLabel,
    title,
    toggleMode,
    updateEmail,
    updatePassword,
  };
};


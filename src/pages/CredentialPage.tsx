import TextInput from "../components/Inputs";
import { CredentialButton } from "../components/Buttons";
import { useAuth } from "../hooks/useAuth";

export const CredentialPage: React.FC = () => {
    const {
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
    } = useAuth();

    const isSignup = mode === "sign-up";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    return (
        <main className="app-shell">
            <section className="hero-card auth-card">
                <div className="auth-header">
				    <p className="eyebrow">{isSignup ? "Sign Up" : "Log In"}</p>
                    <h1 className="auth-title">{title}</h1>
                    <p className="description">
                        Use a valid email and a password with at least 6 characters.
                    </p>
                </div>

                {!isConfigured && (
                    <p className="auth-feedback auth-feedback-error">
                        Supabase is not configured. Add <code>VITE_SUPABASE_URL</code> and{" "}
                        <code>VITE_SUPABASE_ANON_KEY</code>.
                    </p>
                )}

                {isAuthenticated ? (
                    <div className="auth-panel">
                        <p className="auth-feedback auth-feedback-success">
                            Signed in as <strong>{session?.user.email}</strong>.
                        </p>
                        <CredentialButton
                            label="Sign out"
                            onClick={signOut}
                            disabled={isLoading}
                        />
                    </div>
                ) : (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="flex column gap-md">
                            <TextInput
                                type="email"
                                label="Email"
                                value={email}
                                onChange={updateEmail}
                                error={errors.email}
                                placeholder="name@example.com"
                                autoComplete="email"
                                id="auth-email"
                                disabled={isLoading}
                            />
                            <TextInput
                                type="password"
                                label="Password"
                                value={password}
                                onChange={updatePassword}
                                error={errors.password}
                                placeholder="••••••••"
                                autoComplete={isSignup ? "new-password" : "current-password"}
                                id="auth-password"
                                disabled={isLoading}
                            />
                        </div>

                        {feedback && (
                            <p
                                className={`auth-feedback ${
                                    feedback.toLowerCase().includes("success") ||
                                    feedback.toLowerCase().includes("created") ||
                                    feedback.toLowerCase().includes("signed in")
                                        ? "auth-feedback-success"
                                        : "auth-feedback-error"
                                }`}
                            >
                                {feedback}
                            </p>
                        )}

                        <div className="auth-actions">
                            <CredentialButton
                                type="submit"
                                label={isLoading ? "Working..." : submitLabel}
                                disabled={!isConfigured}
                            />
                            <button
                                type="button"
                                className="auth-switch"
                                onClick={toggleMode}
                                disabled={isLoading}
                            >
                                {switchLabel} <span>{switchActionLabel}</span>
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </main>
    );
};

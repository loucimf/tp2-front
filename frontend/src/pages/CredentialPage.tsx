import { useState } from "react";
import type { UseAuthResult } from "../hooks/useAuth";

export const CredentialPage: React.FC<{
    auth: UseAuthResult;
}> = ({ auth }) => {
    const {
        email,
        errors,
        feedback,
        isConfigured,
        isLoading,
        mode,
        password,
        submit,
        submitLabel,
        switchActionLabel,
        switchLabel,
        toggleMode,
        updateEmail,
        updatePassword,
    } = auth;

    const isSignup = mode === "sign-up";
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await submit();
    };

    return (
        <main className="auth-shell">
            <section className="auth-layout">
                <aside className="auth-visual">
                    <div className="auth-brand">
                        <div className="auth-brand-mark">+</div>
                        <span>Nexus Games</span>
                    </div>

                    <div className="auth-visual-copy">
                        <p className="auth-kicker">Player platform</p>
                        <h1 className="auth-hero-title">Your Gateway to Gaming</h1>
                        <p className="auth-hero-description">
                            Join millions of gamers worldwide. Discover and collect
                            your favorite games all in one place.
                        </p>
                    </div>

                    <div className="auth-benefits">
                        <div className="auth-benefit">
                            <div className="auth-benefit-icon">T</div>
                            <div>
                                <h2>Exclusive Rewards</h2>
                                <p>Earn points and unlock special achievements.</p>
                            </div>
                        </div>
                        <div className="auth-benefit">
                            <div className="auth-benefit-icon">C</div>
                            <div>
                                <h2>Community Driven</h2>
                                <p>Connect with players who share your passion.</p>
                            </div>
                        </div>
                        <div className="auth-benefit">
                            <div className="auth-benefit-icon">S</div>
                            <div>
                                <h2>Cloud Saves</h2>
                                <p>Access your library from anywhere, anytime.</p>
                            </div>
                        </div>
                    </div>

                    <div className="auth-proof">
                        <div className="auth-proof-avatars">
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        <div>
                            <strong>Join 2M+ gamers</strong>
                            <p>4.9 / 5 community rating</p>
                        </div>
                    </div>
                </aside>

                <section className="auth-panel">
                    <div className="auth-panel-content">
                        <div className="auth-header auth-header-clean">
                            <h1 className="auth-title auth-title-ink">
                                {isSignup ? "Create your account" : "Welcome back"}
                            </h1>
                            <p className="auth-subtitle">
                                {isSignup
                                    ? "Create an account to start building your game library."
                                    : "Sign in to continue your gaming journey."}
                            </p>
                        </div>

                        <button type="button" className="auth-social-btn">
                            <span className="auth-social-mark">G</span>
                            Continue with Google
                        </button>

                        <div className="auth-divider">
                            <span>Or continue with email</span>
                        </div>

                        {!isConfigured && (
                            <p className="auth-feedback auth-feedback-error auth-feedback-light">
                                Supabase is not configured. Add <code>VITE_SUPABASE_URL</code> and{" "}
                                <code>VITE_SUPABASE_ANON_KEY</code>.
                            </p>
                        )}

                        <form className="auth-form auth-form-clean" onSubmit={handleSubmit}>
                            <label className="auth-field">
                                <span className="auth-field-label">Email address</span>
                                <div className="auth-input-wrap">
                                    <span className="auth-input-icon">@</span>
                                    <input
                                        autoComplete="email"
                                        className="auth-input"
                                        disabled={isLoading}
                                        id="auth-email"
                                        placeholder="you@example.com"
                                        type="email"
                                        value={email}
                                        onChange={(event) => updateEmail(event.target.value)}
                                    />
                                </div>
                                {errors.email ? (
                                    <span className="auth-inline-error">{errors.email}</span>
                                ) : null}
                            </label>

                            <label className="auth-field">
                                <span className="auth-field-label">Password</span>
                                <div className="auth-input-wrap">
                                    <span className="auth-input-icon">*</span>
                                    <input
                                        autoComplete={isSignup ? "new-password" : "current-password"}
                                        className="auth-input"
                                        disabled={isLoading}
                                        id="auth-password"
                                        placeholder="Enter your password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(event) => updatePassword(event.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="auth-input-toggle"
                                        onClick={() => setShowPassword((current) => !current)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {errors.password ? (
                                    <span className="auth-inline-error">{errors.password}</span>
                                ) : (
                                    <span className="auth-inline-hint">
                                        Use at least 6 characters.
                                    </span>
                                )}
                            </label>

                            <div className="auth-row auth-row-meta">
                                <label className="auth-checkbox">
                                    <input
                                        checked={rememberMe}
                                        type="checkbox"
                                        onChange={() => setRememberMe((current) => !current)}
                                    />
                                    <span>Remember me</span>
                                </label>
                                {!isSignup ? (
                                    <button type="button" className="auth-text-action">
                                        Forgot password?
                                    </button>
                                ) : (
                                    <span className="auth-text-note">Email confirmation may be required.</span>
                                )}
                            </div>

                            {feedback && (
                                <p
                                    className={`auth-feedback auth-feedback-light ${
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

                            <button
                                type="submit"
                                className="auth-primary-btn"
                                disabled={!isConfigured || isLoading}
                            >
                                <span>{isLoading ? "Working..." : submitLabel}</span>
                                <span aria-hidden="true">→</span>
                            </button>
                        </form>

                        <p className="auth-switch-center">
                            {switchLabel}{" "}
                            <button
                                type="button"
                                className="auth-switch-link"
                                onClick={toggleMode}
                                disabled={isLoading}
                            >
                                {switchActionLabel}
                            </button>
                        </p>

                        <div className="auth-legal">
                            By continuing, you agree to our Terms of Service and Privacy Policy.
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
};

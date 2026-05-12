import { useMemo } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const supabaseConfigured = useMemo(() => Boolean(supabase), []);

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">Vite + React + Supabase</p>
        <h1>Project recreated with a Supabase-ready frontend.</h1>
        <p className="description">
          Set <code>VITE_SUPABASE_URL</code> and{" "}
          <code>VITE_SUPABASE_ANON_KEY</code> in a local <code>.env</code> file
          to start using your backend.
        </p>
        <div className="status-row">
          <span
            className={supabaseConfigured ? "status status-live" : "status"}
          >
            {supabaseConfigured
              ? "Supabase client configured"
              : "Supabase credentials missing"}
          </span>
        </div>
      </section>
    </main>
  );
}

export default App;

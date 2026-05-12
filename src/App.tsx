import { useState } from "react";
import MainContent from "./components/MainContent";
import { Sidebar } from "./components/Sidebar";
import { useAuth } from "./hooks/useAuth";
import { CredentialPage } from "./pages/CredentialPage";

function App() {

	const handleButton = (label: string) => () => {
		console.log(`${label} clicked`);
		setActiveTab(label);
	};

	const buttons = [
        { label: "Library", onClick: handleButton("Library"), content: <div>Library Content</div> },
        { label: "Explore", onClick: handleButton("Explore"), content: <div>Explore Content</div> },
    ]
	
	const [activeTab, setActiveTab] = useState<string>(buttons[0].label);
	const auth = useAuth("sign-in");

	return (
		auth.isAuthenticated ? (
			<MainContent>
				<Sidebar buttons={buttons} />
				<MainContent>
					{buttons.find((button) => button.label === activeTab)?.content}
				</MainContent>
			</MainContent>
		) : (
			<CredentialPage auth={auth} />
		)
	);
}


const SupabasePage: React.FC<{ configured: boolean }> = ({
	configured
}) => {
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
						className={configured ? "status status-live" : "status"}
					>
						{configured
							? "Supabase client configured"
							: "Supabase credentials missing"}
					</span>
				</div>
			</section>
		</main>
	);
}

export default App;

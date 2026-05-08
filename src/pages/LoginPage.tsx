import { useState } from "react";
import TextInput from "../components/Inputs";
import { CredentialButton } from "../components/Buttons";

export const LoginPage: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = () => {
        // Implement login logic here, e.g., call your authentication API
        console.log("Email:", email);
        console.log("Password:", password);
    }


    return (
        <main className="app-shell">
            <div className="hero-card height-50">
				<p className="eyebrow">Login</p>
                <p className="description">
                    Please enter your credentials to log in.
                </p>

                <div className="flex column gap-sm height-50">
                    <TextInput type="email" label="Email" value={email} onChange={setEmail} />
                    <TextInput type="password" label="Password" value={password} onChange={setPassword} />
                </div>
                <CredentialButton label="Log In" onClick={handleLogin} />
            </div>
        </main>
    );
};
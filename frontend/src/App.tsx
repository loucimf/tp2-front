import { useState } from "react";
import { Sidebar, SidebarButtonProps, SidebarSection } from "./components/Sidebar";
import { useAuth } from "./hooks/useAuth";
import { CredentialPage } from "./pages/CredentialPage";
import ExplorePage from "./pages/ExplorePage";
import LibraryPage from "./pages/LibraryPage";

const sidebarButtons: SidebarButtonProps[] = [
    { id: "explore", icon: "explore", label: "Explore" },
    { id: "library", icon: "library", label: "Library" },
    { id: "trending", icon: "trending", label: "Trending" },
    { id: "offers", icon: "offer", label: "Offers" },
];

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SidebarSection>("explore");
    const auth = useAuth("sign-in");

    if (!auth.isAuthenticated) {
        return <CredentialPage auth={auth} />;
    }

    return (
        <div className="dashboard-shell">
            <Sidebar
                activeSection={activeSection}
                buttons={sidebarButtons}
                onSectionChange={setActiveSection}
                user={auth.session?.user ?? null}
            />

            <main className="dashboard-main">
                {activeSection === "library" ? (
                    <LibraryPage auth={auth} />
                ) : (
                    <ExplorePage auth={auth} />
                )}
            </main>
        </div>
    );
};

export default App;

import MainContent from "../components/MainContent";
import { useGames } from "../hooks/useGames";

const ExplorePage: React.FC<{}> = ({

}) => {
    const {
        count,
        error,
        games,
        isLoading,
        next,
        previous,
        refetch,
    } = useGames();
    
	return (
		<MainContent>
            <div className="height width flex center column">
                <h1>Explore</h1>
                <p>Welcome to the Explore page!</p>
            </div>
		</MainContent>
	);
};

export default ExplorePage;
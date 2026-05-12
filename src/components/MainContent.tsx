

const MainContent: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {

	const style = {
		height: "100vh",
		width: "100vw",
	}

	return (
		<main style={style} className="height width flex">
			{children}
		</main>
	);
};

export default MainContent;


const MainContent: React.FC<{
	children: React.ReactNode;
	class_width?: string;
	use_viewport?: boolean;
}> = ({ children, class_width = "width", use_viewport = false }) => {

	const style = {
		height: use_viewport ? "100vh" : "100%",
		width:  use_viewport ? "100vw" : "100%",
	}

	// si tiene class_width, lo usa, estilo "lo pisa al style y lo sobreescribe" como dijo louciii
	return (
		<main style={style} className={`height ${class_width} flex`}>
			{children}
		</main>
	);
};

export default MainContent;
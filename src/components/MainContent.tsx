

const MainContent: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
  return (
    <main>
      {children}
    </main>
  );
};

export default MainContent;
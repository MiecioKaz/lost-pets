const PetsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid place-items-center w-screen h-screen overflow-auto bg-gradient-to-r from-green-200 to-blue-400">
      {children}
    </section>
  );
};
export default PetsLayout;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid place-items-center w-screen h-screen bg-gradient-to-r from-green-200 to-blue-400">
      <div className="">{children}</div>
    </section>
  );
};
export default AuthLayout;

interface MainBoxProps {
  children: React.ReactNode;
}

const MainBox = ({ children }: MainBoxProps) => (
  <div className="w-full rounded-4xl bg-white p-4 text-left text-black sm:p-8">
    {children}
  </div>
);

export default MainBox;

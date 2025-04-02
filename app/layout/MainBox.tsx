interface MainBoxProps {
    children: React.ReactNode;
}


const MainBox = ({children}: MainBoxProps) => (
    <div className="bg-white rounded-4xl text-black p-4 sm:p-8 text-left w-full">
        {children}
    </div>
);

export default MainBox;


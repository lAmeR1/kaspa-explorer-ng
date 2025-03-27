import Logo from "./Logo";
import Price from "./Price";
import Menu from "./Menu";

const Navbar = () => {
    return <div className="flex flex-row bg-white px-6 rounded-b-4xl h-20 items-center">
        <Logo />
        <Price />
        <Menu />
    </div>
};

export default Navbar;
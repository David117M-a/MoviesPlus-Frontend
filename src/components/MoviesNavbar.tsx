import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MoviesNavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const menuItems = [
        "Movies",
        "Actors",
        "Create Movie",
        "Create Actor",
        "Delete Movie",
        "Delete Actor"
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">MoviesPlus</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <NavLink to={"/"}>
                        <Link
                            color="foreground"
                            className="w-full"
                            size="lg"
                        >
                            Movies
                        </Link>
                    </NavLink>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <NavLink to={"/create-movie"}>
                        <Link
                            color="foreground"
                            className="w-full"
                            size="lg"
                        >
                            Create Movie
                        </Link>
                    </NavLink>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
};

export default MoviesNavBar;
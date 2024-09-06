import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenuItem, NavbarMenu } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import logo from "./dheeraj.jpg"
import { FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MainNavbar({ titel }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar className="bg-secondary/95" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand >
          <Link to="/gpa-cal/" className="gap-1 flex items-center">
            <AcmeLogo />
            <p className="text-inherit text-2xl">heeraj</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={titel === "NG"}>
          <Link to="/gpa-cal/NG" color="foreground">
            Numerical Grade
          </Link>
        </NavbarItem>
        <NavbarItem isActive={titel === "AG"}>
          <Link to="/gpa-cal/AG" color="foreground"  >
            Grade Point
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end" className="bg-secondary" >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={logo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat" >
            <DropdownItem key="profile" className="h-14 gap-2">
              <div className="flex gap-1 items-center">
                <FaInstagram size="20" />
                <a href="https://www.instagram.com/dheerajxkhatri69/" target="_blank" className="font-semibold text-center">Dheerajxkhatri69</a>
              </div>
            </DropdownItem>
            <DropdownItem key="profile" className="h-14 gap-2">
              <div className="flex gap-1 items-center">
                <FaGithub size="20" />
                <a href="https://github.com/Dheerajkhatri69" target="_blank" className="font-semibold text-center">Dheerajkhatri69</a>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu className="bg-secondary z-50">
        {/* {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              // color={
              //   index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              // }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))} */}
        <NavbarMenuItem isActive={titel === "NG"}>
          <Link to="/gpa-cal/NG" color="foreground">
            Numerical Grade
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={titel === "AG"}>
          <Link to="/gpa-cal/AG" color="foreground">
            Grade Point
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

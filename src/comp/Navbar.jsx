import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import logo from "./dheeraj.jpg"
import { FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MainNavbar() {
  return (
    <Navbar className="bg-secondary/95">
      <NavbarBrand >
        <Link to="/gpa-cal/" className="gap-1 flex items-center">
          <AcmeLogo />
          <p className="text-inherit text-2xl">heeraj</p>
        </Link>
      </NavbarBrand>

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
    </Navbar>
  );
}

"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "@/app/components";
import { Toggle } from "@/components/Toggle";
import { useTheme } from "next-themes";

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  const { theme } = useTheme();
  return (
    <ul className="flex space-x-6 justify-center items-center">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            className={classnames({
              "nav-link": true,
              "font-bold": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
      <Toggle />
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return <Skeleton width="3rem" />;
  }
  if (status === "unauthenticated") {
    return (
      <Link href="api/auth/signin" className="nav-link">
        Login
      </Link>
    );
  }
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            fallback="?"
            src={session!.user!.image!}
            size="3"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Text size="2">
            <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
          </Text>
          <DropdownMenu.Item>
            <Link href="api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;

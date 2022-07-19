import { Stack } from "@chakra-ui/react";
import Link from "next/link";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <Link href="/dashboard"><NavLink icon={RiDashboardLine}>Dashboard</NavLink></Link>
        <Link href="/users"><NavLink icon={RiContactsLine}>Usuários</NavLink></Link>
      </NavSection>

      <NavSection title="AUTOMAÇÃO">
        <NavLink icon={RiInputMethodLine}>Formulários</NavLink> 
        <NavLink icon={RiGitMergeLine}>Automaçao</NavLink> 
      </NavSection>
    </Stack>
  )
}
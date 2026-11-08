import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Используйте эти Link/useRouter/usePathname вместо next/link и next/navigation — они сохраняют язык
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

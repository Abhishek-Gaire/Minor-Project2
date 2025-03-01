import { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export type NavItem = {
  name: string;
  to: string;
  icon: React.ElementType;
};

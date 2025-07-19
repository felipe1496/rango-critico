import { NavBar } from "@/components/NavBar";
import { FC, ReactNode } from "react";

const Layout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => (
  <>
    <NavBar />
    <div className="pt-16">{children}</div>
  </>
);

export default Layout;

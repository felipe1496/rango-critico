import type { FC, ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";

const Layout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => (
	<div className="flex flex-col pb-16 md:pb-0">
		<NavBar />
		<div>{children}</div>
		<Footer />
	</div>
);

export default Layout;

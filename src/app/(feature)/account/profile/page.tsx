import type { FC } from "react";
import { Form } from "./Form";

const ProfilePage: FC = () => (
	<main className="flex flex-col">
		<section className="flex flex-col">
			<h1 className="font-title text-xl md:text-2xl font-bold translate-y-[6px] mb-4">
				Meu Perfil
			</h1>

			<Form />
		</section>
	</main>
);

export default ProfilePage;

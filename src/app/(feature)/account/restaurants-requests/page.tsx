import type { FC } from "react";
import { Button } from "@/components/commons/Button";

const RestaurantsRequestsPage: FC = () => (
	<main className="flex flex-col">
		<section className="flex flex-col">
			<div className="flex items-end justify-between w-full mb-4">
				<h1 className="font-title text-xl md:text-2xl font-bold translate-y-[6px]">
					Pedidos de Inclusão
				</h1>

				<Button>Adicionar</Button>
			</div>
			oi
		</section>
	</main>
);

export default RestaurantsRequestsPage;

"use client";

import { Loader } from "@/components/commons/icons/Loader";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewDialog } from "@/components/ReviewDialog";
import { useListReviews } from "../../../hooks/queries/useListReviews";

export default function HomePage() {
	const { data: reviewsData, isFetching: reviewsIsFetching } = useListReviews();

	return (
		<main className="w-screen flex items-center justify-center flex-col px-4 pb-4">
			<div className="max-w-4xl w-full">
				<section className="flex flex-col gap-4 text-center items-center">
					<h1 className="font-title text-3xl md:text-4xl mt-8">
						Que restaurante você visitou hoje?
					</h1>
				</section>

				<section className="flex flex-col mt-12">
					<div className="flex w-full justify-between">
						<h2 className="font-title text-xl md:text-2xl font-bold translate-y-[6px]">
							Críticas
						</h2>

						<ReviewDialog />
					</div>
					<div className="w-full h-[1px] bg-zinc-200 my-4" />

					<div className="flex flex-col gap-2 items-center justify-center">
						{reviewsIsFetching && !reviewsData ? (
							<Loader className="size-8" />
						) : (
							reviewsData?.reviews.map((r, idx) => (
								<ReviewCard key={`reivew-card-${r.id}-${idx}`} data={r} />
							))
						)}
					</div>
				</section>
			</div>
		</main>
	);
}

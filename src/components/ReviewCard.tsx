"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { type FC, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteReview } from "@/hooks/mutations/useDeleteReview";
import type { ReviewModel } from "@/models/ReviewModel";
import { date } from "@/utils/date";
import { cn } from "@/utils/functions";
import { Button } from "./commons/Button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "./commons/Dialog";
import { Loader } from "./commons/icons/Loader";
import { Rating } from "./commons/Rating";

interface Props {
	data: ReviewModel;
}

export const ReviewCard: FC<Props> = ({ data }) => {
	const [expandTags, setExpandTags] = useState(false);
	const [open, setOpen] = useState(false);

	const queryClient = useQueryClient();

	const { mutate, isPending } = useDeleteReview({
		onSuccess: () => {
			toast.success("Crítica excluida com sucesso!");
			setOpen(false);
			queryClient.invalidateQueries({ queryKey: ["list-reviews"] });
		},
		onError: () => {
			toast.error("Ocorreu um erro ao excluir a crítica");
		},
	});

	const formatStringyfiedText = (txt: string) => {
		const text =
			txt.startsWith('"') && txt.endsWith('"')
				? txt.substring(1, txt.length - 1)
				: txt;

		const normalized = text.replace(/\\n/g, "\n");

		return normalized.split("\n").join("<br />");
	};
	return (
		<div className="border border-zinc-200 p-4 rounded-sm w-full">
			<div className="flex w-full justify-between items-start">
				<div className="flex flex-col gap-4 md:flex-row">
					<div className="flex gap-4 items-center">
						<Image
							src={data.restaurant.avatar_url ?? ""}
							alt="Restaurant"
							width={48}
							height={48}
							className="rounded-full"
						/>
						<div className="flex flex-col">
							<span className="font-bold">{data.restaurant.name}</span>
							<span className="text-sm text-zinc-500">
								{`${data.city.name}, ${data.city.state}`}
							</span>
						</div>
					</div>

					<Rating rating={data.rating} disabled readonly />
				</div>

				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger className="cursor-pointer">
						<TrashIcon className="size-5" />
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Excluir Crítica</DialogTitle>
						<div className="p-4">
							<span>
								Essa ação é irreversível. Você tem certeza que deseja excluir a
								crítica?
							</span>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outlined">Cancelar</Button>
							</DialogClose>
							<Button
								variant="danger"
								onClick={() => {
									mutate({
										id: data.id,
									});
								}}
							>
								{isPending ? <Loader /> : "Excluir"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			<p
				className="font-normal my-4 whitespace-pre-line"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: only way to format <br /> tags
				dangerouslySetInnerHTML={{
					__html: formatStringyfiedText(data.content),
				}}
			/>

			<span className="text-zinc-500">
				{date(data.visited_at).format("d 'de' MMMM 'de' yyyy")}
			</span>

			<div className="flex justify-between w-full">
				<div className="flex group">
					{data.companions.map((companion, idx) => (
						<Image
							key={`review-user-${idx}-${companion.name}-${companion.avatar_url}`}
							src={companion.avatar_url ?? ""}
							alt="User"
							width={32}
							height={32}
							className={cn(
								"rounded-full",
								idx !== 0 && "-ml-2 group-hover:ml-0 transition-all",
							)}
							title={companion.name}
						/>
					))}
				</div>

				{!expandTags && (
					<div className="flex gap-1 items-center justify-end ">
						{data.tags.slice(0, 3).map((tag, idx) => (
							<span
								key={`review-tag-preview-${idx}-${tag}`}
								className="rounded-xs bg-zinc-200 text-xs p-1 truncate max-w-28"
								title={tag}
							>
								{tag}
							</span>
						))}
						{data.tags.length > 3 && (
							<button
								type="button"
								className="hover:underline text-xs cursor-pointer"
								onClick={() => setExpandTags(true)}
							>
								Mostrar mais
							</button>
						)}
					</div>
				)}
			</div>

			{expandTags && (
				<div className="flex flex-col mt-4 items-start gap-1">
					<div className="w-full text-end">
						<button
							type="button"
							className="hover:underline text-xs cursor-pointer"
							onClick={() => setExpandTags(false)}
						>
							Mostrar menos
						</button>
					</div>
					<div className="flex gap-1 items-center  flex-wrap">
						{data.tags.map((tag, idx) => (
							<span
								key={`review-tag-${idx}-${tag}`}
								className="rounded-xs bg-zinc-200 text-xs p-1"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

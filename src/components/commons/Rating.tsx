import { XMarkIcon } from "@heroicons/react/24/outline";
import { type FC, useRef } from "react";
import { ulid } from "ulid";
import { cn } from "@/utils/functions";

interface Props {
	rating: number;
	disabled?: boolean;
	onChange?: (newRating: number) => void;
	readonly?: boolean;
}

export const Rating: FC<Props> = ({
	rating,
	disabled = false,
	readonly = false,
	onChange,
}) => {
	const zeroRatingRef = useRef<HTMLInputElement | null>(null);
	const ratingValues = Array.from({ length: 10 }, (_, i) => (i + 1) * 0.5);

	const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(parseFloat(event.target.value));
		}
	};
	// TODO: subtituir rating-hidden por X
	return (
		<div className="flex items-center">
			{!readonly && (
				<>
					<input
						type="radio"
						name={`rating-star-${ulid()}`}
						className="hidden"
						disabled={disabled}
						checked={rating === 0}
						onChange={handleRatingChange}
						value={0}
						ref={zeroRatingRef}
					/>
					<button
						type="button"
						className="translate-y-0.5 cursor-pointer"
						onClick={() => {
							zeroRatingRef.current?.click();
						}}
					>
						<XMarkIcon className="size-6 text-zinc-500" />
					</button>
				</>
			)}
			<div className="rating rating-half">
				{ratingValues.map((value, index) => (
					<input
						key={`rating-star-${index}-${value}`}
						type="radio"
						name={`rating-star-${ulid()}`}
						className={cn(
							"mask mask-star-2",
							value % 1 !== 0 ? "mask-half-1" : "mask-half-2",
							!disabled && "cursor-pointer",
						)}
						aria-label={`${value} star`}
						disabled={disabled}
						checked={rating === value}
						onChange={handleRatingChange}
						value={value}
					/>
				))}
			</div>
		</div>
	);
};

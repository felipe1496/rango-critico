import type { FC } from "react";
import { ulid } from "ulid";
import { cn } from "@/utils/functions";

interface Props {
	rating: number;
	disabled?: boolean;
	onChange?: (newRating: number) => void;
}

export const Rating: FC<Props> = ({ rating, disabled = false, onChange }) => {
	const ratingValues = Array.from({ length: 10 }, (_, i) => (i + 1) * 0.5);

	const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(parseFloat(event.target.value));
		}
	};

	return (
		<div className="rating rating-half">
			<input
				type="radio"
				name={`rating-star-${ulid()}`}
				className="rating-hidden"
				disabled={disabled}
				checked={rating === 0}
				onChange={handleRatingChange}
				value={0}
			/>

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
	);
};

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ComponentProps, type FC, useState } from "react";
import Select from "react-select";
import { useListCities } from "@/hooks/queries/useListCities";
import useDebounce from "@/hooks/useDebounce";
import type { CityModel } from "@/models/CityModel";
import { Loader } from "./commons/icons/Loader";

interface Props
	extends Omit<
		ComponentProps<typeof Select>,
		| "value"
		| "onChange"
		| "options"
		| "isLoading"
		| "onInputChange"
		| "filterOption"
	> {
	selected?: CityModel | null;
	onChange?: (r: CityModel | null) => void;
}

export const CitySelect: FC<Props> = ({
	selected = null,
	onChange = () => {},
	...props
}) => {
	const [query, setQuery] = useState("");

	const deboucedQuery = useDebounce(query, 500);

	const { data, isFetching } = useListCities({
		queryKey: [deboucedQuery],
		querySearch: deboucedQuery,
	});

	const options = (data?.cities || []).map((c) => ({
		label: (
			<div className="flex gap-2 items-center">
				<span>{c.name}</span>
			</div>
		),
		value: c,
	}));
	// TODO: criar componente de select do app para remover dependencia externa
	return (
		<Select
			value={
				selected
					? {
							label: (
								<div className="flex gap-2 items-center">
									<span>{selected.name}</span>
								</div>
							),
							value: selected,
						}
					: null
			}
			noOptionsMessage={() => "Nenhuma cidade encontrada"}
			loadingMessage={() => (
				<>
					<Loader />
				</>
			)}
			placeholder="Selecione uma cidade"
			options={options}
			isLoading={isFetching}
			onInputChange={setQuery}
			filterOption={() => true}
			onChange={(opt) =>
				onChange(opt ? (opt as { value: CityModel }).value : null)
			}
			{...props}
		/>
	);
};

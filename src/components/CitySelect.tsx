/* eslint-disable @typescript-eslint/no-explicit-any */
import useDebounce from "@/hooks/useDebounce";
import { CityModel } from "@/models/CityModel";
import { ComponentProps, FC, useState } from "react";
import Select from "react-select";
import { Loader } from "./commons/icons/Loader";
import { useListCities } from "@/hooks/queries/useListCities";
import { ApiParse } from "@/utils/types";

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
  selected?: ApiParse<CityModel> | null;
  onChange?: (r: ApiParse<CityModel> | null) => void;
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
      onChange={(opt: any) => onChange(opt ? opt.value : null)}
      {...props}
    />
  );
};

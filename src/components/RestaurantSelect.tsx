import { useListRestaurants } from "@/hooks/queries/useListRestaurants";
import useDebounce from "@/hooks/useDebounce";
import { RestaurantModel } from "@/models/RestaurantModel";
import Image from "next/image";
import { FC, useState } from "react";
import Select from "react-select";
import { Loader } from "./commons/Loader";

interface Props {
  selected?: RestaurantModel | null;
  onChange?: (r: RestaurantModel | null) => void;
}

export const RestaurantSelect: FC<Props> = ({
  selected = null,
  onChange = () => {},
}) => {
  const [query, setQuery] = useState("");

  const deboucedQuery = useDebounce(query, 500);

  const { data, isFetching } = useListRestaurants({
    queryKey: [deboucedQuery],
    querySearch: deboucedQuery,
  });

  const options = (data?.restaurants || []).map((r) => ({
    label: (
      <div className="flex gap-2 items-center">
        {r.avatar_url && (
          <Image
            src={r.avatar_url}
            alt={r.name}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <span>{r.name}</span>
      </div>
    ),
    value: r,
  }));
  // TODO: criar componente de select do app para remover dependencia externa
  return (
    <Select
      value={
        selected
          ? {
              label: (
                <div className="flex gap-2 items-center">
                  {selected.avatar_url && (
                    <Image
                      src={selected.avatar_url}
                      alt={selected.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span>{selected.name}</span>
                </div>
              ),
              value: selected,
            }
          : null
      }
      noOptionsMessage={() => "Nenhum restaurante encontrado"}
      loadingMessage={() => (
        <>
          <Loader />
        </>
      )}
      placeholder="Selecione um restaurante"
      options={options}
      isLoading={isFetching}
      onInputChange={setQuery}
      filterOption={() => true}
      onChange={(opt) => onChange(opt ? opt?.value : null)}
    />
  );
};

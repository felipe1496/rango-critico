import { cn } from "@/utils/functions";
import { FC } from "react";
import { ulid } from "ulid";

// Estendemos a interface Props para incluir o onChange
interface Props {
  rating: number; // e.g., 0.5, 1, 1.5, ..., 5
  disabled?: boolean;
  onChange?: (newRating: number) => void; // Função de callback para quando a classificação muda
}

export const Rating: FC<Props> = ({ rating, disabled = false, onChange }) => {
  // Gera um array de valores de 0.5 a 5 em incrementos de 0.5
  const ratingValues = Array.from({ length: 10 }, (_, i) => (i + 1) * 0.5);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      // Converte o valor do input (string) para número
      onChange(parseFloat(event.target.value));
    }
  };

  return (
    <div className="rating rating-half">
      {/* Input oculto para permitir desmarcar todas as estrelas (se o rating for 0) */}
      <input
        type="radio"
        name={`rating-star-${ulid()}`}
        className="rating-hidden"
        disabled={disabled}
        checked={rating === 0}
        // Quando o rating é 0, o onChange é acionado se este input for clicado
        onChange={handleRatingChange}
        value={0} // Valor que este input representa
      />

      {ratingValues.map((value, index) => (
        <input
          key={`rating-star-${index}`} // Chave única para renderização de listas
          type="radio"
          name={`rating-star-${ulid()}`} // Mesmo nome acima para agrupá-los
          className={cn(
            "mask mask-star-2",
            value % 1 !== 0 ? "mask-half-1" : "mask-half-2",
            !disabled && "cursor-pointer"
          )}
          aria-label={`${value} star`}
          disabled={disabled}
          checked={rating === value} // Marca o input se seu valor corresponder à prop 'rating'
          onChange={handleRatingChange} // Adiciona o handler onChange a cada input
          value={value} // O valor que este input representa
        />
      ))}
    </div>
  );
};

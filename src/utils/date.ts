import { format as fnsFormat, parse as fnsParse, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { isString } from "lodash";

export function date(value: Date | string, fmt?: string) {
	return {
		format(format: string, opts: Parameters<typeof fnsFormat>[2] = {}) {
			if (isString(value)) {
				let parsed: Date;
				if (fmt?.toUpperCase() === "ISO") {
					parsed = parseISO(value);
				} else {
					parsed = fnsParse(value, fmt ?? "yyyy-MM-dd", new Date(), {
						locale: ptBR,
					});
				}
				return fnsFormat(parsed, format, { locale: ptBR, ...opts });
			} else {
				return fnsFormat(value, format, { locale: ptBR, ...opts });
			}
		},
		toDate() {
			if (isString(value)) {
				return fnsParse(value, fmt ?? "yyyy-MM-dd", new Date(), {
					locale: ptBR,
				});
			}
			return value;
		},
	};
}

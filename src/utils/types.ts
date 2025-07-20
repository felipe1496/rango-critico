/** biome-ignore-all lint/suspicious/noExplicitAny: any to utils types are ok */

import type {
	UseMutationOptions,
	UseQueryOptions,
} from "@tanstack/react-query";

export type ArrayToLiteral<T extends readonly string[]> = T[number];

export type ApiExceptionModel = {
	status: number;
	message: string;
	error: string;
};

export type Ok<Data = undefined, Err = Error> =
	| (Data extends undefined
			? { ok: true; data?: undefined; err?: undefined }
			: { ok: true; data: Data; err?: undefined })
	| { ok: false; err: Err; data?: undefined };

export type InferOk<T> = T extends () => Promise<Ok<infer U>>
	? U
	: T extends (where?: any) => Promise<Ok<infer U>>
		? U
		: never;

export type InferOkProps<T> = T extends (params: infer P, db?: any) => any
	? P
	: never;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type QueryOpts<T = any> = PartialBy<
	Omit<UseQueryOptions<T, ApiExceptionModel>, "queryFn">,
	"queryKey"
>;
export type MutationOpts<T = any, D = any> = Omit<
	UseMutationOptions<T, ApiExceptionModel, D>,
	"mutationFn"
>;

export type DateToString<T> = {
	[K in keyof T]: T[K] extends Date
		? string
		: T[K] extends object
			? DateToString<T[K]>
			: T[K];
};

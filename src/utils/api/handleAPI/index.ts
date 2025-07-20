/** biome-ignore-all lint/suspicious/noExplicitAny: any to handle api are ok */

import { type NextRequest, NextResponse } from "next/server";
import type { z } from "zod";
import { HTTP_STATUS } from "@/constants/httpStatus";
import { ApiException } from "@/utils/errors/ApiException";
import { BadRequestException } from "@/utils/errors/BadRequestException";

type ZodSchema = z.ZodType<any, any, any>;

export type ApiRequest<
	TBody extends ZodSchema | null = null,
	TQuery extends ZodSchema | null = null,
	TPath extends ZodSchema | null = null,
	TParams = any,
> = {
	body: TBody extends ZodSchema ? z.infer<TBody> : undefined;
	queryParams: TQuery extends ZodSchema ? z.infer<TQuery> : undefined;
	path: TPath extends ZodSchema ? z.infer<TPath> : undefined;
	headers: Headers;
	userId: string;
	params: TParams;
};

export const handleAPI = <
	TParams = any,
	TBody extends ZodSchema | null = null,
	TQuery extends ZodSchema | null = null,
	TPath extends ZodSchema | null = null,
>() => {
	let bodySchema: TBody = null as TBody;
	let queryParamsSchema: TQuery = null as TQuery;
	let pathSchema: TPath = null as TPath;

	const middlewares: ((req: ApiRequest<TBody, TQuery, TPath>) => void)[] = [];

	const builder = {
		middleware(mw: (req: ApiRequest<TBody, TQuery, TPath>) => void) {
			middlewares.push(mw);
			return this;
		},
		/**
		 * Define o esquema de validação para o corpo (body) da requisição.
		 * @param schema - Um esquema Zod (z.object).
		 */
		body<S extends ZodSchema>(schema: S) {
			bodySchema = schema as any;
			return this as unknown as ReturnType<
				typeof handleAPI<TParams, S, TQuery, TPath>
			>;
		},

		/**
		 * Define o esquema de validação para os parâmetros de consulta (query params).
		 * @param schema - Um esquema Zod (z.object).
		 */
		queryParams<S extends ZodSchema>(schema: S) {
			queryParamsSchema = schema as any;
			return this as unknown as ReturnType<
				typeof handleAPI<TParams, TBody, S, TPath>
			>;
		},

		/**
		 * Define o esquema de validação para os parâmetros de rota (path params).
		 * @param schema - Um esquema Zod (z.object).
		 */
		path<S extends ZodSchema>(schema: S) {
			pathSchema = schema as any;
			return this as unknown as ReturnType<
				typeof handleAPI<TParams, TBody, TQuery, S>
			>;
		},

		/**
		 * Define a função de lógica de negócio que será executada após as validações.
		 * @param handler - A função que recebe os dados validados e retorna uma resposta.
		 * @returns Uma função de manipulador de rota do Next.js.
		 */
		fn(
			handler: (
				req: ApiRequest<TBody, TQuery, TPath, TParams>,
				{ status }: { status: (status: number) => void },
			) => Promise<unknown> | unknown,
		) {
			let successStatus = 200;

			const status = (status: number) => {
				successStatus = status;
			};
			return async (req: NextRequest, context: any) => {
				const parsedRequest = {
					body: undefined,
					queryParams: undefined,
					path: undefined,
					headers: req.headers,
					params: context.params ?? {},
				} as ApiRequest<TBody, TQuery, TPath, TParams>;

				try {
					if (queryParamsSchema) {
						const query = Object.fromEntries(req.nextUrl.searchParams);
						const parsed = queryParamsSchema.safeParse(query);

						if (parsed.success) {
							parsedRequest.queryParams = parsed.data;
						} else {
							throw new BadRequestException(
								parsed.error.issues[0].path.join(".") +
									": " +
									parsed.error.issues[0].message,
							);
						}
					}

					if (pathSchema) {
						const parsed = pathSchema.safeParse(context.params ?? {});

						if (parsed.success) {
							parsedRequest.path = parsed.data;
						} else {
							throw new BadRequestException(
								parsed.error.issues[0].path.join(".") +
									": " +
									parsed.error.issues[0].message,
							);
						}
					}

					if (bodySchema) {
						if (req.method !== "GET" && req.method !== "DELETE") {
							const bodyJson = await req.json().catch(() => {
								throw new BadRequestException("Invalid body");
							});

							const parsed = bodySchema.safeParse(bodyJson);

							if (parsed.success) {
								parsedRequest.body = bodySchema.parse(bodyJson);
							} else {
								throw new BadRequestException(
									parsed.error.issues[0].path.join(".") +
										": " +
										parsed.error.issues[0].message,
								);
							}
						}
					}

					for (const middleware of middlewares) {
						middleware(parsedRequest);
					}

					const result = await handler(parsedRequest, { status });

					if (result) {
						return NextResponse.json(result, { status: successStatus });
					} else {
						return new NextResponse(null, { status: 204 });
					}
				} catch (error) {
					console.error(error);

					if (error instanceof ApiException && error.name === "ApiException") {
						return NextResponse.json(
							{
								error: error.error,
								status: error.status,
								message: error.message,
							},
							{ status: error.status },
						);
					}

					return NextResponse.json(
						{
							error: HTTP_STATUS[500],
							status: 500,
							message: "An uncaught error occurred",
						},
						{ status: 500 },
					);
				}
			};
		},
	};

	return builder;
};

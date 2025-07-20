/** biome-ignore-all lint/suspicious/noExplicitAny: any to utils functions are ok */
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { isArray, isDate, isObject, map, mapValues } from "lodash";
import { twMerge } from "tailwind-merge";
import type { StateCreator } from "zustand";
import { create as actualCreate } from "zustand";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

const storeResetFns = new Set<() => void>();

export const resetAllStores = () => {
	storeResetFns.forEach((resetFn) => {
		resetFn();
	});
};

export const create = (<T>() => {
	return (stateCreator: StateCreator<T>) => {
		const store = actualCreate(stateCreator);
		const initialState = store.getInitialState();
		storeResetFns.add(() => {
			store.setState(initialState, true);
		});
		return store;
	};
}) as typeof actualCreate;

export const isISODateString = (value: any): boolean => {
	return (
		typeof value === "string" &&
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
	);
};

export const reviveDates = (value: any): any => {
	if (isArray(value)) {
		return map(value, reviveDates);
	}

	if (isObject(value) && !isDate(value)) {
		return mapValues(value, (val) => reviveDates(val));
	}

	if (isISODateString(value)) {
		return new Date(value);
	}

	return value;
};

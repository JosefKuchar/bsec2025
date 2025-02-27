import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Frequency } from './enums';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getFrequencyString(frequency: Frequency) {
	switch (frequency) {
		case Frequency.OneTime:
			return 'Jednorázově';
		case Frequency.Daily:
			return 'Denně';
		case Frequency.Weekly:
			return 'Týdně';
		case Frequency.Monthly:
			return 'Měsíčně';
		case Frequency.Yearly:
			return 'Ročně';
	}
}

export function frequencyToDays(frequency: Frequency) {
	switch (frequency) {
		case Frequency.OneTime:
			throw new Error('OneTime frequency is not supported');
		case Frequency.Daily:
			return 1;
		case Frequency.Weekly:
			return 7;
		case Frequency.Monthly:
			return 30;
		case Frequency.Yearly:
			return 365;
	}
}

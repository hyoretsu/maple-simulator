export function numberOrString(value: string) {
	const number = Number(value);

	if (Number.isNaN(number)) {
		return value;
	}

	return number;
}

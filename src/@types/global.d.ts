type BooleanString = "true" | "false";
type ValuesOf<T extends any[]> = T[number];

interface Window {
	gtag: (...args: any) => void;
}

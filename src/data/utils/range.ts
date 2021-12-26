/** Creates an array from start to end, both inclusive. */
const range = (start: number, end: number): number[] => {
 return Array.from(new Array(end - start + 1), (_, index) => index + start);
};

export default range;

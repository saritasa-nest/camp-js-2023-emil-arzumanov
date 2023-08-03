/**
	* Convert snake case to camel case.
	* @param text Text.
	*/
export function snakeToCamel(text: string): string {
	return text.toLowerCase().replace(
		/([-_][a-z])/g,
		group => group.toUpperCase().replace('_', ''),
	);
}

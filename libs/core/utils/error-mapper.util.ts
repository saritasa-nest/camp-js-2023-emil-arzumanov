/**
 * Checks if value exists in array. And transforms and returns it, if it exists.
 * @param value Value.
 * @param attributeArray Array of possible attributes.
 * @param exceptionValue Data to throw, if value doesn't exist in array.
 */
export function transformIfInArray<T>(value: string, attributeArray: string[], exceptionValue: string): T {
	if (attributeArray.includes(value)) {
		return snakeToCamel(value) as T;
	}
	return exceptionValue as T;
}

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

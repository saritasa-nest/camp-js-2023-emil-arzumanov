/**
 * Track by item id.
 * @param index Index.
 * @param item Item.
 */
export function trackById<T extends { id: number; }>(index: number, item: T): number {
	return item.id;
}

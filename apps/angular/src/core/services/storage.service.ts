import { Injectable } from '@angular/core';

/** Service for storage management. */
@Injectable({
	providedIn: 'root',
})
export class StorageService {

	/**
		* Set value in storage by key.
		* @param key Item key.
		* @param value Value.
		*/
	public setValue<T>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	/**
		* Get storage value by key.
		* @param key Item key.
		*/
	public getValue(key: string): string | null {
		const storageValue = localStorage.getItem(key);
		return storageValue === null ? null : JSON.parse(storageValue);
	}

	/**
		* Remove value from storage by key.
		* @param key Item key.
		*/
	public removeValue(key: string): void {
		localStorage.removeItem(key);
	}

	/** Remove all value from storage. */
	public clearStorage(): void {
		localStorage.clear();
	}
}

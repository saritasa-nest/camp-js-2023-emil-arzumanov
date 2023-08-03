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
	public setValue(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	/**
		* Get storage value by key.
		* @param key Item key.
		*/
	public getValue(key: string): string | null {
		return localStorage.getItem(key);
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

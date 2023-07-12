/* eslint-disable jsdoc/require-jsdoc */

import { Subscriber } from './types';

export class Publisher<T> {
	private readonly subscribers: Subscriber<T>[] = [];

	public constructor() {}

	public subscribe(subscriber: Subscriber<T>): void {
		const subIdx = this.getSubscriberIndex(subscriber);
		if (subIdx === -1) {
			this.subscribers.push(subscriber);
		}
	}

	public unsubscribe(subscriber: Subscriber<T>): void {
		const subIdx = this.getSubscriberIndex(subscriber);
		if (subIdx !== -1) {
			this.subscribers.splice(subIdx, 1);
		}
	}

	public notify(data: T): void {
		this.subscribers.forEach((sub: Subscriber<T>) => sub.update(data));
	}

	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex((sub: Subscriber<T>) => sub === subscriber);
	}
}

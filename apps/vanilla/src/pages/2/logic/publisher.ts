import { Subscriber } from './types';

/**
 *	Basic Publisher functionality that publisher classes will extend.
 */
export class Publisher<T> {
	/** Array of subscribers, each element is update method of subscriber. */
	private readonly subscribers: Subscriber<T>[] = [];

	/**
	 * Adds subscriber to array of subscribers, if subscriber is not already in array.
	 * @param subscriber Subscriber, update method of class that is subscribed to this publisher.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		const subscriberIndex = this.getSubscriberIndex(subscriber);
		if (subscriberIndex === -1) {
			this.subscribers.push(subscriber);
		}
	}

	/**
	 * Deletes subscriber from array of subscribers, if subscriber is in array.
	 * @param subscriber Subscriber, update method of class that is subscribed to this publisher.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {
		const subscriberIndex = this.getSubscriberIndex(subscriber);
		if (subscriberIndex !== -1) {
			this.subscribers.splice(subscriberIndex, 1);
		}
	}

	/**
	 * Goes through array of subscribers and calls update method from each of them.
	 * @param data Data that will be send to update method of subscriber.
	 */
	public notify(data: T): void {
		this.subscribers.forEach(sub => sub.update(data));
	}

	/**
	 * Looks for index of subscriber in array of subscribers.
	 * @param subscriber Subscriber, update method of class that is subscribed to this publisher.
	 * @returns Index of subscriber or '-1' if subscriber doesn't exist in array.
	 */
	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex(sub => sub === subscriber);
	}
}

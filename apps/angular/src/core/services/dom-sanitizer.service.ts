import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** Sanitizer for URL. */
@Pipe({
	name: 'campSafe',
})
export class SafePipe implements PipeTransform {

	private readonly sanitizer = inject(DomSanitizer);

	/**
		* Url transform.
		* @param url Url.
		* @param args Arguments.
		*/
	public transform(url: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}

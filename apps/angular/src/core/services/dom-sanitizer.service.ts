import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** Sanitizer for URL. */
@Pipe({
	name: 'safe',
})
export class SafePipe implements PipeTransform {
	public constructor(private sanitizer: DomSanitizer) {}

	/**
		* Url transform.
		* @param url Url.
		* @param args Arguments.
		*/
	public transform(url: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}

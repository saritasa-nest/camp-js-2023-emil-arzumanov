import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registrtion';
import { TokenBody } from '@js-camp/core/dtos/token-responce.dto';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';

import { AppUrlsConfig } from './url-config.service';

/** Service for auth requests. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly http = inject(HttpClient);

	/** URL for login request. */
	private readonly loginUrl = this.appUrlsConfig.toApi('auth', 'login');

	/** URL for registration request. */
	private readonly registrationUrl = this.appUrlsConfig.toApi('auth', 'register');

	/**
	 * Login.
	 * @param body Request body.
	 */
	public login(body: Login): Observable<void> {
		return this.http
			.post<TokenBody>(this.loginUrl, { body })
			.pipe(
				map(res => this.setTokens(res)),
			);
	}

	/**
	 * Registration.
	 * @param body Request body.
	 */
	public registration(body: Registration): Observable<void> {
		return this.http
			.post<TokenBody>(this.registrationUrl, { ...RegistrationMapper.toDto(body) })
			.pipe(
				map(res => this.setTokens(res)),
			);
	}

	/**
		* Saves tokens in local storage.
		* @param tokens JWT tokens.
		*/
	private setTokens(tokens: TokenBody): void {
		console.log(tokens);
		localStorage.setItem('access_token', tokens.access);
		localStorage.setItem('refresh_token', tokens.refresh);
	}

	/** Logout. Delete tokens from local storage. */
	public logout(): void {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
	}

	/** Is user logged in. */
	protected isLoggedIn(): boolean {
		return !!localStorage.getItem('access_token') && !!localStorage.getItem('refresh_token');
	}
}

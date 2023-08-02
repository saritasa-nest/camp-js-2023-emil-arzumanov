import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registrtion';
import { TokenBody } from '@js-camp/core/dtos/token-responce.dto';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';
import { environment } from '@js-camp/angular/environments/environment';

import { AppUrlsConfig } from './url-config.service';

const ACCESS = environment.accessToken;
const REFRESH = environment.refreshToken;

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
			.post<TokenBody>(this.loginUrl, { ...body })
			.pipe(map(res => this.setTokens(res)));
	}

	/**
	 * Register.
	 * @param body Request body.
	 */
	public register(body: Registration): Observable<void> {
		return this.http
			.post<TokenBody>(this.registrationUrl, { ...RegistrationMapper.toDto(body) })
			.pipe(map(res => this.setTokens(res)));
	}

	/**
	 * Saves tokens in local storage.
	 * @param tokens JWT tokens.
	 */
	private setTokens(tokens: TokenBody): void {
		localStorage.setItem(ACCESS, tokens.access);
		localStorage.setItem(REFRESH, tokens.refresh);
	}

	/** Logout. Delete tokens from local storage. */
	public logout(): void {
		localStorage.removeItem(ACCESS);
		localStorage.removeItem(REFRESH);
	}

	/** Is user logged in. */
	public isLoggedIn(): boolean {
		if (localStorage.getItem(ACCESS) === null && localStorage.getItem(REFRESH) === null) {
			return false;
		}
		return true;
	}
}

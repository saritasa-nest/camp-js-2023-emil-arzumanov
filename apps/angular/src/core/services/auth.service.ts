import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registrtion';
import { TokenBody } from '@js-camp/core/dtos/token-responce.dto';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';

import { errorCatchForService } from '../utils/auth-error.util';

import { AppUrlsConfig } from './url-config.service';

/** Service for auth requests. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly http = inject(HttpClient);

	private readonly accessTokenName = 'access_token';

	private readonly refreshTokenName = 'refresh_token';

	/** URL for login request. */
	private readonly loginUrl = this.appUrlsConfig.toApi('auth', 'login');

	/** URL for registration request. */
	private readonly registrationUrl = this.appUrlsConfig.toApi('auth', 'register');

	/** URL for refresh token request. */
	private readonly refreshTokenUrl = this.appUrlsConfig.toApi('auth', 'token', 'refresh');

	/**
	 * Login.
	 * @param body Request body.
	 */
	public login(body: Login): Observable<TokenBody> {
		return this.http
			.post<TokenBody>(this.loginUrl, { ...body })
			.pipe(
				errorCatchForService(),
				tap(res => this.setTokens(res)),
			);
	}

	/**
	 * Register.
	 * @param body Request body.
	 */
	public register(body: Registration): Observable<TokenBody> {
		return this.http
			.post<TokenBody>(this.registrationUrl, { ...RegistrationMapper.toDto(body) })
			.pipe(
				errorCatchForService(),
				tap(res => this.setTokens(res)),
			);
	}

	/** Refresh token. */
	public refreshToken(): Observable<TokenBody> {
		return this.http
			.post<TokenBody>(this.refreshTokenUrl, { refresh: localStorage.getItem(this.refreshTokenName) })
			.pipe(tap(res => this.setTokens(res)));
	}

	/**
	 * Saves tokens in local storage.
	 * @param tokens JWT tokens.
	 */
	private setTokens(tokens: TokenBody): void {
		localStorage.setItem(this.accessTokenName, tokens.access);
		localStorage.setItem(this.refreshTokenName, tokens.refresh);
	}

	/** Logout. Delete tokens from local storage. */
	public logout(): void {
		localStorage.removeItem(this.accessTokenName);
		localStorage.removeItem(this.refreshTokenName);
	}

	/** Is user logged in. */
	public isLoggedIn(): boolean {
		if (localStorage.getItem(this.accessTokenName) === null && localStorage.getItem(this.refreshTokenName) === null) {
			return false;
		}
		return true;
	}
}

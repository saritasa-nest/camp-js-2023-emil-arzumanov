import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenBody } from '@js-camp/core/dtos/token-responce.dto';
import { Login } from '@js-camp/core/models/login';
import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { Registration } from '@js-camp/core/models/registrtion';
import { RegistrationMapper } from '@js-camp/core/mappers/registration.mapper';
import { environment } from '@js-camp/angular/environments/environment';
import { loginErrorMapper } from '@js-camp/core/mappers/login-error.mapper';
import { registrationErrorMapper } from '@js-camp/core/mappers/registration-error.mapper';

import { catchErrorOnRequest } from '../utils/error.util';

import { AppUrlsConfig } from './url-config.service';
import { StorageService } from './storage.service';

/** Service for auth requests. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly storageService = inject(StorageService);

	private readonly http = inject(HttpClient);

	private readonly accessTokenName = environment.accessTokenName;

	private readonly refreshTokenName = environment.refreshTokenName;

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
			.post<TokenBody>(this.loginUrl, { ...LoginMapper.toDto(body) })
			.pipe(
				catchErrorOnRequest(loginErrorMapper),
				tap(res => {
					this.setTokens(res);
					this.isLoggedInSubject$.next(this.isTokenInStorage());
				}),
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
				catchErrorOnRequest(registrationErrorMapper),
				tap(res => {
					this.setTokens(res);
					this.isLoggedInSubject$.next(this.isTokenInStorage());
				}),
			);
	}

	/** Refresh token. */
	public refreshToken(): Observable<TokenBody> {
		return this.http
			.post<TokenBody>(this.refreshTokenUrl, { refresh: this.storageService.getValue(this.refreshTokenName) })
			.pipe(tap(res => this.setTokens(res)));
	}

	/**
	 * Saves tokens in ServiceStorage.
	 * @param tokens JWT tokens.
	 */
	private setTokens(tokens: TokenBody): void {
		this.storageService.setValue(this.accessTokenName, tokens.access);
		this.storageService.setValue(this.refreshTokenName, tokens.refresh);
	}

	/** Logout. Delete tokens from ServiceStorage. */
	public logout(): void {
		this.storageService.removeValue(this.accessTokenName);
		this.storageService.removeValue(this.refreshTokenName);
		this.isLoggedInSubject$.next(this.isTokenInStorage());
	}

	/** Is user logged in. Behavior subject. */
	private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(this.isTokenInStorage());

	/** Is user logged in. Observable. */
	public readonly isLoggedIn$ = this.isLoggedInSubject$.asObservable();

	/** Is token in storage. */
	private isTokenInStorage(): boolean {
		return this.storageService.getValue(this.accessTokenName) !== null && this.storageService.getValue(this.refreshTokenName) !== null;
	}
}

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Input, inject, Optional, Self, ElementRef, OnDestroy, Directive } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

/** Base mat form field component. */
@Directive()
export abstract class CustomFormField<TValue>
implements MatFormFieldControl<TValue[]>, OnDestroy, ControlValueAccessor {

	/** @inheritdoc */
	public static nextId = 0;

	/** @inheritdoc */
	// eslint-disable-next-line rxjs/finnish
	public stateChanges = new Subject<void>();

	/** @inheritdoc */
	public focused = false;

	/** @inheritdoc */
	public touched = false;

	/** @inheritdoc */
	public controlType = 'custom-form-field';

	/** @inheritdoc */
	public id = `camp-chips-form-field-${CustomFormField.nextId++}`;

	/** @inheritdoc */
	public get empty(): boolean {
		return this.checkValueIsEmpty(this.value);
	}

	protected abstract checkValueIsEmpty(value: TValue[]): boolean;

	/** @inheritdoc */
	public get shouldLabelFloat(): boolean {
		return this.focused || !this.empty;
	}

	/** @inheritdoc */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public onFocusIn(event: FocusEvent): void {
		if (!this.focused) {
			this.focused = true;
			this.stateChanges.next();
		}
	}

	/** @inheritdoc */
	public onFocusOut(event: FocusEvent): void {
		if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
			this.touched = true;
			this.focused = false;
			this.onTouched();
			this.stateChanges.next();
		}
	}

	@Optional()	private readonly formGroup = inject(FormGroupDirective);

	/** @inheritdoc */
	public get errorState(): boolean {
		return this._errorState;
	}

	private set errorState(value: boolean) {
		this._errorState = value;
	}

	private _errorState = false;

	/** @inheritdoc */
	public ngDoCheck(): void {
		this.updateErrorState();
	}

	/** Update error state. */
	private updateErrorState(): void {
		if (this.value === null) {
			return;
		}
		const oldState = this.errorState;
		const newState = this.ngControl.errors && this.formGroup.submitted;

		if (oldState !== newState) {
			this._errorState = newState ?? false;
			this.stateChanges.next();
		}
	}

	/** @inheritdoc */
	// eslint-disable-next-line @angular-eslint/no-input-rename
	@Input('aria-describedby') public userAriaDescribedBy = '';

	/** @inheritdoc */
	@Input()
	public get placeholder(): string {
		return this._placeholder;
	}

	/** @inheritdoc */
	public set placeholder(value: string) {
		this._placeholder = value;
		this.stateChanges.next();
	}

	/** @inheritdoc */
	private _placeholder = '';

	/** @inheritdoc */
	@Input()
	public get required(): boolean {
		return this._required;
	}

	/** @inheritdoc */
	public set required(value: BooleanInput) {
		this._required = coerceBooleanProperty(value);
		this.stateChanges.next();
	}

	/** @inheritdoc */
	private _required = false;

	/** @inheritdoc */
	@Input()
	public get disabled(): boolean {
		return this._disabled;
	}

	/** @inheritdoc */
	public setDisabledState(isDisabled: boolean): void {
		this._disabled = isDisabled;
	}

	/** @inheritdoc */
	private _disabled = false;

	/** @inheritdoc */
	public describedBy = '';

	/** @inheritdoc */
	public setDescribedByIds(ids: string[]): void {
		this.describedBy = ids.join(' ');
	}

	/** @inheritdoc */
	protected readonly _elementRef = inject(ElementRef<HTMLElement>);

	/** @inheritdoc */
	public onContainerClick(event: MouseEvent): void {
		if ((event.target as Element).tagName.toLowerCase() !== 'input') {
			const input = this._elementRef.nativeElement.querySelector('input');
			if (input) {
				input.focus();
			}
		}
	}

	/** @inheritdoc */
	// eslint-disable-next-line no-empty-function, @typescript-eslint/no-explicit-any
	public onChange = (_: any): void => {};

	/** @inheritdoc */
	// eslint-disable-next-line no-empty-function
	public onTouched = (): void => {};

	/** @inheritdoc */
	protected _value: TValue[] = [];

	/** @inheritdoc */
	public get value(): TValue[] {
		return this._value;
	}

	/** @inheritdoc */
	@Input()
	public set value(val: TValue[]) {
		this._value = val;
		this.onChange(val);
		this.stateChanges.next();
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.stateChanges.complete();
	}

	/** @inheritdoc */
	public writeValue(value: TValue[]): void {
		this.value = value;
	}

	/** @inheritdoc */
	// eslint-disable-next-line no-empty-function
	public registerOnChange(): void {}

	/** @inheritdoc */
	// eslint-disable-next-line no-empty-function
	public registerOnTouched(): void {}

	/** @inheritdoc */
	@Optional() @Self() public readonly ngControl = inject(NgControl);

	public constructor() {
		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}
	}
}

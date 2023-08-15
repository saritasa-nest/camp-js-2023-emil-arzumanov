import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Input, inject, Optional, Self, ElementRef, OnDestroy, Directive, DoCheck } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

/** Base mat form field component. */
@Directive()
export abstract class CustomFormField<TValue>
implements MatFormFieldControl<TValue[]>, OnDestroy, ControlValueAccessor, DoCheck {

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

	protected abstract checkValueIsEmpty(value: TValue[] | null): boolean;

	/** @inheritdoc */
	public get shouldLabelFloat(): boolean {
		return this.focused || !this.empty;
	}

	/** @inheritdoc */
	public onFocusIn(): void {
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

	/** Form control. */
	public get formControl(): FormControl<TValue[] | TValue | null> {
		return this.ngControl.control as FormControl<TValue[] | TValue | null>;
	}

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
		if (this.ngControl) {
			this.updateErrorState();
		}
	}

	/** Update error state. */
	private updateErrorState(): void {
		const oldState = this.errorState;
		const newState = this.ngControl.control?.errors && (this.formGroup.submitted || this.formControl.touched);

		if (oldState !== newState) {
			this._errorState = newState ?? false;
			this.stateChanges.next();
		}
	}

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
	public onChange = (_value: TValue[]): void => {};

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
	public writeValue(value: TValue[]): void {
		this.value = value;
	}

	/** @inheritdoc */
	public ngOnDestroy(): void {
		this.stateChanges.complete();
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

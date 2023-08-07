import { FormControl, FormGroup } from '@angular/forms';

/** Custom type for Form Group. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValidatedFormGroupType<T extends Record<string, any>> = FormGroup<{ [key in keyof T]: FormControl<T[key]> }>;

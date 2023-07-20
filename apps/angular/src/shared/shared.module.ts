import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

/** Shared module. */
@NgModule({
	declarations: [PageNotFoundComponent, PageNotFoundComponent],
	imports: [CommonModule, RouterModule],
})
export class SharedModule {}

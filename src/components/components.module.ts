import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile';
import { DescriptionComponent } from './description/description';
import { LoaderComponent } from './loader/loader';
@NgModule({
	declarations: [ProfileComponent,
    DescriptionComponent,
    LoaderComponent],
	imports: [],
	exports: [ProfileComponent,
    DescriptionComponent,
    LoaderComponent]
})
export class ComponentsModule {}

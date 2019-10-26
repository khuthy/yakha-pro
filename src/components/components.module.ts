import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile';
import { DescriptionComponent } from './description/description';
@NgModule({
	declarations: [ProfileComponent,
    DescriptionComponent],
	imports: [],
	exports: [ProfileComponent,
    DescriptionComponent]
})
export class ComponentsModule {}

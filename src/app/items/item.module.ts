import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsRoutingModule } from './items-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ItemsRoutingModule
  ],
  declarations: [ItemsListComponent],
  providers: []
})
export class ItemsModule { }

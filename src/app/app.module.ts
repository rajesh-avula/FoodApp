import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemService } from './items/item.service';
import { UserService } from './users/user.service';
import { Http, HttpModule} from '@angular/http';
import { CartComponent } from './cart/cart.component';
@NgModule({
  declarations: [
    AppComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ItemService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

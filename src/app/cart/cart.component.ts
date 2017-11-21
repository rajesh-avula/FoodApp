import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';
import { ItemService } from '../items/item.service';
import { Cart } from '../cart/Cart';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  selectedItems: any = [];
  selectedItemsCount: any= 0;
  deliveryCharge: any = 0;
  subTotal: any= 0;
  grandTotal: any = 0;
  quantity: any = 0;
  submit = false;
  constructor(private _http: Http, private _itemService: ItemService,
    private _route: ActivatedRoute, private _router: Router) {
        this.selectedItems = [];
        if (sessionStorage.getItem('selectedItems')) {
            this.selectedItems = JSON.parse(sessionStorage.getItem('selectedItems'));
        }
        for (let i = 0; i < this.selectedItems.length; i++) {
            this.grandTotal += this.selectedItems[i].totalPrice;
            this.quantity += this.selectedItems[i].quantity;
        }
        if (this.grandTotal < 400 && this.grandTotal > 0) {
            this.deliveryCharge = 50;
        }
        if (_itemService.selectedItems.length > 0) {
            this.selectedItemsCount = this.selectedItems.length;
            this.subTotal = Number(sessionStorage.getItem('grandTotal'));
        }
     }
  updateCart(item: Cart) {
      item.totalPrice = item.price * item.quantity;
      this.grandTotal = 0;
      this.quantity = 0;
      const items = JSON.parse(sessionStorage.getItem('items'));
      const index_item = items.findIndex((item1: any) => item1.itemId === item.itemId);
      items[index_item].quantity = item.quantity;
      sessionStorage.setItem('items', JSON.stringify(items));
      for (let i = 0; i < this.selectedItems.length; i++) {
          this.grandTotal += this.selectedItems[i].totalPrice;
          this.quantity += this.selectedItems[i].quantity;
      }
      this.deliveryCharge = 0;
      if (this.grandTotal < 400 && this.grandTotal > 0) {
        this.deliveryCharge = 50;
      }
      this._itemService.selectedItems = this.selectedItems;
      sessionStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
    }
  itemsCount(): boolean {
    if (this.selectedItemsCount > 0) {
        return true;
    }
    else {
        return false;
    }
  }

  checkout() {
      this.submit = true;
      this.selectedItems = [];
      this.selectedItemsCount = 0;
      this.grandTotal = 0;
      this.deliveryCharge = 0;
      this._itemService.selectedItems = [];
      this._itemService.selectedItemsCount = 0;
      sessionStorage.removeItem('selectedItems');
      sessionStorage.removeItem('items');
  }
  deleteItem(id: any) {
    this.selectedItems = this.selectedItems.filter(item => item.itemId !== id );
    sessionStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
    const items = JSON.parse(sessionStorage.getItem('items'));
    const index_item = items.findIndex((item: any) => item.itemId === id);
    items[index_item].quantity = 0;
    sessionStorage.setItem('items', JSON.stringify(items));
    this.grandTotal = 0;
    for (let i = 0; i < this.selectedItems.length; i++) {
        this.grandTotal += this.selectedItems[i].totalPrice;
    }
    if (this.grandTotal < 400 && this.grandTotal > 0) {
        this.deliveryCharge = 50;
    }
  }
  gotoItems() {
      this._router.navigate(['/items']);
  }
}

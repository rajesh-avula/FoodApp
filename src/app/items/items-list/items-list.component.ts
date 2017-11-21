import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../Item';
import { ItemService } from '../item.service';
import { Cart } from '../../cart/Cart';
@Component({
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent  {
  items: any= [];
  paymentStatus  = false;
  orderId  = 0;
  errorMessage: string;
  pageTitle = 'Cart' ;
  cart: Cart;
  selected: Item;
  selectedItems: any = [];
  selectedItemsCount: any= 0;
  deliveryCharge: any = 0;
  subTotal: any = 0;
  orderTotal: any= 0;
  minusImage= 'assets/images/minus.png';
  plusImage= 'assets/images/plus.png';
  constructor(private _router: Router, private _itemService: ItemService) {
    this.paymentStatus = false;
    if (sessionStorage.getItem('selectedItems')) {
      this.selectedItems = JSON.parse(sessionStorage.getItem('selectedItems'));
    }
  // tslint:disable-next-line:one-line
    else {
      this.selectedItems = [];
    }
    if (sessionStorage.getItem('items')) {
      this.items = JSON.parse(sessionStorage.getItem('items'));
    }
    // tslint:disable-next-line:one-line
    else {
    this._itemService.getItems()
            .subscribe(
            items => {
              this._itemService.items = items;
              this.items = items;
            },
            error => this.errorMessage = <any>error);
          }
    if (this.selectedItems && this.selectedItems.length > 0) {
      this.selectedItemsCount = this.selectedItems.length;
      for (let i = 0; i < this.selectedItems.length; i++) {
        this.orderTotal += this.selectedItems[i].totalPrice;
      }
    }
  }
  removeItem(id: number) {
    this.cart  = new Cart();
    this.selectedItemsCount -= 1;
    const selected = this.selectedItems.filter((item: any) => item.itemId === id)[0];
    const item_index = this.items.findIndex((item: any) => item.itemId === id);
    this.items[item_index].quantity -= 1;
    if (selected) {
      const index = this.selectedItems.findIndex((item: any) => item.itemId === id);
      this.selectedItems[index].quantity -= 1;
      this.selectedItems[index].totalPrice -= selected.price;
      let temp_selectedItems = [];
      for (let i = 0; i < this.selectedItems.length; i++) {
        if  (this.selectedItems[i].quantity !== 0) {
          temp_selectedItems.push(this.selectedItems[i]);
        }
      }
      this.selectedItems = temp_selectedItems;
      sessionStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
      sessionStorage.setItem('items', JSON.stringify(this.items));
    }
  }
  addItem(id: number) {
    this.cart = new Cart();
    const item = this.items.filter((item: any) => item.itemId === id)[0];
    this.subTotal += item.price;
    this.orderTotal += item.price;
    const item_index = this.items.findIndex((item: any) => item.itemId === id);
    this.items[item_index].quantity += 1;
    if (this.selectedItems && this.selectedItems.length > 0) {
        this.selected = this.selectedItems.filter(( item: any) => item.itemId === id)[0];
    }
    if (this.selected) {
      const index = this.selectedItems.findIndex((item: any) => item.itemId === id);
      this.selectedItems[index].quantity += 1;
      this.selectedItems[index].totalPrice += this.selected.price;
      sessionStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
    }
    else {
      this.selectedItemsCount += 1;
      this.cart.orderId = 'ORD_' + this.orderId;
      this.cart.itemId = id;
      this.cart.itemName = item.itemName;
      this.cart.price = item.price;
      this.cart.quantity = 1;
      this.cart.dateOfPurchase = new Date().toString();
      this.cart.totalPrice = item.price * this.cart.quantity;
      this.selectedItems.push(this.cart);
      sessionStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
      this.orderId++;
    }
    sessionStorage.setItem('items', JSON.stringify(this.items));
  }
  filteredItems(categoryType: string) {
    if (categoryType === 'all') {
      this.items = this._itemService.items;
    }
    else{
      this.items = this._itemService.items.filter(item => item.category === categoryType);
    }
  }
  itemsCount(): boolean {
    if (this.selectedItemsCount > 0) {
        return true;
    }
    else {
        return false;
    }
  }
  calculateTotal(): number {
    this.orderTotal = 0;
    for ( let i = 0; i < this.selectedItems.length ; i++) {
        this.orderTotal += this.selectedItems[i].totalPrice;
    }
    return this.orderTotal;
  }
  gotoItems() {
    this._router.navigate(['/items']);
  }
  calculateDelivery(): number {
    this.deliveryCharge = 0;
    this.orderTotal = this.calculateTotal();
    if (this.orderTotal < 400 && this.orderTotal > 0) {
      this.deliveryCharge = 50;
    }
    return this.deliveryCharge;
  }
  goToCart() {
    this._router.navigate(['/cart']);
  }

}

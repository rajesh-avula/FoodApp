import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Item } from './Item';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ItemService {
    items: any = [];
    selectedItems: any = [];
    selectedItemsCount: any = 0;
    constructor(private _http: Http) {
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
        this.selectedItemsCount = this.selectedItems.length;
    }

    getItems(): Observable<Item[]> {
        return this._http.get('/assets/items/items.json')
            .map((response: Response) => <Item[]>response.json())
            .catch(this.handleError );
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

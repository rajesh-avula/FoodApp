import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    users: any= [];
    constructor(private _http: Http) {
    }
    getUsers(): Observable<User[]> {
        return this._http.get('/assets/users/users.json')
            .map((response: Response) => <User[]>response.json())
            .catch(this.handleError);
    }


    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

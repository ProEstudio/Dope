// Import Depencies ========================
import { Injectable } from '@angular/core'
import { Http, Response , Headers , RequestOptions } from '@angular/http'
import { Data } from '../model/data'
import { Observable } from 'rxjs/Rx'

// Import Rxjs required methods ============
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()

export class DataService {

    // Resolve HTTP using the constructor
    constructor(private http: Http){}

    // Private instance variable to hold base url
    private dataUrl = 'http://localhost:3000/api/users'

    // Fetch all existing data
    getData(): Observable<Data[]> {
         return this.http.get(this.dataUrl) // ...using get request
                        .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error')) // ...errors if any
    }

    // Add a new data
    addData(body: Object): Observable<Data[]> {
        
        let bodyString = JSON.stringify(body) // Stringify payload
        let headers    = new Headers({ 'Content-Type' : 'application/json'}) // ... Set content type to JSON
        let options    = new RequestOptions({ headers: headers}) // Create a request option

        return this.http.post(this.dataUrl , body , options) // ...using post request
                        .map((res:Response) => res.json())  // ...and calling .json() on the response to return data
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error')) // ...errors if any
   } 

    // Update a data
    updateData(body: Object): Observable<Data[]> {
        
        let bodyString = JSON.stringify(body) // Stringify payload
        let headers    = new Headers({ 'Content-Type' : 'application/json'}) // ... Set content type to JSON
        let options    = new RequestOptions({ headers: headers}) // Create a request option

        return this.http.put(`${this.dataUrl}/${body['id']}` , body , options) // ...using post request
                        .map((res:Response) => res.json())  // ...and calling .json() on the response to return data
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error')) // ...errors if any
   } 

    // Delete a data
    removeData(id: String): Observable<Data[]> {

        return this.http.delete(`${this.dataUrl}/${id}`) // ...using post request
                        .map((res:Response) => res.json())  // ...and calling .json() on the response to return data
                        .catch((error: any) => Observable.throw(error.json().error || 'Server error')) // ...errors if any
   } 
}
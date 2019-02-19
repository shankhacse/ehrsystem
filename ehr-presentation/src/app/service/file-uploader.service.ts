import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(private _http:Http) { }

  /**
   * upload
   */
  public upload(formdata: any) {
    
    
  }

}//end of class

import { Injectable } from "@angular/core";
import { HttpService } from "src/app/common/modules/http-with-injector/http.service";
import { map } from "rxjs/operators";

@Injectable()
export class PurchaseListService {
  constructor(private http: HttpService) {}
  searchMedicine(search) {
    return this.http.get("medicines/search", { params: search });
  }

  getCompanyList(){
    return this.http.get(`company-list`).pipe(map(res => res));
  }

  getPurcheseList(){
    return this.http.get(`purchase/list`).pipe(map(res => res));
  }

  getPurcheseDetails(orderId: any){
    return this.http.get(`purchase/details/${orderId}`).pipe(map(res => res));
  }

  submitItem(data: any) {
    return this.http.post('purchase/save', data).toPromise();
  }
}

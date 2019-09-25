import { Injectable } from "@angular/core";
import { HttpService } from "src/app/common/modules/http-with-injector/http.service";
import { map } from "rxjs/operators";

@Injectable()
export class InventoryService {
  constructor(private http: HttpService) {}
  searchMedicine(search) {
    return this.http.get("medicines/search", { params: search });
  }

  getInventoryList(){
    return this.http.get(`inventory/list`).pipe(map(res => res));
  }

  getCompanyList(){
    return this.http.get(`company-list`).pipe(map(res => res));
  }

  submitItem(data: any) {
    return this.http.post('purchase/save', data).toPromise();
  }

  getInventoryFilterList(params){
    return this.http.get(`inventory/listFilter?filter=${params}`).pipe(map(response => response));
  }
}

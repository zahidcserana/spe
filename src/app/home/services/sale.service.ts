import { Injectable } from "@angular/core";
import { HttpService } from "src/app/common/modules/http-with-injector/http.service";
import { map } from "rxjs/operators";

@Injectable()
export class SaleService {
  constructor(private http: HttpService) {}
  addtoCart(data: any) {
    return this.http.post("carts/add-to-cart", data).toPromise();
  }
  searchMedicineByPharmacy(search) {
    return this.http.get("medicines/search/sale", { params: search });
  }
  getBatchList(data: any) {
    return this.http.post(`medicines/batch`, data).pipe(map(res => res));
  }
  getAvailableQuantity(data: any) {
    return this.http.post(`medicines/quantity`, data).pipe(map(res => res));
  }
  saveCartsInlocalStorage(data) {
    localStorage.setItem("user_cart", JSON.stringify(data));
  }
  updateCart(data) {
    return this.http.post("carts/quantity-update", data).toPromise();
  }
  checkCart(token: any) {
    return this.http.get(`carts/${token}/check`).pipe(map(res => res));
  }
  cartDetails(token: any) {
    return this.http.get(`carts/${token}`).pipe(map(res => res));
  }
  deleteCart(item_id, token) {
    return this.http.post('carts/delete-item', { token: token, item_id: item_id }).toPromise();
  }
  makeSaleOrder(data: any) {
    return this.http.post('orders/sale', data).toPromise();
  }
}

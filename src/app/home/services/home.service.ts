import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/common/modules/http-with-injector/http.service';

@Injectable()
export class HomeService {

    constructor(private http: HttpService) {

    }

    getCompanies() {
        return this.http.get('companies').pipe(map(res => res));
    }
    getCompaniesByInventory() {
        return this.http.get('companies/inventory').pipe(map(res => res));
    }
    getMrs() {
        return this.http.get('mrs').pipe(map(res => res));
    }
    saleDetails(saleId: any) {
        return this.http.get(`sale/${saleId}`).pipe(map(res => res));
    }
    orderDetails(orderId: any) {
        return this.http.get(`orders/${orderId}/details`).pipe(map(res => res));
    }
    getNotifications(){
        return this.http.get(`notification/list`).pipe(map(res => res));
    }
    getSummary() {
        return this.http.get(`dashboard/summary`).pipe(map(res => res));
    }
    getStatistics() {
        return this.http.get(`dashboard/statistics`).pipe(map(res => res));
    }
}

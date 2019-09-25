import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { HomeService } from './home.service';


@Injectable()
export class HomeResolveService implements Resolve<any> {

    constructor(private service: HomeService) {
    }

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        switch (router.routeConfig.path) {
            case '':
                return this.service.getStatistics();
            case 'purchase':
                return this.service.getCompanies();
            case 'sale':
                return this.service.getCompaniesByInventory();
            case 'manual-purchase':
                return this.service.getCompanies();
            case 'report':
                return this.service.getCompanies();
            case 'mrs':
                return this.service.getCompanies();
            case 'orders':
                return this.service.getCompanies();
            case 'inventory':
                return this.service.getCompanies();
            case 'products':
                return this.service.getCompanies();
        }
    }

    private getId(router) {
        let id = router.parent.params.product_id;
        id = id ? id : router.parent.parent.parent.params.product_id;
        return id;
    }
}

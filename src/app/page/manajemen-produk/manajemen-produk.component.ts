import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCrudService } from 'src/app/service/firebase-crud.service';
import { GetMenuService } from 'src/app/service/get-menu.service';

@Component({
    selector: 'app-manajemen-produk',
    templateUrl: './manajemen-produk.component.html',
    styleUrls: ['./manajemen-produk.component.css']
})
export class ManajemenProdukComponent implements OnInit {

    dataProduk: any = [];

    constructor(private router: Router,
        private firebaseCrudService: FirebaseCrudService,
        private getMenuService: GetMenuService) { }

    ngOnInit(): void {
        this.onFetchDataMenu();
    }

    onClickBackToHome() {
        this.router.navigateByUrl("home");
    }

    onFetchDataMenu() {
        let url = 'menu.json';
        this.getMenuService.defaultGetRequest(url)
            .subscribe((_result) => {
                this.dataProduk = _result;

                console.log(this.dataProduk);
            });
    }

    onNavigateToEditPage(data: any) {
        this.router.navigateByUrl("edit-produk", data);
    }

    onNavigateToCreatePage() {
        this.router.navigateByUrl("buat-produk");
    }
}

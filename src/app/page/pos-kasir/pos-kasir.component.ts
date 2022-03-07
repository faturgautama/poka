import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxNumberSpinnerComponent } from 'ngx-number-spinner';
import { GetMenuService } from 'src/app/service/get-menu.service';
import Swal from 'sweetalert2';

export class Penjualan {
    Tanggal: string;
    UserEntry: string;
    Detail: any;
    Subtotal: number;
}

@Component({
    selector: 'app-pos-kasir',
    templateUrl: './pos-kasir.component.html',
    styleUrls: ['./pos-kasir.component.css'],
    providers: [DatePipe]
})
export class PosKasirComponent implements OnInit {

    mainMenu: any = [];
    toggleNumericTextbox: boolean = false;
    toggleEditButton: boolean = false;
    selectedMenu: any;
    idBarang: number;
    cart: any = [];
    totalBelanja: string = "0";
    dataPenjualan: any = [];
    tanggal = new Date();
    @ViewChild('number') numberPicker: NgxNumberSpinnerComponent;

    constructor(private router: Router,
        private getMenuService: GetMenuService,
        private datePipe: DatePipe) {
    }

    ngOnInit(): void {
        this.onFetchMainMenu();
    }

    onFetchMainMenu() {
        let url = 'menu.json';
        this.getMenuService.defaultGetRequest(url)
            .subscribe((_result) => {
                this.mainMenu = _result;
                console.log(this.mainMenu)
            });
    }

    onClickMenu(item: any) {
        this.selectedMenu = item;
        this.idBarang = item.id

        this.toggleNumericTextbox = true;

        // Cek if item has active state
        let element = document.getElementById(item.id);

        if (element.classList.contains('active')) {
            this.onRemoveActiveState(item.id);
        } else {
            this.onAddActiveState(item.id);
        }
    }

    onEditCart(cartItem: any, cart: any) {
        this.toggleEditButton = !this.toggleEditButton;

        console.log('Selected Data :', cartItem.id);
        console.log('Whole Cart :', cart);
    }

    onDeleteCart(cart: any, indexOfElement: any) {

        let avalaibleItem = cart.splice(indexOfElement, 1);

        this.onGetTotalBelanja(cart);

        return cart = avalaibleItem;
    }

    onAddActiveState(id: any) {
        let element = document.getElementById(id);
        element.classList.add('active');

        if (element.classList.contains("sleep")) {
            element.classList.remove("sleep");
        }
    }

    onRemoveActiveState(id: any) {
        let element = document.getElementById(id);
        element.classList.remove('active');
        element.classList.add('sleep');
    }

    onSaveToCart(qty: number) {
        let number = this.numberPicker;

        if (number.value > 0) {
            // Set cart item
            let cartItem: any = {
                'id': this.idBarang,
                'namaProduk': this.selectedMenu.namaProduk,
                'hargaJualProduk': this.selectedMenu.hargaJualProduk,
                'qty': qty,
                'total': this.selectedMenu.hargaJualProduk * qty,
                'sisaStok': this.selectedMenu.sisaStokProduk - qty,
                'totalPenjualan': this.selectedMenu.totalPenjualan + (this.selectedMenu.hargaJualProduk * qty),
                'totalQtyTerjual': this.selectedMenu.totalQtyTerjual + qty,
            };

            // Push cart item to cart
            this.cart.push(cartItem);

            // Remove Active Class
            this.onRemoveActiveState(cartItem.id);

            // Count total belanja
            this.onGetTotalBelanja(this.cart);

            // Set numeric textbox value to 1
            number.value = 1;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Qty Tidak Boleh 0',
            });
        }
    }

    onGetTotalBelanja(cart: any) {
        let data = [];
        for (const key in cart) {
            if (cart.hasOwnProperty(key)) {
                data.push({ ...cart[key], id: key })
            }
        }

        this.onCountTotalBelanja(data);
    }

    onCountTotalBelanja(data: any) {
        let subtotal = [];

        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                subtotal.push(data[i]["total"]);
            }
        }

        let sum = subtotal.reduce((acc: any, cur: any) => acc + cur, 0);

        this.totalBelanja = sum.toString();
    }

    onClickBackToHome() {
        this.router.navigateByUrl("home");
    }

    onSubmitPenjualan(cart: any = this.cart) {
        if (cart.length >= 1) {
            let TanggalPenjualan = formatDate(new Date(), 'yyyy-MM-dd', 'en');

            let penjualan = {
                "Tanggal": TanggalPenjualan,
                "Detail": cart,
                "UserEntry": 'Fatur',
                "Subtotal": parseFloat(this.totalBelanja),
            }

            this.dataPenjualan.push(penjualan);

            console.log(this.dataPenjualan[0]);

            this.router.navigateByUrl("payment", this.dataPenjualan[0]);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Total Belanjanya Masih Kosong',
            });
        }
    }
}

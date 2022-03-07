import { formatCurrency } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCrudService } from 'src/app/service/firebase-crud.service';

@Component({
    selector: 'app-halaman-payment',
    templateUrl: './halaman-payment.component.html',
    styleUrls: ['./halaman-payment.component.css']
})
export class HalamanPaymentComponent implements OnInit {

    dataPembelian: any;
    total: number;
    kembali: number;
    bayar: number;
    @ViewChild('totalBelanja') totalBelanja: ElementRef;
    @ViewChild('sisaKembali') sisaKembali: ElementRef;

    constructor(private router: Router, private FirebaseCrudService: FirebaseCrudService) {
        const navigation = this.router.getCurrentNavigation();
        this.dataPembelian = navigation.extras;
    }

    ngOnInit(): void {
        setTimeout(() => {
            console.log(this.dataPembelian);

            this.onSetTotalBelanjaValue(this.dataPembelian.Subtotal);
        }, 1000);
    }

    onSetTotalBelanjaValue(values: any) {
        this.total = values;
        this.totalBelanja.nativeElement.value = formatCurrency(values, 'EN', '');
    }

    onChangeTotalPembayaran(value: any) {
        this.bayar = parseFloat(value);
        this.onCountSisaKembali(value, this.total);
    }

    onCountSisaKembali(totalBayar: number, totalBelanja: number) {
        let values = totalBayar - totalBelanja;
        this.kembali = values;
        this.sisaKembali.nativeElement.value = formatCurrency(values, 'EN', '');
    }

    onClickBackToHome() {
        this.router.navigateByUrl("pos-kasir");
    }

    onSubmitPenjualan() {
        let data = {
            'Tanggal': this.dataPembelian.Tanggal,
            'Detail': this.dataPembelian.Detail,
            'Subtotal': this.dataPembelian.Subtotal,
            'UserEntry': this.dataPembelian.UserEntry,
            'TotalBayar': this.bayar,
            'SisaKembali': this.kembali
        };

        this.FirebaseCrudService.onSubmitPenjualan('penjualan.json', data, "pos-kasir");
    }
}

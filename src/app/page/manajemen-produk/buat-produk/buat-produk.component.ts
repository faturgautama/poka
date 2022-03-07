import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseCrudService } from 'src/app/service/firebase-crud.service';

@Component({
    selector: 'app-buat-produk',
    templateUrl: './buat-produk.component.html',
    styleUrls: ['./buat-produk.component.css']
})
export class BuatProdukComponent implements OnInit {

    formCreateProduk = this.formBuilder.group({
        nama: ['', Validators.required],
        hargaBeli: ['', Validators.required],
        hargaJual: ['', Validators.required],
        jumlahStok: [''],
    })

    constructor(private router: Router, private formBuilder: FormBuilder, private FirebaseCrudService: FirebaseCrudService) { }

    ngOnInit(): void {
    }

    onClickBackToManajemenProduk() {
        this.router.navigateByUrl("manajemen-produk");
    }

    onSubmitCreateProdukForm(form: any) {
        let url = "menu.json";

        let data = {
            namaProduk: form.nama,
            hargaBeliProduk: parseFloat(form.hargaBeli),
            hargaJualProduk: parseFloat(form.hargaJual),
            sisaStokProduk: parseFloat(form.jumlahStok),
            totalPenjualan: 0,
            totalQtyTerjual: 0
        };

        this.FirebaseCrudService.onSubmitForm(url, data, "manajemen-produk");
    }
}

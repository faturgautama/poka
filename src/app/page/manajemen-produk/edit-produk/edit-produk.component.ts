import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseCrudService } from 'src/app/service/firebase-crud.service';

@Component({
    selector: 'app-edit-produk',
    templateUrl: './edit-produk.component.html',
    styleUrls: ['./edit-produk.component.css']
})
export class EditProdukComponent implements OnInit {

    formEditProduk: FormGroup;
    dataProduk: any = [];

    constructor(private router: Router, private formBuilder: FormBuilder, private firebaseCrudService: FirebaseCrudService) {
        const navigation = this.router.getCurrentNavigation();
        this.dataProduk = navigation.extras;
    }

    ngOnInit(): void {
        this.formEditProduk = this.formBuilder.group({
            "nama": ['', Validators.required],
            "hargaBeli": ['', Validators.required],
            "hargaJual": ['', Validators.required],
            "jumlahStok": [''],
        });

        setTimeout(() => {
            console.log(this.dataProduk);
            this.onSetFormControlValue(this.dataProduk);
        }, 200);
    }

    onClickBackToManajemenProduk() {
        this.router.navigateByUrl("manajemen-produk");
    }

    onSetFormControlValue(data: any) {
        this.nama.setValue(data.namaProduk);
        this.hargaBeli.setValue(data.hargaBeliProduk);
        this.hargaJual.setValue(data.hargaJualProduk);
        this.jumlahStok.setValue(data.sisaStokProduk);
    }

    onSubmitEditProdukForm(form: any, key: string) {
        let url = "menu";

        let data = {
            namaProduk: form.nama,
            hargaBeliProduk: parseFloat(form.hargaBeli),
            hargaJualProduk: parseFloat(form.hargaJual),
            sisaStokProduk: parseFloat(form.jumlahStok),
        };

        this.firebaseCrudService.onEditData(url, data, key + ".json", "manajemen-produk");
    }

    onDeleteProduk(key: string) {
        let url = "menu";

        this.firebaseCrudService.onShowConfirmationDelete(url, key + ".json", "manajemen-produk");
    }

    get nama() { return this.formEditProduk.get("nama"); }
    get hargaBeli() { return this.formEditProduk.get("hargaBeli"); }
    get hargaJual() { return this.formEditProduk.get("hargaJual"); }
    get jumlahStok() { return this.formEditProduk.get("jumlahStok"); }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HalamanPaymentComponent } from './page/halaman-payment/halaman-payment.component';
import { HomeComponent } from './page/home/home.component';
import { ManajemenPenjualanComponent } from './page/manajemen-penjualan/manajemen-penjualan.component';
import { BuatProdukComponent } from './page/manajemen-produk/buat-produk/buat-produk.component';
import { EditProdukComponent } from './page/manajemen-produk/edit-produk/edit-produk.component';
import { ManajemenProdukComponent } from './page/manajemen-produk/manajemen-produk.component';
import { PosKasirComponent } from './page/pos-kasir/pos-kasir.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'pos-kasir', component: PosKasirComponent },
    { path: 'payment', component: HalamanPaymentComponent },
    { path: 'manajemen-penjualan', component: ManajemenPenjualanComponent },
    { path: 'manajemen-produk', component: ManajemenProdukComponent },
    { path: 'edit-produk', component: EditProdukComponent },
    { path: 'buat-produk', component: BuatProdukComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

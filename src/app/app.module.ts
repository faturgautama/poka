import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetPenjualanComponent } from './service/get-penjualan/get-penjualan.component';
import { ChartsModule } from 'ng2-charts';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { GetMenuService } from './service/get-menu.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { PosKasirComponent } from './page/pos-kasir/pos-kasir.component';
import { HalamanPaymentComponent } from './page/halaman-payment/halaman-payment.component';
import { ManajemenPenjualanComponent } from './page/manajemen-penjualan/manajemen-penjualan.component';
import { ManajemenProdukComponent } from './page/manajemen-produk/manajemen-produk.component';
import { EditProdukComponent } from './page/manajemen-produk/edit-produk/edit-produk.component';
import { BuatProdukComponent } from './page/manajemen-produk/buat-produk/buat-produk.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PosKasirComponent,
        HalamanPaymentComponent,
        ManajemenPenjualanComponent,
        ManajemenProdukComponent,
        EditProdukComponent,
        BuatProdukComponent,
        GetPenjualanComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NumericTextBoxModule,
        NgxNumberSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        ChartsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    providers: [GetMenuService],
    bootstrap: [AppComponent]
})
export class AppModule { }

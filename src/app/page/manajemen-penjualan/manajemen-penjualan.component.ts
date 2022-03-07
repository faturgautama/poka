import { formatCurrency } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { FirebaseCrudService } from 'src/app/service/firebase-crud.service';
import { GetMenuService } from 'src/app/service/get-menu.service';
import { GetPenjualanService } from 'src/app/service/get-penjualan.service';

@Component({
    selector: 'app-manajemen-penjualan',
    templateUrl: './manajemen-penjualan.component.html',
    styleUrls: ['./manajemen-penjualan.component.css']
})
export class ManajemenPenjualanComponent implements OnInit, OnDestroy {

    totalPenjualan: string = "0";

    chartPieLabel: Label[] = [];
    chartPieData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    chartPieType: ChartType = 'pie';
    chartPieOptions: ChartOptions = {
        responsive: false,
        legend: {
            position: 'left'
        }
    };

    // chartBarLabel: Label[] = [];
    // chartBarData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // chartBarType: ChartType = 'bar';
    // chartBarOptions: ChartOptions = {
    //     responsive: false,
    //     legend: {
    //         position: 'left'
    //     }
    // };

    constructor(private router: Router,
        private getPenjualanService: GetPenjualanService,
        private getMenuService: GetMenuService) { }

    ngOnInit() {
        this.onFetchDataPenjualan();
        this.onFilterPenjualanToGetDetailOnly();
    }

    onClickBackToHome() {
        this.router.navigateByUrl("home");
    }

    onFetchDataPenjualan(): any {
        this.getPenjualanService.defaultGetRequest()
            .subscribe((_result) => {
                this.onGetCountTotalOmzetKeseluruhan(_result);
                this.onFilterPenjualanPerHari(_result);
            });
    }

    onFilterPenjualanPerHari(data: any) {
        let filterizeData = data.filter(data => data.Tanggal != "");

        let tanggal = [];
        if (filterizeData.length > 0) {
            for (let i = 0; i < filterizeData.length; i++) {
                tanggal.push(filterizeData[i]["Tanggal"]);
            }
        }

        let sameTanggal = [... new Set(tanggal)];
        // this.chartBarLabel = sameTanggal;

        this.onGetDataPenjualanByTanggalArray(filterizeData, sameTanggal);
    }

    onGetDataPenjualanByTanggalArray(data: any, tanggalArray: any) {
        // Get Penjualan Per Hari
        let penjualanperTanggal = [];
        let container = [];

        if (tanggalArray.length > 0) {
            for (let i = 0; i < tanggalArray.length; i++) {
                container.push({
                    ...data.filter(data => data.Tanggal == tanggalArray[i])
                });
            }
        }

        if (container.length > 0) {
            for (let i = 0; i < container.length; i++) {
                penjualanperTanggal.push({ ...container[i] });
            }
        }

        console.log(container);

        this.onGetSubtotalPenjualanPerTanggal(penjualanperTanggal);
    }

    onGetSubtotalPenjualanPerTanggal(penjualanPerTanggal: any) {

    }

    // Untuk Get Total Penjualan
    onGetCountTotalOmzetKeseluruhan(data: any) {
        let totalOmzet = [];
        let penjualan = data.filter(data => data.TotalBayar > 0);

        if (penjualan.length > 0) {
            for (let i = 0; i < penjualan.length; i++) {
                totalOmzet.push(penjualan[i]["Subtotal"]);
            }
        }

        let sum = totalOmzet.reduce((acc: any, cur: any) => acc + cur, 0);
        this.totalPenjualan = sum;
    }

    // Untuk Get Detail Per Barang
    onFilterPenjualanToGetDetailOnly() {
        this.getMenuService.defaultGetRequest("menu.json")
            .subscribe((_result) => {
                this.onSetPieChartPenjualan(_result);
            });
    }

    onSetPieChartPenjualan(data: any) {
        let menuLabel = [];
        let menuTotalPenjualan = [];

        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                menuLabel.push(data[i]['namaProduk']);
                menuTotalPenjualan.push(data[i]['totalQtyTerjual']);
            }
        }

        this.chartPieLabel = menuLabel;
        this.chartPieData = menuTotalPenjualan;
    }

    ngOnDestroy() {

    }
}

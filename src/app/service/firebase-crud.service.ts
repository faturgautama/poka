import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { pipe, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class FirebaseCrudService {
    private httpHeaders: any;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.httpHeaders = new HttpHeaders();
        this.httpHeaders = this.httpHeaders.set('Content-Type', 'application/json');
    }

    onSubmitPenjualan(url: string, data: any, urlCallback: string) {
        return this.httpClient.post<any>(
            `${environment.urlFirebase}` + url,
            data,
            {
                headers: this.httpHeaders
            }
        ).pipe(
            catchError(this.handleError),
            map((_result) => {
                let url: string = "menu";
                let detail = data.Detail;

                if (detail.length > 0) {
                    for (let i = 0; i < detail.length; i++) {
                        this.onUpdateDataStokBarangWhileSubmitPenjualan(url, detail[i], detail[i]['id']);
                    }
                }
            })
        ).subscribe(
            (_result) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Data Berhasil Disimpan',
                    showConfirmButton: false,
                    timer: 1500
                }).then((_result) => {
                    this.router.navigateByUrl(urlCallback);
                })
            },
            (pesanError) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: pesanError
                });
            }
        )
    }

    onUpdateDataStokBarangWhileSubmitPenjualan(url: string, data: any, key: string) {
        let updateData = {
            sisaStokProduk: data['sisaStok'],
            totalPenjualan: data['totalPenjualan'],
            totalQtyTerjual: data['totalQtyTerjual'],
        }

        return this.httpClient.patch<any>(
            `${environment.urlFirebase}` + url + "/" + key + ".json",
            updateData,
            {
                headers: this.httpHeaders,
            }
        ).pipe(
            catchError(this.handleError),
            map((_result) => {
                return _result;
            })
        ).subscribe(
            (_result) => {
                console.log(_result);
            },
            (pesanError) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: pesanError
                });

            }
        )
    }

    onSubmitForm(url: string, data: any, urlCallback: string) {
        return this.httpClient.post<any>(
            `${environment.urlFirebase}` + url,
            data,
            {
                headers: this.httpHeaders
            }
        ).pipe(
            catchError(this.handleError),
            map((_result) => {
                return _result;
            })
        ).subscribe(
            (_result) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Data Berhasil Disimpan',
                    showConfirmButton: false,
                    timer: 1500
                }).then((_result) => { this.router.navigateByUrl(urlCallback) })
            },
            (pesanError) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: pesanError
                });
            }
        )
    }

    onFetchData(url: string) {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'json');

        return this.httpClient.get<any>(
            `${environment.urlFirebase}` + url,
            {
                headers: this.httpHeaders,
                params: searchParams
            }
        ).pipe(
            catchError(this.handleError),
            map((result: { [key: string]: any }) => {
                // console.log(result);

                let data = [];

                for (const key in result) {
                    if (result.hasOwnProperty(key)) {
                        data.push({ ...result[key], id: key })
                    }
                }

                return data;
            })
        )
    }

    onEditData(url: string, data: any, key: string, urlCallback: string) {
        return this.httpClient.patch<any>(
            `${environment.urlFirebase}` + url + "/" + key,
            data,
            {
                headers: this.httpHeaders,
            }
        ).pipe(
            catchError(this.handleError),
            map((_result) => {
                return _result;
            })
        ).subscribe(
            (_result) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Data Berhasil Disimpan',
                    showConfirmButton: false,
                    timer: 1500
                }).then((_result) => { this.router.navigateByUrl(urlCallback) })
            },
            (pesanError) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: pesanError
                });

            }
        )
    }

    onDeleteData(url: string, key: string, urlCallback: string) {
        return this.httpClient.delete<any>(
            `${environment.urlFirebase}` + url + "/" + key,
            {
                headers: this.httpHeaders,
            }
        ).pipe(
            catchError(this.handleError),
            map((_result) => {
                return _result;
            })
        ).subscribe(
            (_result) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Data Berhasil Dihapus',
                    showConfirmButton: false,
                    timer: 1500
                }).then((_result) => {
                    this.router.navigateByUrl(urlCallback);
                })
            },
            (pesanError) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: pesanError
                });

            }
        )
    }

    onShowConfirmationDelete(url: string, key: string, urlCallback: string) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        Swal.fire({
            title: 'Apakah Anda Yakin?',
            text: "Data Yg Telah Terhapus Tidak Dapat Dikembalikan",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Saya Yakin!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.onDeleteData(url, key, urlCallback);
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Data Produk Aman :)',
                    'error'
                )
            }
        })
    }

    private handleError(httpErrorResponse: HttpErrorResponse) {
        let pesanError = "Oops... Error Occured";

        if (httpErrorResponse.error)
            return throwError(pesanError);
    }
}

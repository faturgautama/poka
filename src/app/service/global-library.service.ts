import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalLibraryService {

    constructor() { }

    onRemoveOneItemInArray(arr: [], index: number) {
        let indexOfElement = arr[index];
        if (indexOfElement > 0) {
            arr.splice(indexOfElement, 1);
        }

        console.log(arr);

        return arr;
    }

    onRemoveAllItemInArray(arr: [], index: number) {
        let i = 0;
        while (i < arr.length) {
            if (arr[i] === index) {
                arr.splice(i, 1);
            } else {
                ++i;
            }
        }

        return arr;
    }
}

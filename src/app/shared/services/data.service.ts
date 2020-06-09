import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class DataService {
    constructor(private http: HttpClient) {
    }

    get<T>(url: string, params?: any): Promise<T> {
        let options = {};

        if (params)
            this.setParams(options, params.params);

        return new Promise<T>((resolve, reject) => {
            this.http.get<T>(url, options)
                .subscribe(response => {
                    resolve(response);
                }, error => {
                    reject(error)
                })
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    setParams(options: any, params: any) {
        let httpParams = new HttpParams();

        Object.keys(params.updates).forEach(x =>
            httpParams = httpParams.set(params.updates[x].param, params.updates[x].value));

        return options["params"] = httpParams;
    }

}
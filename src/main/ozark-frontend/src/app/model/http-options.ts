import {HttpHeaders} from '@angular/common/http';

export const HttpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'responseType': 'text',
        'observe': 'response'
    })
};
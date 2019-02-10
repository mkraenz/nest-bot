import { Observable } from 'rxjs';

export interface IPriceStreamProvider {
    getPrice$(): Observable<number>;
}

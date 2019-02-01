import { ICat } from './i-cat';

export class Cat implements ICat {
    constructor(public color: string, public fluffiness: number) {}
}

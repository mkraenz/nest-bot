"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let CatsService = class CatsService {
    constructor() {
        this.cats = [{ fluffiness: 23, color: 'grey' }];
    }
    create(cat) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cats.push(cat);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cats;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return id < this.cats.length ? this.cats[id] : null;
        });
    }
};
CatsService = __decorate([
    common_1.Injectable()
], CatsService);
exports.CatsService = CatsService;
//# sourceMappingURL=cats.service.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const cats_controller_1 = require("./cats.controller");
const cats_service_1 = require("./cats.service");
describe('CatsController', () => {
    let controller;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        const app = yield testing_1.Test.createTestingModule({
            controllers: [cats_controller_1.CatsController],
            providers: [cats_service_1.CatsService],
        }).compile();
        controller = app.get(cats_controller_1.CatsController);
    }));
    describe('cat', () => {
        it('should return "I love Cats!"', () => {
            expect(controller.findAll()).toBe('I love Cats!');
        });
    });
});
//# sourceMappingURL=cats.controller.spec.js.map
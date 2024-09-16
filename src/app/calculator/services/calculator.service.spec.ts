import { CalculatorService } from "./calculator.service";
import { type ComponentFixture, TestBed } from '@angular/core/testing';


describe('CalculatorService', () => {
    let service: CalculatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be created with default values', () => {
        expect(service.resultText()).toEqual('0');
        expect(service.subResultText()).toEqual('0');
        expect(service.lastOperator()).toEqual('+');
    });
});

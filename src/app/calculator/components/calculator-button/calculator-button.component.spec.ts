import { Component } from "@angular/core";
import { CalculatorButtonComponent } from "./calculator-button.component";
import { type ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
    standalone: true,
    imports: [
        CalculatorButtonComponent
    ],
    template: `
        <calculator-button>Teehee</calculator-button>
    `
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
    let fixture: ComponentFixture<CalculatorButtonComponent>;
    let component: CalculatorButtonComponent;
    let compiled: HTMLElement;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorButtonComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CalculatorButtonComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should apply w-1/4 if doubleSize is false', () => {
        const hostCssClasses: string[] = compiled.classList.value.split(' ');

        expect(hostCssClasses).toContain('w-1/4');
        expect(component.isDoubleSize()).toBeFalse();
    });

    it('should apply w-2/4 if doubleSize is true', () => {
        // Set the Input
        fixture.componentRef.setInput('isDoubleSize', true);
        // You have to wait for it to be applied
        fixture.detectChanges();

        const hostCssClasses: string[] = compiled.classList.value.split(' ');

        expect(hostCssClasses).toContain('w-2/4');
        expect(component.isDoubleSize()).toBeTrue();
    });

    it('should emit onClick when handleClick is called', () => {
        // Spies
        spyOn(component.onClick, 'emit');

        component.handleClick();

        expect(component.onClick.emit).toHaveBeenCalled();
        // Empty string is passed as value
        expect(component.onClick.emit).toHaveBeenCalledWith('');
    });

    it('should set isPressed to true and then false when handleKeyboardEvent is called', (done) => {
        component.contentValue()!.nativeElement.innerText = '1';
        component.handleKeyboardEvent('1');

        expect(component.isPressed()).toBeTrue();

        setTimeout(() => {
            expect(component.isPressed()).toBeFalse();
            // doneFn => passed to the callback
            done();
        }, 110);
    });

    it('should not set isPressed if key does not matches', () => {
        component.contentValue()!.nativeElement.innerText = '2';
        component.handleKeyboardEvent('3');

        expect(component.isPressed()).toBeFalse();
    });

    it('should display projected content', () => {
        const testHostFixture = TestBed.createComponent(TestHostComponent);

        const compiledHost = testHostFixture.nativeElement as HTMLDivElement;
        const projectedContent = compiledHost.querySelector('calculator-button');

        expect(projectedContent).not.toBeNull();
        expect((projectedContent?.firstChild as HTMLButtonElement).innerText).toContain('Teehee');
    });
});

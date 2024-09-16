import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
    selector: 'calculator',
    standalone: true,
    imports: [CalculatorButtonComponent],
    templateUrl: './calculator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(document:keyup)': 'handleKeyboardEvent($event)'
    }
})
export class CalculatorComponent {
    public calculatorButtons = viewChildren(CalculatorButtonComponent);
    private calculatorService = inject(CalculatorService);

    resultText = computed(() => this.calculatorService.resultText());
    subResultText = computed(() => this.calculatorService.subResultText());
    lastOperator = computed(() => this.calculatorService.lastOperator());

    handleClick(value: string) {
        this.calculatorService.constructNumber(value);
    }

    // @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        const keyEquivalents: Record<string, string> = {
            'Enter': '=',
            'Backspace': 'C',
            'Delete': 'C',
            '/': '÷',
            '*': 'x',
            'Escape': 'C',
            'Clear': 'C'
        };


        this.calculatorButtons().forEach(button => {
            button.handleKeyboardEvent(keyEquivalents[event.key] ?? event.key);
        });
    }
 }

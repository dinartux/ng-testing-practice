import { Injectable, signal } from '@angular/core';
const numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators: string[] = ['+', '-', '*', '/'];
const specialOperators: string[] = ['C', '%', '+/-', '=', '.', 'Backspace'];
@Injectable({
    providedIn: 'root',
})
export class CalculatorService {
    public resultText = signal<string>('0');
    public subResultText = signal<string>('0');
    public lastOperator = signal<string>('+');

    public constructNumber(value: string) {
        if (![...numbers, ...operators, ...specialOperators].includes(value)) {
            return;
        }

        if (value === '=') {
            this.calculateResult();
            return;
        }

        if (value === 'C') {
            this.resultText.set('0');
            this.subResultText.set('0');
            this.lastOperator.set('+');
            return;
        }

        if (value === 'Backspace') {
            if (this.resultText() === '0') return;
            if (this.resultText().length === 1) {
                this.resultText.set('0');
                return;
            }

            this.resultText.update((previousValue) =>
                previousValue.slice(0, -1)
            );
            return;
        }

        if (this.resultText().length >= 9) return;

        if (value === '.' && !this.resultText().includes('.')) {
            if (this.resultText() === '0' || this.resultText() === '') {
                this.resultText.set('0.');
                return;
            }

            this.resultText.update((previousValue) => previousValue + '.');
            return;
        }

        if (
            value === '0' &&
            (this.resultText() === '0' || this.resultText() === '-0')
        ) {
            return;
        }

        if (value === '+/-') {
            if (this.resultText().includes('-')) {
                this.resultText.update((previousValue) =>
                    previousValue.slice(1)
                );
                return;
            }

            this.resultText.set(`-${this.resultText()}`);
            return;
        }

        this.resultText.update((previousValue) => previousValue + value);
    }

    public calculateResult() {
        const number1 = parseFloat(this.subResultText());
        const number2 = parseFloat(this.resultText());

        let result = 0;

        switch (this.lastOperator()) {
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
            case '*':
                result = number1 * number2;
                break;
            case 'X':
                result = number1 * number2;
                break;
            case '/':
                result = number1 / number2;
                break;
            case '÷':
                result = number1 / number2;
                break;
        }

        this.resultText.set(result.toString());
        this.subResultText.set('0');
    }
}

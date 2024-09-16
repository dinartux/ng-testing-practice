import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, signal, output, viewChild } from '@angular/core';

@Component({
    selector: 'calculator-button',
    standalone: true,
    templateUrl: './calculator-button.component.html',
    styleUrl: './calculator-button.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'w-1/4 border-r border-b border-indigo-400',
        '[class.w-2/4]': 'isDoubleSize()',
        '[class.w-1/4]': '!isDoubleSize()',
    }
})
export class CalculatorButtonComponent {
    public onClick = output<string>();
    public isPressed = signal<boolean>(false);
    public contentValue = viewChild<ElementRef<HTMLButtonElement>>('btn');

    public isCommand = input(false, {
        transform: (value: boolean | string) => {
            return typeof value === 'string' ? value === '' : value;
        }
    });

    public isDoubleSize = input(false, {
        transform: (value: boolean | string) => {
            return typeof value === 'string' ? value === '' : value;
        }
    });

    // @HostBinding('class.w-2/4') get doubleSized() {
    //     return this.isDoubleSize();
    // }

    handleClick() {
        if (!this.contentValue()?.nativeElement) {
            return;
        }
        const value = this.contentValue()!.nativeElement.innerText;
        this.onClick.emit(value.trim());
    }

    handleKeyboardEvent(key: string) {
        if (!this.contentValue()) {
            return;
        }

        const value = this.contentValue()!.nativeElement.innerText;

        if (value !== key) {
            return;
        }

        this.isPressed.set(true);

        setTimeout(() => {
            this.isPressed.set(false);
        }, 100);
    }
}

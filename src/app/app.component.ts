import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import CalculatorViewComponent from "./calculator/views/calculator-view/calculator-view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalculatorViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zoneless-calculator';
}

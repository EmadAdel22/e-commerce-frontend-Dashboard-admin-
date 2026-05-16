import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Productscomponet } from '../components/productscomponet/productscomponet';

@Component({
  selector: 'app-root',
  imports: [Productscomponet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce-admin');
}

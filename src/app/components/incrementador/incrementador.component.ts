import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtPorcentaje', {static: false}) txtPorcentaje: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input('valor') progreso: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  cambiarValor( valor: number ) {

    if ( this.progreso >= 100 && valor > 0 ) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if ( this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit( this.progreso );
    this.txtPorcentaje.nativeElement.focus();
  }

  onChange( nuevoValor: number ) {
    if ( nuevoValor >= 100) {
      this.progreso = 100;
    } else if ( nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit( this.progreso );
  }

}

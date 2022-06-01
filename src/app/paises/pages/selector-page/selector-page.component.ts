import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required]
  })

  constructor(private fb: FormBuilder,
              private ps: PaisesService) { }

  ngOnInit(): void {
  }

  guardar() { 
    console.log('formulario guardado:');
    console.log(this.miFormulario.value);
  }
}

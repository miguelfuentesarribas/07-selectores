import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises-service.service';
import { Pais, PaisSmall } from '../../interfaces/paises.interfaces';
import { subscribeOn, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['',Validators.required],
    frontera: ['', Validators.required]
  })

  //llenar selectores
  regions: string[] = []; 
  paises: PaisSmall[] = [];
  // fronteras: string[] = [];
  fronteras: PaisSmall[] = [];

  // UI
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
              private ps: PaisesService) { }

  ngOnInit(): void {
    this.regions = this.ps.region;

    //cuando cambia la region
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap( region => this.ps.getPaisesPorRegion(region) )
      )
      . subscribe( paises => {
        this.paises = paises;
        this.cargando = false;
    })

    //cuando cambia la pais
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( ( _ ) => {  
          this.fronteras = []
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap( codigo => this.ps.getPaisPorCodigo(codigo)),
        switchMap( pais => (pais) ? this.ps.getPaisesPorCodigos( pais[0]?.borders!): this.ps.getPaisesPorCodigos([]))
      )
      .subscribe( ( paises ) => {
        this.fronteras = paises;
        console.log(this.fronteras);
        this.cargando = false;
      })

  }

  guardar() { 
    console.log('formulario guardado:');
    console.log(this.miFormulario.value);
  }
}

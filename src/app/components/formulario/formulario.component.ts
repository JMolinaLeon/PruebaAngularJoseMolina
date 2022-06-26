import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../Models/usuario';




@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ , [ Validators.required ]   ],
    identificacion: [ , [ Validators.required] ],
    fecha: [ , [ Validators.required] ],
    pasatiempo: [ , [ Validators.required] ],
  })
  
  public usuario: Usuario;

  constructor(private fb: FormBuilder) { 
    this.usuario = new Usuario();

  }

  ngOnInit(): void {
    this.usuario = {
      nombre: '',
      pasatiempo: '',
      edad: '',
      identificacion: '',
      fecha: ''
    }

  }

keyword = 'name';
data = [
    { id: 1, name: 'Jugar Futbol'},
    { id: 2, name: 'Jugar Basquetball'},
    { id: 3, name: 'Jugar Tenis'},
    { id: 4, name: 'Jugar Voleibol' },
    { id: 5,name: 'Jugar Fifa'},
    { id: 6, name: 'Jugar VideoJuegos'}
  ];


  selectEvent(item: any) {
    console.log("selectEvent", item)
    this.usuario.pasatiempo = item.name;
  }

  onChangeSearch(val: any) {
    console.log("onChangeSearch", val)
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  searchCleared(){
    this.usuario.pasatiempo = '';
  }
  
  onFocused(e: any){
    console.log("onFocused", e)
    // do something when input is focused
  }

  saveData(){
    console.log("datos del empleado", this.usuario);
    console.log(this.miFormulario);
  }

}



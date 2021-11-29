import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Pokemon } from 'src/app/models/pokemon.model.';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Subscription, timer } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pokemon-create',
  templateUrl: 'pokemon-create.component.html',
})

export class PokemonCreateComponent {
  //Ejemplo 1
  nameFormControl = new FormControl('', Validators.compose([Validators.required, 
    Validators.pattern(/[A-Z]/),
    Validators.max(4)])
    );

  typeFormControl = new FormControl('', 
    Validators.required);

  createForm = new FormGroup({
    name : new FormControl('',
    Validators.compose([Validators.required, 
      Validators.pattern(/[A-Z]/),
      Validators.maxLength(4)])),
    type : new FormControl('',
    Validators.required)      
  });

  isFormGroup : boolean = true; 
  pokemon: Pokemon = new Pokemon();
  template: string;
  submitted: boolean = false;

  tipos = [
    { value: 'GATO', viewValue: 'Gato' },
    { value: 'RATA', viewValue: 'Rata' },
    { value: 'CAMALEON', viewValue: 'Camaleon' },
    { value: 'LAGARTO', viewValue: 'Lagarto' },
    { value: 'PLANTA', viewValue: 'Planta' },
    { value: 'ROCA', viewValue: 'Roca' },
  ];
  subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<PokemonCreateComponent>,
    private pokemonService: PokemonService,
    @Inject(MAT_DIALOG_DATA) public modalTemplate: string) {
    this.template = modalTemplate;
  }

  ngOnInit(){
    this.subscription = this.createForm.valueChanges.subscribe(() => {
      console.log(this.createForm.get('name'));
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  createPokemon(): void {
    let formValid = this.isFormGroup ? this.createForm.valid 
      : this.nameFormControl.valid && this.typeFormControl.valid;

    this.submitted = true;
    if(formValid){
      this.pokemonService.addPokemon(this.pokemon).subscribe(value => {
        console.log('pokemon creado :' + value);
        this.pokemonService.emitCreateEvent();
        this.dialogRef.close();
      });
    }
  }

  getPokemonName(){
    console.log(this.pokemon.nombre);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
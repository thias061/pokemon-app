import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Pokemon } from 'src/app/models/pokemon.model.';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pokemon-view',
  templateUrl: 'pokemon-view.component.html',
})

export class PokemonViewComponent {

  pokemon: Pokemon;
  subscr: Subscription;

  constructor(
    public dialogRef: MatDialogRef<PokemonViewComponent>,
    private pokemonService: PokemonService,
    @Inject(MAT_DIALOG_DATA) public id: string) {
      
      this.subscr = this.pokemonService.findPokemonById(id).subscribe(value => {
        this.pokemon = value;
      })
  }

  ngOnDestroy(){
    this.subscr.unsubscribe();
  }

  close(): void {
    this.dialogRef.close();
  }
}
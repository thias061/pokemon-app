import { Component, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './models/pokemon.model.';
import { PokemonCreateComponent } from './modal/create/pokemon-create.component';
import { PokemonListComponent } from './list/pokemon-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(PokemonListComponent) listComponent : PokemonListComponent;

  title = 'Pokemon App';
  pokemons: Pokemon[] = [];

  constructor(public dialog: MatDialog, 
    private pokemonService: PokemonService) {
  }

  openModalCreate(): void {
    const dialogRef = this.dialog.open(PokemonCreateComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  buscarPokemons() : void{
  }
}

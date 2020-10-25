import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model.';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PokemonViewComponent } from '../modal/view/pokemon-view.component';

@Component({
  selector: 'pokemon-list',
  templateUrl: 'pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent {
  displayedColumns: string[] = ['position', 'name', 'type', 'view', 'delete'];
  pokemons: Pokemon[];
  
  constructor(public dialog: MatDialog,
    private pokemonService: PokemonService) {

  }

  viewPokemon(pokemon: Pokemon) : void{
    let id = pokemon.id;
    const dialogRef = this.dialog.open(PokemonViewComponent, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}
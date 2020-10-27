import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model.';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PokemonViewComponent } from '../modal/view/pokemon-view.component';
import { timer } from 'rxjs';

@Component({
  selector: 'pokemon-list',
  templateUrl: 'pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent {
  @Input() listPokemon;
  @Output() numberChangeCaller = new EventEmitter();

  displayedColumns: string[] = ['position', 'name', 'type', 'view', 'delete'];
  
  constructor(public dialog: MatDialog,
    private pokemonService: PokemonService) {

  }

  supprimirPokemon(pokemon: Pokemon): void {
    this.pokemonService.deletePokemon(pokemon.id).subscribe(
      () => {
        console.log("Pokemon eliminado");
        this.numberChangeCaller.emit();
      });
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

  buscarPokemons(): void {
    this.pokemonService.findAllPokemon().subscribe(res => {
      this.listPokemon = res;
    });
  }
}
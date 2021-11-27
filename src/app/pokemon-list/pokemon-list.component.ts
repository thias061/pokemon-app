import { Component, Inject, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model.';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { PokemonViewComponent } from '../pokemon-view/pokemon-view.component';

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

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }

  supprimirPokemon(pokemon: Pokemon): void {
    this.pokemonService.deletePokemon(pokemon.id).subscribe(
      () => {
        console.log("Pokemon éliminé");
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
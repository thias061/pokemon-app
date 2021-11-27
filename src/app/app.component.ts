import { Component, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './models/pokemon.model.';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(PokemonListComponent) listComponent : PokemonListComponent;

  title = 'Pokemon App';
  pokemons: Pokemon[] = [];
  subscr: Subscription;

  constructor(public dialog: MatDialog, 
    private pokemonService: PokemonService) {
      this.subscr = this.pokemonService.createCaller$.subscribe(() => {
        this.buscarPokemons();
      });
  }

  ngOnDestroy(){
    this.subscr.unsubscribe();
  }

  openModalCreate(): void {
    // const dialogRef = this.dialog.open(PokemonCreateComponent, {
    //   width: '250px',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }

  buscarPokemons() : void{
    this.pokemonService.findAllPokemon().subscribe(
      res => {
        this.pokemons = res;
      },
      err => {
        console.log("Error" + err);
      },
      () => {
        console.log("Finalizado");
      }
    );
  }

  changePokemonList() : void {
    this.buscarPokemons();
  }
}

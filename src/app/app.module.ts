import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { PokemonCreateComponent } from './modal/create/pokemon-create.component';
import { PokemonViewComponent } from './modal/view/pokemon-view.component';
import { PokemonListComponent } from './list/pokemon-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonCreateComponent,
    PokemonViewComponent,
    PokemonListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false }
    }],

  entryComponents: [
    PokemonCreateComponent,
    PokemonViewComponent,
    PokemonListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

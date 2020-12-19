import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {MatDividerModule} from '@angular/material/divider';
import { MessagesComponent } from './messages/messages.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskDialogComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    DragDropModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { Task, TaskDialogResultData } from '../models/task';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject([]);
  //subscribe to the changes on the collection:
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // initialize as injecting angularfire instance and matdialog
  constructor(
    private store: AngularFirestore,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    public auth: AuthService
  ) {}

  messages: string[] = [];
  //firestore db collections:
  todo = getObservable(this.store.collection('todo'));
  done = getObservable(this.store.collection('done'));

  //open dialog to add new task:

  addnewTask() {
    const dialog = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      disableClose: true,
      autoFocus: true,
      data: {
        task: {},
      },
    });
    dialog.afterClosed().subscribe((result: TaskDialogResultData) => {
      this.store.collection('todo').add(result.task);
      // this.msgService.add(`${result.task.title} item is added`)
    });
  }

  //event emmited when task is dropped in another container:
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) return;
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      return Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
    });
    //invokes when we move a task from one swimlane to another
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  //edit task in its collection, enable delete
  edit(list: 'todo' | 'done', task: Task) {
    const dialog = this.dialog.open(TaskDialogComponent, {
      width: '370px',
      panelClass: 'dark-dialog',
      disableClose: true,
      data: {
        task,
        enableDelete: true,
      },
    });
    dialog.afterClosed().subscribe((result: TaskDialogResultData) => {
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
        this.snack.open(`${task.title} task is deleted`, '', {
          duration: 2000,
        });
      } else {
        this.store.collection(list).doc(task.id).update(task);
        this.snack.open(`${task.title} task is updated`, '', {
          duration: 2000,
        });
      }
    });
  }

  //if it is checked moved to the completed container:
  toggleStatus(list: 'todo' | 'done', task: Task): void {
    if (task.done) {
      this.store.collection(list).doc(task.id).delete();
      this.store
        .collection('done')
        .doc(task.id)
        .get()
        .subscribe((docSnapshot) => {
          if (!docSnapshot.exists) {
            this.store.collection('done').add(task);
            this.snack.open(`${task.title} task is done`, '', {
              duration: 2000,
              panelClass: 'msg-success',
            });
          }
        });
    }
  }
  title = 'drag-drop-todo';
}

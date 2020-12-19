import { Component, Inject, OnInit } from '@angular/core';
import{MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {Task, TaskDialogData,TaskDialogResultData} from '../../models/task'
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  private backUpTask:Partial<Task> ={...this.dialogData.task}

  constructor(public dialogRef:MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData:TaskDialogData) { }

    cancel():void{
      this.dialogData.task.title=this.backUpTask.title;
      this.dialogData.task.description=this.backUpTask.description;
      this.dialogRef.close(this.dialogData);
    }

  ngOnInit(): void {
  }

}

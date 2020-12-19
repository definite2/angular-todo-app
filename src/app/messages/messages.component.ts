import { Component, OnInit } from '@angular/core';
import{MessagesService} from '../services/messages.service';
import{MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages:string[]=[];
  constructor(public msgService:MessagesService,public snack:MatSnackBar) { }

  ngOnInit(): void {
  }
  

}

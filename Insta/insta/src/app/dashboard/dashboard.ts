import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Stories } from './stories/stories';
import { Post } from './post/post';
import { Suggestions } from './suggestions/suggestions';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [RouterOutlet,Suggestions],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}

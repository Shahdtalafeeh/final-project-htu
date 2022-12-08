import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/core/interfaces/service.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
services:Service[]=[
  {title:'Autocomplete',
  imgUrl:'https://v12.material.angular.io/assets/screenshots/autocomplete.scene.png',
  description:'Suggests relevant options as the user types.',
  },
  {title:'Badge',
  imgUrl:'https://v12.material.angular.io/assets/screenshots/badge.scene.png',
  description:'A small value indicator that can be overlaid on another object.',
  },
  {title:'Button',
  imgUrl:'https://v12.material.angular.io/assets/screenshots/button.scene.png',
  description:'An interactive button with a range of presentation options.',
  },
]
  constructor() { }

  ngOnInit(): void {
  }

}

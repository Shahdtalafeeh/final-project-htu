import { Component, OnInit } from '@angular/core';
import { NavMenuDto } from 'src/app/core/dto/nav-menu';
import { NavService } from 'src/app/core/services/nav/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ToolBarList: NavMenuDto= new NavMenuDto('',[])

  constructor(private _navService: NavService) { }

  ngOnInit(): void {
    this.ToolBarList = this._navService.getToolBarMenu()

  }


}

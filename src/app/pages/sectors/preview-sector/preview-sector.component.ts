import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';

@Component({
  selector: 'app-preview-sector',
  templateUrl: './preview-sector.component.html',
  styleUrls: ['./preview-sector.component.css'],
})
export class PreviewSectorComponent implements OnInit, OnDestroy {
  id: string = '';
  sectors: string = '';
  sectorLogo: string = '';
  designColor: string = '';
  parentCategoryName: string = '';

  sub!: Subscription;
  sub1!: Subscription;

  constructor(
    private _sectorsService: SectorsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.queryParams.subscribe((result) => {
      if (result['id']) {
        this.id = result['id'];
      }
    });

    this.getStartupsById();
  }
  getStartupsById() {
    this.sub1 = this._sectorsService
      .getById(this.id)
      .subscribe((result: any) => {
        this.sectors = result['sectors'];
        this.sectorLogo = result['sectorLogo'];
        this.designColor = result['designColor'];
        this.parentCategoryName = result['parentCategoryName'];
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }
}

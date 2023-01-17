import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StartupsService } from 'src/app/core/services/startups/startups.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit, OnDestroy {
  id: string = '';
  startupName: string = '';
  logoImage: string = '';
  city: string = '';
  sectors: string = '';
  founderName: string = '';
  numberOfEmployees: number = 0;
  yearOfEstablishment: number = 0;
  websiteUrl: string = '';
  emailAddress: string = '';

  sub: any;
  sub1: any;
loading = true
  constructor(
    private _startupsService: StartupsService,
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
    this.sub1 = this._startupsService
      .getById(this.id)
      .subscribe((result: any) => {
        this.startupName = result['startupName'];
        this.logoImage = result['logoImage'];
        this.city = result['city'];
        this.emailAddress = result['emailAddress'];
        this.founderName = result['founderName'];
        this.numberOfEmployees = result['numberOfEmployees'];
        this.sectors = result['sectors'];
        this.websiteUrl = result['websiteUrl'];
        this.yearOfEstablishment = result['yearOfEstablishment'];
        this.loading = false
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }
}

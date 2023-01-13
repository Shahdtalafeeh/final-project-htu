import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StartupsService } from 'src/app/core/services/startups/startups.service';

@Component({
  selector: 'app-preview-allstartups',
  templateUrl: './preview-allstartups.component.html',
  styleUrls: ['./preview-allstartups.component.css'],
})
export class PreviewAllstartupsComponent implements OnInit, OnDestroy {
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

  sub!: Subscription;
  sub1!: Subscription;

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
        this.yearOfEstablishment= result['yearOfEstablishment']
      });
  }
  ngOnDestroy() {
    if(this.sub && this.sub1){
      this.sub.unsubscribe();
      this.sub1.unsubscribe();

    }
  }
}

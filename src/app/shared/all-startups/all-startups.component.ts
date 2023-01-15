import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Sectors } from 'src/app/core/interfaces/sectors.imterface';
import { Preview } from 'src/app/core/interfaces/preview.interface';
import { PreviewService } from 'src/app/core/services/preview/preview.service';
import { SectorsService } from 'src/app/core/services/sectors/sectors.service';
import { StartupsService } from 'src/app/core/services/startups/startups.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-all-startups',
  templateUrl: './all-startups.component.html',
  styleUrls: ['./all-startups.component.css'],
})
export class AllStartupsComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  sub1!: Subscription;
  sectors: Sectors[] = [];
  startups: Preview[] = [];
  loading = true
  constructor(
    private _startupservice: StartupsService,
    private route: Router,
    private _sectorservice: SectorsService
  ) {}

  ngOnInit(): void {
    this.getAllstart();
    this.getAllsectors();
  }

  getAllstart() {
    this.sub = this._startupservice.getAll().subscribe((result) => {
      this.startups = result;
      this.loading = false
    });
  }
  onCardClicked(id: string) {
    this.route.navigate(['/all-startups/preview-all'], {
      queryParams: {
        id: id,
      },
    });
  }
  getAllsectors() {
    this.sub1 = this._sectorservice.getAll().subscribe((result) => {
      this.sectors = result;
      this.loading = false

    });
  }
  ngOnDestroy() {
    if (this.sub && this.sub1) {
      this.sub.unsubscribe();
      this.sub1.unsubscribe();
    }
  }
}

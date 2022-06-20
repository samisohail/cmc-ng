import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/services/order-service';
import { Router, ActivatedRoute } from '@angular/router';
import { pluck, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit, OnDestroy {

  private componentActive = true;
  orderId: string = '';

  constructor(public orderServie: OrderService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(
      pluck('id'),
      takeWhile(() => this.componentActive)
    ).subscribe(id => this.orderId = id);
  }

  onHome() {
    this.router.navigate(['/products']);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}

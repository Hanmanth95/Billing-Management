import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.css"],
})
export class SalesComponent implements OnInit {
  @Input() todaySales;
  @Input() monthSales;
  @Input() yearSales;
  constructor() {}

  ngOnInit() {}
}

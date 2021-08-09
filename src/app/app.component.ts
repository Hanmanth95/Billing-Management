import { Component } from "@angular/core";
import { BillService } from "./bill.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "billing-management";
  itemList = [];
  billsList = [];
  listenData: any;
  todaySales: Number = 0;
  monthSales: Number = 0;
  yearSales: Number = 0;
  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.getItemsData();
    this.getMyBills();
    this.getTodaySales();
    this.getMonthSales();
    this.getYearSales();

    this.listenData = this.billService.emitData.subscribe((res) => {
      this.getItemsData();
      this.getMyBills();
      this.getTodaySales();
      this.getMonthSales();
      this.getYearSales();
    });
  }

  getItemsData() {
    this.billService.getItems().subscribe((res: any) => {
      console.log("getItems response");
      console.log(res);
      if (res && res.length > 0) {
        this.itemList = res;
      }
    });
  }

  getMyBills() {
    this.billService.getBills().subscribe((res: any) => {
      console.log("getBills response");
      console.log(res);
      if (res && res.length > 0) {
        this.billsList = res;
      }
    });
  }

  getTodaySales() {
    this.billService.getTodaySales().subscribe((res: any) => {
      console.log("getTodaySales response");
      console.log(res);
      if (res && res.length > 0) {
        this.todaySales = res[0].todaySales;
      }
    });
  }

  getMonthSales() {
    this.billService.getMonthSales().subscribe((res: any) => {
      console.log("getMonthSales response");
      console.log(res);
      if (res && res.length > 0) {
        this.monthSales = res[0].monthSales;
      }
    });
  }

  getYearSales() {
    this.billService.getYearSales().subscribe((res: any) => {
      console.log("getYearSales response");
      console.log(res);
      if (res && res.length > 0) {
        this.yearSales = res[0].yearSales;
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.listenData.unsubscribe();
  }
}

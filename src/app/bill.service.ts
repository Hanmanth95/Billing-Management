import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
const ITEM_URL = "/items";
const BILL_URL = "/bills";
@Injectable({
  providedIn: "root",
})
export class BillService {
  constructor(private http: HttpClient) {}

  emitData = new Subject();

  saveItem(item) {
    return this.http.post(ITEM_URL + "/save/item", item);
  }
  getItems() {
    return this.http.get(ITEM_URL + "/get/items");
  }
  createBill(bill) {
    return this.http.post(BILL_URL + "/create/bill", bill);
  }
  getBills() {
    return this.http.get(BILL_URL + "/get/bills");
  }
  getTodaySales() {
    return this.http.get(BILL_URL + "/get/today/sales");
  }
  getMonthSales() {
    return this.http.get(BILL_URL + "/get/month/sales");
  }
  getYearSales() {
    return this.http.get(BILL_URL + "/get/year/sales");
  }
}

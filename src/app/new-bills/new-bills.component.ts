import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BillService } from "../bill.service";

@Component({
  selector: "app-new-bills",
  templateUrl: "./new-bills.component.html",
  styleUrls: ["./new-bills.component.css"],
})
export class NewBillsComponent implements OnInit {
  @Input() itemList = [];
  cartCount: any = 0;
  totalCartPrice: any = 0;
  itemAddedToCart = [];
  quantity: Number;
  totalItems: any = 0;

  constructor(
    private modalService: NgbModal,
    private billService: BillService
  ) {}

  ngOnInit() {}

  addItem(form: NgForm) {
    console.log(form.value);
    console.log(this.quantity);
    this.totalItems = 0;
    this.totalCartPrice = 0;
    if (this.itemAddedToCart.length > 0) {
      for (var k = 0; k < this.itemAddedToCart.length; k++) {
        if (this.itemAddedToCart[k].itemName == form.value.itemName) {
          this.itemAddedToCart[k].quantity = form.value.quantity;
        }
      }
      let isExits = this.itemAddedToCart.some(function (data) {
        return data.itemName == form.value.itemName;
      });
      console.log("isExits");
      console.log(isExits);
      if (!isExits) {
        this.itemAddedToCart.push(form.value);
        this.cartCount++;
      }
    } else {
      this.itemAddedToCart.push(form.value);
      this.cartCount++;
    }

    for (var i = 0; i < this.itemAddedToCart.length; i++) {
      for (var j = 0; j < this.itemList.length; j++) {
        if (this.itemAddedToCart[i].itemName == this.itemList[j].itemName) {
          this.totalCartPrice =
            this.totalCartPrice +
            this.itemAddedToCart[i].quantity * this.itemList[j].price;
          this.itemAddedToCart[i].price = this.itemList[j].price;
          this.totalItems += this.itemAddedToCart[i].quantity;
          break;
        }
      }
    }
    console.log(this.totalCartPrice);
    form.reset();
    this.modalService.dismissAll();
  }

  openItems(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  clearFields() {
    this.quantity = null;
  }

  buyNow() {
    console.log("biynow called");
    console.log(this.itemAddedToCart);
    if (this.itemAddedToCart.length > 0) {
      this.billService
        .createBill(this.itemAddedToCart)
        .subscribe((res: any) => {
          console.log("createBill response");
          console.log(res);
          if (res && res.status == "FAILED") {
            console.log("Buy Failed");
          } else {
            this.itemAddedToCart = [];
            this.cartCount = 0;
            this.totalItems = 0;
            this.totalCartPrice = 0;
            this.billService.emitData.next();
          }
        });
    } else {
      console.log("add to inventory");
    }
  }
}

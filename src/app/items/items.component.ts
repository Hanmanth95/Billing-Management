import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BillService } from "../bill.service";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"],
})
export class ItemsComponent implements OnInit {
  itemName: String;
  itemPrice: Number;
  itemExists: boolean;
  saveFailed: boolean;
  saveSuccess: boolean;

  @Input() itemList = [];
  constructor(
    private modalService: NgbModal,
    private billService: BillService
  ) {}

  ngOnInit() {}

  openAddItem(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  clearFields() {
    this.itemName = "";
    this.itemPrice = null;
    this.saveFailed = false;
    this.itemExists = false;
  }

  addItem(form: NgForm) {
    console.log("addItem called");
    console.log(form.value);
    this.saveFailed = false;
    this.itemExists = false;

    this.billService.saveItem(form.value).subscribe((res: any) => {
      console.log("saveItem response");
      console.log(res);
      if (res.status && res.status == "FAILED") {
        this.saveFailed = true;
      } else if (res.status && res.status == "Item Already Exists") {
        this.itemExists = true;
      } else {
        console.log("save success");
        this.itemList.push(res);
        console.log("itemList");
        console.log(this.itemList);
        form.reset();
        this.modalService.dismissAll();
      }
    });
  }
}

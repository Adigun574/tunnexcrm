import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
// import { LoaderService } from "../services/loader.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"]
})
export class LoaderComponent implements OnInit {
  loading: boolean;
  loadingSubscription: Subscription;

  constructor(
    // private loaderService: LoaderService
  ) {
    // this.loaderService.loading.subscribe(value => {
    //   this.loading = value;
    // });
  }

  ngOnInit() {}
}

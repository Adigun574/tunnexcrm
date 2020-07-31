import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  products:any[]
  loading = false
  filterVal = ''

  constructor() { }

  ngOnInit(): void {
    this.getStock()
  }

  getStock(){
    this.products = [
      {
        productName:'product1',
        stockCount:10,
        sellPrice:1000
      },
      {
        productName:'product2',
        stockCount:15,
        sellPrice:2000
      },
      {
        productName:'product3',
        stockCount:20,
        sellPrice:3000
      },
      {
        productName:'product4',
        stockCount:0,
        sellPrice:4000
      }
    ]
  }

  searchTable(){
    
  }

}

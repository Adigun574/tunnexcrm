import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { User } from '../../../models/user';
import { SupplierService } from '../../../services/supplier.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  addSupplierForm:FormGroup
  currentUser:User
  suppliers:any[] = []
  loading:boolean = false
  selectedSupplier:any
  searchKey
  saving:boolean = false
  displayedSuppliers:any[] = []

  constructor(
    private fb:FormBuilder,
    private supplierService:SupplierService,
    private modalService:NgbModal
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
    this.addSupplierForm = this.fb.group({
      name:['',Validators.required],
      address:[''],
      phone:[''],
      email:[''],
      userCreated: [this.currentUser.userCreated],
      userModified: [this.currentUser.userModified]
    })
  }

  ngOnInit(): void {
    this.getAllSuppliers()
  }

  open(content){
    this.modalService.open(content,{centered:true})
  }

  saveSupplier(){
    if(this.addSupplierForm.invalid){
      return
    }
    else{
      this.saving = true
      this.supplierService.saveSupplier(this.addSupplierForm.value).subscribe(data=>{
        this.getAllSuppliers()
        this.modalService.dismissAll()
        this.saving = false
      },
        err=>{
          console.log(err)
          this.modalService.dismissAll()
          this.saving = false
        })
    }
  }

  getAllSuppliers(){
    this.loading = true
    this.supplierService.getAllSuppliers().subscribe(data=>{
      this.suppliers = <any[]>data
      this.displayedSuppliers = [...this.suppliers]
      this.loading = false
    },
      err=>{
        this.loading = false
      })
  }

  deleteSupplier(supplierId){
    this.supplierService.deleteSupplier(supplierId).subscribe(data=>{
      this.getAllSuppliers()
    })
  }

  editSupplier(){
    this.saving = true
    this.supplierService.updateSupplier(this.selectedSupplier).subscribe(data=>{
      this.getAllSuppliers()
      this.modalService.dismissAll()
      this.saving = false
    },
      err=>{
        this.modalService.dismissAll()
        this.saving = false
      }
    )
  }

  chooseSupplierToEdit(supplier){
    this.selectedSupplier = supplier
  }

  filterSuppliers(){
    if(this.searchKey == '' || !this.searchKey){
      this.displayedSuppliers = this.suppliers
    }
    else{
      this.displayedSuppliers = this.suppliers.filter(x=>x.name.toLowerCase().includes(this.searchKey.toLowerCase()))
    }
  }

}

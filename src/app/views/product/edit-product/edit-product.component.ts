import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router' ;
import { ProductService } from '../../../services/product.service' ;
import { Product } from '../../../models/product';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId:number
  product:Product
  // product
  updating:boolean = false
  loadingProduct = true
  deleting:boolean = false
  item={
    image : null,
    imageUrl: null
  }
  image
  currentUser:User

  constructor(
    private route:ActivatedRoute,
    private productService:ProductService,
    private router:Router,
    private http: HttpClient
  ) { 
    this.productId = +this.route.snapshot.params.id
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    this.productService.getProductById(this.productId).subscribe(data=>{
      this.product = <Product>data
      this.loadingProduct = false
      // console.log(this.product)
    },
      err=>{
        this.loadingProduct = false
      })
  }

  updateProduct(){
    this.updating = true
    this.product.quantity = +this.product.quantity
    this.product.salePrice = +this.product.salePrice
    this.product.costPrice = +this.product.costPrice
    this.product.UserModified = this.currentUser.id
    // console.log(this.product)
    this.productService.updateProduct(this.product).subscribe(data=>{
      this.updating = false
      this.router.navigateByUrl('main/products')
    },
      err=>{
        this.updating = false
      })
  }

  selectImage(e){
    const file = e.target.files[0]
    this.image = file
    this.item.imageUrl = URL.createObjectURL(file)
    // this.uploadPicture()
  }

  uploadPicture(){
    this.updating = true
    if(this.image){
      // const CLOUDINARY_URL="https://api.cloudinary.com/v1_1/dk0ydrw94/upload"
      // const CLOUDINARY_UPLOAD_PRESET="ym00sgsu"
      const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dsfkplrl3/upload"
      const CLOUDINARY_UPLOAD_PRESET="shdexw2p"
      let formData = new FormData()
      formData.append('file',this.image)
      formData.append('upload_preset',CLOUDINARY_UPLOAD_PRESET)
      this.http.post(CLOUDINARY_URL,formData).subscribe(data=>{
        let res = <any>data
        // console.log(res.secure_url)
        this.product.image = res.secure_url
        this.updateProduct()
      },
        err=>{
          // console.log(err)
          this.product.image = "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
          this.updateProduct()
        })
    }   
    else{
      this.updateProduct()
    } 
  }

  deleteProduct(id){
    this.deleting = true
    this.productService.deleteProduct(id).subscribe(data=>{
      console.log(data)
      this.deleting = false
      this.router.navigateByUrl('main/products')
    },
      err=>{
        console.log(err)
        this.deleting = false
      })
  }

}

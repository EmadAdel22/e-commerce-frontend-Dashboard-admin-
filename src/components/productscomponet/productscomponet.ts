import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormBuilder  } from '@angular/forms';
import { Validators } from '@angular/forms';  
import { Products } from '../../services/products';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-productscomponet',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productscomponet.html',
  styleUrl: './productscomponet.css',
})
export class Productscomponet {

  products:any[]=[];

  showaddproductform:boolean=false;
  selectedImage!: File;
  addform : FormGroup;

 



  constructor(private fb:FormBuilder , private _producservice:Products) { 
    this.addform=this.fb.group({
      name:['', [Validators.required]],
      description:['', [Validators.required]],
      price:['', [Validators.required]],
      imageUrl:[null],
      categoryId:['', [Validators.required]]
    })
  }    

  onFileSelected(event: any) {
  this.selectedImage = event.target.files[0];
}

  getallproducts(){
    this._producservice.getProducts().subscribe({
      next:(res:any)=>{
        this.products=res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
 addproduct() {

  if (this.addform.invalid) return;

  this._producservice.uploadImage(this.selectedImage).subscribe({

    next: (imgUrl: any) => {

      const productData = {
        ...this.addform.value,
        imageUrl: imgUrl
      };

      const Newname = this.addform.value.name.trim().toLowerCase();

      const ExsistName = this.products.some(
        p => p.name.trim().toLowerCase() === Newname
      );

      if (ExsistName) {
        alert('product name already exists');
        return;
      }

      this._producservice.addproduct(productData).subscribe({

        next: () => {

          alert('product added successfully');

          this.addform.reset();

          this.showaddproductform = false;

          this.getallproducts();

        },

        error: (err) => {
          console.log(err);
        }

      });

    },

    error: (err) => {
      console.log(err);
    }

  });

}

    

  }



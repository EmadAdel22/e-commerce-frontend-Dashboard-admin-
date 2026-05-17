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

  getproducts:any[]=[];

  showaddproductform:boolean=false;
  showupdateproductform:boolean=false;
  showdeleteproductform:boolean=false;
  selectedImage!: File;
  
  addform : FormGroup;
  deleteform : FormGroup;

 



  constructor(private fb:FormBuilder , private _producservice:Products) { 
    this.addform=this.fb.group({
      name:['', [Validators.required]],
      description:['', [Validators.required]],
      price:['', [Validators.required]],
      imageUrl:[null],
      categoryId:['', [Validators.required]]
    })
    this.deleteform=this.fb.group({
      name:['', [Validators.required]]
    })
  }    

  onFileSelected(event: any) {
  this.selectedImage = event.target.files[0];
}

  getallproducts(){
    this._producservice.getProducts().subscribe({
      next:(res:any)=>{
        this.getproducts=res;
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


      this._producservice.addproduct(productData).subscribe({

        next: () => {

          alert('product added successfully');

          this.addform.reset();

          this.showaddproductform = false;

          this.getallproducts();

        },

        error: (err) => {
           alert(err.error);
        }

      });

    },

    error: (err) => {
       alert("image upload failed");
    }

  });

}



deletproduct() {

  const deleteproductname =
    this.deleteform.value.name?.trim();

  if (!deleteproductname) {
    return;
  }

  this._producservice.deleteproduct(deleteproductname).subscribe({

    next: () => {

      this.getproducts = this.getproducts.filter(
        p => p.name !== deleteproductname
      );

      this.deleteform.reset();

      alert('product deleted successfully');
      this.deleteform.reset();
    },

    error: (err) => {

      if (err.status === 404) {
        alert('product not found');
      }

      console.log(err);
    }

  });

}

    

  }


 


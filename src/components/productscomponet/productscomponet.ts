import { Component, OnInit } from '@angular/core';
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
   categories:any[]=[];
   selectedProductId!: number;

  showaddproductform:boolean=false;
  showupdateproductform:boolean=false;
  showdeleteproductform:boolean=false;
  showaddcategoryform:boolean=false;
  showupdatecategoryform:boolean=false;
  showdeletecategoryform:boolean=false;  

  selectedImage!: File;
currentImageUrl:string = '';
  addform : FormGroup;
  deleteform : FormGroup;
  updateform : FormGroup;
  searchForm : FormGroup;





  constructor(private fb:FormBuilder , private _producservice:Products ) {
    this.addform=this.fb.group({
      name:['', [Validators.required]],
      description:['', [Validators.required]],
      price:['', [Validators.required]],
      imageUrl:[null],
      categoryId:['', [Validators.required]]
    })
    this.searchForm = this.fb.group({
  searchName: ['']
});




    this.updateform=this.fb.group({
      
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

  ngOnInit(){
  this.getallproducts();
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

          // this.getallproducts();

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

searchProduct(){

const searchname = this.searchForm.value.searchName.trim().toLowerCase();
const product = this.getproducts.find(p => p.name.trim().toLowerCase() === searchname);

if(!product){
  alert('product not found');
  console.log(this.getproducts);
console.log(searchname);
  return; }
this.selectedProductId = product.id;

  this.updateform.patchValue({
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId,
    
  });
this.currentImageUrl = product.imageUrl;
}



updateproduct(){

  if (this.updateform.invalid) return;

    // this._producservice.uploadImage(this.selectedImage).subscribe({

    // next: (imgUrl: any) => {

    //   const productData = {
    //     ...this.addform.value,
    //     imageUrl: imgUrl
    //   };
  const formValue = this.updateform.value;

    const data = {
    ...formValue,
    categoryId: Number(formValue.categoryId)
  };

  if (!data.categoryId) {
    alert('category is required');
    return;
  }

this._producservice.updateproduct(this.selectedProductId, data).subscribe({

  next: () => {

    alert('product updated successfully');

    this.updateform.reset();

    this.showupdateproductform = false;

   

  },

  error: (err) => {
    //  alert(err.error);

  console.log(err);
  console.log(err.error);
  }   });
// },

//    error: (err) => {
//        alert("image upload failed");
//     }

//   });
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


//  // categories

// get categories
getcategories() {
  this._producservice.getcategories().subscribe({
    next: (res: any) => {
      this.categories = res;
    },
    error: (err) => {
      console.log(err);
    }
  });
}


// addcategory(category: string) 
addedcategory(category: string) {
  console.log(category);

  const categoryname = category.trim();

  if (!categoryname) {
    alert('category name is required');
    return;
  }


  this._producservice.addcategory(categoryname).subscribe({

    next: (res: any) => {

      console.log(res);

      alert('category added successfully');

      this.showaddcategoryform = false;

    },

    error: (err) => {
      //console.log(err);
       alert(err.error);
    }

  });

  

}

// delete category 

deletCategory(deletdCategory : string){

  const catName = deletdCategory.trim()

  if(!catName){
    alert("category name requierd");
    return;
  }

  this._producservice.deletecategory(catName).subscribe({
    next :() =>{

      this.categories = this.categories.filter(p => p.name !==catName )

            alert('category deleted successfully');

    
    },error: (err) => {

      if (err.status === 404) {
        alert('product not found');
      }

      console.log(err);
    }

  });


}






}







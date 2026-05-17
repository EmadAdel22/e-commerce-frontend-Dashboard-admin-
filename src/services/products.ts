import {inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductData } from '../models/productData';
@Injectable({
  providedIn: 'root',
})
export class Products {

  private http = inject(HttpClient)

  private apurlproducts ='https://localhost:7118/api/productes';
  private apurlcategories ='https://localhost:7118/api/categories';

  addproduct(product: ProductData) {
    return this.http.post<ProductData>(`${this.apurlproducts}/product`, product);
  }
  updateproduct(id: number, product: ProductData) {
    return this.http.put<ProductData>(`${this.apurlproducts}/${id}`, product);
  }
  deleteproduct(name: string) {
    return this.http.delete(`${this.apurlproducts}/deleteproduct/${name}`);
  }
  
   getProducts() {
    return this.http.get(`${this.apurlproducts}/AllProducts`);
  }
 

  uploadImage(image:File){

      const formData = new FormData();
      formData.append('image',image);
      return this.http.post(`${this.apurlproducts}/upload`,formData,{ responseType: 'text' });
  
  }


  // categoreis

  getcategories() {
    return this.http.get<string[]>(this.apurlcategories);
  }

  updatecategories(id :number,categories: string) {
    return this.http.put(`${this.apurlcategories}/${id}`, categories);
  }

  addcategory(category:any) {
    return this.http.post(this.apurlcategories, { name: category });
  }

  deletecategory(id: number) {
    return this.http.delete(`${this.apurlcategories}/${id}`);
  }

  

}

import { CategoriesService } from "./../categories.service";
import { finalize } from "rxjs/operators";

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.css"],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;

  placeholder: string = "assets/Placeholder.jpg";
  selectedImg: any = null;
  isSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private CategoriesService: CategoriesService
  ) {}

  onSubmit(myForm) {
    this.isSubmitted = true;

    if (this.addCategoryForm.valid) {
      let filePath = `categories/${new Date().getTime()}_${
        this.selectedImg.name
      }`;

      let fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImg)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              myForm["imageUrl"] = url;
              debugger;

              this.CategoriesService.insertCategory(myForm);

              this.resetForm();
            });
          })
        )
        .subscribe();
    }
  }

  preview(event) {
    console.log("event", event);
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => (this.placeholder = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
    } else {
      (this.placeholder = "assets/Placeholder.jpg"), (this.selectedImg = null);
    }
  }

  resetForm() {
    this.addCategoryForm.controls["categoryName"].reset();
    this.addCategoryForm.reset;
    this.isSubmitted = false;

    // this.addCategoryForm.setValue({
    //   categoryName: "",
    //   imageUrl: "",
    // });

    // this.addCategoryForm.controls["imageUrl"].setValue("");
    // this.addCategoryForm.controls["categoryName"].reset();
    // this.addCategoryForm.get("imageUrl").patchValue({
    //   value: "",
    // });

    this.placeholder = "assets/Placeholder.jpg";
    this.selectedImg = null;
  }

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      categoryName: ["", [Validators.required]],
      imageUrl: ["", [Validators.required]],
    });
    this.resetForm();
  }
}

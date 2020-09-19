import { CategoriesService } from "./../categories.service";
import { finalize } from "rxjs/operators";

import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { ActivatedRoute, Params, Router } from "@angular/router";
@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.css"],
})
export class AddCategoryComponent implements OnInit, AfterViewInit {
  addCategoryForm: FormGroup;

  placeholder: string = "assets/Placeholder.jpg";
  selectedImg: any = null;
  isSubmitted: boolean = false;

  currrentCategoryId: string = "";
  @ViewChild("categoryImg") categoryImg;
  // fileNgModel = "";
  // categoryImg

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private CategoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) {}

  onSubmit(myForm) {
    this.isSubmitted = true;

    if (this.addCategoryForm.valid) {
      let imageName = `${new Date().getTime()}_${this.selectedImg.name}`;
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
              //
              console.log("imageName", imageName);
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

  getCategoryToEdit() {
    this.currrentCategoryId = this.activatedRoute.snapshot.params["id"];
    // this.changeCategoryFormDataById();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.currrentCategoryId = params["id"];
      if (this.currrentCategoryId) {
        this.changeCategoryFormDataById();
      }
    });

    console.log("currrentCategoryId", this.currrentCategoryId);
  }

  changeCategoryFormDataById() {
    this.CategoriesService.getSelectedCategory(this.currrentCategoryId)
      .valueChanges()
      .subscribe((res) => {
        console.log("res====", res);

        this.placeholder = res["imageUrl"];
        this.addCategoryForm.controls.categoryName.setValue(
          res["categoryName"]
        );
        // this.fileNgModel = res["imageUrl"];
        // this.addCategoryForm.controls.imageUrl.patchValue(+res["imageUrl"]);
        // debugger;
      });
  }

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      categoryName: ["", [Validators.required]],
      imageUrl: ["", [Validators.required]],
    });
    this.resetForm();

    this.getCategoryToEdit();

    // this.CategoriesService.getCategoriesByName("ddd").subscribe((res) => {
    //   console.log("res at categories================", res);
    // });
    // debugger;
    this.CategoriesService.getCategoriesByName("ddd");
  }

  ngAfterViewInit(): void {
    // console.log("categoryImg----------------", this.categoryImg);
  }
}

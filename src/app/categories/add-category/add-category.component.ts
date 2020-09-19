import { category } from "src/app/shared/models/category.model";
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
  formType = "add";
  currentCategoryToEdit;

  // fileNgModel = "";
  // categoryImg

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private CategoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) {}

  uploadForm(myForm) {
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

              if (this.formType == "add") {
                this.CategoriesService.insertCategory(myForm);
              } else if (this.formType == "edit") {
                this.CategoriesService.updateCategory(
                  this.currrentCategoryId,
                  this.addCategoryForm.value
                );
              }

              this.resetForm();
            });
          })
        )
        .subscribe();
    }
  }
  // submit function (add or edit)
  onSubmit(myForm) {
    this.isSubmitted = true;
    // add form
    if (this.formType == "add") {
      debugger;
      this.uploadForm(myForm);
    }

    // edit form
    else if (this.formType == "edit") {
      debugger;
      if (this.addCategoryForm.controls["imageUrl"].value == "") {
        let imageUrl = this.currentCategoryToEdit.imageUrl;
        // this.addCategoryForm.controls["imageUrl"].value(
        //   this.currentCategoryToEdit.imageUrl
        // );

        debugger;
        this.CategoriesService.updateCategory(this.currrentCategoryId, {
          categoryName: this.addCategoryForm.controls["categoryName"].value,
          imageUrl: imageUrl,
        });
      } else {
        this.uploadForm(myForm);
      }
      // myForm["imageUrl"] = url;
      // this.CategoriesService.updateCategory(
      //   this.currrentCategoryId,
      //   this.addCategoryForm
      // );
      // console.log("-----------------------edit");
      this.isSubmitted = false;
    }
  }

  // preview image on chang file input
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

  // reset form after submit
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

  // detect router paramter if found detect edit and change formtype
  getCategoryToEdit() {
    this.currrentCategoryId = this.activatedRoute.snapshot.params["id"];
    // this.changeCategoryFormDataById();
    if (this.currrentCategoryId) {
      this.formType = "edit";
      this.addCategoryForm.controls["imageUrl"].clearValidators();
      this.addCategoryForm.controls["imageUrl"].setErrors(null);
      this.addCategoryForm.controls["imageUrl"].setValidators([]);
    }

    this.activatedRoute.params.subscribe((params: Params) => {
      this.currrentCategoryId = params["id"];
      if (this.currrentCategoryId) {
        this.changeCategoryFormDataById();
        this.formType = "edit";
      }
    });

    console.log("currrentCategoryId", this.currrentCategoryId);
  }

  changeCategoryFormDataById() {
    this.CategoriesService.getSelectedCategory(this.currrentCategoryId)
      .valueChanges()
      .subscribe((res) => {
        console.log("res====", res);
        this.currentCategoryToEdit = res;
        debugger;

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
    // this.CategoriesService.getCategoriesByName("ddd");
  }

  ngAfterViewInit(): void {
    // console.log("categoryImg----------------", this.categoryImg);
  }
}

import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
  constructor(
    private blog: BlogService,
    private router: Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.initForm()
    if (this.router.url !== "/create-blog") {
      this.loading = true
      this.idBlog = this.router.url.slice(6)
      setTimeout(() => {
        this.blog.getBlogDetail(this.idBlog).subscribe((data: any) => {
          this.createBlog.patchValue({
            title: data.data.title,
            content: data.data.content,
            image: data.data.image.url,
          })
          this.fileName = this.createBlog.value.image
        })
        this.loading = false
      }, 700);
    }
  }

  idBlog: string = ""
  fileName: string = ""
  fileError: string = ""
  successMessage: string = ""
  errorMessage: string = ""
  loading: boolean = false
  createBlog: FormGroup
  formData = new FormData()
  headers = new HttpHeaders()
  repos = {}

  initForm() {
    this.createBlog = this.formBuilder.group({
      title: '',
      content: '',
      image: '',
    });
  }

  clickUpload() {
    document.getElementById('selectedFile').click()
  }

  onFileChange(event: any) {
    var files = event.target.files || event.dataTransfer.files;
    if (!files.length) return;
    this.createImage(files[0]);
  }

  createImage(file: File) {
    if (
      file["type"].toLowerCase() !== "image/png" &&
      file["type"].toLowerCase() !== "image/jpg" &&
      file["type"].toLowerCase() !== "image/jpeg"
    ) {
      this.fileError = "Filetype not supported"
      return;
    }
    this.fileError = ""
    this.fileName = file.name
    this.createBlog.value.image = file;
  }

  sendData() {
    this.loading = true

    this.formData.append('blog[title]', this.createBlog.value.title)
    this.formData.append('blog[content]', this.createBlog.value.content)
    this.formData.append('blog[image]', this.createBlog.value.image)

    this.headers.append('content-type', 'multipart/form-data');
    this.headers.append('accept', 'application/json');

    this.blog.postBlog(this.formData, this.headers).subscribe(
      (response) => {
        this.repos = response;
        this.successMessage = "Upload blog success!"
        this.loading = false
        setTimeout(() => {
          this.successMessage = ""
          this.gotoHome()
        }, 3500);
      },
      (error) => {
        this.errorMessage = error.statusText + "!"
        this.loading = false
        setTimeout(() => {
          this.errorMessage = ""
        }, 3500);
      }
    )
  }

  updateBlog() {
    this.loading = true

    this.formData.append('blog[title]', this.createBlog.value.title)
    this.formData.append('blog[content]', this.createBlog.value.content)
    this.formData.append('blog[image]', this.createBlog.value.image)

    this.blog.updateBlog(this.idBlog, this.formData).subscribe(
      (response) => {
        this.repos = response;
        this.successMessage = "Edit blog success!"
        this.loading = false
        setTimeout(() => {
          this.successMessage = ""
          this.gotoHome()
        }, 3500);
      },
      (error) => {
        this.errorMessage = error.statusText+"!"
        this.loading = false
        setTimeout(() => {
          this.errorMessage = ""
        }, 3500);
      })
  }

  gotoHome() {
    this.router.navigate(['/blogs'])
  }

}


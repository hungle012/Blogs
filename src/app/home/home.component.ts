import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

interface Params {
  page: number,
  search: string,
  sort_by: string,
  sort_direction: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  constructor(private blog: BlogService, private router: Router) { }

  ngOnInit() {
    this.getData()
  }

  loading: boolean = false
  data: any;
  pagination = []
  totalPage = 0
  currentPage = 0
  params: Params = {
    page: 1,
    search: "",
    sort_by: "",
    sort_direction: ""
  }

  getData() {
    this.loading = true
    setTimeout(() => {
      this.blog.getAllBlogs(this.params).subscribe(data => {
        this.data = data['data'].items
        this.totalPage = data['pagination'].total
        this.currentPage = data['pagination'].page
        if (this.pagination.length === 0 || this.pagination.length !== this.totalPage) {
          this.pagination = []
          for (let index = 1; index <= this.totalPage; index++) {
            this.pagination.push(index)
          }
        }
      })
      this.loading = false
    }, 700);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPage) {
      this.params.page = page
      this.getData()
    } else if (page === 0 && this.currentPage !== 1) {
      this.params.page = this.params.page - 1
      this.getData()
    } else if (page > this.totalPage && this.currentPage < this.totalPage) {
      this.params.page = this.params.page + 1
      this.getData()
    }
  }

  sortBy(value) {
    this.params.page = 1
    this.params.sort_by = value.target.value
    this.params.sort_direction = "desc"
    this.getData()
  }
  handleSearch() {
    this.params.page = 1
    this.getData()
  }
  editBlog(id: any) {
    this.router.navigate(['/edit', id])
  }

}

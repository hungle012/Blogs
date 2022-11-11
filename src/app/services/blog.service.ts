import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class BlogService {
  baseURL = "https://api-placeholder.herokuapp.com";

  constructor(private http: HttpClient) {}

  getAllBlogs(data: any) {
    const url = "/api/v2/blogs";
    return this.http.get(this.baseURL + url, { params: data });
  }
  getBlogDetail(id: any) {
    const url = "/api/v2/blogs/";
    return this.http.get(this.baseURL + url + `/${id}`);
  }
  postBlog(body: FormData, headers: HttpHeaders) {
    const url = "/api/v2/blogs";
    return this.http.post(this.baseURL + url, body, { headers: headers });
  }
  updateBlog(id: any, body: FormData) {
    const url = "/api/v2/blogs/";
    return this.http.put(this.baseURL + url + `/${id}`, body);
  }
}

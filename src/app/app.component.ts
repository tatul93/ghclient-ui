import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookMarks, CommitInfo, SearchResponse, Statistic} from './models/all-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'github-client';

  constructor(private http: HttpClient) {
  }

  searchText = '';
  errorMessage: '';
  bookmarkId: string;
  bookmarkView = true;

  searchResponse: SearchResponse;
  statistic: Statistic;
  bookMarks: BookMarks[];
  bookMark: BookMarks;

  ngOnInit(): void {
    this.bookmarkId = '';

    this.getBookMarks().subscribe(value => this.bookMarks = value);
  }

  searchRepo() {
    this.search(this.searchText).subscribe(data => {
      this.searchResponse = new SearchResponse(data.totalCount, data.items);
      this.errorMessage = '';
    }, error => {
      console.log(error);
      this.errorMessage = error.error.message;
      this.searchResponse = null;
    });
    this.bookmarkView = false;
    this.statistic = null;
  }

  public getBookMarks(): Observable<BookMarks[]> {
    return this.http.get<BookMarks[]>('http://localhost:8080/bookmarks');
  }

  public getStatistic(repoName): Observable<Statistic> {
    return this.http.get<Statistic>('http://localhost:8080/repositories/statistic', {params: {name: repoName}});
  }

  public getBookMarkById(bookMarkId): Observable<BookMarks> {
    return this.http.get<BookMarks>('http://localhost:8080/bookmarks/' + bookMarkId);
  }


  showStatistic(repoName) {
    this.getStatistic(repoName).subscribe(value => {
      this.statistic = new Statistic(
        value.repoName,
        value.cacheId, value.committers,
        value.impact, value.commitsTimeline);
      this.errorMessage = '';
    }, error => this.errorMessage = error.error.message);
  }

  getBookMark(bookmarkId) {
    this.getBookMarkById(bookmarkId).subscribe(value => {
      this.bookMark = value;
      this.statistic = value.statistic;
      this.errorMessage = '';
    }, error => this.errorMessage = error.error.message);
  }

  public addToBookMark(statistic: Statistic) {
    console.log(this.bookmarkId);
    return this.http.post<SearchResponse>('http://localhost:8080/bookmarks/', null, {
      params: {
        cacheId: statistic.cacheId,
        bookMarkId: this.bookmarkId
      }
    }).subscribe(value => {
      this.bookmarkView = true;
      this.errorMessage = '';
      this.bookMarks.push(new BookMarks(this.bookmarkId, this.statistic, ''));
    }, error => this.errorMessage = error.error.message);
  }

  public search(text): Observable<SearchResponse> {
    return this.http.get<SearchResponse>('http://localhost:8080/repositories/search', {
      params: {
        query: text, start: '1',
        count: '15'
      }
    });
  }
}







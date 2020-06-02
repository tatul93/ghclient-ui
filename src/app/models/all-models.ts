export class BookMarks {
  bookMarkId: string;
  statistic: Statistic;
  createdDate: string;

  constructor(bookMarkId: string, statistic: Statistic, createdDate: string) {
    this.bookMarkId = bookMarkId;
    this.statistic = statistic;
    this.createdDate = createdDate;
  }
}

export class Statistic {
  repoName: string;
  cacheId: string;
  committers: UserCommitter[];
  impact: Map<string, UserCommitsActivity>;
  commitsTimeline: Map<string, CommitInfo[]>;

  constructor(repoName: string, cacheId: string, committers: UserCommitter[],
              impact: Map<string, UserCommitsActivity>, commitsTimeline: Map<string, CommitInfo[]>) {
    this.repoName = repoName;
    this.cacheId = cacheId;
    this.committers = committers;
    this.impact = impact;
    this.commitsTimeline = commitsTimeline;
  }
}

export class GithubSearchResponseItemDto {
  fullName: string;
  id: number;

  constructor(fullName: string,
              id: number) {
    this.fullName = fullName;
    this.id = id;
  }
}


export class SearchResponse {
  totalCount: number;
  items: GithubSearchResponseItemDto[];

  constructor(totalCount: number,
              items: GithubSearchResponseItemDto[]) {
    this.totalCount = totalCount;
    this.items = items;
  }
}

export class UserCommitter {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

export class UserCommitsActivity {
  count: number;
  percent: string;

  constructor(count: number, percent: string) {
    this.count = count;
    this.percent = percent;
  }
}

export class CommitInfo {
  commiterName: string;
  message: string;
  date: string;

  constructor(commiterName: string, message: string, date: string) {
    this.commiterName = commiterName;
    this.message = message;
    this.date = date;
  }
}


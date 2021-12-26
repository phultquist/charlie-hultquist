export interface Post {
  title: string;
  slug: {
    current: string;
  };
  body: any;
  publishedAt: string;
}

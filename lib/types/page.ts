export interface Page {
  meta: {
    slug: {
      current: string;
    };
    title: string;
  };
  gallery: {
    asset: {};
  }[];
}

export interface Link {
  title: string;
  url: string;
}

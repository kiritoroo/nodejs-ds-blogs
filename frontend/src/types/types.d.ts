export interface TBlogSectionData {
  header: string;
  content: JSX.Element;
}

export interface TBlogTopicData {
  icon: JSX.Element,
  title: string
}

export interface TDesignPatternData {
  name: string;
  emoji: string;
  author: string;
  publish: Date;
  url: string;
  topics: TBlogTopicData[];
}
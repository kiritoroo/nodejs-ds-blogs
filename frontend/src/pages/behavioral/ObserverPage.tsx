import React from "react";
import { css } from "@emotion/css";
import { ArticleHeader } from "@comp/Layout/ArticleHeader";
import { ArticleTitle } from "@comp/ArticleTitle";
import { ArticleBody } from "@comp/Layout/ArticleBody";
import { ViewContent } from "@comp/Layout/ViewContent";
import { BlogTopic } from "@comp/Blog/BlogTopic";
import { ViewSidebar } from "@comp/Layout/ViewSidebar";
import { SidebarInfo } from "@comp/SidebarInfo";
import { Space } from "@comp/Space";
import { SidebarToc } from "@comp/SidebarToc";
import { TBlogSectionData, TDesignPatternData } from "@type/types";
import { useApi } from "@api/useApi";
import { BlogParagraph } from "@comp/Blog/BlogParagraph";
import { BlogCodeEditor } from "@comp/Blog/BlogCodeEditor";
import { BlogBullets } from "@comp/Blog/BlogBullets";
import { BlogSection } from "@comp/Blog/BlogSection";
import { BlogQuote } from "@comp/Blog/BlogQuote";
import { BlogCodeBlock } from "@comp/Blog/BlogCodeBlock";
import { BlogInlineCode } from "@comp/Blog/BlogInlineCode";

interface Props {
  info: TDesignPatternData;
}

export default function CommandPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const newsPublisher = new NewsPublisher();
const emailSubscriber = new EmailSubscriber();
const smsSubscriber = new SMSSubscriber();

newsPublisher.subscribe(emailSubscriber);
newsPublisher.subscribe(smsSubscriber);

newsPublisher.notify("Breaking news: COVID-19 vaccine discovered!");

newsPublisher.unsubscribe(emailSubscriber);

newsPublisher.notify("Sports news: Team wins championship!");

`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  

  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.observerPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Observer Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Observer thuộc nhóm các mẫu thiết kế hành vi (Behavioral Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Mẫu này cho phép một đối tượng (subject) duy trì danh sách các đối tượng khác (observers) và thông báo cho các observers về bất kỳ sự thay đổi nào trong trạng thái của nó.
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Observer Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets
          title="Observer Design Pattern có các thành phần sau.">
          <li>Subject: Đối tượng chủ đề, có thể là một lớp hoặc một giao diện. Subject duy trì danh sách các observers và cung cấp các phương thức để thêm, xóa và thông báo cho observers về các sự kiện.</li>
          <li>Observer: Đối tượng quan sát, đại diện cho các observers. Observer cung cấp một phương thức cập nhật (update) để nhận thông báo từ subject khi có sự thay đổi xảy ra.</li>
          <li>Concrete Subject: Lớp cụ thể của subject, triển khai các phương thức để quản lý danh sách các observers và thông báo cho các observers khi có sự thay đổi.</li>
          <li>Concrete Observer: Lớp cụ thể của observer, triển khai phương thức cập nhật để xử lý thông báo từ subject.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Observer Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Đầu tiên, chúng ta định nghĩa lớp <BlogInlineCode>NewsPublisher</BlogInlineCode> là đối tượng chủ đề (subject). Nó có một 
          thuộc tính <BlogInlineCode>observers</BlogInlineCode> là một mảng các đối tượng <BlogInlineCode>NewsSubscriber</BlogInlineCode> (observer) mà nó giữ. Phương 
          thức <BlogInlineCode>subscribe()</BlogInlineCode> được sử dụng để đăng ký một observer mới bằng cách thêm nó vào mảng <BlogInlineCode>observers</BlogInlineCode>. Phương 
          thức <BlogInlineCode>unsubscribe()</BlogInlineCode> được sử dụng để hủy đăng ký một observer bằng cách loại bỏ nó khỏi mảng <BlogInlineCode>observers</BlogInlineCode>. Phương 
          thức <BlogInlineCode>notify()</BlogInlineCode> được sử dụng để thông báo cho tất cả các observers về sự thay đổi bằng cách gọi phương thức <BlogInlineCode>update()</BlogInlineCode> trên mỗi observer.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Subject
export class NewsPublisher {
  private observers: NewsSubscriber[] = [];

  public subscribe(observer: NewsSubscriber): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: NewsSubscriber): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(news: string): void {
    for (const observer of this.observers) {
      observer.update(news);
    }
  }
}`}
        />
        <BlogParagraph>
          Tiếp theo, chúng ta định nghĩa giao diện <BlogInlineCode>NewsSubscriber</BlogInlineCode> để đại diện cho các observers. Giao diện 
          này chỉ có một phương thức <BlogInlineCode>update()</BlogInlineCode> nhận một thông báo mới làm tham số.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Observer
export interface NewsSubscriber {
  update(news: string): void;
}`}
        />
        <BlogParagraph>
          Sau đó, chúng ta triển khai lớp <BlogInlineCode>EmailSubscriber</BlogInlineCode> và <BlogInlineCode>SMSSubscriber</BlogInlineCode> là các observers cụ thể. Cả hai 
          lớp này đều triển khai phương thức <BlogInlineCode>update()</BlogInlineCode> để nhận thông báo và thực hiện các logic thông báo riêng (ví dụ: gửi email, gửi tin nhắn SMS).
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Concrete Observer
export class EmailSubscriber implements NewsSubscriber {
  public update(news: string): void {
    console.log(Email Subscriber received news: news);
    // Perform email notification logic here
  }
}

export class SMSSubscriber implements NewsSubscriber {
  public update(news: string): void {
    console.log(SMS Subscriber received news: news);
    // Perform SMS notification logic here
  }
}`}
        />
      </React.Fragment>
    )
  }

  const dataSection4: TBlogSectionData = {
    header: "Demo",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Chương trình Demo
        </BlogParagraph>
        <BlogCodeEditor
          lang="ts"
          code={ codeInput }
          setCode={ setCodeInput }
          onRun={ handleCallAPI }
          output={ runOutput }
        />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <ArticleHeader>
        <ArticleTitle>【Behavioral】 { info.name }</ArticleTitle>
      </ArticleHeader>
      <ArticleBody>
        <ViewContent ref={ contentSectionRef }>
          <BlogTopic data={ info.topics }/>
          <BlogSection data={ dataSection1 }/>
          <BlogSection data={ dataSection2 }/>
          <BlogSection data={ dataSection3 }/>
          <BlogSection data={ dataSection4 }/>
        </ViewContent>
        <ViewSidebar>
          <SidebarInfo 
            author={ info.author }
            publish={ `${info.publish.getFullYear()}/${info.publish.getMonth()+1}/${info.publish.getDate()}` }
            letterCount={ letterCount }/>
          <Space/>
          <SidebarToc/>
        </ViewSidebar>
      </ArticleBody>
    </React.Fragment>
  )
}
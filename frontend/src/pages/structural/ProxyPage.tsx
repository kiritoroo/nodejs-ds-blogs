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
import { BlogSection } from "@comp/Blog/BlogSection";
import { BlogQuote } from "@comp/Blog/BlogQuote";
import { BlogBullets } from "@comp/Blog/BlogBullets";
import { BlogCodeBlock } from "@comp/Blog/BlogCodeBlock";
import { BlogInlineCode } from "@comp/Blog/BlogInlineCode";

interface Props {
  info: TDesignPatternData;
}

export default function ProxyPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const image = new ProxyImage('image.jpg');
image.display();
image.display();`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.proxyPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Proxy Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Proxy thuộc nhóm các mẫu thiết kế cấu trúc (Structural Design Pattern)
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế Proxy cho phép chúng ta tạo ra một đối tượng thay thế hoặc đại diện cho một đối tượng khác. Đối tượng 
          proxy hành động như một lớp trung gian, kiểm soát việc truy cập và thực hiện các hoạt động bổ sung trước hoặc sau khi gọi phương thức của đối tượng gốc.
        </BlogQuote>
      </React.Fragment>
    ) 
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Proxy Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets
          title="Proxy Design Pattern có các thành phần sau.">
          <li>Proxy: Đại diện cho đối tượng proxy, triển khai cùng giao diện với đối tượng gốc. Nó chịu trách nhiệm gọi đối tượng gốc khi cần thiết và có thể thực hiện các chức năng bổ sung.</li>
          <li>Subject: Đại diện cho đối tượng gốc, định nghĩa giao diện chung cho Proxy và RealSubject.</li>
          <li>RealSubject: Đối tượng gốc mà Proxy đại diện. Proxy sẽ gọi các phương thức của đối tượng gốc khi cần thiết.</li>
        </BlogBullets>
      </React.Fragment>
    ) 
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Proxy Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Một ví dụ minh họa cho mẫu thiết kế Proxy là việc tạo ra một ProxyImage để tải và hiển thị hình ảnh từ một địa chỉ URL. Khi người dùng yêu cầu hiển thị 
          hình ảnh, ProxyImage kiểm tra xem hình ảnh đã được tải chưa. Nếu chưa, nó sẽ tải hình ảnh từ URL và hiển thị. Nếu đã được tải, nó sẽ hiển thị hình ảnh từ bộ nhớ đệm mà không cần tải lại.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Subject
export interface Image {
  display(): void;
}

// RealSubject
export class RealImage implements Image {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadImageFromDisk();
  }

  private loadImageFromDisk(): void {
    console.log(Loading image from disk: this.filename);
  }

  display(): void {
    console.log(Displaying image: this.filename);
  }
}

// Proxy
export  class ProxyImage implements Image {
  private filename: string;
  private realImage: RealImage | null;

  constructor(filename: string) {
    this.filename = filename;
    this.realImage = null;
  }

  display(): void {
    if (this.realImage === null) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}`}
        />
        <BlogParagraph>
          Trong ví dụ này, <BlogInlineCode>RealImage</BlogInlineCode> đại diện cho đối tượng gốc, và <BlogInlineCode>ProxyImage</BlogInlineCode> đại diện cho đối tượng proxy. Khi gọi 
          phương thức <BlogInlineCode>display()</BlogInlineCode> trên <BlogInlineCode>ProxyImage</BlogInlineCode>, nó kiểm tra xem <BlogInlineCode>RealImage</BlogInlineCode> đã được tải hay chưa. 
          Nếu chưa, nó tạo một đối tượng <BlogInlineCode>RealImage</BlogInlineCode> mới và gọi phương thức <BlogInlineCode>display()</BlogInlineCode> trên đối tượng đó. Nếu đã được tải, nó chỉ gọi 
          phương thức <BlogInlineCode>display()</BlogInlineCode> trên đối tượng <BlogInlineCode>RealImage</BlogInlineCode> đã tồn tại.
        </BlogParagraph>
        <BlogQuote>
          Việc sử dụng mẫu Proxy giúp kiểm soát việc truy cập vào đối tượng gốc, cho phép thực hiện các chức năng bổ sung như tải dữ liệu từ xa, xác thực hoặc quản lý bộ nhớ đệm mà không làm thay đổi đối tượng gốc.
        </BlogQuote>
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
          lang="js"
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
        <ArticleTitle>【Structural】 { info.name }</ArticleTitle>
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
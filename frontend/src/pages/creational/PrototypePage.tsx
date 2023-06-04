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

export default function PrototypePage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
// Tạo các đối tượng hình học
const rectangle = new Rectangle();
const circle = new Circle();

// Sao chép đối tượng hình chữ nhật
const clonedRectangle = rectangle.clone();
clonedRectangle.draw();

// Sao chép đối tượng hình tròn
const clonedCircle = circle.clone();
clonedCircle.draw();`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  

  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.prototypePOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Prototype Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Prototype thuộc nhóm các mẫu thiết kế khởi tạo (Creational Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế Prototype là một mẫu thiết kế tạo ra các đối tượng mới bằng cách sao chép các 
          đối tượng đã có sẵn, thay vì tạo ra các đối tượng từ đầu. Nó cho phép chúng ta tạo ra các 
          đối tượng mới một cách hiệu quả và linh hoạt, đồng thời giảm thiểu việc sử dụng bộ nhớ và 
          tài nguyên để tạo ra các đối tượng.
        </BlogQuote>
      </React.Fragment>
    ) 
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Prototype Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets
          title="Prototype Design Pattern có các thành phần sau.">
            <li>Prototype: Đây là giao diện hoặc lớp cơ sở để định nghĩa phương thức sao chép (clone).</li>
            <li>Concrete Prototype: Các lớp này triển khai giao diện hoặc kế thừa từ lớp Prototype và triển khai phương thức sao chép.</li>
        </BlogBullets>
      </React.Fragment>
    ) 
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Prototype Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Giả sử chúng ta đang xây dựng một ứng dụng vẽ hình và cần tạo ra các đối tượng hình học như 
          hình chữ nhật và hình tròn. Chúng ta sẽ sử dụng mẫu thiết kế Prototype để tạo ra các đối tượng này.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Prototype
export interface Shape {
  clone(): Shape;
  draw(): void;
}

// Concrete Prototypes
export class Rectangle implements Shape {
  clone(): Shape {
    return new Rectangle();
  }

  draw(): void {
    console.log("Inside Rectangle::draw() method.");
  }
}

export class Circle implements Shape {
  clone(): Shape {
    return new Circle();
  }

  draw(): void {
    console.log("Inside Circle::draw() method.");
  }
}`}
        />
        <BlogParagraph>
          Trong ví dụ trên, chúng ta có hai Prototype là <BlogInlineCode>Rectangle</BlogInlineCode> và <BlogInlineCode>Circle</BlogInlineCode>, cả hai đều 
          triển khai giao diện <BlogInlineCode>Shape</BlogInlineCode> và triển khai phương thức <BlogInlineCode>clone()</BlogInlineCode> để tạo ra một bản 
          sao của chính nó. 
        </BlogParagraph>
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
        <ArticleTitle>【Creational】 { info.name }</ArticleTitle>
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
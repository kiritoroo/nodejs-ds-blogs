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
import { BlogQuote } from "@comp/Blog/BlogQuote";
import { BlogSection } from "@comp/Blog/BlogSection";
import { BlogBullets } from "@comp/Blog/BlogBullets";
import { BlogCodeBlock } from "@comp/Blog/BlogCodeBlock";
import { BlogCodeEditor } from "@comp/Blog/BlogCodeEditor";
import { BlogInlineCode } from "@comp/Blog/BlogInlineCode";

interface Props {
  info: TDesignPatternData;
}

export default function AbstractFactoryPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const rectangleFactory = new RectangleFactory();
const rectangle = rectangleFactory.createShape();
rectangle.draw();

const squareFactory = new SquareFactory();
const square = squareFactory.createShape();
square.draw();`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  

  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.abstractFactoryPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result)
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Abstract Factory Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Abstract Factory thuộc nhóm Creational Patterns
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế Abstract Factory cung cấp một giao diện để tạo ra các đối tượng
          liên quan hoặc phụ thuộc lẫn nhau mà không chỉ định trực tiếp lớp cụ thể của chúng. 
          Thay vào đó, nó cho phép một lớp gọi một phương thức của một "nhà máy" (factory) để tạo ra các đối tượng tương ứng.
        </BlogQuote>
        <BlogParagraph>
          Việc sử dụng Abstract Factory Design Pattern giúp giảm sự phụ thuộc giữa client và các lớp cụ thể của đối tượng, 
          giúp linh hoạt trong việc thay đổi cách tạo đối tượng mà không ảnh hưởng đến client.
        </BlogParagraph>
      </React.Fragment>
    ),
  };

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Abstract Factory Pattern",
    content: (
      <React.Fragment>
        <BlogBullets
          title="Abstract Factory Design Pattern có các thành phần sau.">
          <li>AbstractFactory: Đây là giao diện hoặc lớp trừu tượng chứa các phương thức tạo ra các đối tượng liên quan hoặc phụ thuộc lẫn nhau.</li>
          <li>ConcreteFactory: Đây là lớp cụ thể kế thừa từ AbstractFactory và triển khai các phương thức để tạo ra các đối tượng cụ thể.</li>
          <li>AbstractProduct: Đây là giao diện hoặc lớp trừu tượng đại diện cho các đối tượng mà AbstractFactory sẽ tạo ra.</li>
          <li>ConcreteProduct: Đây là lớp cụ thể kế thừa từ AbstractProduct và triển khai các phương thức của nó.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Abstract Factory Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Giả sử chúng ta đang xây dựng một ứng dụng đồ họa và cần tạo ra các hình học
          như hình chữ nhật và hình vuông. Chúng ta sẽ sử dụng mẫu thiết kế <BlogInlineCode>Abstract Factory </BlogInlineCode>
          để làm điều này.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Abstract Product
export interface Shape {
  draw(): void;
}`}
        />
        <BlogCodeBlock
        lang="ts"
        code={`// Concrete Products
export export class Rectangle implements Shape {
  draw(): void {
    console.log("Inside Rectangle::draw() method.");
  }
}

export class Square implements Shape {
  draw(): void {
    console.log("Inside Square::draw() method.");
  }
}`}
        />
        <BlogCodeBlock
           lang="ts"
           code={`// Abstract Factory
export interface ShapeFactory {
  createShape(): Shape;
}

// Concrete Factories
export class RectangleFactory implements ShapeFactory {
  createShape(): Shape {
    return new Rectangle();
  }
}

export class SquareFactory implements ShapeFactory {
  createShape(): Shape {
    return new Square();
  }
}`}
        />
        <BlogParagraph>
          Trong ví dụ trên, chúng ta có hai sản phẩm cụ thể là <BlogInlineCode>Rectangle</BlogInlineCode> và <BlogInlineCode>Square</BlogInlineCode>, cả hai 
          đều triển khai giao diện <BlogInlineCode>Shape</BlogInlineCode>. Chúng ta cũng có hai nhà máy cụ thể là <BlogInlineCode>RectangleFactory</BlogInlineCode> 
          và <BlogInlineCode>SquareFactory</BlogInlineCode>, cả hai đều triển khai giao diện <BlogInlineCode>ShapeFactory</BlogInlineCode> để tạo ra các đối tượng tương ứng.
        </BlogParagraph>
        <BlogParagraph>
          Khi chúng ta muốn tạo một hình chữ nhật, chúng ta sẽ sử dụng <BlogInlineCode>RectangleFactory</BlogInlineCode>. Tương tự, 
          khi chúng ta muốn tạo một hình vuông, chúng ta sẽ sử dụng <BlogInlineCode>SquareFactory</BlogInlineCode>. Việc tạo đối tượng 
          sẽ được xử lý bởi các lớp nhà máy cụ thể mà chúng ta chọn, mà không cần phải chú thích trực 
          tiếp lớp cụ thể của sản phẩm.
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
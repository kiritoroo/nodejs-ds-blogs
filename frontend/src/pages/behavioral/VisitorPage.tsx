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

export default function VisitorPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const product = new Product();
const service = new Service();

const informationVisitor = new InformationVisitor();
const priceVisitor = new PriceVisitor();

product.accept(informationVisitor);
product.accept(priceVisitor);

service.accept(informationVisitor);
service.accept(priceVisitor);`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  

  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.visitorPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Visitor Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Visitor thuộc nhóm các mẫu thiết kế hành vi (Behavioral Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế Visitor cho phép bạn thêm các hoạt động mới vào các đối tượng đã tồn tại mà không cần thay đổi cấu trúc của chúng. Nó cho phép bạn tách biệt các hoạt động từ cấu trúc của đối tượng và định nghĩa các hoạt động mới thông qua các lớp Visitor riêng biệt.
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Visitor Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets
          title="Visitor Design Pattern có các thành phần sau.">
          <li>Visitor: Định nghĩa giao diện (interface) cho các lớp Visitor. Các phương thức trong giao diện này tương ứng với từng loại đối tượng trong cấu trúc.</li>
          <li>Concrete Visitor: Triển khai giao diện Visitor và định nghĩa các hoạt động cụ thể trên từng loại đối tượng.</li>
          <li>Element: Định nghĩa giao diện (interface) cho các đối tượng trong cấu trúc. Bao gồm phương thức accept() để chấp nhận một Visitor.</li>
          <li>Concrete Element: Triển khai giao diện Element và triển khai phương thức accept() để chuyển tiếp việc thực hiện các hoạt động cho Visitor.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Visitor Design Pattern",
    content: (
      <React.Fragment>
        <BlogCodeBlock
          lang="ts"
          code={`// Visitor interface
export interface Visitor {
  visitProduct(product: Product): void;
  visitService(service: Service): void;
}

// Element interface
export interface Element {
  accept(visitor: Visitor): void;
}

// Concrete Element
export class Product implements Element {
  accept(visitor: Visitor): void {
    visitor.visitProduct(this);
  }

  getProductDetails(): void {
    console.log('Product: Get product details');
  }
}

// Concrete Element
export class Service implements Element {
  accept(visitor: Visitor): void {
    visitor.visitService(this);
  }

  getServiceDetails(): void {
    console.log('Service: Get service details');
  }
}

// Concrete Visitor
export class InformationVisitor implements Visitor {
  visitProduct(product: Product): void {
    console.log('InformationVisitor: Visiting Product');
    product.getProductDetails();
  }

  visitService(service: Service): void {
    console.log('InformationVisitor: Visiting Service');
    service.getServiceDetails();
  }
}

// Concrete Visitor
export class PriceVisitor implements Visitor {
  visitProduct(product: Product): void {
    console.log('PriceVisitor: Visiting Product');
    // Calculate and display product price
  }

  visitService(service: Service): void {
    console.log('PriceVisitor: Visiting Service');
    // Calculate and display service price
  }
}`}
        />
        <BlogParagraph>
          Chúng ta có hai Concrete Element là <BlogInlineCode>Product</BlogInlineCode> và <BlogInlineCode>Service</BlogInlineCode>, cả hai đều triển khai phương 
          thức <BlogInlineCode>accept()</BlogInlineCode> để cho phép Visitor truy cập và thực hiện các hoạt động trên chúng. Visitor được đại diện bởi hai 
          lớp <BlogInlineCode>InformationVisitor</BlogInlineCode> và <BlogInlineCode>PriceVisitor</BlogInlineCode>, mỗi lớp triển khai các phương thức <BlogInlineCode>visitProduct()</BlogInlineCode> và <BlogInlineCode>visitService()</BlogInlineCode> để thực hiện 
          các hoạt động tương ứng trên Concrete Element.
        </BlogParagraph>
        <BlogParagraph>
          Trong phần Visitor, lớp <BlogInlineCode>InformationVisitor</BlogInlineCode> có phương thức <BlogInlineCode>visitProduct()</BlogInlineCode> và <BlogInlineCode>visitService()</BlogInlineCode> để hiển thị 
          thông tin chi tiết về sản phẩm và dịch vụ. Lớp <BlogInlineCode>PriceVisitor</BlogInlineCode> có phương thức <BlogInlineCode>visitProduct()</BlogInlineCode> và <BlogInlineCode>visitService()</BlogInlineCode> để tính toán và hiển thị giá của sản phẩm và dịch vụ.
        </BlogParagraph>
        <BlogParagraph>
          Trong phần Element, lớp <BlogInlineCode>Product</BlogInlineCode> triển khai phương thức <BlogInlineCode>accept()</BlogInlineCode> để chấp nhận một Visitor và gọi 
          phương thức tương ứng trên Visitor. Tương tự, lớp <BlogInlineCode>Service</BlogInlineCode> cũng triển khai phương thức <BlogInlineCode>accept()</BlogInlineCode>.
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
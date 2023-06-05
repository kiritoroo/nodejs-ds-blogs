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

export default function ChainOfresponsibilityPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Usage
const stockHandler = new StockAvailabilityHandler();
const priceHandler = new PriceValidationHandler();
const orderHandler = new OrderProcessingHandler();

stockHandler.setNext(priceHandler);
priceHandler.setNext(orderHandler);

const request1 = new Request('Stock', 50);
const request2 = new Request('Price', 200);
const request3 = new Request('Order', 1500);
const request4 = new Request('Stock', 200);

stockHandler.handleRequest(request1);
stockHandler.handleRequest(request2);
stockHandler.handleRequest(request3);
stockHandler.handleRequest(request4);
`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.chainOfResponsibilityPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Chain of Responsibility Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Chain of Responsibility thuộc nhóm các mẫu thiết kế hành vi (Behavioral Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế Chain of Responsibility (Chain of Responsibility pattern) cho phép xác định một chuỗi các đối tượng xử lý yêu cầu, trong đó 
          mỗi đối tượng có khả năng xử lý yêu cầu hoặc chuyển tiếp yêu cầu cho đối tượng tiếp theo trong chuỗi. Điều này giúp tách rời người gửi yêu cầu và 
          người xử lý yêu cầu, cho phép các đối tượng trong chuỗi có thể linh hoạt thay đổi và thêm mới mà không ảnh hưởng đến hệ thống.
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Chain of Responsibility Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets
          title="Chain of Responsibility Design Pattern có các thành phần sau.">
          <li>Handler: Định nghĩa một giao diện hoặc lớp trừu tượng cho việc xử lý yêu cầu.</li>
          <li>ConcreteHandler: Triển khai giao diện Handler và xử lý yêu cầu nếu có khả năng, hoặc chuyển tiếp yêu cầu cho Handler tiếp theo trong chuỗi.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Chain of Responsibility Design Pattern",
    content: (
      <React.Fragment>
        <BlogCodeBlock
          lang="ts"
          code={`// Handler
export interface RequestHandler {
  setNext(handler: RequestHandler): void;
  handleRequest(request: Request): void;
}

// Request
export class Request {  
  constructor(public type: string, public amount: number) {}
}

// Concrete Handlers
export class StockAvailabilityHandler implements RequestHandler {
  private nextHandler: RequestHandler | null = null;

  setNext(handler: RequestHandler): void {
    this.nextHandler = handler;
  }

  handleRequest(request: Request): void {
    if (request.type === 'Stock' && request.amount <= 100) {
      console.log(Handled by StockAvailabilityHandler: Request of type request.type with amount request.amount);
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    } else {
      console.log('Cannot handle the request');
    }
  }
}

export class PriceValidationHandler implements RequestHandler {
  private nextHandler: RequestHandler | null = null;

  setNext(handler: RequestHandler): void {
    this.nextHandler = handler;
  }

  handleRequest(request: Request): void {
    if (request.type === 'Price' && request.amount >= 100 && request.amount <= 1000) {
      console.log(Handled by PriceValidationHandler: Request of type request.type with amount request.amount);
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    } else {
      console.log('Cannot handle the request');
    }
  }
}

export class OrderProcessingHandler implements RequestHandler {
  private nextHandler: RequestHandler | null = null;

  setNext(handler: RequestHandler): void {
    this.nextHandler = handler;
  }

  handleRequest(request: Request): void {
    if (request.type === 'Order' && request.amount > 1000) {
      console.log(Handled by OrderProcessingHandler: Request of type request.type with amount request.amount);
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    } else {
      console.log('Cannot handle the request');
    }
  }
}`}
        />
        <BlogParagraph>
          chúng ta có ba Concrete Handlers là <BlogInlineCode>StockAvailabilityHandler</BlogInlineCode>, <BlogInlineCode>PriceValidationHandler</BlogInlineCode> và <BlogInlineCode>OrderProcessingHandler</BlogInlineCode>. Mỗi 
          Handler triển khai giao diện <BlogInlineCode>RequestHandler</BlogInlineCode>, có hai phương thức chính là <BlogInlineCode>setNext()</BlogInlineCode> để thiết lập Handler tiếp theo và <BlogInlineCode>handleRequest()</BlogInlineCode> để xử lý yêu cầu.
        </BlogParagraph>
        <BlogParagraph>
          Mỗi Handler đều có thể xử lý một loại yêu cầu cụ thể. Ví dụ, <BlogInlineCode>StockAvailabilityHandler</BlogInlineCode> kiểm tra xem yêu cầu có phải là 
          yêu cầu kiểm tra kho hàng và số lượng hàng có sẵn không vượt quá 100. <BlogInlineCode>PriceValidationHandler</BlogInlineCode> kiểm tra xem yêu cầu có phải là yêu cầu kiểm tra 
          giá và giá nằm trong khoảng từ 100 đến 1000. <BlogInlineCode>OrderProcessingHandler</BlogInlineCode> xử lý yêu cầu đặt hàng và yêu cầu có số lượng lớn hơn 1000.
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế Chain of Responsibility giúp giảm sự ràng buộc giữa người gửi yêu cầu và người xử lý yêu cầu, và cho phép các đối tượng xử lý được tổ chức thành một chuỗi linh hoạt.
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
import { ArticleTitle } from "@comp/ArticleTitle";
import { BlogBullets } from "@comp/Blog/BlogBullets";
import { BlogCodeBlock } from "@comp/Blog/BlogCodeBlock";
import { BlogInlineCode } from "@comp/Blog/BlogInlineCode";
import { BlogParagraph } from "@comp/Blog/BlogParagraph";
import { BlogQuote } from "@comp/Blog/BlogQuote";
import { BlogSection } from "@comp/Blog/BlogSection";
import { BlogTopic } from "@comp/Blog/BlogTopic";
import { ArticleBody } from "@comp/Layout/ArticleBody";
import { ArticleHeader } from "@comp/Layout/ArticleHeader";
import { ViewContent } from "@comp/Layout/ViewContent";
import { ViewSidebar } from "@comp/Layout/ViewSidebar";
import { SidebarInfo } from "@comp/SidebarInfo";
import { TBlogSectionData, TBlogTopicData, TDesignPatternData } from "@type/types";
import { SiTypescript } from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";
import { HiOutlineHashtag } from "react-icons/hi";
import React from "react";
import { SidebarToc } from "@comp/SidebarToc";
import { Space } from "@comp/Space";
import { BlogCodeEditor } from "@comp/Blog/BlogCodeEditor";
import { useApi } from "@api/useApi";

interface Props {
  info: TDesignPatternData;
}

export default function StatePage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const order = new Order()
console.log(order.shipOrder())`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.statePOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "State Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế State thuộc nhóm các mẫu thiết kế hành vi (Behavioral Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Một mẫu thiết kế State được sử dụng khi một đối tượng thay đổi hành vi của nó dựa trên trạng thái bên trong của nó. Nếu chúng ta phải thay đổi hành vi của một đối tượng dựa trên trạng thái của nó, chúng ta có thể có một biến trạng thái trong Đối tượng 
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của State Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets 
          title="State Design Pattern có các thành phần sau.">
          <li>Context (Ngữ cảnh): Xác định giao diện để khách hàng tương tác. Nó duy trì các tham chiếu đến các đối tượng trạng thái cụ thể có thể được sử dụng để xác định trạng thái hiện tại của các đối tượng.</li>
          <li>State (Trạng thái): Xác định giao diện để khai báo mỗi trạng thái cụ thể nên làm gì.</li>
          <li>ConcreteState: (Trạng thái cụ thể): Cung cấp việc triển khai cho các phương thức được xác định trong State.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về State Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
        Trong ví dụ này, chúng ta tạo một đối tượng <BlogInlineCode>Order</BlogInlineCode>  
        và gọi các phương thức <BlogInlineCode>cancelOrder()</BlogInlineCode>, <BlogInlineCode>shipOrder()</BlogInlineCode>   và <BlogInlineCode>completeOrder()</BlogInlineCode>  
        để thực hiện các hành động tương ứng. 
        Trạng thái của đơn hàng được chuyển đổi theo mỗi hành động 
        và các hành động không hợp lệ cho mỗi trạng thái sẽ 
        được thông báo qua các thông điệp được in ra. 
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
interface IOrderState {
cancelOrder(): void;
shipOrder(): void;
completeOrder(): void;
 }`}
        />
        <BlogCodeBlock
          lang="ts"
          code={`export class NewOrderState implements IOrderState {
  
  cancelOrder(): void {
    console.log("Cannot cancel a new order.");
  }
          
  shipOrder(): void {
    console.log("Shipping order...");
  }
          
  completeOrder(): void {
    console.log("Cannot complete an order that hasn't been shipped.");
    }
  }

export class ShippedOrderState implements IOrderState {
  cancelOrder(): void {
    console.log("Cannot cancel a shipped order.");
    }
          
  shipOrder(): void {
    console.log("Order has already been shipped.");
    }
          
  completeOrder(): void {
    console.log("Completing order...");
    }
  }

export class CompletedOrderState implements IOrderState {
  cancelOrder(): void {
    console.log("Cannot cancel a completed order.");
  }
          
  shipOrder(): void {
      console.log("Cannot ship an order that has already been completed.");
  }
          
  completeOrder(): void {
      console.log("Order has already been completed.");
 }
} `}
        />
        <BlogParagraph>
          Lớp <BlogInlineCode>Order()</BlogInlineCode>là lớp Context, đại diện cho đơn hàng. Nó lưu trữ một tham chiếu đến trạng thái hiện tại và chuyển tiếp các phương thức <BlogInlineCode>cancelOrder()</BlogInlineCode>, <BlogInlineCode>shipOrder()</BlogInlineCode> và <BlogInlineCode>completeOrder()</BlogInlineCode> cho trạng thái hiện tại.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={` 
export class Order {
  private _state: IOrderState;        
    constructor() {
      this._state = new NewOrderState();
    }
  setState(state: IOrderState): void {
      this._state = state;
     }
  cancelOrder(): void {
      this._state.cancelOrder();
     }
          
  shipOrder(): void {
      this._state.shipOrder();
}
          
  completeOrder(): void {
      this._state.completeOrder();
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

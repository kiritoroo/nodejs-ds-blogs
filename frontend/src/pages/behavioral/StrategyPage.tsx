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

export default function StrategyPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const adultTicket = new Ticket(new (PairTicketStrategy))
console.log(adultTicket.getPrice())`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.strategyPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Strategy Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Strategy thuộc nhóm các mẫu thiết kế hành vi (Behavioral Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế Strategy cho phép chọn một thuật toán từ một tập hợp các thuật toán
          khác nhau và đóng gói chúng thành các lớp riêng biệt. Mẫu này cho phép thuật toán có thể được thay đổi linh 
          hoạt trong quá trình chạy mà không ảnh hưởng đến phần còn lại của hệ thống.
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Strategy Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets 
          title="Strategy Design Pattern có các thành phần sau.">
          <li>Context (Ngữ cảnh): Đối tượng chứa thông tin về thuật toán và sử dụng một đối tượng Chiến lược để thực thi công việc.</li>
          <li>Strategy (Chiến lược): Interface hoặc lớp cơ sở chứa các phương thức để triển khai thuật toán.</li>
          <li>Concrete Strategies (Chiến lược cụ thể): Các lớp triển khai chiến lược cụ thể, cung cấp các phương thức để thực thi các thuật toán khác nhau.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Strategy Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Trong ví dụ này, chúng ta có ba chiến lược khác nhau cho việc tính toán giá vé và các thuộc tính liên quan.
          Đầu tiên, chúng ta có lớp <BlogInlineCode>ITicketStrategy</BlogInlineCode> đại diện cho giao diện chiến lược
          với các phương thức <BlogInlineCode>getPrice()</BlogInlineCode>, <BlogInlineCode>getUserCount()</BlogInlineCode>, 
          và <BlogInlineCode>isAvailableChildAttraction()</BlogInlineCode>. Tiếp theo, chúng ta có các lớp 
          cụ thể <BlogInlineCode>ChildTicketStrategy</BlogInlineCode>, <BlogInlineCode>AdultTicketStrategy</BlogInlineCode>, 
          và <BlogInlineCode>PairTicketStrategy</BlogInlineCode> triển khai 
          giao diện <BlogInlineCode>ITicketStrategy</BlogInlineCode> với các phương thức tương ứng.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Ticket Strategy
interface ITicketStrategy {
  getPrice(): number;
  getUserCount(): number;
  isAvailableChildAttraction(): boolean;
}`}
        />
        <BlogCodeBlock
          lang="ts"
          code={`// Children's ticket strategy
export class ChildTicketStrategy implements ITicketStrategy {
  getPrice = (): number => 1000; 
  getUserCount = (): number => 1;
  isAvailableChildAttraction = (): boolean => true;
}

// Adult ticket strategy
export class AdultTicketStrategy implements ITicketStrategy {
  getPrice = (): number => 3000; 
  getUserCount = (): number => 1;
  isAvailableChildAttraction = (): boolean => false;
}

// Pair ticket strategy
export class PairTicketStrategy implements ITicketStrategy {
  getPrice = (): number => 5000; 
  getUserCount = (): number => 2;
  isAvailableChildAttraction = (): boolean => false;
}`}
        />
        <BlogParagraph>
          Lớp <BlogInlineCode>Ticket</BlogInlineCode> đại diện cho ngữ cảnh và chứa một thuộc tính <BlogInlineCode>_strategy</BlogInlineCode> để 
          lưu trữ chiến lược được sử dụng. Các phương thức của lớp <BlogInlineCode>Ticket</BlogInlineCode>
          &nbsp;như <BlogInlineCode>getPrice()</BlogInlineCode>, <BlogInlineCode>getUserCount()</BlogInlineCode>,
          và <BlogInlineCode>isAvailableChildAttraction()</BlogInlineCode> được triển khai để gọi tương ứng các phương thức của chiến lược.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Ticket Context 
export class Ticket {
  private _strategy: ITicketStrategy;
  constructor(strategy: ITicketStrategy) {
    this._strategy = strategy;
  }

  getPrice = (): number => this._strategy.getPrice(); 
  getUserCount = (): number => this._strategy.getUserCount(); 
  isAvailableChildAttraction = (): boolean => this._strategy.isAvailableChildAttraction(); 
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

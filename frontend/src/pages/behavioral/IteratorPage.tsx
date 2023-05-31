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

export default function IteratorPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const aggregate = new ArrayAggregate<number>();
aggregate.addItem(1);
aggregate.addItem(2);
aggregate.addItem(3);
aggregate.addItem(4);
aggregate.addItem(5);
const iterator = aggregate.createIterator();
while (iterator.hasNext()) {
const item = iterator.next();
console.log(item);}`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.iteratorPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Mediator Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Mediator thuộc nhóm các mẫu thiết kế hành vi (Behavioral Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Một mẫu thiết kế Mediator là một mẫu thiết kế hành vi cho phép bạn giảm bớt sự phụ thuộc hỗn loạn giữa các đối tượng. Mẫu hạn chế giao tiếp trực tiếp giữa các đối tượng và buộc chúng chỉ cộng tác thông qua một đối tượng hòa giải.
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Mediator Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets 
          title="Mediator Design Pattern có các thành phần sau.">
          <li>Mediator  (Người hòa giải): Nó xác định giao diện để giao tiếp giữa các đối tượng đồng nghiệp.</li>
          <li>ConcreteMediator  (Trạng thái): Nó thực hiện giao diện hòa giải và điều phối giao tiếp giữa các đối tượng đồng nghiệp.</li>
          <li>Colleague : (Trạng thái cụ thể): Nó xác định giao diện để giao tiếp với các đồng nghiệp khác.</li>
          <li>ConcreteColleague : (Trạng thái cụ thể): Nó thực hiện giao diện đồng nghiệp và giao tiếp với các đồng nghiệp khác thông qua người hòa giải của nó.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Mediator Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
        Trong ví dụ này, chúng tôi có một thị trường nơi người dùng có thể giao tiếp với nhau thông qua <BlogInlineCode>MarketplaceMediator()</BlogInlineCode> thay vì tương tác trực tiếp với nhau. Mediator hoạt động như một trung tâm giao tiếp trung tâm và tạo điều kiện giao tiếp giữa những người dùng ( User : đối tượng).
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
interface Mediator {
  sendMessage(message: string, sender: Colleague): void;
  }
`}
        />
        <BlogCodeBlock
          lang="ts"
          code={`
export class ConcreteMediator implements Mediator {
  private colleague1: Colleague1;
  private colleague2: Colleague2;
          
  setColleague1(colleague: Colleague1): void {
      this.colleague1 = colleague;
    }
          
  setColleague2(colleague: Colleague2): void {
      this.colleague2 = colleague;
  }
          
  sendMessage(message: string, sender: Colleague): void {
      if (sender === this.colleague1) {
          this.colleague2.receiveMessage(message);
      } else if (sender === this.colleague2) {
          this.colleague1.receiveMessage(message);
      }
    }
}
          
export abstract class Colleague {
    constructor(protected mediator: Mediator) {}
          
    abstract send(message: string): void;
        abstract receiveMessage(message: string): void;
    }
          
  export class Colleague1 extends Colleague {
      send(message: string): void {
        console.log("Colleague 1 sends message:", message);
              this.mediator.sendMessage(message, this);
    }
          
    receiveMessage(message: string): void {
        console.log("Colleague 1 receives message:", message);
    }
}
          
  export class Colleague2 extends Colleague {
    send(message: string): void {
    console.log("Colleague 2 sends message:", message);
    this.mediator.sendMessage(message, this);
}
          
    receiveMessage(message: string): void {
        console.log("Colleague 2 receives message:", message);
    }
} `}
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

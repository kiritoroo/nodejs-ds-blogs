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
import { BlogInlineCode } from "@comp/Blog/BlogInlineCode";
import { BlogCodeBlock } from "@comp/Blog/BlogCodeBlock";

interface Props {
  info: TDesignPatternData;
}

export default function TemplateMethodPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const developmentTaskManager = new DevelopmentTaskManager();
developmentTaskManager.manageTask();

const testingTaskManager = new TestingTaskManager();
testingTaskManager.manageTask();`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.templateMethodPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Template Method Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Template Method thuộc nhóm các mẫu thiết kế hành vi (Behavioral Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Mẫu này cho phép bạn xác định một bản mẫu (template) cho một thuật toán và để các lớp con triển khai các phần cụ thể của thuật toán đó.
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Template Method Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets
          title="Template Method Design Pattern có các thành phần sau.">
          <li>AbstractClass: Định nghĩa bản mẫu của thuật toán trong một phương thức template method. Nó cũng có thể chứa các phương thức khác được sử dụng bởi template method.</li>
          <li>ConcreteClass: Triển khai các phần cụ thể của thuật toán trong phương thức template method đã được định nghĩa trong lớp cơ sở.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Template Method Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Trong ví dụ này, chúng ta có lớp <BlogInlineCode>TaskManager</BlogInlineCode> là lớp cơ sở triển khai template method <BlogInlineCode>manageTask()</BlogInlineCode>. Lớp 
          con <BlogInlineCode>DevelopmentTaskManager</BlogInlineCode> và <BlogInlineCode>TestingTaskManager</BlogInlineCode> triển khai các phương thức cụ thể <BlogInlineCode>assignTask()</BlogInlineCode> và <BlogInlineCode>performTask()</BlogInlineCode>.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Abstract Class
export abstract class TaskManager {
  public manageTask(): void {
    this.prepareTask();
    this.assignTask();
    this.performTask();
    this.followUpTask();
  }

  protected prepareTask(): void {
    console.log('TaskManager: Preparing task');
  }

  protected abstract assignTask(): void;

  protected abstract performTask(): void;

  protected followUpTask(): void {
    console.log('TaskManager: Following up on task');
  }
}

// Concrete Class
export class DevelopmentTaskManager extends TaskManager {
  protected assignTask(): void {
    console.log('DevelopmentTaskManager: Assigning development task');
  }

  protected performTask(): void {
    console.log('DevelopmentTaskManager: Performing development task');
  }
}

// Concrete Class
export class TestingTaskManager extends TaskManager {
  protected assignTask(): void {
    console.log('TestingTaskManager: Assigning testing task');
  }

  protected performTask(): void {
    console.log('TestingTaskManager: Performing testing task');
  }

  protected followUpTask(): void {
    console.log('TestingTaskManager: Following up on testing task');
  }
}`}
        />
        <BlogParagraph>
          Trong đó, <BlogInlineCode>DevelopmentTaskManager</BlogInlineCode> triển khai các bước cụ thể cho công việc phát triển, trong khi <BlogInlineCode>TestingTaskManager</BlogInlineCode> triển khai 
          các bước cụ thể cho công việc kiểm thử. Cả hai lớp đều kế thừa phương thức <BlogInlineCode>manageTask()</BlogInlineCode> từ lớp <BlogInlineCode>TaskManager</BlogInlineCode> và triển khai các 
          phương thức cụ thể theo nhu cầu.
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế Template Method giúp bạn xác định một bản mẫu cho quy trình chung và để các lớp con cung cấp các bước cụ thể. Điều này giúp tách biệt logic chung và logic cụ thể, cho phép bạn mở rộng và tái sử dụng mã dễ dàng khi có thay đổi trong các bước cụ thể của quy trình.
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
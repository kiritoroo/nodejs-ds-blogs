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

export default function MementoPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const originator = new Originator();
const caretaker = new Caretaker();
originator.setState("State 1");
caretaker.addMemento(originator.saveStateToMemento());
originator.setState("State 2");
caretaker.addMemento(originator.saveStateToMemento());
originator.setState("State 3");
const memento1 = caretaker.getMemento(0);
const memento2 = caretaker.getMemento(1);
if (memento1 && memento2) {
  originator.restoreStateFromMemento(memento1);
  console.log(originator.getState()); 
  originator.restoreStateFromMemento(memento2);
  console.log(originator.getState()); 
}`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.mementoPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Memento Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Memento thuộc nhóm các mẫu thiết kế hành vi (Behavioral Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Một mẫu thiết kế Memento cho phép người lưu trữ và hồi phục các phiên bản cũ của 1 object mà không can thiệp vào nội dung của object đó.
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Memento Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets 
          title="Memento Design Pattern có các thành phần sau.">
          <li>Originator (Người khởi tạo): Xác định giao diện để khách hàng tương tác. Nó duy trì các tham chiếu đến các đối tượng trạng thái cụ thể có thể được sử dụng để xác định trạng thái hiện tại của các đối tượng.</li>
          <li>Memento (Lưu trữ): Là object lưu giá trị, được xem như là một snapshot của Originator. Trong thực tiễn nó là immutable class (class không thay đổi được) và truyền data vào 1 lần duy nhất khi construct.</li>
          <li>Caretaker (Người nắm giữ): Giữ câu trả lời cho các câu hỏi "khi nào" và "vì sao" cho những thời điểm capture lại state của Originator và lúc restore lại state. Caretaker lưu trữ 1 stack các mementos. Khi Originator cần đi lùi về history, Caretaker lấy memento trên cùng của stack và truyền vào restore method của Originator.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Memento Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
        Trong ví dụ này, chúng ta có một lớp <BlogInlineCode>Originator()</BlogInlineCode> đại diện cho một đối tượng có trạng thái cần được lưu và khôi phục. 
        Nó có các phương thức để thiết lập và nhận trạng thái của nó. Phương thức <BlogInlineCode>saveStateToMemento()</BlogInlineCode> tạo một Memento đối tượng với trạng thái hiện tại và phương thức <BlogInlineCode>restoreStateFromMemento()</BlogInlineCode>khôi phục trạng thái từ một đối tượng Memento đã cho.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
export class Originator {
  private state: string;
  setState(state: string): void {
      this.state = state;
  }
          
  getState(): string {
    return this.state;
  }
          
  saveStateToMemento(): Memento {
    return new Memento(this.state);
  }
          
  restoreStateFromMemento(memento: Memento): void {
    this.state = memento.getState();
  }
}
`}
        />
          <BlogParagraph>
        Lớp <BlogInlineCode>Memento()</BlogInlineCode> là một thùng chứa dữ liệu đơn giản chứa trạng thái của Originator. Nó có một phương thức <BlogInlineCode>getState()</BlogInlineCode>để truy xuất trạng thái đã lưu.
        Lớp <BlogInlineCode>Caretaker()</BlogInlineCode>  chịu trách nhiệm lưu trữ và quản lý Memento  đối tượng. Nó có các phương thức để thêm Memento vào bộ sưu tập và truy xuất Memento theo chỉ mục.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
export class Memento {
  private state: string;
  constructor(state: string) {
    this.state = state;
  }
          
 getState(): string {
    return this.state;
  }
}
          
export class Caretaker {
  private mementos: Memento[];       
  constructor() {
    this.mementos = []; 
  }
          
addMemento(memento: Memento): void {
  this.mementos.push(memento);
  }
          
getMemento(index: number): Memento | undefined {
  return this.mementos[index];
}
}`}
        />
        <BlogParagraph>
        Trong ví dụ này , chúng ta đặt sẽ tạo 2 đối tượng là <BlogInlineCode>Originator()</BlogInlineCode> và <BlogInlineCode>Caretaker()</BlogInlineCode> .Sau đó chúng
        ta đặt  <BlogInlineCode>Originator()</BlogInlineCode> thành trạng thái 1 và lưu vào Memento .Sau đó chúng ta sẽ thay đổi  <BlogInlineCode>Originator()</BlogInlineCode> thành trạng thái 2 và lưu vào Memento 
        Cuối cùng chúng ta sẽ thay đổi <BlogInlineCode>Originator()</BlogInlineCode> thành trạng thái 3 và sau đó chúng ta sẽ truy xuất vào trạng thái 1 và 2 bằng việc sử dụng Memento
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

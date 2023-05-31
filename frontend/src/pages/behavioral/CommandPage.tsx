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

export default function CommandPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const remoteControl = new RemoteControl();
const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);
remoteControl.setCommand(lightOnCommand);
remoteControl.executeCommand(0); 
remoteControl.setCommand(lightOffCommand);
remoteControl.executeCommand(0); 
remoteControl.undo(); `);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.commandPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Command Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Command thuộc nhóm các mẫu thiết kế hành vi (Behavioral Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Một mẫu thiết kế Command đóng gói một yêu cầu dưới dạng một đối tượng, do đó cho phép chúng tôi tham số
           hóa các đối tượng khác với các yêu cầu, 
           hàng đợi hoặc yêu cầu nhật ký khác nhau và hỗ trợ các hoạt động không thể hoàn tác.
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Command Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets 
          title="Command Design Pattern có các thành phần sau.">
          <li>Command  (Yêu cầu): là một interface hoặc abstract class, chứa một phương thức trừu tượng thực thi (execute) một hành động (operation). Request sẽ được đóng gói dưới dạng Command.</li>
          <li>ConcreteCommand  (Lệnh yêu cầu): là các implementation của Command. Định nghĩa một sự gắn kết giữa một đối tượng Receiver và một hành động. Thực thi execute() bằng việc gọi operation đang hoãn trên Receiver.</li>
          <li>Client: (Khách hàng): tiếp nhận request từ phía người dùng, đóng gói request thành ConcreteCommand thích hợp và thiết lập receiver của nó.</li>
          <li>Invoker: (Người sử dụng): tiếp nhận ConcreteCommand từ Client và gọi execute() của ConcreteCommand để thực thi request.</li>
          <li>Receiver : (Người nhận): đây là thành phần thực sự xử lý business logic cho case request. Trong phương thức execute() của ConcreteCommand chúng ta sẽ gọi method thích hợp trong Receiver.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Command Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
        Trong ví dụ này, chúng ta có một lớp<BlogInlineCode>Light()</BlogInlineCode>đại diện cho một bóng đèn. Nó có các phương pháp để bật và tắt đèn.
        Các lớp <BlogInlineCode>LightOnCommand ()</BlogInlineCode> và <BlogInlineCode>LightOffCommand()</BlogInlineCode>là các triển khai cụ thể của Command giao diện. Mỗi lớp lệnh đóng gói một thao tác cụ thể trên đối tượng <BlogInlineCode>Light()</BlogInlineCode>.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
interface Command {
  execute(): void;
  undo(): void;
}
`}
        />
        <BlogCodeBlock
          lang="ts"
          code={`
export class Light {    
  private isOn: boolean;
  constructor() {
    this.isOn = false;
  }
          
  turnOn(): void {
    this.isOn = true;
    console.log("Light turned on");
  }
          
  turnOff(): void {
    this.isOn = false;
    console.log("Light turned off");
    }
}
          
export  class LightOnCommand implements Command {
    private light: Light;     
    constructor(light: Light) {
        this.light = light;
    }
          
    execute(): void {
        this.light.turnOn();
    }
          
    undo(): void {
        this.light.turnOff();
    }
}
          
export  class LightOffCommand implements Command {
  private light: Light;
    constructor(light: Light) {
        this.light = light;
    }
          
    execute(): void {
        this.light.turnOff();
    }
          
    undo(): void {
        this.light.turnOn();
    }
} `}
        />
        <BlogParagraph>
        Lớp<BlogInlineCode>RemoteControl ()</BlogInlineCode>  hoạt động như một người gọi và nắm giữ một tập hợp các lệnh. Nó cung cấp các phương thức để thiết lập một lệnh và thực thi nó. Nó cũng có một <BlogInlineCode>undo()</BlogInlineCode> phương thức để hoàn tác lệnh đã thực hiện cuối cùng.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={` 
export class RemoteControl {
  private commands: Command[];
  private undoCommand: Command | null;
  constructor() {
    this.commands = [];
    this.undoCommand = null;
  }
          
  setCommand(command: Command): void {
    this.commands.push(command);
  }
  executeCommand(index: number): void {
    if (index >= 0 && index < this.commands.length) {
        const command = this.commands[index];
        command.execute();
        this.undoCommand = command;
      }
    }
          
    undo(): void {
      if (this.undoCommand) {
      this.undoCommand.undo();
      }
    }
}
`}
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

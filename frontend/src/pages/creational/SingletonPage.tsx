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
import {
  TBlogSectionData,
  TBlogTopicData,
  TDesignPatternData,
} from "@type/types";
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

export default function SingletonPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
  const instance1 = Singleton.getInstance();
  instance1.someMethod(); 
  const instance2 = Singleton.getInstance();
  instance2.someMethod(); 
`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);

  React.useEffect(() => {
    setLetterCount(
      contentSectionRef.current
        ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, "")
            .length
        : 0
    );
  }, [contentSectionRef.current]);

  const handleCallAPI = React.useCallback(() => {
    api.singletonPOST(codeInput).then((res: any) => {
      setRunOutput(res.result);
    });
  }, [codeInput]);

  const dataSection1: TBlogSectionData = {
    header: " Singleton Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế  Singleton thuộc nhóm các mẫu mô hình kết cấu (Creational
          Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Một mẫu thiết kế  Singleton  là đảm bảo rằng một lớp chỉ có duy nhất một thể hiện (instance) và cung cấp một điểm truy cập toàn cục đến thể hiện đó.
        </BlogQuote>
      </React.Fragment>
    ),
  };

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Singleton Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets title="Singleton Design Pattern có các thành phần sau.">
          <li>
          Lớp Singleton: Lớp chứa định nghĩa và triển khai mẫu Singleton. Lớp này có một constructor private để ngăn việc tạo thể hiện trực tiếp từ bên ngoài và một phương thức public static để truy cập đến thể hiện duy nhất của lớp.
          </li>
          <li>Thể hiện duy nhất (Instance): Đây là thể hiện duy nhất của lớp Singleton, được tạo và lưu trữ trong lớp Singleton. Thể hiện này được truy cập thông qua phương thức static của lớp Singleton.</li>
          <li>
          Phương thức getInstance(): Đây là phương thức static của lớp Singleton, được sử dụng để truy cập đến thể hiện duy nhất của lớp. Phương thức này kiểm tra xem thể hiện đã tồn tại chưa, nếu chưa, nó tạo mới thể hiện và trả về nó. Nếu thể hiện đã tồn tại, nó trực tiếp trả về thể hiện đó.
          </li>
        </BlogBullets>
      </React.Fragment>
    ),
  };

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Singleton Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
        Trong ví dụ này, lớp <BlogInlineCode>Singleton()</BlogInlineCode> có một hàm tạo riêng để ngăn việc khởi tạo trực tiếp từ bên ngoài lớp. Phương thức tĩnh <BlogInlineCode>getInstance()</BlogInlineCode>  cung cấp một cách để truy cập một thể hiện duy nhất của lớp. Nó kiểm tra xem thể hiện đã được tạo chưa và nếu chưa, nó sẽ tạo một thể hiện mới. Các cuộc gọi tiếp theo tới <BlogInlineCode>getInstance()</BlogInlineCode> sẽ trả về cùng một phiên bản.
        Trong ví dụ sử dụng, chúng ta tạo hai thể hiện của lớp <BlogInlineCode>Singleton()</BlogInlineCode>  bằng phương thức <BlogInlineCode>getInstance()</BlogInlineCode>.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
export class Singleton {
  private static instance: Singleton;
  private constructor() {

  }
  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
      }
      return Singleton.instance;
    }
          
      someMethod(): void {  
      console.log("Singleton method called");
    }
}                  
`}
        />
        <BlogParagraph>
        Mẫu thiết kế Singleton đảm bảo rằng chỉ có một phiên bản của một lớp tồn tại trong toàn bộ ứng dụng và cung cấp một điểm truy cập toàn cầu cho nó. Nó thường được sử dụng trong các trường hợp có nhiều phiên bản của một lớp sẽ gây ra sự cố hoặc khi cần có một tài nguyên được chia sẻ duy nhất.
        </BlogParagraph>
       
      </React.Fragment>
    ),
  };

  const dataSection4: TBlogSectionData = {
    header: "Demo",
    content: (
      <React.Fragment>
        <BlogParagraph>Chương trình Demo</BlogParagraph>
        <BlogCodeEditor
          lang="js"
          code={codeInput}
          setCode={setCodeInput}
          onRun={handleCallAPI}
          output={runOutput}
        />
      </React.Fragment>
    ),
  };

  return (
    <React.Fragment>
      <ArticleHeader>
        <ArticleTitle>【Creational】 {info.name}</ArticleTitle>
      </ArticleHeader>
      <ArticleBody>
        <ViewContent ref={contentSectionRef}>
          <BlogTopic data={info.topics} />
          <BlogSection data={dataSection1} />
          <BlogSection data={dataSection2} />
          <BlogSection data={dataSection3} />
          <BlogSection data={dataSection4} />
        </ViewContent>
        <ViewSidebar>
          <SidebarInfo
            author={info.author}
            publish={`${info.publish.getFullYear()}/${
              info.publish.getMonth() + 1
            }/${info.publish.getDate()}`}
            letterCount={letterCount}
          />
          <Space />
          <SidebarToc />
        </ViewSidebar>
      </ArticleBody>
    </React.Fragment>
  );
}

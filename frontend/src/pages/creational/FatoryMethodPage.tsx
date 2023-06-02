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

export default function FactoryMethodPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
  const factory = new ProductFactory();
  const productA = factory.createProduct("A");
  console.log(productA.name); 
  console.log(productA.price); 
  console.log(productA.getDescription());
  const productB = factory.createProduct("B");
  console.log(productB.name); 
  console.log(productB.price); 
  console.log(productB.getDescription());
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
    api.factoryPOST(codeInput).then((res: any) => {
      setRunOutput(res.result);
    });
  }, [codeInput]);

  const dataSection1: TBlogSectionData = {
    header: "Factory Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Factory thuộc nhóm các mẫu mô hình kết cấu (Creational
          Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Một mẫu thiết kế Factory là mẫu thiết kế cho việc khởi tạo đối tượng
          của lớp Khi chúng ta muốn tạo ra một object của một type nào đấy,
          nhưng chúng ta không biết rõ mình sẽ phải tạo ra cái gì, mà nó phải
          dựa vào một số điều kiện business logic đầu vào để tạo ra object tương
          ứng, thì chúng ta có thể sử dụng Factory Method này.
        </BlogQuote>
      </React.Fragment>
    ),
  };

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Factory Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets title="Factory Design Pattern có các thành phần sau.">
          <li>
            Product : Định nghĩa một khuôn mẫu (interface) của các đối tượng mà
            factory method tạo ra.
          </li>
          <li>Concreteproduct: Các lớp được cài đặt khuôn mẫu product.</li>
          <li>
            Creator : Khai báo factory method, trả về kiểu đối tượng thuộc kiểu
            product. Creator cũng có thể định nghĩa một cài đặt mặc định của
            factory method mà giá trị trả về là một đối tượng concreteproduct
            mặc định.
          </li>
          <li>
            ConcreteCrator : Ghi đè factory method để trả về một instance của
            concreteproduct.
          </li>
        </BlogBullets>
      </React.Fragment>
    ),
  };

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Factory Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Trong ví dụ này, chúng ta có một giao diện{" "}
          <BlogInlineCode>Product()</BlogInlineCode> trừu tượng xác định các
          thuộc tính và phương thức chung cho tất cả các sản phẩm. Chúng tôi có
          hai lớp sản phẩm cụ thể,<BlogInlineCode>ProductA()</BlogInlineCode> và{" "}
          <BlogInlineCode>ProductB()</BlogInlineCode> , triển khai giao diện Sản
          phẩm.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
interface Product {
  name: string;
  price: number;
  getDescription(): string;
}
`}
        />
        <BlogParagraph>
          Lớp <BlogInlineCode>ProductFactory()</BlogInlineCode> đóng vai trò là
          nhà máy chịu trách nhiệm tạo các đối tượng sản phẩm dựa trên một loại
          nhất định. Phương thức{" "}
          <BlogInlineCode>createProduct()</BlogInlineCode> nhận một tham số kiểu
          và trả về một thể hiện của sản phẩm tương ứng. Trong trường hợp này,
          chúng tôi có "A" và "B" là các loại hợp lệ.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
export class ProductA implements Product {
    name: string;
    price: number;
    constructor() {
        this.name = "Product A";
        this.price = 10;
    }
          
    getDescription(): string {
        return "This is Product A";
      }
}
          
export class ProductB implements Product {
    name: string;
    price: number;
    constructor() {
        this.name = "Product B";
        this.price = 20;
    }
          
    getDescription(): string {
        return "This is Product B";
    }
}
          
export class ProductFactory {
    createProduct(type: string): Product {
      if (type === "A") {
            return new ProductA();
      } else if (type === "B") {
            return new ProductB();
      } else {
            throw new Error("Invalid product type");
      }
    }
}
`}
        />
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

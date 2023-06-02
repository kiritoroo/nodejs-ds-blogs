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

export default function BuilderPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
  const product = new ProductBuilder()
    .setName("Product A")
    .setPrice(10)
    .setDescription("This is Product A")
    .build();
  console.log(product.getInfo());
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
    api.builderPOST(codeInput).then((res: any) => {
      setRunOutput(res.result);
    });
  }, [codeInput]);

  const dataSection1: TBlogSectionData = {
    header: " Builder Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế  Builder thuộc nhóm các mẫu mô hình kết cấu (Creational
          Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Một mẫu thiết kế  Builder là tách quá trình xây dựng đối tượng phức tạp ra khỏi việc tạo đối tượng, cho phép xây dựng các đối tượng phức tạp theo cách linh hoạt và dễ dàng.
        </BlogQuote>
      </React.Fragment>
    ),
  };

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Builder Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets title="Builder Design Pattern có các thành phần sau.">
          <li>
          Director: Là lớp hoặc phần mềm phụ trách xây dựng đối tượng cuối cùng. Director tương tác với Builder để thực hiện các bước xây dựng đối tượng theo đúng trình tự. Director không biết hoặc quan tâm đến chi tiết cụ thể về xây dựng đối tượng, chỉ quan tâm đến việc sử dụng Builder để tạo đối tượng.
          </li>
          <li>Builder : Là giao diện hoặc lớp trừu tượng mô tả các bước xây dựng đối tượng và cung cấp các phương thức để thêm các thành phần cho đối tượng. Mỗi Builder cụ thể có thể triển khai việc xây dựng đối tượng theo cách riêng của nó.</li>
          <li>
          Concrete Builders : Là các lớp triển khai Builder, cung cấp các phương thức cụ thể để xây dựng các thành phần của đối tượng. Mỗi Concrete Builder xác định cách xây dựng một phiên bản cụ thể của đối tượng.
          </li>
          <li>
          Product : Là đối tượng cuối cùng được xây dựng bởi Builder. Nó là kết quả cuối cùng của quá trình xây dựng và chứa các thành phần đã được xây dựng bởi Builder.
          </li>
        </BlogBullets>
      </React.Fragment>
    ),
  };

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Builder Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
        Trong ví dụ này, chúng ta có một lớp <BlogInlineCode>Product()</BlogInlineCode> đại diện cho một sản phẩm có các thuộc tính như tên, giá và mô tả. Lớp ProductBuilder chịu trách nhiệm xây dựng đối tượng Sản phẩm theo từng bước.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
export class Product {
  private name: string;
  private price: number;
  private description: string;       
  constructor(builder: ProductBuilder) {
      this.name = builder.name;
      this.price = builder.price;
      this.description = builder.description;
  }        
`}
        />
        <BlogParagraph>
        Lớp  <BlogInlineCode>ProductBuilder()</BlogInlineCode>cung cấp các phương thức như
        <BlogInlineCode>setName()</BlogInlineCode> , <BlogInlineCode>setPrice()</BlogInlineCode> và <BlogInlineCode>setDescription()</BlogInlineCode>  
         để đặt giá trị của các thuộc tính sản phẩm. 
         Mỗi phương thức trả về chính đối tượng trình tạo, 
         cho phép xâu chuỗi phương thức. 
         Phương thức xây dựng được sử dụng để tạo một thể hiện của 
         lớp <BlogInlineCode>Product()</BlogInlineCode> với các giá trị được đặt trong trình tạo.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
export  class ProductBuilder {
    name: string;
    price: number;
    description: string;
          
    setName(name: string): ProductBuilder {
        this.name = name;
        return this;
    }
          
    setPrice(price: number): ProductBuilder {
        this.price = price;
        return this;
    }
          
    setDescription(description: string): ProductBuilder {
        this.description = description;
        return this;
    }
    build(): Product {
      return new Product(this);
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

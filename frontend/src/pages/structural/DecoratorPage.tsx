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

export default function DecoratorPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
  const margherita = new Margherita();
  console.log(margherita.getDescription()); 
  console.log(margherita.getCost()); 
  const margheritaWithTomato = new TomatoTopping(margherita);
  console.log(margheritaWithTomato.getDescription()); 
  console.log(margheritaWithTomato.getCost());
  const margheritaWithTomatoAndCheese = new CheeseTopping(margheritaWithTomato);
  console.log(margheritaWithTomatoAndCheese.getDescription()); 
  console.log(margheritaWithTomatoAndCheese.getCost());  `);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.decoratorPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Decorator Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Decorator thuộc nhóm các mẫu mô hình kết cấu (Structural Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Một mẫu thiết kế Decorator sẽ linh động thay đổi tính chất (functionality) đã có trong một đối tượng khi chương trình đang chạy (runtime) mà không ảnh hưởng đến các tình chất đã tồn tại của các đối tượng khác.
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Decorator Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets 
          title="Decorator Design Pattern có các thành phần sau.">
          <li>Component : Giao diện (interface) chung để các đối tượng cần thêm chức năng trong quá trình chạy thì triển khai giao diện này.</li>
          <li>ConcreteComponent: Một cài đặt cho giao diện Component mà nó định nghĩa một đối tượng cần thêm các chức năng trong quá trình chạy.</li>
          <li>Decorator : Một lớp trừu tượng dùng để duy trì một tham chiếu của đối tượng thành phần và đồng thời cài đặt các thành phần của giao diện.</li>
          <li>ConcreteDecorator :  Một cài đặt của Decorator, nó cài đặt thêm các thành phần vào đầu của các đối tượng thành phần.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Decorator Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
        Trong ví dụ này, chúng ta có một giao diện  <BlogInlineCode>Pizza()</BlogInlineCode> đại diện cho đối tượng base pizza. Lớp <BlogInlineCode>Margherita()</BlogInlineCode>là một triển khai cụ thể của giao diện Pizza. 
        Sau đó, chúng ta có một lớp trừu tượng <BlogInlineCode>PizzaDecorator()</BlogInlineCode>triển khai giao diện <BlogInlineCode>Pizza()</BlogInlineCode> và đóng vai trò là lớp cơ sở cho các trình trang trí lớp trên bề mặt khác nhau.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
interface Pizza {
  getDescription(): string;
  getCost(): number;
}
`}
        />
         <BlogParagraph>
         Các lớp <BlogInlineCode>TomatoTopping()</BlogInlineCode> và <BlogInlineCode>CheeseTopping()</BlogInlineCode>mở rộng lớp <BlogInlineCode>PizzaDecorator()</BlogInlineCode> và cung cấp hành vi bổ sung bằng cách ghi đè các phương thức <BlogInlineCode>getDescription()</BlogInlineCode> và <BlogInlineCode>getCost()</BlogInlineCode>.
         Cuối cùng, chúng tôi tạo các phiên bản của chiếc bánh pizza và trang trí chúng bằng nhiều lớp phủ khác nhau bằng cách sử dụng các công cụ trang trí. Mỗi người trang trí thêm mô tả và chi phí của riêng mình cho chiếc bánh pizza.
         Mẫu Decorator cho phép chúng ta tự động thêm hoặc sửa đổi hành vi của một đối tượng trong thời gian chạy bằng cách bọc nó bằng các bộ trang trí.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
export  class Margherita implements Pizza {
  getDescription(): string {
    return "Margherita Pizza";
  }
  getCost(): number {
    return 5.99;
  }
}
export  abstract class PizzaDecorator implements Pizza {
  protected pizza: Pizza;
  constructor(pizza: Pizza) {
    this.pizza = pizza;
  }
  getDescription(): string {
    return this.pizza.getDescription();
  }
          
  getCost(): number {
    return this.pizza.getCost();
  }
}
export  class TomatoTopping extends PizzaDecorator {
    getDescription(): string {
        return this.pizza.getDescription() + ", with Tomato";
    }
    getCost(): number {
        return this.pizza.getCost() + 3.5;
    }
}
          
export  class CheeseTopping extends PizzaDecorator {
    getDescription(): string {
      return this.pizza.getDescription() + ", with Cheese";
    }
          
    getCost(): number {
      return this.pizza.getCost() + 5.0;
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
        <ArticleTitle>【Structural】 { info.name }</ArticleTitle>
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

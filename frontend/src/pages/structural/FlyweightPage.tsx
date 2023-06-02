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

export default function FlyweightPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
  const shapeFactory = new ShapeFactory();
  const redCircle = shapeFactory.getCircle("red");
  redCircle.draw(10, 10);
  const blueCircle = shapeFactory.getCircle("blue");
  blueCircle.draw(20, 20);
  const greenCircle = shapeFactory.getCircle("green");
  greenCircle.draw(30, 30);
  const redCircleAgain = shapeFactory.getCircle("red");
  redCircleAgain.draw(40, 40); `);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.flyweightPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Flyweight Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Flyweight thuộc nhóm các mẫu mô hình kết cấu (Structural Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Một mẫu thiết kế Flyweight là một mẫu thiết kế cấu trúc cho phép bạn lắp nhiều đối tượng hơn vào dung lượng RAM có sẵn bằng cách chia sẻ các phần trạng thái chung giữa nhiều đối tượng thay vì giữ tất cả dữ liệu trong mỗi đối tượng.  
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Flyweight Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets 
          title="Flyweight Design Pattern có các thành phần sau.">
          <li>Mô hình Flyweight chỉ đơn thuần là một sự tối ưu hóa cho hệ thống. Trước khi áp dụng nó, hãy đảm bảo rằng chương trình có vấn đề tiêu thụ RAM liên quan đến việc có một số lượng lớn các đối tượng tương tự trong bộ nhớ cùng một lúc.</li>
          <li>Class Flyweight chứa phần trạng thái ban đầu của đối tượng có thể được chia sẻ giữa nhiều đối tượng. Cùng một đối tượng flyweight có thể được sử dụng trong nhiều context khác nhau. Trạng thái được lưu trữ bên trong một flyweight được gọi là “intrinsic”. Trạng thái được truyền cho các phương thức của flyweight được gọi là “extrinsic”.</li>
          <li>Class Context chứa trạng thái extrinsic. Khi một context được ghép nối với một trong các đối tượng flyweight, nó đại diện cho trạng thái đầy đủ của đối tượng ban đầu.</li>
          <li>Client ( Các class sử dụng Flyweight ) tính toán hoặc lưu trữ trạng thái extrinsic của Flyweights. Từ góc độ client, Flyweight là một đối tượng mẫu có thể được cấu hình trong thời gian chạy bằng cách chuyển một số dữ liệu theo ngữ cảnh vào các tham số của các phương thức của nó.</li>
         
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Flyweight Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
        Trong ví dụ này, giao diện <BlogInlineCode>Shape()</BlogInlineCode> đại diện cho các đối tượng <BlogInlineCode>flyweight()</BlogInlineCode> và lớp <BlogInlineCode>Circle()</BlogInlineCode> là một triển khai cụ thể của giao diện <BlogInlineCode>Shape()</BlogInlineCode>. 
        <BlogInlineCode>ShapeFactory()</BlogInlineCode> hoạt động như một nhà máy sản xuất vật nặng, quản lý việc tạo và tái sử dụng các vật thể có trọng lượng nhẹ.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
interface Shape {
  draw(x: number, y: number): void;
}
`}
        />
         <BlogParagraph>
         Khi mã máy khách yêu cầu một vòng tròn có màu cụ thể từ nhà máy, nhà máy sẽ kiểm tra xem đã tồn tại đối tượng <BlogInlineCode>flyweight()</BlogInlineCode>  có màu đó chưa. Nếu đúng như vậy, trọng lượng bay hiện có sẽ được trả về. Nếu không, một quả cân bay mới sẽ được tạo và lưu trữ trong nhà máy để tái sử dụng trong tương lai.
          Bằng cách chia sẻ các đối tượng <BlogInlineCode>flyweight()</BlogInlineCode> , chúng tôi tránh tạo ra các trường hợp dư thừa của các vòng tròn có cùng màu. Cách tiếp cận này làm giảm mức tiêu thụ bộ nhớ khi xử lý một số lượng lớn các đối tượng tương tự.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
export class Circle implements Shape {
    private color: string;
    constructor(color: string) {
      this.color = color;
    }
          
    draw(x: number, y: number): void {
     console.log(Drawing a this.color circle at x, y);
     }
   }
export class ShapeFactory {
    private circleMap: { [color: string]: Circle } = {};
        getCircle(color: string): Circle {
        if (!this.circleMap[color]) {
          this.circleMap[color] = new Circle(color);
        }    
         return this.circleMap[color];
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

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

export default function BridgePage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
  const vectorRenderer = new VectorRenderer();
  const rasterRenderer = new RasterRenderer();
  const circle = new ShapeWithRenderer(vectorRenderer);
  circle.draw(); 
  const rectangle = new ShapeWithRenderer(rasterRenderer);
  rectangle.draw(); `);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.bridgePOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Bridge Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Bridge thuộc nhóm các mẫu mô hình kết cấu (Structural Design Patterns)
        </BlogParagraph>
        <BlogQuote>
          Một mẫu thiết kế Bridge được sử dụng để tách abstraction (trừu tượng) ra khỏi implement (triển khai) của nó, giúp cho 2 thành phần này có thể hoạt động một cách độc lập.
          Trường hợp khi  thành phần trừu tượng thay đổi thì không làm thay đổi các thành phần triển khai của nó
        </BlogQuote>
      </React.Fragment>
    )
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Bridge Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets 
          title="Bridge Design Pattern có các thành phần sau.">
          <li>Abstraction  (Lớp trừu tượng):Định nghĩa giao diện của lớp trừu tượng, quản lý việc tham chiếu đến đối tượng hiện thực cụ thể (Implementation).</li>
          <li>Refined Abstraction (Trừu tượng tinh chế): Kế thừa Abstraction.</li>
          <li>Implementation (Thực hiện): Định nghĩa giao diện cho các lớp hiện thực. Thông thường nó là interface định ra các tác vụ nào đó của Abstraction.</li>
          <li>ConcreteImplementation (Thực hiện cụ thể): Kế thừa Implementation và định nghĩa chi tiết hàm thực thi.</li>
        </BlogBullets>
      </React.Fragment>
    )
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Bridge Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
        Trong ví dụ này, chúng ta có giao diện <BlogInlineCode>Shape()</BlogInlineCode> xác định phương thức <BlogInlineCode>draw()</BlogInlineCode> , đại diện cho sự trừu tượng. Các lớp <BlogInlineCode>Circle()</BlogInlineCode> và <BlogInlineCode>Rectangle()</BlogInlineCode> là các lớp triển khai cụ thể của giao diện Shape.
        Tiếp theo, chúng ta giao diện <BlogInlineCode>Renderer</BlogInlineCode> xác định phương thức <BlogInlineCode>renderShape()</BlogInlineCode>, đại diện cho người thực hiện. Các lớp <BlogInlineCode>VectorRenderer()</BlogInlineCode>  và <BlogInlineCode>RasterRenderer()</BlogInlineCode> là các triển khai cụ thể của giao diện Renderer.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`
interface Shape {
  draw(): void;
}
interface Renderer {
  renderShape(): void;
}
`}
        />
        <BlogCodeBlock
          lang="ts"
          code={`
export class VectorRenderer implements Renderer {
  renderShape(): void {
  console.log("Rendering shape in vector format");
  }
}
export  class RasterRenderer implements Renderer {
  renderShape(): void {
  console.log("Rendering shape in raster format");
  }
}
export class ShapeWithRenderer implements Shape {
  constructor(private renderer: Renderer) {}       
  draw(): void {
      this.renderer.renderShape();
  }
} `}
        />
        <BlogParagraph>
        Lớp <BlogInlineCode>ShapeWithRenderer()</BlogInlineCode>  là sự trừu tượng hóa tinh tế. Nó nhận một  <BlogInlineCode>Renderer()</BlogInlineCode>đối tượng trong hàm tạo của nó và ủy quyền  <BlogInlineCode>draw()</BlogInlineCode> thao tác cho phương thức  <BlogInlineCode>renderShape()</BlogInlineCode> của trình kết xuất được cung cấp.
        Trong phần sử dụng, chúng tôi tạo các phiên bản của trình kết xuất cụ thể  <BlogInlineCode>VectorRenderer()</BlogInlineCode> và  <BlogInlineCode>RasterRenderer()</BlogInlineCode> . Sau đó, chúng tôi tạo các phiên bản trừu tượng được tinh chỉnh, <BlogInlineCode>ShapeWithRenderer()</BlogInlineCode> , bằng cách chuyển đối tượng trình kết xuất thích hợp. Khi chúng ta gọi phương thức draw trên các đối tượng hình dạng, nó sẽ gọi bên trong  <BlogInlineCode>renderShapephương()</BlogInlineCode>  thức tương ứng của trình kết xuất được chỉ định.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={` 
export class VectorRenderer implements Renderer {
    renderShape(): void {
      console.log("Rendering shape in vector format");
    }
}
          
export class RasterRenderer implements Renderer {
    renderShape(): void {
      console.log("Rendering shape in raster format");
    }
}
export class ShapeWithRenderer implements Shape {
    constructor(private renderer: Renderer) {}     
    draw(): void {
      this.renderer.renderShape();
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

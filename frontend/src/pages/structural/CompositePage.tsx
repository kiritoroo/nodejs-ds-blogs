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
import { BlogSection } from "@comp/Blog/BlogSection";
import { BlogQuote } from "@comp/Blog/BlogQuote";
import { BlogBullets } from "@comp/Blog/BlogBullets";
import { BlogCodeBlock } from "@comp/Blog/BlogCodeBlock";
import { BlogInlineCode } from "@comp/Blog/BlogInlineCode";

interface Props {
  info: TDesignPatternData;
}

export default function CompositePage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const file1 = new File("file1.txt", 100);
const file2 = new File("file2.txt", 200);
const file3 = new File("file3.txt", 150);

const directory1 = new Directory("Folder 1");
directory1.add(file1);
directory1.add(file2);

const directory2 = new Directory("Folder 2");
directory2.add(file3);

const root = new Directory("Root");
root.add(directory1);
root.add(directory2);

root.print();`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.compositePOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Composite Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Composite thuộc nhóm các mẫu thiết kế cấu trúc (Structural Design Pattern)
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế Composite cho phép bạn xây dựng cấu trúc phân cấp theo mô hình cây, trong đó các đối tượng 
          cá nhân và các nhóm đối tượng được xem như là một thể hiện đồng nhất của một đối tượng.
        </BlogQuote>
      </React.Fragment>
    ) 
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Composite Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets
          title="Composite Design Pattern có các thành phần sau.">
          <li>Component: Đây là giao diện hoặc lớp cơ sở chung cho tất cả các thành phần trong cây. Nó định nghĩa các phương thức chung mà cả thành phần đơn lẻ và nhóm đều phải triển khai.</li>
          <li>Leaf: Đại diện cho các thành phần lá trong cây, tức là các thành phần không có con.</li>
          <li>Composite: Đại diện cho các nhóm thành phần, có thể chứa nhiều thành phần con, bao gồm cả các thành phần lá và các nhóm con.</li>
        </BlogBullets>
        <BlogQuote>
          Mục tiêu của Composite là tạo ra một cấu trúc cây đơn giản và đồng nhất để làm việc 
          với các đối tượng cá nhân và các nhóm đối tượng một cách như nhau. Điều này cho phép bạn 
          thực hiện các hoạt động và thao tác trên toàn bộ cấu trúc cây một cách đồng nhất.
        </BlogQuote>
      </React.Fragment>
    ) 
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Composite Design Pattern",
    content: (
      <React.Fragment>
        <BlogCodeBlock
          lang="ts"
          code={`// Component
export interface FileSystem {
  getName(): string;
  getSize(): number;
  print(): void;
}`}
        />
        <BlogParagraph>
          Lớp <BlogInlineCode>File</BlogInlineCode> đại diện cho các thành phần lá trong cây. Nó có 
          thuộc tính <BlogInlineCode>name</BlogInlineCode> để lưu tên file và thuộc tính <BlogInlineCode>size</BlogInlineCode> để 
          lưu kích thước file. Lớp này triển khai các phương thức của giao diện <BlogInlineCode>FileSystem</BlogInlineCode>, trả về tên và kích thước của 
          file và in ra thông tin của file khi gọi phương thức <BlogInlineCode>print()</BlogInlineCode>.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Leaf
export class File implements FileSystem {
  constructor(private name: string, private size: number) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  print(): void {
    console.log(File: this.name, Size: this.size);
  }
}`}
        />
        <BlogParagraph>
          Lớp <BlogInlineCode>Directory</BlogInlineCode> đại diện cho các thành phần nhóm trong cây. Nó có 
          thuộc tính <BlogInlineCode>children</BlogInlineCode> để lưu danh sách các thành phần con. Lớp này cũng triển khai 
          các phương thức của giao diện <BlogInlineCode>FileSystem</BlogInlineCode>. Phương thức <BlogInlineCode>getSize()</BlogInlineCode> của 
          lớp <BlogInlineCode>Directory</BlogInlineCode> tính tổng kích thước của tất cả các thành phần con. Phương thức <BlogInlineCode>add()</BlogInlineCode> được 
          sử dụng để thêm một thành phần vào danh sách con của thư mục. Phương thức <BlogInlineCode>remove()</BlogInlineCode> được sử dụng để xóa 
          một thành phần khỏi danh sách con. Phương thức <BlogInlineCode>print()</BlogInlineCode> của lớp <BlogInlineCode>Directory</BlogInlineCode> in ra thông tin của thư mục, sau đó 
          gọi phương thức <BlogInlineCode>print()</BlogInlineCode> trên từng thành phần con để in ra thông tin của chúng.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Composite
export class Directory implements FileSystem {
  private children: FileSystem[] = [];

  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }

  getSize(): number {
    let totalSize = 0;
    for (const child of this.children) {
      totalSize += child.getSize();
    }
    return totalSize;
  }

  add(fileSystem: FileSystem): void {
    this.children.push(fileSystem);
  }

  remove(fileSystem: FileSystem): void {
    const index = this.children.indexOf(fileSystem);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  print(): void {
    console.log(Directory: this.name, Size: this.getSize());
    for (const child of this.children) {
      child.print();
    }
  }
}`}
        />
      <BlogParagraph>
        Trong ví dụ, chúng ta tạo ra một cấu trúc cây đơn giản với các file và thư mục. Chúng ta tạo 
        một đối tượng <BlogInlineCode>File</BlogInlineCode> và hai đối tượng <BlogInlineCode>Directory</BlogInlineCode>, sau đó thêm 
        các đối tượng này vào các thư mục. Khi gọi phương thức <BlogInlineCode>print()</BlogInlineCode> trên đối tượng gốc, nó sẽ duyệt qua toàn bộ cây 
        và in ra thông tin về tất cả các thành phần.
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
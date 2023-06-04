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

export default function AdapterPage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const audioPlayer = new AudioPlayer();
audioPlayer.play('mp3', 'song.mp3');
audioPlayer.play('mp4', 'movie.mp4');
audioPlayer.play('vlc', 'video.vlc');`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);

  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.adapterPOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Adapter Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Adapter thuộc nhóm các mẫu thiết kế cấu trúc (Structural Design Pattern)
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế Adapter cho phép các đối tượng với các giao diện không tương thích hoạt động 
          cùng nhau thông qua một lớp trung gian gọi là Adapter. Adapter chuyển đổi giao diện của một 
          đối tượng thành một giao diện khác mà các đối tượng khác có thể sử dụng.
        </BlogQuote>
      </React.Fragment>
    ) 
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Adapter Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets
          title="Adapter Design Pattern có các thành phần sau.">
          <li>Target: Định nghĩa giao diện mà Client mong muốn sử dụng.</li>
          <li>Adaptee: Đối tượng có giao diện không tương thích với Target.</li>
          <li>Adapter: Lớp trung gian chuyển đổi giao diện của Adaptee thành giao diện mà Target mong muốn sử dụng.</li>
        </BlogBullets>
      </React.Fragment>
    ) 
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Adapter Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Giao diện <BlogInlineCode>MediaPlayer</BlogInlineCode> đại diện cho đối tượng mà chúng ta 
          muốn sử dụng trong hệ thống. Nó khai báo phương thức <BlogInlineCode>play</BlogInlineCode> để 
          phát âm thanh với đối số là loại âm thanh và tên tệp tin.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Target
export interface MediaPlayer {
  play(audioType: string, fileName: string): void;
}`}
        />
        <BlogParagraph>
          Lớp <BlogInlineCode>MP3Player</BlogInlineCode> là một thành phần đã tồn tại, được gọi 
          là <BlogInlineCode>Adaptee</BlogInlineCode>. Nó có phương thức <BlogInlineCode>playMP3</BlogInlineCode> để 
          phát âm thanh từ tệp MP3.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Adaptee
export class MP3Player {
  playMP3(fileName: string): void {
    console.log(Playing MP3 file: + fileName);
  }
}`}
        />
        <BlogParagraph>
          Lớp <BlogInlineCode>MP3PlayerAdapter</BlogInlineCode> triển khai giao diện <BlogInlineCode>MediaPlayer</BlogInlineCode> và 
          sử dụng lớp <BlogInlineCode>MP3Player</BlogInlineCode> như một thành phần bên trong. Nó chuyển đổi 
          cuộc gọi phương thức từ giao diện <BlogInlineCode>MediaPlayer</BlogInlineCode> thành cuộc gọi phương thức tương ứng 
          trong <BlogInlineCode>MP3Player</BlogInlineCode>. Điều này cho phép chúng ta sử dụng <BlogInlineCode>MP3Player</BlogInlineCode> như là 
          một phương tiện phát âm thanh trong hệ thống của mình.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Adapter
export class MP3PlayerAdapter implements MediaPlayer {
  private mp3Player: MP3Player;

  constructor() {
    this.mp3Player = new MP3Player();
  }

  play(audioType: string, fileName: string): void {
    if (audioType === 'mp3') {
      this.mp3Player.playMP3(fileName);
    } else {
      console.log(Invalid media type: audioType);
    }
  }
}`}
        />
        <BlogCodeBlock
          lang="ts"
          code={`// Client
export class AudioPlayer implements MediaPlayer {
  play(audioType: string, fileName: string): void {
    if (audioType === 'mp3') {
      console.log(Playing MP3 file: fileName);
    } else if (audioType === 'mp4' || audioType === 'vlc') {
      // Sử dụng Adapter để chơi các định dạng không tương thích
      const adapter = new MP3PlayerAdapter();
      adapter.play(audioType, fileName);
    } else {
      console.log(Invalid media type: audioType);
    }
  }
}`}
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
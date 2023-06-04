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

export default function FacadePage(props: Props) {
  const { info } = props;
  const api = useApi();
  const contentSectionRef = React.useRef<HTMLElement>(null);
  const [letterCount, setLetterCount] = React.useState(0);
  const [codeInput, setCodeInput] = React.useState(`// Example Demo
const facade = new TicketBookingSystemFacade();
facade.bookTicket('123', 'John Doe');`);
  const [runOutput, setRunOutput] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    setLetterCount(contentSectionRef.current ? contentSectionRef.current.outerHTML.replace(/<(?:.|\n)*?>/gm, '').length : 0)
  }, [contentSectionRef.current])

  const handleCallAPI = React.useCallback(() => {
    api.facadePOST(codeInput)
      .then((res: any) => {
        setRunOutput(res.result);
      })
  }, [codeInput])

  const dataSection1: TBlogSectionData = {
    header: "Facade Design Pattern trong NodeJS",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Mẫu thiết kế Facade thuộc nhóm các mẫu thiết kế cấu trúc (Structural Design Pattern)
        </BlogParagraph>
        <BlogQuote>
          Mẫu thiết kế này cung cấp một giao diện đơn giản để truy cập vào một hệ thống phức tạp bên dưới, giúp giảm độ phức tạp và sự phụ thuộc 
          của các thành phần giao tiếp với nhau.
        </BlogQuote>
      </React.Fragment>
    ) 
  }

  const dataSection2: TBlogSectionData = {
    header: "Cấu trúc của Facade Design Pattern",
    content: (
      <React.Fragment>
        <BlogBullets
          title="Facade Design Pattern có các thành phần sau.">
          <li>Facade: Lớp facade cung cấp một giao diện đơn giản và thân thiện để tương tác với hệ thống phức tạp bên dưới. Nó ẩn đi các chi tiết phức tạp và cung cấp các phương thức truy cập để thực hiện các chức năng cụ thể cho người dùng.</li>
          <li>Subsystems: Các hệ thống con (subsystems) là các thành phần phức tạp bên dưới, chịu trách nhiệm thực hiện các công việc cụ thể. Hệ thống con có thể bao gồm nhiều lớp và giao tiếp với nhau để hoàn thành nhiệm vụ.</li>
        </BlogBullets>
        <BlogQuote>
          Việc sử dụng mẫu thiết kế Facade giúp giảm sự phức tạp của hệ thống bằng cách cung cấp một giao diện đơn giản cho việc tương tác với nó. Người 
          dùng chỉ cần gọi các phương thức của lớp facade mà không cần quan tâm đến các chi tiết phức tạp bên trong hệ thống.
        </BlogQuote>
      </React.Fragment>
    ) 
  }

  const dataSection3: TBlogSectionData = {
    header: "Ví dụ về Facade Design Pattern",
    content: (
      <React.Fragment>
        <BlogParagraph>
          Giả sử chúng ta đang xây dựng một hệ thống đặt vé trực tuyến cho một rạp chiếu phim. Hệ thống này bao gồm nhiều thành phần 
          như quản lý phòng vé, quản lý phim, quản lý suất chiếu, và quản lý khách hàng. Mỗi thành phần có các chức năng phức tạp và 
          tương tác với nhau để thực hiện việc đặt vé.
        </BlogParagraph>
        <BlogParagraph>
          Sử dụng mẫu thiết kế Facade, chúng ta có thể tạo ra một lớp facade duy nhất để ẩn đi sự phức tạp của các thành phần trong hệ thống và cung cấp một giao diện đơn giản cho việc đặt vé.
        </BlogParagraph>
        <BlogCodeBlock
          lang="ts"
          code={`// Subsystem: Quản lý phòng vé
export class TicketManager {
  checkAvailability(movieId: string): boolean {
    // Kiểm tra tính khả dụng của vé
    // ...
    return true;
  }

  reserveTicket(movieId: string, customerId: string): void {
    // Đặt vé cho khách hàng
    // ...
    console.log(Ticket reserved for Movie ID: movieId, Customer ID: customerId);
  }
}

// Subsystem: Quản lý phim
export class MovieManager {
  getMovieDetails(movieId: string): any {
    // Lấy thông tin chi tiết về phim
    // ...
    return { id: movieId, title: 'Movie Title', duration: 120 };
  }
}

// Subsystem: Quản lý suất chiếu
export class ShowtimeManager {
  getAvailableShowtimes(movieId: string): string[] {
    // Lấy danh sách suất chiếu khả dụng cho phim
    // ...
    return ['Showtime 1', 'Showtime 2', 'Showtime 3'];
  }
}

// Subsystem: Quản lý khách hàng
export class CustomerManager {
  registerCustomer(name: string): string {
    // Đăng ký khách hàng mới
    // ...
    const customerId = '12345'; // Mã khách hàng được tạo tự động
    return customerId;
  }
}

// Facade: Facade cho hệ thống đặt vé
export class TicketBookingSystemFacade {
  private ticketManager: TicketManager;
  private movieManager: MovieManager;
  private showtimeManager: ShowtimeManager;
  private customerManager: CustomerManager;

  constructor() {
    this.ticketManager = new TicketManager();
    this.movieManager = new MovieManager();
    this.showtimeManager = new ShowtimeManager();
    this.customerManager = new CustomerManager();
  }

  bookTicket(movieId: string, customerName: string): void {
    // Kiểm tra tính khả dụng của vé
    const isAvailable = this.ticketManager.checkAvailability(movieId);
    if (isAvailable) {
      // Lấy thông tin chi tiết về phim
      const movieDetails = this.movieManager.getMovieDetails(movieId);
      
      // Lấy danh sách suất chiếu khả dụng cho phim
      const showtimes = this.showtimeManager.getAvailableShowtimes(movieId);

      // Đăng ký khách hàng mới
      const customerId = this.customerManager.registerCustomer(customerName);

      // Đặt vé cho khách hàng
      this.ticketManager.reserveTicket(movieId, customerId);

      console.log(Ticket booked successfully for Movie: movieDetails.title);
      console.log(Showtimes: showtimes);
      console.log(Customer ID: customerId);
    } else {
      console.log('Tickets are not available for this movie.');
    }
  }
}`}
        />
        <BlogParagraph>
          Trong ví dụ trên, chúng ta có các hệ thống con là <BlogInlineCode>TicketManager</BlogInlineCode>, <BlogInlineCode>MovieManager</BlogInlineCode>, <BlogInlineCode>ShowtimeManager</BlogInlineCode> và <BlogInlineCode>CustomerManager</BlogInlineCode>. Lớp <BlogInlineCode>TicketBookingSystemFacade</BlogInlineCode> là lớp 
          facade, nơi chúng ta tạo ra một phương thức <BlogInlineCode>bookTicket()</BlogInlineCode> để đặt vé cho khách hàng. Bên trong phương thức này, chúng ta gọi các phương thức tương ứng 
          của các hệ thống con để thực hiện các nhiệm vụ cụ thể. Người dùng chỉ cần gọi phương thức <BlogInlineCode>bookTicket()</BlogInlineCode> trên lớp facade mà không cần quan tâm đến các chi tiết phức tạp bên trong hệ thống.
        </BlogParagraph>
        <BlogParagraph>
          Việc sử dụng mẫu thiết kế Facade trong ví dụ này giúp giảm sự phức tạp của hệ thống đặt vé bằng cách cung cấp một giao diện đơn giản cho việc tương tác với nó. Người dùng 
          chỉ cần gọi phương thức <BlogInlineCode>bookTicket()</BlogInlineCode> trên lớp facade để thực hiện việc đặt vé mà không cần biết chi tiết về quá trình kiểm tra tính khả dụng 
          của vé, lấy thông tin phim, lấy danh sách suất chiếu và đăng ký khách hàng mới.
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
// Subsystem: Quản lý phòng vé
export class TicketManager {
  checkAvailability(movieId: string): boolean {
    // Kiểm tra tính khả dụng của vé
    // ...
    return true;
  }

  reserveTicket(movieId: string, customerId: string): void {
    // Đặt vé cho khách hàng
    // ...
    console.log(`Ticket reserved for Movie ID: ${movieId}, Customer ID: ${customerId}`);
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

      console.log(`Ticket booked successfully for Movie: ${movieDetails.title}`);
      console.log(`Showtimes: ${showtimes}`);
      console.log(`Customer ID: ${customerId}`);
    } else {
      console.log('Tickets are not available for this movie.');
    }
  }
}

// // Client code
// const facade = new TicketBookingSystemFacade();
// facade.bookTicket('123', 'John Doe');

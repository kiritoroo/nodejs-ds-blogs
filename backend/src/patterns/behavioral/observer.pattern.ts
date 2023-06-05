// Subject
export class NewsPublisher {
  private observers: NewsSubscriber[] = [];

  public subscribe(observer: NewsSubscriber): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: NewsSubscriber): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(news: string): void {
    for (const observer of this.observers) {
      observer.update(news);
    }
  }
}

// Observer
export interface NewsSubscriber {
  update(news: string): void;
}

// Concrete Observer
export class EmailSubscriber implements NewsSubscriber {
  public update(news: string): void {
    console.log(`Email Subscriber received news: ${news}`);
    // Perform email notification logic here
  }
}

export class SMSSubscriber implements NewsSubscriber {
  public update(news: string): void {
    console.log(`SMS Subscriber received news: ${news}`);
    // Perform SMS notification logic here
  }
}

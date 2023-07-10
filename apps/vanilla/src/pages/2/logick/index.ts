function externalTemperatureGenerator(fn: (value: number) => void): void {
  setInterval(() => fn(Math.random()), 2000);
}

interface IObserver<T> {
  update: (val: T) => void;
}

class Weather {
  public constructor(public readonly temperature: number, public readonly timestamp: number) {}
}

class WeatherPublisher {
  private readonly subscribers: IObserver<Weather>[] = [];

  public constructor() {
    externalTemperatureGenerator((val) => this.onTemperaturChange(val));
  }

  public subscribe(subscriber: IObserver<Weather>): void {
    const subIdx = this.getSubscriberIndex(subscriber);
    if (subIdx === -1) {
      this.subscribers.push(subscriber);
    }
  }

  public unsubscribe(subscriber: IObserver<Weather>): void {
    const subIdx = this.getSubscriberIndex(subscriber);
    if (subIdx !== -1) {
      this.subscribers.splice(subIdx, 1);
    }
  }

  public notify(value: Weather): void {
    this.subscribers.forEach((sub) => sub.update(value));
  }

  private getSubscriberIndex(subscriber: IObserver<Weather>) {
    return this.subscribers.findIndex((sub) => sub === subscriber);
  }

  private onTemperaturChange(temp: number): void {
    const w = new Weather(temp, Date.now());
    this.notify(w);
  }
}

class WeatherObserverConsole implements IObserver<Weather> {
  public update(val: Weather) {
    console.log(val);
  }
}

class WeatherObserverDOM implements IObserver<Weather> {
  private readonly layout: HTMLElement;

  public constructor(el: HTMLElement) {
    this.layout = el;
  }

  public update(val: Weather) {
    this.layout.innerText = String(val.temperature);
  }
}

class App {
  private readonly weatherPublisher = new WeatherPublisher();
  public constructor() {
    this.listenAndPrintToConsole();
    this.listenAndPrintToScreen();
  }
  private listenAndPrintToConsole(): void {
    const observer = {
      update: (val) => console.log(val),
    };
    this.weatherPublisher.subscribe(observer);
  }
  private listenAndPrintToScreen(): void {
    const observer = new WeatherObserverDOM(document.getElementById('app'));
    this.weatherPublisher.subscribe(observer);

    setTimeout(() => this.weatherPublisher.unsubscribe(observer), 5000);
  }
}

const app = new App();

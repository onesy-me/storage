import isEnvironment from '@onesy/utils/isEnvironment';
import stringify from '@onesy/utils/stringify';
import parse from '@onesy/utils/parse';
import merge from '@onesy/utils/merge';

export type TVariant = 'local' | 'session';

export interface IOptions {
  variant?: TVariant;
  storage?: Storage;
  namespace?: string;
  namespace_separator?: string;
}

const optionsDefault: IOptions = {
  variant: 'local',
  namespace: 'onesy',
  namespace_separator: '_',
};

class OnesyStorage {
  public options: IOptions;
  public storage: Storage;
  public removeNotAllowed: string[] = [];

  public constructor(options: IOptions = optionsDefault) {
    this.options = merge(options, optionsDefault);

    this.init();
  }

  public init(): void {
    if (isEnvironment('browser')) {
      this.storage = this.options.storage || (this.options.variant === 'local' ? window.localStorage : window.sessionStorage);
    }
  }

  public static clear(variant: TVariant): void {
    if (isEnvironment('browser')) {
      switch (variant) {
        case 'local':
          return window.localStorage.clear();

        case 'session':
          return window.sessionStorage.clear();

        default:
          break;
      }
    }
  }

  public get namespace(): string {
    return `${this.options.namespace}${this.options.namespace_separator}`;
  }

  public get properties(): Array<string> {
    return Object.keys(this.storage)
      .filter(value => value.indexOf(this.namespace) === 0)
      .map(item => this.propertyOriginal(item));
  }

  public get values(): Array<string> {
    return this.properties.map(value => this.get(value));
  }

  public get items(): Record<string, any> {
    const items = {};

    for (const property of this.properties) {
      items[property] = this.get(property);
    }

    return items;
  }

  public clear(): void {
    return this.properties
      .filter(value => (
        !this.removeNotAllowed.includes(value) &&
        !this.removeNotAllowed.includes(this.propertyOriginal(value))
      ))
      .forEach(value => this.remove(value));
  }

  public get(name: string): any {
    return parse(this.storage.getItem(this.property(name)));
  }

  public has(name: string): boolean {
    return this.storage.hasOwnProperty(this.property(name));
  }

  public add(name: string, value: any): void {
    return this.storage.setItem(this.property(name), stringify(value));
  }

  // An alias for add method
  public update(...args: [string, any]): void {
    return this.add(...args);
  }

  public remove(name: string): void {
    return this.storage.removeItem(this.property(name));
  }

  private property(value: string): string {
    return `${this.namespace}${value}`;
  }

  private propertyOriginal(value: string): string {
    return value.indexOf(this.namespace) === 0 ? value.slice(this.namespace.length) : value;
  }
}

export default OnesyStorage;

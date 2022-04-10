import { Exchange } from "@/presentation/protocols/exchange";
import { RouteService } from "@/main/routes/route-service";
import Utils from "@/utils/utils";

export class DefaultExchange implements Exchange{

  private message: Object | undefined;
  readonly context: RouteService;
  readonly properties: Map<string, Object>;
  private _isInterrupted: boolean = false

  constructor(context: RouteService) {
    this.context = context;
    this.properties = new Map<string, Object>();
  }

  public setMessage(...obj: Object[]): void {
    if (obj.length > 1) {
      this.message = obj
      return
    }
    this.message = obj[0];
    return;
  }

  public getMessage(type?: any): Object | undefined {
    if (!this.message) return this.message
    if (!type) return this.message;
    if (Utils.isIterable(this.message)) return Array.from(this.message as Iterable<Object>).find(message => message instanceof type);
    return this.message instanceof type ? this.message : undefined;
  }

  public setProperty(key: string, value: Object) {
    this.properties.set(key, value);
  }

  public getProperty(key: string): Object | undefined {
    return this.properties.get(key);
  }

  public stopRoute(): void {
    this._isInterrupted = true;
  }

  public get isInterrupted(): boolean {
    return this._isInterrupted;
  }

}

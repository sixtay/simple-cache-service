
export type CacheItem = {
  value: any;
  expires: Date;
}
export class Cache {
  private static instance: Cache | undefined = undefined;
  private timeToExpire: number;
  private cacheItems: Record<string,CacheItem>;
  constructor(defaultTimeToExpire: number, staleCleanupInterval: number) {
    this.timeToExpire = defaultTimeToExpire;
    this.cacheItems = {};
  }

  public set(key: string, value: any, expire: number = 0): void {
    const now = new Date();
    now.setSeconds(now.getSeconds() + ((expire == 0) ? this.timeToExpire : expire))
    this.cacheItems[key] = {
      value,
      expires: now,
    }
  }

  public get(key: string): {value: CacheItem | null, found: boolean} {
    if (!Object.keys(this.cacheItems).includes(key)) {
      return {value: null, found: false};
    }

    const item = this.cacheItems[key];
    if (this.isStale(item)) return {value: null, found: false};

    return {value: item?.value, found: true};
  }

  public delete(key: string): {value: CacheItem | null, found: boolean} {
    if (!Object.keys(this.cacheItems).includes(key)) {
      return {value: null, found: false};
    }
    const item = this.cacheItems[key]
    delete this.cacheItems[key];
    return {value: item?.value, found: true}
  }

  public flush(): void {
    this.cacheItems = {};
  }

  public size(): number {
    return Object.values(this.cacheItems).length;
  }
  private isStale(item: CacheItem): boolean {
    return (new Date()) > item?.expires
  }
  
  public static getInstance(defaultTimeToExpire: number, staleCleanupInterval: number = 30) {
    if (!Cache.instance) {
      Cache.instance = new Cache(defaultTimeToExpire, staleCleanupInterval);
    }
    return Cache.instance;
  }
}

export default Cache;
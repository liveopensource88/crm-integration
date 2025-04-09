type CacheItem<T> = {
  data: T;
  expiration: number | null;
};

type CacheStore<T> = { [key: string]: CacheItem<T> };

const DEFAULT_EXPIRATION_TIME_IN_MINUTES = 60;

class CacheService<T> {
  private cache: CacheStore<T> = {};

  async get(
    key: string,
    fetchFunction: () => Promise<T>,
    expirationTimeInMinutes: number = DEFAULT_EXPIRATION_TIME_IN_MINUTES
  ): Promise<T> {
    const cacheEntry = this.cache[key];
    const expirationTimeInMs = expirationTimeInMinutes * 60 * 1000;

    if (cacheEntry) {
      const isExpired = cacheEntry.expiration && cacheEntry.expiration <= Date.now();
      if (!isExpired) {
        return cacheEntry.data;
      }
    }

    const data = await fetchFunction();
    const expiration = Date.now() + expirationTimeInMs;
    this.cache[key] = { data, expiration };
    return data;
  }

  invalidate(key: string): void {
    if (this.cache[key]) {
      delete this.cache[key];
    }
  }

  clearAll(): void {
    this.cache = {};
  }
}

const cacheServiceInstances: { [key: string]: CacheService<unknown> } = {};

export const getCacheService = <T>(serviceName: string): CacheService<T> => {
  if (!cacheServiceInstances[serviceName]) {
    cacheServiceInstances[serviceName] = new CacheService<T>();
  }
  return cacheServiceInstances[serviceName] as CacheService<T>;
};

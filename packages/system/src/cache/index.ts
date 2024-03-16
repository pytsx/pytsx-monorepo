import { Config, memoize, clear, clearFunction } from "../memoize";
export * from "../memoize"
export type * from "../memoize"

class Cache {
  private readonly cache: Map<string, Record<string, any>>
  private static _ConfigMemo: Map<Cache, Config> = new Map()

  constructor(config?: Config) {
    this.cache = new Map()
    if (config) {
      Cache.Config(this, config)
    }
  }

  @memoize(Cache._ConfigMemo.get(this!))
  get(key: string) {
    const cacheKey = this.normalizeKey(key)
    return this.cache.get(cacheKey)
  }

  set(key: string, value: Record<string, any>) {
    const cacheKey = this.normalizeKey(key)
    this.cache.set(cacheKey, value)
  }

  has(key: string) {
    const cacheKey = this.normalizeKey(key)
    this.cache.has(cacheKey)
  }

  update(key: string, newValue: Record<string, any>) {
    const cacheKey = this.normalizeKey(key)

    let cachedData = this.cache.get(cacheKey)
    if (cachedData) {
      cachedData = {
        ...cachedData,
        ...newValue
      }
      clear(this, this.get, cacheKey)
      this.cache.set(cacheKey, newValue)
    }
  }

  delete(key: string) {
    const cacheKey = this.normalizeKey(key)
    clear(this, this.get, cacheKey)
    this.cache.delete(cacheKey)
  }

  private normalizeKey(key: string) {
    return Cache._ConfigMemo.get(this)?.resolver ? Cache._ConfigMemo.get(this)!.resolver!(key) : key
  }

  clear() {
    this.cache.clear()
    clearFunction(this.get)
  }

  getConfig() {
    return Cache._ConfigMemo.get(this)
  }

  static Config(instance: Cache, props: Config) {
    /**
     * potencial conflito de interesses
     * criar um map das configurações: 
     *  - key: "static" | "cache_instance_1" | "cache_instance_2"
     */
    this._ConfigMemo.set(instance, props)
  }

  static GetConfig(instance: Cache): Config {
    return this._ConfigMemo.get(instance) || {}
  }
}

const GlobalCache = (() => {
  const cache = new Cache()
  return cache
})()

Cache.Config(GlobalCache, {
  ttl: 10 * 60 * 60,
})

export { GlobalCache, Cache }
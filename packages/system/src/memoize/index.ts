
import stringify from "json-stringify-safe";
import winston from "winston"

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console({
    format: winston.format.simple()
  })]
})

// cacheMap maps every function to a map with caches
const cacheMap = new Map<
  (...args: any) => any,
  {
    functionCacheMap: Map<string, CacheObject>;
    resolver?: (...args: any[]) => string;
  }
>();
// instanceMap maps every instance to a unique id
const instanceMap = new Map<PropertyDescriptor, number>();
let instanceIdCounter = 1;

export interface Config {
  resolver?: (...args: any[]) => string;
  ttl?: number;
  maxSize?: number;
}

interface CacheObject {
  result: any;
  timeout: number;
}

export function memoize(
  config: Config = {
    ttl: 0,
  }
): (
  target: object,
  propertyName: string,
  propertyDescriptor: PropertyDescriptor
) => PropertyDescriptor {
  return function (
    target: object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const prop = propertyDescriptor.value ? "value" : "get";
    const originalFunction = propertyDescriptor[prop];

    // functionCacheMap maps every instance plus arguments to a CacheObject
    const functionCacheMap = new Map<string, CacheObject>();

    propertyDescriptor[prop] = function (...args: any[]) {
      let instanceId = instanceMap.get(this);

      if (!instanceId) {
        instanceId = ++instanceIdCounter;
        instanceMap.set(this, instanceId);
      }

      const key = config.resolver
        ? config.resolver.apply(this, args)
        : stringify(args);


      const cacheKey = `${instanceId}:${key}`;

      if (functionCacheMap.has(cacheKey)) {
        const { result, timeout } = functionCacheMap.get(cacheKey)!;
        if (!config.ttl || timeout > Date.now()) {
          logger.info(`[cache hit] "${propertyName}": ${key}`);
          return result;
        } else if (timeout < Date.now()) {
          logger.info(`[cache expired] "${propertyName}": ${key}`);
          functionCacheMap.delete(cacheKey)
        }
      }

      const newResult = originalFunction.apply(this, args);
      const expireIn = Date.now() + (config?.ttl || 0)

      logger.info(`[cache miss] "${propertyName}": ${key}`);
      logger.info(`[cache set] "${propertyName}": ${key}`);
      functionCacheMap.set(cacheKey, {
        result: newResult,
        timeout: config.ttl ? expireIn : Infinity,
      });

      return newResult;
    };

    cacheMap.set(propertyDescriptor[prop], {
      functionCacheMap,
      resolver: config.resolver,
    });

    if (config.maxSize && functionCacheMap.size > config.maxSize) {
      enforceMaxSize(functionCacheMap, config.maxSize); // função de limpeza
    }

    return propertyDescriptor;
  };
}

function enforceMaxSize( // função de limpeza, remove cache antigo 
  functionCacheMap: Map<string, CacheObject>,
  maxSize: number,
) {
  while (functionCacheMap.size > maxSize) {
    const [oldestEntryKey, oldestEntry] = functionCacheMap.entries().next().value;
    functionCacheMap.delete(oldestEntryKey);
    logger.info(`[Cache enforceMaxSize] "${oldestEntry.key}" removed due to max size limit`);
  }
}

// Clear the cache for an instance and for specific arguments
export function clear(
  instance: object,
  fn: (...args: any) => any,
  ...args: any[]
) {
  const functionCache = cacheMap.get(fn);
  const instanceId = instanceMap.get(instance);
  if (!functionCache || !instanceId) {
    return;
  }

  const key = functionCache.resolver
    ? functionCache.resolver.apply(instance, args)
    : stringify(args);

  const cacheKey = `${instanceId}:${key}`;

  functionCache.functionCacheMap.delete(cacheKey);
}

// Clear all caches for a specific function for all instances
export function clearFunction(fn: (...args: any) => any) {
  const functionCache = cacheMap.get(fn);

  if (functionCache) {
    functionCache.functionCacheMap.clear();
  }
}


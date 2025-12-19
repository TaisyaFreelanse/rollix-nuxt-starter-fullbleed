import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, getHeader, getResponseStatusText } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/@vue/shared/dist/shared.cjs.js';
import { PrismaClient } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/@prisma/client/default.js';
import { Pool } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/pg/esm/index.mjs';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/defu/dist/defu.mjs';
import destr, { destr as destr$1 } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/destr/dist/index.mjs';
import { snakeCase } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/devalue/index.js';
import { isVNode, toValue, isRef } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/vue/index.mjs';
import { DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/unhead/dist/plugins.mjs';
import { createHooks } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/youch-core/build/index.js';
import { Youch } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/errx/dist/index.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/unhead/dist/utils.mjs';
import { PrismaPg } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/@prisma/adapter-pg/dist/index.mjs';
import { Decimal } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/@prisma/client/runtime/library.mjs';
import { WebSocket } from 'file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/node_modules/ws/wrapper.mjs';

const serverAssets = [{"baseName":"server","dir":"C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "yandexMapsApiKey": "51d550e0-cf8f-4247-bae5-dfd32b51048d"
  },
  "smsRuApiKey": "66CCA90D-74B8-6CCB-30C5-05A1D6661AE6",
  "iikoApiKey": "c7ee2c4f7cb34905bff59a17eb323930",
  "iikoOrganizationId": "2584ca7e-77e0-4175-908f-778dc3df2d1b",
  "iikoTerminalGroupId": "ee1abd5a-28d3-20c9-019a-3897b0240066",
  "iikoApiUrl": "https://api-ru.iiko.services"
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _n_vHJJKlA2p0PLLB_uR3BOS1U8XCeKNl2eQIrX_OH4Y = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed";

const appHead = {"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"}],"link":[{"rel":"preconnect","href":"https://fonts.googleapis.com"},{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"}],"style":[],"script":[{"src":"https://api-maps.yandex.ru/3.0/?apikey=51d550e0-cf8f-4247-bae5-dfd32b51048d&lang=ru_RU","type":"text/javascript","async":true}],"noscript":[],"title":"Rollix — доставка роллов","htmlAttrs":{"lang":"ru"}};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _1DsMT2hDFj4fo1qXE4gal7Do4lsHbcrSYQfGHTBUjs = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

function defineNitroPlugin(def) {
  return def;
}

const _rWjPLJMRO7H0Ztg_Eien6iNCMsVOe7RjC4K8yjeMMpI = defineNitroPlugin(async (nitroApp) => {
});

const _QhNlhILZCCPH7LxqnqTIfrDJCgw1NVam4SqKpq6tvk = defineNitroPlugin(async (nitroApp) => {
  nitroApp.hooks.hook("ready", async () => {
    try {
      const { createSmsCodesTable, createBannersTable } = await Promise.resolve().then(function () { return migrations; });
      await createSmsCodesTable();
      await createBannersTable();
    } catch (error) {
      console.error("\u274C Error initializing database tables:", error.message);
    }
    try {
      const iikoApiKey = process.env.IIKO_API_KEY;
      const iikoOrganizationId = process.env.IIKO_ORGANIZATION_ID;
      const iikoTerminalGroupId = process.env.IIKO_TERMINAL_GROUP_ID;
      console.log("[iikoCloud Auto-sync] \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F...");
      console.log(`  - IIKO_API_KEY: ${iikoApiKey ? "\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D (" + iikoApiKey.substring(0, 8) + "...)" : "\u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D"}`);
      console.log(`  - IIKO_ORGANIZATION_ID: ${iikoOrganizationId ? "\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D" : "\u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D"}`);
      console.log(`  - IIKO_TERMINAL_GROUP_ID: ${iikoTerminalGroupId ? "\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D" : "\u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D"}`);
      if (iikoApiKey && iikoOrganizationId && iikoTerminalGroupId) {
        console.log("\u{1F504} \u0417\u0430\u043F\u0443\u0441\u043A \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u043C\u0435\u043D\u044E \u0438\u0437 iikoCloud \u0447\u0435\u0440\u0435\u0437 10 \u0441\u0435\u043A\u0443\u043D\u0434...");
        setTimeout(async () => {
          try {
            const { aikoClient } = await Promise.resolve().then(function () { return aikoClient$1; });
            const iikoMenu = await aikoClient.getMenu();
            console.log(`\u{1F4E6} \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E \u0438\u0437 iiko: ${iikoMenu.categories.length} \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439, ${iikoMenu.products.length} \u0442\u043E\u0432\u0430\u0440\u043E\u0432`);
            const { prisma } = await Promise.resolve().then(function () { return prisma$1; });
            let syncedCategories = 0;
            let syncedProducts = 0;
            for (const category of iikoMenu.categories) {
              try {
                await prisma.category.upsert({
                  where: { slug: category.slug },
                  create: {
                    id: category.id,
                    name: category.name,
                    slug: category.slug,
                    isActive: true
                  },
                  update: {
                    name: category.name,
                    isActive: true
                  }
                });
                syncedCategories++;
              } catch (error) {
                console.error(`[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 ${category.name}:`, error.message);
              }
            }
            for (const product of iikoMenu.products) {
              try {
                let categoryId = product.categoryId;
                if (categoryId) {
                  const category = await prisma.category.findUnique({
                    where: { id: categoryId }
                  });
                  if (!category) {
                    const firstCategory = await prisma.category.findFirst({
                      where: { isActive: true }
                    });
                    if (firstCategory) {
                      categoryId = firstCategory.id;
                    }
                  }
                }
                if (!categoryId) {
                  console.warn(`\u26A0\uFE0F  \u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D \u0442\u043E\u0432\u0430\u0440 ${product.name}: \u043D\u0435\u0442 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438`);
                  continue;
                }
                const slug = (product.name || product.id).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-а-яё]/g, "").substring(0, 100);
                const existing = await prisma.product.findUnique({
                  where: { slug }
                });
                const productData = {
                  name: product.name,
                  description: product.description || null,
                  price: product.price || 0,
                  categoryId,
                  image: product.image || null,
                  isActive: true
                };
                if (existing) {
                  await prisma.product.update({
                    where: { id: existing.id },
                    data: productData
                  });
                } else {
                  await prisma.product.create({
                    data: {
                      id: product.id,
                      slug,
                      ...productData
                    }
                  });
                  syncedProducts++;
                }
              } catch (error) {
                console.error(`[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u0442\u043E\u0432\u0430\u0440\u0430 ${product.name}:`, error.message);
              }
            }
            console.log(`\u2705 \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430: ${syncedCategories} \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439, ${syncedProducts} \u0442\u043E\u0432\u0430\u0440\u043E\u0432`);
          } catch (error) {
            console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u043C\u0435\u043D\u044E:", error.message);
            console.error("Stack:", error.stack);
          }
        }, 1e4);
        console.log("[iikoCloud Auto-sync] \u0422\u0430\u0439\u043C\u0435\u0440 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D, \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0441\u044F \u0447\u0435\u0440\u0435\u0437 10 \u0441\u0435\u043A\u0443\u043D\u0434");
      } else {
        console.log("\u2139\uFE0F  iikoCloud API \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D - \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430");
        console.log("   \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F: IIKO_API_KEY, IIKO_ORGANIZATION_ID, IIKO_TERMINAL_GROUP_ID");
      }
    } catch (error) {
      console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A iikoCloud:", error.message);
    }
  });
});

var _a;
const databaseUrl = process.env.DATABASE_URL;
const prismaClientSingleton = () => {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set in environment variables");
  }
  if (databaseUrl.startsWith("prisma+")) {
    return new PrismaClient({
      accelerateUrl: databaseUrl
    });
  } else {
    const pool = new Pool({
      connectionString: databaseUrl
    });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({
      adapter
    });
  }
};
const prisma$2 = (_a = globalThis.prismaGlobal) != null ? _a : prismaClientSingleton();
globalThis.prismaGlobal = prisma$2;

const prisma$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  prisma: prisma$2
}, Symbol.toStringTag, { value: 'Module' }));

async function hashPassword(password) {
  return Buffer.from(password).toString("base64");
}
async function comparePassword(password, hash) {
  const passwordHash = Buffer.from(password).toString("base64");
  return passwordHash === hash;
}

async function createDefaultAdminIfNeeded() {
  try {
    const adminCount = await prisma$2.admin.count();
    if (adminCount === 0) {
      const hashedPassword = await hashPassword("admin123");
      await prisma$2.admin.create({
        data: {
          login: "admin",
          password: hashedPassword,
          name: "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440",
          isActive: true
        }
      });
      console.log("\u2705 \u0421\u043E\u0437\u0434\u0430\u043D \u043F\u0435\u0440\u0432\u044B\u0439 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440: admin / admin123");
    }
  } catch (error) {
    console.error("\u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E:", error);
  }
}

const _xwEIH_eprGGT4h7U0gNRZlaBsMZKrDkxCVD60bvu0 = defineNitroPlugin((nitroApp) => {
  createDefaultAdminIfNeeded().catch((error) => {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E:", error);
  });
});

const plugins = [
  _n_vHJJKlA2p0PLLB_uR3BOS1U8XCeKNl2eQIrX_OH4Y,
_1DsMT2hDFj4fo1qXE4gal7Do4lsHbcrSYQfGHTBUjs,
_rWjPLJMRO7H0Ztg_Eien6iNCMsVOe7RjC4K8yjeMMpI,
_QhNlhILZCCPH7LxqnqTIfrDJCgw1NVam4SqKpq6tvk,
_xwEIH_eprGGT4h7U0gNRZlaBsMZKrDkxCVD60bvu0
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _wuCAFq = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

process.env.JWT_SECRET || "your-secret-key-change-in-production";
async function generateToken(payload) {
  const now = Math.floor(Date.now() / 1e3);
  const jwtPayload = {
    ...payload,
    iat: now,
    exp: now + 30 * 24 * 60 * 60
    // 30 дней
  };
  return Buffer.from(JSON.stringify(jwtPayload)).toString("base64url");
}
async function verifyToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64url").toString());
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1e3)) {
      throw new Error("Token expired");
    }
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}

const jwt = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  generateToken: generateToken,
  verifyToken: verifyToken
}, Symbol.toStringTag, { value: 'Module' }));

const _RPa3U5 = defineEventHandler(async (event) => {
  var _a;
  const path = ((_a = event.node.req.url) == null ? void 0 : _a.split("?")[0]) || "";
  if (!path.startsWith("/api")) {
    return;
  }
  if (path === "/api/admin/auth/login" || path === "/api/admin/auth/logout") {
    return;
  }
  if (path.startsWith("/api/admin/")) {
    return;
  }
  const publicRoutes = [
    "/api/categories",
    "/api/products",
    "/api/auth",
    "/api/delivery-zones",
    "/api/promo-codes",
    "/api/banners",
    // Публичный эндпоинт для баннеров
    "/api/orders",
    // Разрешаем гостевые заказы
    "/api/promotions",
    // Публичный эндпоинт для акций
    "/api/promocode-widget",
    // Публичный эндпоинт для виджета промокода
    "/api/aiko"
    // Публичные эндпоинты для синхронизации с iikoCloud
  ];
  if (publicRoutes.some((route) => path.startsWith(route))) {
    const authHeader2 = event.node.req.headers.authorization;
    if (authHeader2 && authHeader2.startsWith("Bearer ")) {
      const token2 = authHeader2.substring(7);
      try {
        const payload = await verifyToken(token2);
        event.context.auth = { userId: payload.userId };
      } catch (error) {
        event.context.auth = null;
      }
    }
    return;
  }
  const authHeader = event.node.req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      message: "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"
    });
  }
  const token = authHeader.substring(7);
  try {
    const payload = await verifyToken(token);
    event.context.auth = { userId: payload.userId };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "\u041D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0442\u043E\u043A\u0435\u043D"
    });
  }
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
  disableCapoSorting: false,
  plugins: [DeprecationsPlugin, PromisesPlugin, TemplateParamsPlugin, AliasSortingPlugin],
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file://C:/Users/GameOn-DP/Desktop/rollix-nuxt-starter-fullbleed/rollix-nuxt-starter-fullbleed/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      return APP_ROOT_OPEN_TAG + r + APP_ROOT_CLOSE_TAG;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", err);
    throw err;
  });
  if (ssrContext.payload?.error) {
    throw ssrContext.payload.error;
  }
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  islandHead.link ||= [];
  islandHead.style ||= [];
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _lazy_H2uZNJ = () => Promise.resolve().then(function () { return _id__delete$f; });
const _lazy_i6P94S = () => Promise.resolve().then(function () { return _id__put$h; });
const _lazy_JCYJUn = () => Promise.resolve().then(function () { return index_get$v; });
const _lazy_SRIy2w = () => Promise.resolve().then(function () { return index_post$j; });
const _lazy_8kPajU = () => Promise.resolve().then(function () { return applyBonusMigration_post$1; });
const _lazy_v8P0Dg = () => Promise.resolve().then(function () { return check_get$1; });
const _lazy_4ZNvvO = () => Promise.resolve().then(function () { return login_post$1; });
const _lazy_HfZLYo = () => Promise.resolve().then(function () { return logout_post$1; });
const _lazy_f07qmd = () => Promise.resolve().then(function () { return _id__delete$d; });
const _lazy_btQTSr = () => Promise.resolve().then(function () { return _id__get$b; });
const _lazy_Qeyd7I = () => Promise.resolve().then(function () { return _id__put$f; });
const _lazy_yPYGjI = () => Promise.resolve().then(function () { return index_get$t; });
const _lazy_CgBO95 = () => Promise.resolve().then(function () { return index_post$h; });
const _lazy_fD5F3p = () => Promise.resolve().then(function () { return _id__get$9; });
const _lazy_g2tgsz = () => Promise.resolve().then(function () { return _id__put$d; });
const _lazy_jaFg24 = () => Promise.resolve().then(function () { return index_get$r; });
const _lazy_sgMDCC = () => Promise.resolve().then(function () { return index_post$f; });
const _lazy_QjVrKr = () => Promise.resolve().then(function () { return index_get$p; });
const _lazy_GdvZKP = () => Promise.resolve().then(function () { return index_put$1; });
const _lazy_LoImaF = () => Promise.resolve().then(function () { return _id__delete$b; });
const _lazy_T_j2Re = () => Promise.resolve().then(function () { return _id__put$b; });
const _lazy_GpF0aW = () => Promise.resolve().then(function () { return index_get$n; });
const _lazy_Rx4sFp = () => Promise.resolve().then(function () { return index_post$d; });
const _lazy_5atBDi = () => Promise.resolve().then(function () { return settings_get$1; });
const _lazy_diOF56 = () => Promise.resolve().then(function () { return settings_put$1; });
const _lazy_1VbCuK = () => Promise.resolve().then(function () { return health_get$1; });
const _lazy_kBaoqf = () => Promise.resolve().then(function () { return status_get$3; });
const _lazy_z4LFtG = () => Promise.resolve().then(function () { return index_post$b; });
const _lazy_DljhT6 = () => Promise.resolve().then(function () { return syncOrdersStatus_post$1; });
const _lazy_v38bQc = () => Promise.resolve().then(function () { return syncStatus_get$1; });
const _lazy_ijr0c9 = () => Promise.resolve().then(function () { return sync_post$1; });
const _lazy_2FmHOV = () => Promise.resolve().then(function () { return sendSms_post$1; });
const _lazy_dLIehp = () => Promise.resolve().then(function () { return verifySms_post$1; });
const _lazy_TWNyOL = () => Promise.resolve().then(function () { return index_get$l; });
const _lazy_h11X46 = () => Promise.resolve().then(function () { return _id__delete$9; });
const _lazy_ZgeHbi = () => Promise.resolve().then(function () { return _id__get$7; });
const _lazy_p_x7s9 = () => Promise.resolve().then(function () { return _id__put$9; });
const _lazy_rM2MJe = () => Promise.resolve().then(function () { return index_get$j; });
const _lazy_vnPgyX = () => Promise.resolve().then(function () { return index_post$9; });
const _lazy_lJhmDh = () => Promise.resolve().then(function () { return _id__delete$7; });
const _lazy_AyAA15 = () => Promise.resolve().then(function () { return calculate_post$1; });
const _lazy_Mb4fB0 = () => Promise.resolve().then(function () { return index_get$h; });
const _lazy_KuIoyb = () => Promise.resolve().then(function () { return migrateSmsTable_post$1; });
const _lazy_uutdmV = () => Promise.resolve().then(function () { return _id__get$5; });
const _lazy_dtaXf_ = () => Promise.resolve().then(function () { return _id__put$7; });
const _lazy_ml_bVr = () => Promise.resolve().then(function () { return syncStatus_post$1; });
const _lazy_IwWdZo = () => Promise.resolve().then(function () { return all_get$1; });
const _lazy_UkC6kw = () => Promise.resolve().then(function () { return index_post$7; });
const _lazy_63uxju = () => Promise.resolve().then(function () { return cancel_post$1; });
const _lazy_3b9Mn0 = () => Promise.resolve().then(function () { return refund_post$1; });
const _lazy_x9A1VD = () => Promise.resolve().then(function () { return status_get$1; });
const _lazy_xfixPe = () => Promise.resolve().then(function () { return create_post$1; });
const _lazy_ujk_cK = () => Promise.resolve().then(function () { return webhook_post$1; });
const _lazy_ufRaHN = () => Promise.resolve().then(function () { return _id__delete$5; });
const _lazy_rmTY9q = () => Promise.resolve().then(function () { return _id__get$3; });
const _lazy_qL_tAQ = () => Promise.resolve().then(function () { return _id__put$5; });
const _lazy_us3t5b = () => Promise.resolve().then(function () { return index_get$f; });
const _lazy_ohSPOA = () => Promise.resolve().then(function () { return index_post$5; });
const _lazy_Ucgx1M = () => Promise.resolve().then(function () { return _id__delete$3; });
const _lazy_nW3y_W = () => Promise.resolve().then(function () { return _id__put$3; });
const _lazy_4PfeN1 = () => Promise.resolve().then(function () { return index_get$d; });
const _lazy_iDnLyx = () => Promise.resolve().then(function () { return index_post$3; });
const _lazy_BVV9n3 = () => Promise.resolve().then(function () { return index_get$b; });
const _lazy_mwQC92 = () => Promise.resolve().then(function () { return _productId__delete$1; });
const _lazy_ntOwfN = () => Promise.resolve().then(function () { return _productId__get$1; });
const _lazy_p_Mnsp = () => Promise.resolve().then(function () { return _productId__post$1; });
const _lazy_E8ZfUr = () => Promise.resolve().then(function () { return index_get$9; });
const _lazy_uZt7uG = () => Promise.resolve().then(function () { return index_get$7; });
const _lazy_ndIZui = () => Promise.resolve().then(function () { return _id__delete$1; });
const _lazy_xMzEU3 = () => Promise.resolve().then(function () { return _id__get$1; });
const _lazy_4lqxhp = () => Promise.resolve().then(function () { return _id__put$1; });
const _lazy_aEwDJC = () => Promise.resolve().then(function () { return byCode_get$1; });
const _lazy_H71tn_ = () => Promise.resolve().then(function () { return index_get$5; });
const _lazy_Y3iFa4 = () => Promise.resolve().then(function () { return index_post$1; });
const _lazy_Lb_Xig = () => Promise.resolve().then(function () { return index_get$3; });
const _lazy_SYDJt5 = () => Promise.resolve().then(function () { return index_get$1; });
const _lazy_NR2P7R = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _wuCAFq, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _RPa3U5, lazy: false, middleware: true, method: undefined },
  { route: '/api/admin/admins/:id', handler: _lazy_H2uZNJ, lazy: true, middleware: false, method: "delete" },
  { route: '/api/admin/admins/:id', handler: _lazy_i6P94S, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/admins', handler: _lazy_JCYJUn, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/admins', handler: _lazy_SRIy2w, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/apply-bonus-migration', handler: _lazy_8kPajU, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/auth/check', handler: _lazy_v8P0Dg, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/auth/login', handler: _lazy_4ZNvvO, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/auth/logout', handler: _lazy_HfZLYo, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/banners/:id', handler: _lazy_f07qmd, lazy: true, middleware: false, method: "delete" },
  { route: '/api/admin/banners/:id', handler: _lazy_btQTSr, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/banners/:id', handler: _lazy_Qeyd7I, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/banners', handler: _lazy_yPYGjI, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/banners', handler: _lazy_CgBO95, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/delivery-zones/:id', handler: _lazy_fD5F3p, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/delivery-zones/:id', handler: _lazy_g2tgsz, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/delivery-zones', handler: _lazy_jaFg24, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/delivery-zones', handler: _lazy_sgMDCC, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/promocode-widget', handler: _lazy_QjVrKr, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/promocode-widget', handler: _lazy_GdvZKP, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/promotions/:id', handler: _lazy_LoImaF, lazy: true, middleware: false, method: "delete" },
  { route: '/api/admin/promotions/:id', handler: _lazy_T_j2Re, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/promotions', handler: _lazy_GpF0aW, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/promotions', handler: _lazy_Rx4sFp, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/settings', handler: _lazy_5atBDi, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/settings', handler: _lazy_diOF56, lazy: true, middleware: false, method: "put" },
  { route: '/api/aiko/health', handler: _lazy_1VbCuK, lazy: true, middleware: false, method: "get" },
  { route: '/api/aiko/orders/:aikoOrderId/status', handler: _lazy_kBaoqf, lazy: true, middleware: false, method: "get" },
  { route: '/api/aiko/orders', handler: _lazy_z4LFtG, lazy: true, middleware: false, method: "post" },
  { route: '/api/aiko/sync-orders-status', handler: _lazy_DljhT6, lazy: true, middleware: false, method: "post" },
  { route: '/api/aiko/sync-status', handler: _lazy_v38bQc, lazy: true, middleware: false, method: "get" },
  { route: '/api/aiko/sync', handler: _lazy_ijr0c9, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/send-sms', handler: _lazy_2FmHOV, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/verify-sms', handler: _lazy_dLIehp, lazy: true, middleware: false, method: "post" },
  { route: '/api/banners', handler: _lazy_TWNyOL, lazy: true, middleware: false, method: "get" },
  { route: '/api/categories/:id', handler: _lazy_h11X46, lazy: true, middleware: false, method: "delete" },
  { route: '/api/categories/:id', handler: _lazy_ZgeHbi, lazy: true, middleware: false, method: "get" },
  { route: '/api/categories/:id', handler: _lazy_p_x7s9, lazy: true, middleware: false, method: "put" },
  { route: '/api/categories', handler: _lazy_rM2MJe, lazy: true, middleware: false, method: "get" },
  { route: '/api/categories', handler: _lazy_vnPgyX, lazy: true, middleware: false, method: "post" },
  { route: '/api/delivery-zones/:id', handler: _lazy_lJhmDh, lazy: true, middleware: false, method: "delete" },
  { route: '/api/delivery-zones/calculate', handler: _lazy_AyAA15, lazy: true, middleware: false, method: "post" },
  { route: '/api/delivery-zones', handler: _lazy_Mb4fB0, lazy: true, middleware: false, method: "get" },
  { route: '/api/migrate-sms-table', handler: _lazy_KuIoyb, lazy: true, middleware: false, method: "post" },
  { route: '/api/orders/:id', handler: _lazy_uutdmV, lazy: true, middleware: false, method: "get" },
  { route: '/api/orders/:id', handler: _lazy_dtaXf_, lazy: true, middleware: false, method: "put" },
  { route: '/api/orders/:id/sync-status', handler: _lazy_ml_bVr, lazy: true, middleware: false, method: "post" },
  { route: '/api/orders/all', handler: _lazy_IwWdZo, lazy: true, middleware: false, method: "get" },
  { route: '/api/orders', handler: _lazy_UkC6kw, lazy: true, middleware: false, method: "post" },
  { route: '/api/payments/:paymentId/cancel', handler: _lazy_63uxju, lazy: true, middleware: false, method: "post" },
  { route: '/api/payments/:paymentId/refund', handler: _lazy_3b9Mn0, lazy: true, middleware: false, method: "post" },
  { route: '/api/payments/:paymentId/status', handler: _lazy_x9A1VD, lazy: true, middleware: false, method: "get" },
  { route: '/api/payments/create', handler: _lazy_xfixPe, lazy: true, middleware: false, method: "post" },
  { route: '/api/payments/webhook', handler: _lazy_ujk_cK, lazy: true, middleware: false, method: "post" },
  { route: '/api/products/:id', handler: _lazy_ufRaHN, lazy: true, middleware: false, method: "delete" },
  { route: '/api/products/:id', handler: _lazy_rmTY9q, lazy: true, middleware: false, method: "get" },
  { route: '/api/products/:id', handler: _lazy_qL_tAQ, lazy: true, middleware: false, method: "put" },
  { route: '/api/products', handler: _lazy_us3t5b, lazy: true, middleware: false, method: "get" },
  { route: '/api/products', handler: _lazy_ohSPOA, lazy: true, middleware: false, method: "post" },
  { route: '/api/profile/addresses/:id', handler: _lazy_Ucgx1M, lazy: true, middleware: false, method: "delete" },
  { route: '/api/profile/addresses/:id', handler: _lazy_nW3y_W, lazy: true, middleware: false, method: "put" },
  { route: '/api/profile/addresses', handler: _lazy_4PfeN1, lazy: true, middleware: false, method: "get" },
  { route: '/api/profile/addresses', handler: _lazy_iDnLyx, lazy: true, middleware: false, method: "post" },
  { route: '/api/profile/bonuses', handler: _lazy_BVV9n3, lazy: true, middleware: false, method: "get" },
  { route: '/api/profile/favorites/:productId', handler: _lazy_mwQC92, lazy: true, middleware: false, method: "delete" },
  { route: '/api/profile/favorites/:productId', handler: _lazy_ntOwfN, lazy: true, middleware: false, method: "get" },
  { route: '/api/profile/favorites/:productId', handler: _lazy_p_Mnsp, lazy: true, middleware: false, method: "post" },
  { route: '/api/profile/favorites', handler: _lazy_E8ZfUr, lazy: true, middleware: false, method: "get" },
  { route: '/api/profile/orders', handler: _lazy_uZt7uG, lazy: true, middleware: false, method: "get" },
  { route: '/api/promo-codes/:id', handler: _lazy_ndIZui, lazy: true, middleware: false, method: "delete" },
  { route: '/api/promo-codes/:id', handler: _lazy_xMzEU3, lazy: true, middleware: false, method: "get" },
  { route: '/api/promo-codes/:id', handler: _lazy_4lqxhp, lazy: true, middleware: false, method: "put" },
  { route: '/api/promo-codes/by-code', handler: _lazy_aEwDJC, lazy: true, middleware: false, method: "get" },
  { route: '/api/promo-codes', handler: _lazy_H71tn_, lazy: true, middleware: false, method: "get" },
  { route: '/api/promo-codes', handler: _lazy_Y3iFa4, lazy: true, middleware: false, method: "post" },
  { route: '/api/promocode-widget', handler: _lazy_Lb_Xig, lazy: true, middleware: false, method: "get" },
  { route: '/api/promotions', handler: _lazy_SYDJt5, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_NR2P7R, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_NR2P7R, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "version": "", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served. If you are the application owner, check your server logs for details.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage || "Internal Server Error") + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><style>.spotlight{background:linear-gradient(45deg,#00dc82,#36e4da 50%,#0047e1);bottom:-40vh;filter:blur(30vh);height:60vh;opacity:.8}*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.left-0{left:0}.right-0{right:0}.z-10{z-index:10}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-black\\/5{background-color:#0000000d}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-14{padding-top:3.5rem}.text-6xl{font-size:3.75rem;line-height:1}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:bg-black{--un-bg-opacity:1;background-color:rgb(0 0 0/var(--un-bg-opacity))}.dark\\:bg-white\\/10{background-color:#ffffff1a}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script></head><body class="antialiased bg-white dark:bg-black dark:text-white flex flex-col font-sans min-h-screen pt-14 px-10 text-black"><div class="fixed left-0 pointer-events-none right-0 spotlight"></div><h1 class="font-medium mb-6 sm:text-8xl text-6xl">` + escapeHtml(messages.statusCode) + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + escapeHtml(messages.description) + '</p><div class="bg-black/5 bg-white dark:bg-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><div class="font-light leading-tight p-8 text-xl z-10">' + escapeHtml(messages.stack) + "</div></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

async function createSmsCodesTable() {
  var _a, _b, _c, _d;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes("render.com") ? { rejectUnauthorized: false } : false
  });
  try {
    const checkResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'sms_codes'
      );
    `);
    if (!((_a = checkResult.rows[0]) == null ? void 0 : _a.exists)) {
      console.log("\u{1F504} Creating sms_codes table...");
      await pool.query(`
        CREATE TABLE "sms_codes" (
          "id" TEXT NOT NULL,
          "phone" TEXT NOT NULL,
          "code" TEXT NOT NULL,
          "expiresAt" TIMESTAMP(3) NOT NULL,
          "verified" BOOLEAN NOT NULL DEFAULT false,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "sms_codes_pkey" PRIMARY KEY ("id")
        );
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");
      `);
      console.log("\u2705 SMS codes table created");
    } else {
      console.log("\u2139\uFE0F  SMS codes table already exists, checking structure...");
      const columnsResult = await pool.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'sms_codes';
      `);
      const existingColumns = columnsResult.rows.map((row) => row.column_name);
      if (!existingColumns.includes("verified")) {
        console.log("\u{1F504} Adding missing column: verified");
        try {
          await pool.query(`
            ALTER TABLE "sms_codes" 
            ADD COLUMN "verified" BOOLEAN NOT NULL DEFAULT false;
          `);
        } catch (colError) {
          if (!((_b = colError.message) == null ? void 0 : _b.includes("already exists")) && colError.code !== "42701") {
            throw colError;
          }
        }
      }
      if (!existingColumns.includes("createdAt")) {
        console.log("\u{1F504} Adding missing column: createdAt");
        try {
          await pool.query(`
            ALTER TABLE "sms_codes" 
            ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
          `);
        } catch (colError) {
          if (!((_c = colError.message) == null ? void 0 : _c.includes("already exists")) && colError.code !== "42701") {
            throw colError;
          }
        }
      }
      const idColumnInfo = await pool.query(`
        SELECT data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'sms_codes' 
        AND column_name = 'id';
      `);
      if (idColumnInfo.rows.length > 0 && idColumnInfo.rows[0].data_type !== "text") {
        const currentType = idColumnInfo.rows[0].data_type;
        console.warn(`\u26A0\uFE0F  Table id column has wrong type: ${currentType} (should be TEXT)`);
        if (currentType === "integer") {
          console.log("\u{1F504} Recreating table with correct id type (TEXT)...");
          await pool.query(`DROP TABLE IF EXISTS "sms_codes" CASCADE;`);
          await pool.query(`
            CREATE TABLE "sms_codes" (
              "id" TEXT NOT NULL,
              "phone" TEXT NOT NULL,
              "code" TEXT NOT NULL,
              "expiresAt" TIMESTAMP(3) NOT NULL,
              "verified" BOOLEAN NOT NULL DEFAULT false,
              "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
              CONSTRAINT "sms_codes_pkey" PRIMARY KEY ("id")
            );
          `);
          await pool.query(`CREATE INDEX "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");`);
          await pool.query(`CREATE INDEX "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");`);
          console.log("\u2705 Table recreated with TEXT id type");
        }
      }
      const requiredColumns = ["id", "phone", "code", "expiresAt"];
      for (const col of requiredColumns) {
        if (!existingColumns.includes(col)) {
          console.warn(`\u26A0\uFE0F  Missing required column: ${col}`);
        }
      }
      await pool.query(`
        CREATE INDEX IF NOT EXISTS "sms_codes_phone_code_idx" ON "sms_codes"("phone", "code");
      `);
      await pool.query(`
        CREATE INDEX IF NOT EXISTS "sms_codes_expiresAt_idx" ON "sms_codes"("expiresAt");
      `);
      console.log("\u2705 SMS codes table structure verified");
    }
  } catch (error) {
    if (((_d = error.message) == null ? void 0 : _d.includes("already exists")) || error.code === "42P07" || error.code === "23505") {
      console.log("\u2139\uFE0F  Table already exists");
    } else {
      console.error("\u274C Error creating sms_codes table:", error.message);
      throw error;
    }
  } finally {
    await pool.end();
  }
}
async function createBannersTable() {
  var _a, _b;
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: databaseUrl.includes("render.com") ? { rejectUnauthorized: false } : false
  });
  try {
    const checkResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'banners'
      );
    `);
    if (!((_a = checkResult.rows[0]) == null ? void 0 : _a.exists)) {
      console.log("\u{1F504} Creating banners table...");
      await pool.query(`
        CREATE TABLE "banners" (
          "id" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "image" TEXT NOT NULL,
          "link" TEXT,
          "isActive" BOOLEAN NOT NULL DEFAULT true,
          "sortOrder" INTEGER NOT NULL DEFAULT 0,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
        );
      `);
      console.log("\u2705 Banners table created");
    } else {
      console.log("\u2139\uFE0F  Banners table already exists");
    }
  } catch (error) {
    if (((_b = error.message) == null ? void 0 : _b.includes("already exists")) || error.code === "42P07") {
      console.log("\u2139\uFE0F  Banners table already exists");
    } else {
      console.error("\u274C Error creating banners table:", error.message);
      throw error;
    }
  } finally {
    await pool.end();
  }
}

const migrations = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  createBannersTable: createBannersTable,
  createSmsCodesTable: createSmsCodesTable
}, Symbol.toStringTag, { value: 'Module' }));

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
class IikoClient {
  constructor(config) {
    __publicField$2(this, "apiKey");
    __publicField$2(this, "organizationId");
    __publicField$2(this, "terminalGroupId");
    __publicField$2(this, "baseUrl");
    __publicField$2(this, "token", null);
    __publicField$2(this, "tokenExpiresAt", 0);
    this.apiKey = config.apiKey;
    this.organizationId = config.organizationId;
    this.terminalGroupId = config.terminalGroupId;
    this.baseUrl = config.baseUrl || "https://api-ru.iiko.services";
  }
  /**
   * Получение токена доступа
   */
  async getToken() {
    var _a, _b;
    if (this.token && Date.now() < this.tokenExpiresAt - 2 * 60 * 1e3) {
      console.log("[iikoCloud] \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u0442\u043E\u043A\u0435\u043D (\u0435\u0449\u0451 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u0435\u043D)");
      return this.token;
    }
    console.log("[iikoCloud] \u{1F510} \u041D\u0430\u0447\u0430\u043B\u043E \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u0432 iikoCloud API...");
    console.log("[iikoCloud] URL \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438:", `${this.baseUrl}/api/1/access_token`);
    console.log("[iikoCloud] API Key (\u043F\u0435\u0440\u0432\u044B\u0435 10 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432):", ((_a = this.apiKey) == null ? void 0 : _a.substring(0, 10)) + "...");
    try {
      const requestBody = {
        apiLogin: this.apiKey
      };
      console.log("[iikoCloud] \u0422\u0435\u043B\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438:", JSON.stringify(requestBody).replace(this.apiKey, "***"));
      const response = await fetch(`${this.baseUrl}/api/1/access_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
      console.log("[iikoCloud] \u0421\u0442\u0430\u0442\u0443\u0441 \u043E\u0442\u0432\u0435\u0442\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438:", response.status, response.statusText);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("[iikoCloud] \u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0442\u043E\u043A\u0435\u043D\u0430:", errorText);
        throw new Error(`\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0442\u043E\u043A\u0435\u043D\u0430 iikoCloud (${response.status}): ${errorText}`);
      }
      const data = await response.json();
      this.token = data.token;
      this.tokenExpiresAt = Date.now() + 55 * 60 * 1e3;
      console.log("[iikoCloud] \u2705 \u0422\u043E\u043A\u0435\u043D \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E, \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u0435\u043D 1 \u0447\u0430\u0441");
      console.log("[iikoCloud] \u0422\u043E\u043A\u0435\u043D (\u043F\u0435\u0440\u0432\u044B\u0435 20 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432):", ((_b = this.token) == null ? void 0 : _b.substring(0, 20)) + "...");
      return this.token;
    } catch (error) {
      console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0442\u043E\u043A\u0435\u043D\u0430:", error);
      throw new Error(`\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A iikoCloud API: ${error.message}`);
    }
  }
  /**
   * Выполнение запроса к API
   */
  async request(endpoint, options = {}) {
    const token = await this.getToken();
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers
    };
    if (endpoint === "/api/2/menu/by_id") {
      console.log(`[iikoCloud] \u{1F4E4} \u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u043A iikoCloud API:`);
      console.log(`  - Endpoint: ${endpoint}`);
      console.log(`  - Method: ${options.method || "GET"}`);
      if (options.body) {
        const bodyStr = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
        console.log(`  - Body: ${bodyStr}`);
      }
    }
    try {
      const fetchOptions = {
        ...options,
        headers: {
          ...headers,
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "*/*",
          "Accept-Language": "ru,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive"
        }
      };
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[iikoCloud] \u041F\u043E\u043B\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E\u0431 \u043E\u0448\u0438\u0431\u043A\u0435 API:`);
        console.error(`  Status: ${response.status} ${response.statusText}`);
        console.error(`  URL: ${url}`);
        console.error(`  Endpoint: ${endpoint}`);
        console.error(`  \u041F\u043E\u043B\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u043E\u0448\u0438\u0431\u043A\u0438 (\u043F\u0435\u0440\u0432\u044B\u0435 1000 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432):`, errorText.substring(0, 1e3));
        fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:131", message: "Full API error details", data: { status: response.status, statusText: response.statusText, url, endpoint, errorTextFull: errorText, errorTextPreview: errorText.substring(0, 1e3), responseHeaders: Object.fromEntries(response.headers.entries()) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run4", hypothesisId: "E" }) }).catch(() => {
        });
        if (response.status === 401) {
          console.warn(`[iikoCloud] \u26A0\uFE0F  \u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 (401). \u0421\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0435\u043C \u0442\u043E\u043A\u0435\u043D \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0435\u043C \u0437\u0430\u043F\u0440\u043E\u0441...`);
          this.token = null;
          this.tokenExpiresAt = 0;
          const newToken = await this.getToken();
          const newHeaders = {
            "Authorization": `Bearer ${newToken}`,
            "Content-Type": "application/json",
            ...options.headers
          };
          console.log(`[iikoCloud] \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0441 \u043D\u043E\u0432\u044B\u043C \u0442\u043E\u043A\u0435\u043D\u043E\u043C...`);
          const retryResponse = await fetch(url, {
            ...options,
            headers: newHeaders
          });
          if (retryResponse.ok) {
            console.log(`[iikoCloud] \u2705 \u0417\u0430\u043F\u0440\u043E\u0441 \u0443\u0441\u043F\u0435\u0448\u0435\u043D \u043F\u043E\u0441\u043B\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0442\u043E\u043A\u0435\u043D\u0430`);
            return await retryResponse.json();
          } else {
            const retryErrorText = await retryResponse.text();
            console.error(`[iikoCloud] \u274C \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 \u0442\u0430\u043A\u0436\u0435 \u043D\u0435 \u0443\u0434\u0430\u043B\u0430\u0441\u044C (${retryResponse.status})`);
            console.error(`[iikoCloud] \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0435 \u043F\u0440\u0438\u0447\u0438\u043D\u044B \u043E\u0448\u0438\u0431\u043A\u0438 401:`);
            console.error(`  1. API \u043A\u043B\u044E\u0447 (IIKO_API_KEY) \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0438\u043B\u0438 \u0438\u0441\u0442\u0435\u043A`);
            console.error(`  2. \u0423 API \u043A\u043B\u044E\u0447\u0430 \u043D\u0435\u0442 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0445 \u043F\u0440\u0430\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u0432 iiko Web`);
            console.error(`  3. \u041D\u0443\u0436\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u0432 iiko Web:`);
            console.error(`     - \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 iiko Web \u2192 \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u2192 \u041F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430`);
            console.error(`     - \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E API \u043A\u043B\u044E\u0447\u0430 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u044B \u043F\u0440\u0430\u0432\u0430:`);
            console.error(`       * \u0420\u0430\u0431\u043E\u0442\u0430 \u0441 API`);
            console.error(`       * \u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u0432\u043D\u0435\u0448\u043D\u0435\u0433\u043E \u043C\u0435\u043D\u044E`);
            console.error(`       * \u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u043E\u0432`);
            console.error(`  4. OrganizationId \u0443\u043A\u0430\u0437\u0430\u043D \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E`);
            console.error(`[iikoCloud] \u0422\u0435\u043A\u0441\u0442 \u043E\u0448\u0438\u0431\u043A\u0438:`, retryErrorText.substring(0, 200));
            throw new Error(`iikoCloud API \u043E\u0448\u0438\u0431\u043A\u0430 (401): \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0440\u0430\u0432 \u0432 iiko Web. ${retryErrorText.substring(0, 200)}`);
          }
        }
        if (response.status === 429) {
          console.warn(`[iikoCloud] \u26A0\uFE0F  Rate limit (429). \u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 5 \u0441\u0435\u043A\u0443\u043D\u0434 \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E\u0439 \u043F\u043E\u043F\u044B\u0442\u043A\u043E\u0439...`);
          await new Promise((resolve) => setTimeout(resolve, 5e3));
          console.log(`[iikoCloud] \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u043F\u043E\u0441\u043B\u0435 rate limit...`);
          const retryResponse = await fetch(url, {
            ...options,
            headers
          });
          if (retryResponse.ok) {
            return await retryResponse.json();
          } else {
            const retryErrorText = await retryResponse.text();
            console.error(`[iikoCloud] \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 \u0442\u0430\u043A\u0436\u0435 \u043D\u0435 \u0443\u0434\u0430\u043B\u0430\u0441\u044C (${retryResponse.status})`);
            throw new Error(`iikoCloud API \u043E\u0448\u0438\u0431\u043A\u0430 (${retryResponse.status}): ${retryErrorText.substring(0, 200)}`);
          }
        }
        if (response.status === 502 || response.status === 503 || response.status === 504) {
          const maxRetries = 2;
          const retryDelay = 2e3;
          for (let attempt = 1; attempt <= maxRetries; attempt++) {
            console.warn(`[iikoCloud] \u26A0\uFE0F  \u0412\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 (${response.status}). \u041F\u043E\u043F\u044B\u0442\u043A\u0430 ${attempt}/${maxRetries} \u0447\u0435\u0440\u0435\u0437 ${retryDelay}\u043C\u0441...`);
            await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt));
            console.log(`[iikoCloud] \u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u043E\u043F\u044B\u0442\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (\u043F\u043E\u043F\u044B\u0442\u043A\u0430 ${attempt})...`);
            const retryResponse = await fetch(url, {
              ...options,
              headers
            });
            if (retryResponse.ok) {
              console.log(`[iikoCloud] \u2705 \u0417\u0430\u043F\u0440\u043E\u0441 \u0443\u0441\u043F\u0435\u0448\u0435\u043D \u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E\u0439 \u043F\u043E\u043F\u044B\u0442\u043A\u0438`);
              return await retryResponse.json();
            } else if (attempt < maxRetries) {
              const retryErrorText = await retryResponse.text();
              console.warn(`[iikoCloud] \u041F\u043E\u043F\u044B\u0442\u043A\u0430 ${attempt} \u043D\u0435 \u0443\u0434\u0430\u043B\u0430\u0441\u044C (${retryResponse.status}), \u043F\u0440\u043E\u0431\u0443\u0435\u043C \u0435\u0449\u0435 \u0440\u0430\u0437...`);
            } else {
              const retryErrorText = await retryResponse.text();
              console.error(`[iikoCloud] \u274C \u0412\u0441\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438 \u043D\u0435 \u0443\u0434\u0430\u043B\u0438\u0441\u044C (${retryResponse.status})`);
              throw new Error(`iikoCloud API \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 (${retryResponse.status}): ${retryErrorText.substring(0, 200)}`);
            }
          }
        }
        console.error(`[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 API (${response.status}) \u043F\u0440\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0435 ${url}:`, errorText.substring(0, 500));
        let requestBodyObj = null;
        if (options.body && typeof options.body === "string") {
          try {
            requestBodyObj = JSON.parse(options.body);
            console.error(`[iikoCloud] \u0422\u0435\u043B\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0431\u044B\u043B\u043E:`, JSON.stringify(requestBodyObj, null, 2));
          } catch (e) {
            console.error(`[iikoCloud] \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0440\u0430\u0441\u043F\u0430\u0440\u0441\u0438\u0442\u044C \u0442\u0435\u043B\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430`);
          }
        }
        fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:210", message: "API error details", data: { status: response.status, url, endpoint, errorTextPreview: errorText.substring(0, 500), requestBody: requestBodyObj, hasVersion: (requestBodyObj == null ? void 0 : requestBodyObj.version) !== void 0, externalMenuIdType: typeof (requestBodyObj == null ? void 0 : requestBodyObj.externalMenuId) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
        });
        throw new Error(`iikoCloud API \u043E\u0448\u0438\u0431\u043A\u0430 (${response.status}): ${errorText.substring(0, 200)}`);
      }
      return await response.json();
    } catch (error) {
      if (error.message.includes("\u0442\u043E\u043A\u0435\u043D\u0430") || error.message.includes("token") || error.message.includes("401")) {
        this.token = null;
        this.tokenExpiresAt = 0;
      }
      console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430:", error);
      throw error;
    }
  }
  /**
   * Создание заказа в iikoCloud
   * Согласно документации: https://api-ru.iiko.services/docs
   */
  async createOrder(orderData) {
    var _a;
    try {
      const iikoItems = orderData.items.map((item) => {
        const itemData = {
          type: "Product",
          // Обязательное поле discriminator для OrderItem
          productId: item.productId,
          // ID товара из iiko (обязательное поле для ProductOrderItem)
          amount: item.quantity
        };
        if (item.modifiers && item.modifiers.length > 0) {
          itemData.modifiers = item.modifiers.map((mod) => ({
            id: mod.id || mod.name,
            // ID модификатора из iiko
            amount: 1
          }));
        }
        return itemData;
      });
      const isDelivery = orderData.deliveryType !== "PICKUP";
      const requestData = {
        organizationId: this.organizationId,
        terminalGroupId: this.terminalGroupId,
        order: {
          items: iikoItems,
          // Обязательное поле: тип сервиса заказа
          // DeliveryByCourier - доставка курьером
          // DeliveryByClient - самовывоз
          orderServiceType: isDelivery ? "DeliveryByCourier" : "DeliveryByClient"
        }
      };
      if (orderData.phone || orderData.customerName) {
        requestData.order.customer = {
          type: "one-time"
          // или 'regular' для постоянных клиентов
        };
        if (orderData.phone) {
          requestData.order.customer.phone = orderData.phone;
        }
        if (orderData.customerName) {
          requestData.order.customer.name = orderData.customerName;
        }
      }
      if (orderData.comment) {
        requestData.order.comment = orderData.comment;
      }
      if (orderData.phone) {
        requestData.order.phone = orderData.phone;
      }
      if (orderData.deliveryTime) {
        const date = new Date(orderData.deliveryTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
        requestData.order.completeBefore = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
      }
      console.log("[iikoCloud] \u{1F4E4} \u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430 \u0432 iikoCloud...");
      console.log("[iikoCloud] \u0414\u0430\u043D\u043D\u044B\u0435 \u0437\u0430\u043A\u0430\u0437\u0430:", JSON.stringify(requestData, null, 2));
      const response = await this.request("/api/1/deliveries/create", {
        method: "POST",
        body: JSON.stringify(requestData)
      });
      console.log("[iikoCloud] \u2705 \u041E\u0442\u0432\u0435\u0442 \u043E\u0442 iikoCloud:", JSON.stringify(response, null, 2));
      const orderInfo = response.orderInfo || response;
      const iikoOrderId = ((_a = orderInfo.order) == null ? void 0 : _a.id) || orderInfo.id || response.orderId || response.id;
      if (!iikoOrderId) {
        console.error("[iikoCloud] \u26A0\uFE0F  \u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C orderId \u0438\u0437 \u043E\u0442\u0432\u0435\u0442\u0430:", response);
        throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C ID \u0437\u0430\u043A\u0430\u0437\u0430 \u0438\u0437 \u043E\u0442\u0432\u0435\u0442\u0430 iikoCloud");
      }
      const creationStatus = orderInfo.creationStatus || "Success";
      console.log("[iikoCloud] \u2705 \u0417\u0430\u043A\u0430\u0437 \u0441\u043E\u0437\u0434\u0430\u043D \u0432 iikoCloud:");
      console.log(`   - ID: ${iikoOrderId}`);
      console.log(`   - \u0421\u0442\u0430\u0442\u0443\u0441 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F: ${creationStatus}`);
      return {
        iikoOrderId,
        correlationId: response.correlationId,
        creationStatus
      };
    } catch (error) {
      console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430:", error);
      throw new Error(`\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430 \u0432 iikoCloud: ${error.message}`);
    }
  }
  /**
   * Получение статуса заказа из iikoCloud
   */
  async getOrderStatus(iikoOrderId) {
    var _a, _b, _c, _d;
    try {
      console.log("[iikoCloud] \u{1F4E5} \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u043A\u0430\u0437\u0430:", iikoOrderId);
      const response = await this.request(
        `/api/1/deliveries/by_id`,
        {
          method: "POST",
          body: JSON.stringify({
            organizationId: this.organizationId,
            orderIds: [iikoOrderId]
          })
        }
      );
      console.log("[iikoCloud] \u041E\u0442\u0432\u0435\u0442 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u043A\u0430\u0437\u0430:", JSON.stringify(response, null, 2));
      let orders = Array.isArray(response) ? response : response.orders || [];
      if (!Array.isArray(orders)) {
        orders = [response];
      }
      const order = orders.find((o) => o.orderId === iikoOrderId || o.id === iikoOrderId);
      if (!order) {
        throw new Error(`\u0417\u0430\u043A\u0430\u0437 ${iikoOrderId} \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0432 iikoCloud`);
      }
      if (order.creationStatus === "Error") {
        const errorMessage = ((_a = order.errorInfo) == null ? void 0 : _a.message) || ((_b = order.errorInfo) == null ? void 0 : _b.description) || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430 \u0432 iikoCloud";
        const errorCode = ((_c = order.errorInfo) == null ? void 0 : _c.code) || "UNKNOWN";
        console.warn(`[iikoCloud] \u26A0\uFE0F  \u0417\u0430\u043A\u0430\u0437 ${iikoOrderId} \u043D\u0435 \u0431\u044B\u043B \u0441\u043E\u0437\u0434\u0430\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E (creationStatus: Error)`);
        console.warn(`[iikoCloud] \u041A\u043E\u0434 \u043E\u0448\u0438\u0431\u043A\u0438: ${errorCode}`);
        console.warn(`[iikoCloud] \u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435: ${errorMessage}`);
        if (errorMessage.includes("Creation timeout expired")) {
          console.log("[iikoCloud] \u2139\uFE0F  \u0422\u0430\u0439\u043C\u0430\u0443\u0442 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430 (\u043E\u0436\u0438\u0434\u0430\u0435\u043C\u043E \u0434\u043B\u044F \u0442\u0435\u0441\u0442\u043E\u0432\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0431\u0435\u0437 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0439 \u043A\u0430\u0441\u0441\u044B)");
          return {
            orderId: order.orderId || order.id || iikoOrderId,
            status: "New",
            statusInfo: `\u0417\u0430\u043A\u0430\u0437 \u043F\u0440\u0438\u043D\u044F\u0442, \u043D\u043E \u043D\u0435 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D \u043A\u0430\u0441\u0441\u043E\u0439: ${errorMessage}`,
            creationDate: order.timestamp ? new Date(order.timestamp).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
            items: []
          };
        }
        throw new Error(`\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u0431\u044B\u043B \u0441\u043E\u0437\u0434\u0430\u043D \u0432 iikoCloud: ${errorMessage} (\u043A\u043E\u0434: ${errorCode})`);
      }
      if (order.creationStatus === "InProgress") {
        console.log("[iikoCloud] \u2139\uFE0F  \u0417\u0430\u043A\u0430\u0437 \u0435\u0449\u0435 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F (creationStatus: InProgress)");
        return {
          orderId: order.orderId || order.id || iikoOrderId,
          status: "New",
          statusInfo: "\u0417\u0430\u043A\u0430\u0437 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432 iikoCloud",
          creationDate: order.timestamp ? new Date(order.timestamp).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          items: ((_d = order.order) == null ? void 0 : _d.items) || []
        };
      }
      const actualOrder = order.order || order;
      const status = {
        orderId: order.orderId || order.id || iikoOrderId,
        status: actualOrder.status || order.status || order.orderStatus || "New",
        statusInfo: actualOrder.statusInfo || order.statusInfo || order.statusDescription || actualOrder.comment || "",
        creationDate: actualOrder.creationDate || order.creationDate || order.dateCreated || (order.timestamp ? new Date(order.timestamp).toISOString() : (/* @__PURE__ */ new Date()).toISOString()),
        items: actualOrder.items || order.items || []
      };
      console.log("[iikoCloud] \u2705 \u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430:", status.status);
      if (order.creationStatus) {
        console.log("[iikoCloud] \u0421\u0442\u0430\u0442\u0443\u0441 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F:", order.creationStatus);
      }
      return status;
    } catch (error) {
      console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u043A\u0430\u0437\u0430:", error);
      throw new Error(`\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u043A\u0430\u0437\u0430 \u0438\u0437 iikoCloud: ${error.message}`);
    }
  }
  /**
   * Отмена заказа в iikoCloud
   */
  async cancelOrder(iikoOrderId, reason) {
    try {
      await this.request("/api/1/deliveries/cancel", {
        method: "POST",
        body: JSON.stringify({
          organizationId: this.organizationId,
          orderId: iikoOrderId,
          cancellationComment: reason || "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C"
        })
      });
      return true;
    } catch (error) {
      console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043C\u0435\u043D\u044B \u0437\u0430\u043A\u0430\u0437\u0430:", error);
      throw new Error(`\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043C\u0435\u043D\u044B \u0437\u0430\u043A\u0430\u0437\u0430 \u0432 iikoCloud: ${error.message}`);
    }
  }
  /**
   * Получение внешнего меню из iikoCloud
   * Согласно документации: https://api-ru.iiko.services/docs
   * Endpoint: POST /api/1/nomenclature
   * Возвращает: категории, товары, модификаторы, стоп-листы
   */
  async getMenu() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    try {
      console.log("[iikoCloud] \u041F\u043E\u043F\u044B\u0442\u043A\u0430 1: \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u043D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u044B \u0447\u0435\u0440\u0435\u0437 /api/1/nomenclature");
      const nomenclatureRequest = {
        organizationId: this.organizationId
      };
      const nomenclatureResponse = await this.request(
        "/api/1/nomenclature",
        {
          method: "POST",
          body: JSON.stringify(nomenclatureRequest)
        }
      );
      if (nomenclatureResponse.products && nomenclatureResponse.products.length > 0) {
        console.log(`[iikoCloud] \u2705 \u041D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0430: ${nomenclatureResponse.products.length} \u0442\u043E\u0432\u0430\u0440\u043E\u0432`);
        return this.formatNomenclatureResponse(nomenclatureResponse);
      }
      if (!nomenclatureResponse.products || nomenclatureResponse.products.length === 0) {
        console.warn("[iikoCloud] \u26A0\uFE0F  \u041D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u0430 \u043F\u0443\u0441\u0442\u0430\u044F!");
        console.warn("[iikoCloud] \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0435 \u043F\u0440\u0438\u0447\u0438\u043D\u044B:");
        console.warn("  1. \u0412 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u043D\u0435\u0442 \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0432 \u043D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u0435");
        console.warn("  2. \u0422\u043E\u0432\u0430\u0440\u044B \u043D\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u044B \u0432 \u043C\u0435\u043D\u044E (isIncludedInMenu: false)");
        console.warn("  3. \u0422\u043E\u0432\u0430\u0440\u044B \u043D\u0430\u0445\u043E\u0434\u044F\u0442\u0441\u044F \u0432 \u0441\u0442\u043E\u043F-\u043B\u0438\u0441\u0442\u0435");
        console.warn("  4. OrganizationId \u0443\u043A\u0430\u0437\u0430\u043D \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E");
        console.warn("  5. \u041D\u0443\u0436\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043C\u0435\u043D\u044E \u0432 \u0430\u0434\u043C\u0438\u043D\u043A\u0435 iiko");
      }
      console.log("[iikoCloud] \u041D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u0430 \u043F\u0443\u0441\u0442\u0430\u044F, \u043F\u0440\u043E\u0431\u0443\u0435\u043C \u0432\u043D\u0435\u0448\u043D\u0435\u0435 \u043C\u0435\u043D\u044E \u0447\u0435\u0440\u0435\u0437 /api/2/menu");
      const menusListResponse = await this.request(
        "/api/2/menu",
        {
          method: "POST",
          body: JSON.stringify({
            organizationIds: [this.organizationId]
          })
        }
      );
      console.log("[iikoCloud] \u0421\u043F\u0438\u0441\u043E\u043A \u0432\u043D\u0435\u0448\u043D\u0438\u0445 \u043C\u0435\u043D\u044E:", {
        externalMenusCount: ((_a = menusListResponse.externalMenus) == null ? void 0 : _a.length) || 0,
        priceCategoriesCount: ((_b = menusListResponse.priceCategories) == null ? void 0 : _b.length) || 0
      });
      console.log("[iikoCloud] \u041F\u043E\u043B\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 /api/2/menu:", JSON.stringify(menusListResponse, null, 2));
      fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:458", message: "Full menu list response", data: { fullResponse: JSON.stringify(menusListResponse), externalMenus: menusListResponse.externalMenus, priceCategories: menusListResponse.priceCategories, firstMenu: (_c = menusListResponse.externalMenus) == null ? void 0 : _c[0], firstMenuId: (_e = (_d = menusListResponse.externalMenus) == null ? void 0 : _d[0]) == null ? void 0 : _e.id, firstMenuIdType: typeof ((_g = (_f = menusListResponse.externalMenus) == null ? void 0 : _f[0]) == null ? void 0 : _g.id) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run4", hypothesisId: "A" }) }).catch(() => {
      });
      if (!menusListResponse.externalMenus || menusListResponse.externalMenus.length === 0) {
        console.warn("[iikoCloud] \u26A0\uFE0F  \u0412\u043D\u0435\u0448\u043D\u0438\u0445 \u043C\u0435\u043D\u044E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E");
        return {
          groups: [],
          items: [],
          categories: []
        };
      }
      const firstMenu = menusListResponse.externalMenus[0];
      console.log(`[iikoCloud] \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0432\u043D\u0435\u0448\u043D\u0435\u0435 \u043C\u0435\u043D\u044E: ${firstMenu.name} (ID: ${firstMenu.id}, \u0442\u0438\u043F: ${typeof firstMenu.id})`);
      fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:456", message: "First menu details", data: { menuName: firstMenu.name, menuId: firstMenu.id, menuIdType: typeof firstMenu.id, menuIdString: String(firstMenu.id), menuIdNumber: typeof firstMenu.id === "string" ? parseInt(firstMenu.id, 10) : firstMenu.id }, timestamp: Date.now(), sessionId: "debug-session", runId: "run2", hypothesisId: "A" }) }).catch(() => {
      });
      fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:461", message: "External menu data", data: { menuName: firstMenu.name, menuId: firstMenu.id, menuIdType: typeof firstMenu.id, priceCategoriesCount: ((_h = menusListResponse.priceCategories) == null ? void 0 : _h.length) || 0 }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
      });
      const priceCategory = (_i = menusListResponse.priceCategories) == null ? void 0 : _i[0];
      let priceCategoryId;
      if (priceCategory && priceCategory.id) {
        priceCategoryId = priceCategory.id;
        console.log(`[iikoCloud] \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E \u0446\u0435\u043D: ${priceCategory.name} (ID: ${priceCategoryId})`);
      } else {
        priceCategoryId = "00000000-0000-0000-0000-000000000000";
        console.log(`[iikoCloud] \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0446\u0435\u043D \u043D\u0435\u0442 \u0432 \u043E\u0442\u0432\u0435\u0442\u0435, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E: ${priceCategoryId}`);
      }
      fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:476", message: "Price category selected", data: { priceCategoryId, hasPriceCategory: !!priceCategory, priceCategoryName: priceCategory == null ? void 0 : priceCategory.name }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
      });
      const externalMenuId = String(firstMenu.id);
      console.log("[iikoCloud] \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C externalMenuId \u043A\u0430\u043A \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 API:", externalMenuId);
      console.log("[iikoCloud] \u0422\u0438\u043F externalMenuId:", typeof externalMenuId);
      fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:521", message: "External menu ID format decision", data: { originalIdFromAPI: firstMenu.id, externalMenuId, externalMenuIdType: typeof externalMenuId, formatUsed: "as_returned_by_api", firstMenuFull: firstMenu }, timestamp: Date.now(), sessionId: "debug-session", runId: "run4", hypothesisId: "A" }) }).catch(() => {
      });
      const menuRequest = {
        externalMenuId,
        organizationIds: [this.organizationId],
        priceCategoryId,
        // Обязательный параметр, даже для "цен из меню"
        version: 2
        // Обязательный параметр согласно документации и рабочему примеру в Postman
      };
      console.log("[iikoCloud] \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C priceCategoryId:", priceCategoryId === "00000000-0000-0000-0000-000000000000" ? "\u0446\u0435\u043D\u044B \u0438\u0437 \u043C\u0435\u043D\u044E" : priceCategoryId);
      fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:520", message: "Menu request before API call", data: { menuRequest: JSON.stringify(menuRequest), organizationId: this.organizationId }, timestamp: Date.now(), sessionId: "debug-session", runId: "run2", hypothesisId: "B" }) }).catch(() => {
      });
      console.log("[iikoCloud] \u0417\u0430\u043F\u0440\u043E\u0441 \u043C\u0435\u043D\u044E:", JSON.stringify(menuRequest, null, 2));
      console.log("[iikoCloud] URL \u0437\u0430\u043F\u0440\u043E\u0441\u0430:", `${this.baseUrl}/api/2/menu/by_id`);
      console.log("[iikoCloud] \u041F\u043E\u043B\u043D\u043E\u0435 \u0442\u0435\u043B\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430 (JSON):", JSON.stringify(menuRequest));
      fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:535", message: "Full menu request details", data: { url: `${this.baseUrl}/api/2/menu/by_id`, requestBody: menuRequest, requestBodyString: JSON.stringify(menuRequest), organizationId: this.organizationId }, timestamp: Date.now(), sessionId: "debug-session", runId: "run4", hypothesisId: "B" }) }).catch(() => {
      });
      const menuResponse = await this.request(
        "/api/2/menu/by_id",
        {
          method: "POST",
          body: JSON.stringify(menuRequest)
        }
      );
      console.log("[iikoCloud] \u041F\u043E\u043B\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 /api/2/menu/by_id:", JSON.stringify(menuResponse, null, 2));
      fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:545", message: "Menu response received", data: { hasResponse: !!menuResponse, responseKeys: menuResponse ? Object.keys(menuResponse) : [], fullResponse: JSON.stringify(menuResponse) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run4", hypothesisId: "E" }) }).catch(() => {
      });
      fetch("http://127.0.0.1:7243/ingest/40534d43-2dfd-4648-82fe-1c8af019d1c9", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "iiko-client.ts:497", message: "Menu response received", data: { hasResponse: !!menuResponse, responseKeys: menuResponse ? Object.keys(menuResponse) : [] }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
      });
      console.log("[iikoCloud] \u2705 \u041C\u0435\u043D\u044E \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E");
      return this.formatExternalMenuResponse(menuResponse);
    } catch (error) {
      console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043C\u0435\u043D\u044E:", error);
      throw new Error(`\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043C\u0435\u043D\u044E \u0438\u0437 iikoCloud: ${error.message}`);
    }
  }
  /**
   * Форматирование ответа номенклатуры
   */
  formatNomenclatureResponse(response) {
    var _a, _b;
    console.log("[iikoCloud] \u041E\u0442\u0432\u0435\u0442 \u043D\u043E\u043C\u0435\u043D\u043A\u043B\u0430\u0442\u0443\u0440\u044B:");
    console.log("  - revision:", response.revision);
    console.log("  - productCategories:", ((_a = response.productCategories) == null ? void 0 : _a.length) || 0);
    console.log("  - products:", ((_b = response.products) == null ? void 0 : _b.length) || 0);
    return {
      groups: [],
      items: response.products || [],
      categories: response.productCategories || []
    };
  }
  /**
   * Форматирование ответа внешнего меню
   */
  formatExternalMenuResponse(menuResponse) {
    console.log("[iikoCloud] \u0424\u043E\u0440\u043C\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432\u043D\u0435\u0448\u043D\u0435\u0433\u043E \u043C\u0435\u043D\u044E...");
    const itemCategories = menuResponse.itemCategories || [];
    const allItems = [];
    const categories = [];
    itemCategories.forEach((category) => {
      categories.push({
        id: category.id,
        name: category.name,
        description: category.description || "",
        slug: (category.name || category.id || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-а-яё]/g, "").substring(0, 100)
      });
      if (category.items && Array.isArray(category.items)) {
        category.items.forEach((item) => {
          var _a;
          if (item.itemSizes && Array.isArray(item.itemSizes) && item.itemSizes.length > 0) {
            const defaultSize = item.itemSizes.find((size) => size.isDefault) || item.itemSizes[0];
            let price = 0;
            if (defaultSize.prices && Array.isArray(defaultSize.prices) && defaultSize.prices.length > 0) {
              price = defaultSize.prices[0].price || 0;
            }
            const imageUrl = item.buttonImageUrl || ((_a = item.itemSizes[0]) == null ? void 0 : _a.buttonImageUrl) || null;
            allItems.push({
              id: item.itemId || item.sku,
              name: item.name,
              description: item.description || "",
              price,
              categoryId: category.id,
              image: imageUrl,
              sku: item.sku,
              type: item.type || "DISH"
            });
          }
        });
      }
    });
    console.log("[iikoCloud] \u0424\u043E\u0440\u043C\u0430\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u043C\u0435\u043D\u044E:", {
      itemsCount: allItems.length,
      categoriesCount: categories.length
    });
    return {
      groups: [],
      items: allItems,
      categories
    };
  }
  /**
   * Проверка соединения с iikoCloud
   */
  async healthCheck() {
    try {
      await this.getToken();
      return {
        connected: true,
        organizationId: this.organizationId
      };
    } catch (error) {
      return {
        connected: false
      };
    }
  }
}
let iikoClientInstance = null;
function getIikoClient() {
  if (!iikoClientInstance) {
    const apiKey = process.env.IIKO_API_KEY;
    const organizationId = process.env.IIKO_ORGANIZATION_ID;
    const terminalGroupId = process.env.IIKO_TERMINAL_GROUP_ID;
    const baseUrl = process.env.IIKO_API_URL;
    if (!apiKey || !organizationId || !terminalGroupId) {
      throw new Error(
        "iikoCloud API \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F: IIKO_API_KEY, IIKO_ORGANIZATION_ID, IIKO_TERMINAL_GROUP_ID"
      );
    }
    iikoClientInstance = new IikoClient({
      apiKey,
      organizationId,
      terminalGroupId,
      baseUrl
    });
  }
  return iikoClientInstance;
}

const iikoClient = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  IikoClient: IikoClient,
  getIikoClient: getIikoClient
}, Symbol.toStringTag, { value: 'Module' }));

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, key + "" , value);
class AikoClient {
  constructor() {
    __publicField$1(this, "iikoClient", null);
    try {
      this.iikoClient = getIikoClient();
    } catch (error) {
      console.warn("[\u0410\u0419\u041A\u041E/iikoCloud] API \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D:", error.message);
      this.iikoClient = null;
    }
  }
  /**
   * Получение меню из iikoCloud
   */
  async getMenu() {
    if (!this.iikoClient) {
      throw new Error("iikoCloud API \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F.");
    }
    try {
      const menu = await this.iikoClient.getMenu();
      const categories = [];
      const products = [];
      const productCategories = menu.categories || [];
      productCategories.forEach((category) => {
        if (category.isDeleted) {
          return;
        }
        const categorySlug = (category.name || category.id || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-а-яё]/g, "");
        categories.push({
          id: category.id,
          name: category.name,
          slug: categorySlug || category.id
        });
      });
      const iikoProducts = menu.items || [];
      iikoProducts.forEach((product) => {
        if (product.type === "modifier") {
          return;
        }
        const imageUrl = product.image || (product.imageLinks && product.imageLinks.length > 0 ? product.imageLinks[0] : null);
        let price = product.price || 0;
        if (price === 0 && product.sizePrices && Array.isArray(product.sizePrices) && product.sizePrices.length > 0) {
          const firstPrice = product.sizePrices.find((sp) => sp.price !== void 0 && sp.price !== null);
          if (firstPrice) {
            price = firstPrice.price || 0;
          }
        }
        const description = product.description || product.additionalInfo || null;
        const categoryId = product.categoryId || product.productCategoryId || null;
        products.push({
          id: product.id,
          name: product.name,
          description,
          price,
          categoryId,
          // Связь с категорией
          image: imageUrl,
          // Модификаторы
          modifiers: product.groupModifiers || product.modifiers || []
        });
      });
      console.log(`[\u0410\u0419\u041A\u041E] \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E: ${categories.length} \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439, ${products.length} \u0442\u043E\u0432\u0430\u0440\u043E\u0432`);
      if (products.length > 0) {
        console.log(`[\u0410\u0419\u041A\u041E] \u041F\u0440\u0438\u043C\u0435\u0440 \u0442\u043E\u0432\u0430\u0440\u0430:`, {
          name: products[0].name,
          categoryId: products[0].categoryId,
          price: products[0].price
        });
      }
      return {
        categories,
        products,
        lastSync: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("[\u0410\u0419\u041A\u041E] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043C\u0435\u043D\u044E:", error);
      throw error;
    }
  }
  /**
   * Отправка заказа в iikoCloud
   */
  async createOrder(orderData) {
    if (!this.iikoClient) {
      throw new Error("iikoCloud API \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F.");
    }
    try {
      const result = await this.iikoClient.createOrder({
        phone: orderData.phone,
        customerName: orderData.name,
        comment: orderData.comment,
        items: orderData.items,
        address: orderData.address,
        deliveryType: orderData.deliveryType,
        deliveryTime: orderData.deliveryTime
      });
      return {
        aikoOrderId: result.iikoOrderId,
        correlationId: result.correlationId,
        creationStatus: result.creationStatus
      };
    } catch (error) {
      console.error("[\u0410\u0419\u041A\u041E] \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430:", error);
      throw error;
    }
  }
  /**
   * Получение статуса заказа из iikoCloud
   */
  async getOrderStatus(aikoOrderId) {
    if (!this.iikoClient) {
      throw new Error("iikoCloud API \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F.");
    }
    try {
      const status = await this.iikoClient.getOrderStatus(aikoOrderId);
      const statusMap = {
        "New": "PENDING",
        "Bill": "CONFIRMED",
        "Close": "DELIVERED",
        "Deleted": "CANCELLED"
      };
      return {
        orderId: status.orderId,
        status: statusMap[status.status] || status.status,
        message: status.statusInfo,
        updatedAt: status.creationDate || (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("[\u0410\u0419\u041A\u041E] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u043A\u0430\u0437\u0430:", error);
      throw error;
    }
  }
  /**
   * Отмена заказа в iikoCloud
   */
  async cancelOrder(aikoOrderId, reason) {
    if (!this.iikoClient) {
      throw new Error("iikoCloud API \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043E\u043A\u0440\u0443\u0436\u0435\u043D\u0438\u044F.");
    }
    try {
      return await this.iikoClient.cancelOrder(aikoOrderId, reason);
    } catch (error) {
      console.error("[\u0410\u0419\u041A\u041E] \u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043C\u0435\u043D\u044B \u0437\u0430\u043A\u0430\u0437\u0430:", error);
      throw error;
    }
  }
}
const aikoClient = new AikoClient();

const aikoClient$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  AikoClient: AikoClient,
  aikoClient: aikoClient
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

process.env.ADMIN_JWT_SECRET || "admin-secret-key-change-in-production";
async function generateAdminToken(payload) {
  const now = Math.floor(Date.now() / 1e3);
  const jwtPayload = {
    ...payload,
    iat: now,
    exp: now + 7 * 24 * 60 * 60
    // 7 дней для админов (было 24 часа)
  };
  return Buffer.from(JSON.stringify(jwtPayload)).toString("base64url");
}
async function verifyAdminToken(token) {
  try {
    const decodedStr = Buffer.from(token, "base64url").toString();
    const decoded = JSON.parse(decodedStr);
    if (decoded.userId || decoded.phone) {
      console.log("[JWT Admin] \u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D \u0442\u043E\u043A\u0435\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0432\u043C\u0435\u0441\u0442\u043E \u0442\u043E\u043A\u0435\u043D\u0430 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430!");
      throw new Error("This is a user token, not an admin token");
    }
    if (!decoded.adminId || !decoded.login) {
      console.log("[JWT Admin] \u0422\u043E\u043A\u0435\u043D \u043D\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u043F\u043E\u043B\u0435\u0439 \u0430\u0434\u043C\u0438\u043D\u0430 (adminId, login)");
      throw new Error("Token does not contain adminId or login");
    }
    const adminPayload = {
      adminId: decoded.adminId,
      login: decoded.login,
      iat: decoded.iat,
      exp: decoded.exp
    };
    if (adminPayload.exp && adminPayload.exp < Math.floor(Date.now() / 1e3)) {
      throw new Error("Token expired");
    }
    return adminPayload;
  } catch (error) {
    if (error.message && (error.message.includes("user token") || error.message.includes("adminId"))) {
      throw error;
    }
    throw new Error("Invalid admin token");
  }
}

async function getAdminIdFromToken(event) {
  try {
    const authHeader = getHeader(event, "authorization") || getHeader(event, "Authorization");
    if (!authHeader) {
      console.log("[Admin Auth] \u041D\u0435\u0442 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 Authorization");
      return null;
    }
    if (!authHeader.startsWith("Bearer ")) {
      console.log("[Admin Auth] \u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 Authorization:", authHeader.substring(0, 20));
      return null;
    }
    const token = authHeader.substring(7);
    if (!token || token.trim().length === 0) {
      console.log("[Admin Auth] \u0422\u043E\u043A\u0435\u043D \u043F\u0443\u0441\u0442\u043E\u0439 \u043F\u043E\u0441\u043B\u0435 \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F");
      return null;
    }
    const payload = await verifyAdminToken(token);
    if (!payload || !payload.adminId) {
      console.log("[Admin Auth] \u0422\u043E\u043A\u0435\u043D \u043D\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 adminId");
      return null;
    }
    return payload.adminId;
  } catch (error) {
    console.error("[Admin Auth] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0442\u043E\u043A\u0435\u043D\u0430:", error.message || error);
    return null;
  }
}
async function requireAdminAuth(event) {
  const adminId = await getAdminIdFromToken(event);
  if (!adminId) {
    throw createError({
      statusCode: 401,
      message: "\u041D\u0435\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F. \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430."
    });
  }
  return adminId;
}

const _id__delete$e = defineEventHandler(async (event) => {
  try {
    const currentAdminId = await requireAdminAuth(event);
    const adminId = getRouterParam(event, "id");
    if (!adminId) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D ID \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430"
      });
    }
    if (currentAdminId === adminId) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435\u043B\u044C\u0437\u044F \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442"
      });
    }
    await prisma$2.admin.delete({
      where: { id: adminId }
    });
    return {
      success: true,
      message: "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0443\u0434\u0430\u043B\u0435\u043D"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430"
    });
  }
});

const _id__delete$f = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$e
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$g = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const adminId = getRouterParam(event, "id");
    const body = await readBody(event);
    const { name, password, isActive } = body;
    if (!adminId) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D ID \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430"
      });
    }
    const updateData = {};
    if (name !== void 0) {
      updateData.name = name;
    }
    if (password !== void 0 && password.length > 0) {
      updateData.password = await hashPassword(password);
    }
    if (isActive !== void 0) {
      updateData.isActive = isActive;
    }
    const admin = await prisma$2.admin.update({
      where: { id: adminId },
      data: updateData,
      select: {
        id: true,
        login: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return {
      success: true,
      admin
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430"
    });
  }
});

const _id__put$h = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$g
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$u = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const admins = await prisma$2.admin.findMany({
      select: {
        id: true,
        login: true,
        name: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return admins;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u043F\u0438\u0441\u043A\u0430 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u043E\u0432"
    });
  }
});

const index_get$v = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$u
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$i = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const body = await readBody(event);
    const { login, password, name } = body;
    if (!login || !password) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C"
      });
    }
    const existingAdmin = await prisma$2.admin.findUnique({
      where: { login }
    });
    if (existingAdmin) {
      throw createError({
        statusCode: 400,
        message: "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0441 \u0442\u0430\u043A\u0438\u043C \u043B\u043E\u0433\u0438\u043D\u043E\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
      });
    }
    const hashedPassword = await hashPassword(password);
    const admin = await prisma$2.admin.create({
      data: {
        login,
        password: hashedPassword,
        name: name || null,
        isActive: true
      },
      select: {
        id: true,
        login: true,
        name: true,
        isActive: true,
        createdAt: true
      }
    });
    return {
      success: true,
      admin
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430"
    });
  }
});

const index_post$j = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$i
}, Symbol.toStringTag, { value: 'Module' }));

const prisma = new PrismaClient();
const applyBonusMigration_post = defineEventHandler(async (event) => {
  await requireAdminAuth(event);
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "bonusBalance" DECIMAL(10, 2) NOT NULL DEFAULT 0;
    `);
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "bonus_transactions" (
          "id" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "orderId" TEXT,
          "amount" DECIMAL(10, 2) NOT NULL,
          "description" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "bonus_transactions_pkey" PRIMARY KEY ("id")
      );
    `);
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_indexes 
              WHERE tablename = 'bonus_transactions' 
              AND indexname = 'bonus_transactions_userId_idx'
          ) THEN
              CREATE INDEX "bonus_transactions_userId_idx" ON "bonus_transactions"("userId");
          END IF;
      END $$;
    `);
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_indexes 
              WHERE tablename = 'bonus_transactions' 
              AND indexname = 'bonus_transactions_orderId_idx'
          ) THEN
              CREATE INDEX "bonus_transactions_orderId_idx" ON "bonus_transactions"("orderId");
          END IF;
      END $$;
    `);
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_constraint 
              WHERE conname = 'bonus_transactions_userId_fkey'
          ) THEN
              ALTER TABLE "bonus_transactions" 
              ADD CONSTRAINT "bonus_transactions_userId_fkey" 
              FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
          END IF;
      END $$;
    `);
    await prisma.$executeRawUnsafe(`
      DO $$ 
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM pg_constraint 
              WHERE conname = 'bonus_transactions_orderId_fkey'
          ) THEN
              ALTER TABLE "bonus_transactions" 
              ADD CONSTRAINT "bonus_transactions_orderId_fkey" 
              FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
          END IF;
      END $$;
    `);
    const bonusFieldCheck = await prisma.$queryRawUnsafe(
      `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_name = 'users' AND column_name = 'bonusBalance'`
    );
    const tableCheck = await prisma.$queryRawUnsafe(
      `SELECT table_name 
       FROM information_schema.tables 
       WHERE table_name = 'bonus_transactions'`
    );
    if (bonusFieldCheck.length > 0 && tableCheck.length > 0) {
      return {
        success: true,
        message: "\u041C\u0438\u0433\u0440\u0430\u0446\u0438\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0430",
        details: {
          bonusBalanceColumn: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
          bonusTransactionsTable: "\u0421\u043E\u0437\u0434\u0430\u043D\u0430",
          indexes: "\u0421\u043E\u0437\u0434\u0430\u043D\u044B",
          foreignKeys: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B"
        }
      };
    } else {
      return {
        success: false,
        message: "\u041C\u0438\u0433\u0440\u0430\u0446\u0438\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430, \u043D\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043D\u0435 \u043F\u0440\u043E\u0448\u043B\u0430",
        details: {
          bonusFieldCheck: bonusFieldCheck.length,
          tableCheck: tableCheck.length
        }
      };
    }
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043C\u0438\u0433\u0440\u0430\u0446\u0438\u0438 \u0431\u043E\u043D\u0443\u0441\u043E\u0432:", error);
    return {
      success: false,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043C\u0438\u0433\u0440\u0430\u0446\u0438\u0438",
      error: error.message
    };
  } finally {
    await prisma.$disconnect();
  }
});

const applyBonusMigration_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: applyBonusMigration_post
}, Symbol.toStringTag, { value: 'Module' }));

const check_get = defineEventHandler(async (event) => {
  try {
    const adminId = await requireAdminAuth(event);
    const admin = await prisma$2.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        login: true,
        name: true,
        isActive: true,
        createdAt: true
      }
    });
    if (!admin || !admin.isActive) {
      throw createError({
        statusCode: 401,
        message: "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0438\u043B\u0438 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D"
      });
    }
    return {
      success: true,
      admin
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438"
    });
  }
});

const check_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: check_get
}, Symbol.toStringTag, { value: 'Module' }));

const login_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { login, password } = body;
    console.log("[Admin Login] \u041F\u043E\u043F\u044B\u0442\u043A\u0430 \u0432\u0445\u043E\u0434\u0430:", { login, passwordLength: password == null ? void 0 : password.length });
    if (!login || !password) {
      console.log("[Admin Login] \u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C");
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C"
      });
    }
    const admin = await prisma$2.admin.findUnique({
      where: { login }
    });
    if (!admin) {
      console.log("[Admin Login] \u0410\u0434\u043C\u0438\u043D \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D:", login);
      throw createError({
        statusCode: 401,
        message: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C"
      });
    }
    console.log("[Admin Login] \u0410\u0434\u043C\u0438\u043D \u043D\u0430\u0439\u0434\u0435\u043D:", { id: admin.id, login: admin.login, isActive: admin.isActive });
    if (!admin.isActive) {
      console.log("[Admin Login] \u0410\u0434\u043C\u0438\u043D \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D:", admin.id);
      throw createError({
        statusCode: 403,
        message: "\u0410\u043A\u043A\u0430\u0443\u043D\u0442 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D"
      });
    }
    console.log("[Admin Login] \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u0430\u0440\u043E\u043B\u044F...");
    const isPasswordValid = await comparePassword(password, admin.password);
    console.log("[Admin Login] \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043F\u0430\u0440\u043E\u043B\u044F:", isPasswordValid);
    if (!isPasswordValid) {
      console.log("[Admin Login] \u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u0430:", admin.login);
      throw createError({
        statusCode: 401,
        message: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C"
      });
    }
    const token = await generateAdminToken({
      adminId: admin.id,
      login: admin.login
    });
    try {
      const decodedStr = Buffer.from(token, "base64url").toString();
      const decoded = JSON.parse(decodedStr);
      console.log("[Admin Login] \u0421\u043E\u0437\u0434\u0430\u043D \u0442\u043E\u043A\u0435\u043D \u0430\u0434\u043C\u0438\u043D\u0430 \u0441 adminId:", decoded.adminId);
      if (decoded.userId || decoded.phone) {
        console.error("\u26A0\uFE0F \u041E\u0428\u0418\u0411\u041A\u0410: \u0422\u043E\u043A\u0435\u043D \u0430\u0434\u043C\u0438\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043F\u043E\u043B\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F!");
      }
    } catch (e) {
      console.error("\u26A0\uFE0F \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0442\u043E\u043A\u0435\u043D\u0430:", e);
    }
    return {
      success: true,
      token,
      admin: {
        id: admin.id,
        login: admin.login,
        name: admin.name,
        isActive: admin.isActive
      }
    };
  } catch (error) {
    console.error("[Admin Login] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u0445\u043E\u0434\u0435:", error);
    console.error("[Admin Login] Stack:", error.stack);
    if (error.statusCode) {
      throw error;
    }
    console.error("[Admin Login] \u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430, \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C 500");
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u0445\u043E\u0434\u0430 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443"
    });
  }
});

const login_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login_post
}, Symbol.toStringTag, { value: 'Module' }));

const logout_post = defineEventHandler(async (event) => {
  return {
    success: true,
    message: "\u0412\u044B\u0445\u043E\u0434 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E"
  };
});

const logout_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: logout_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$c = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const bannerId = getRouterParam(event, "id");
    if (!bannerId) {
      throw createError({
        statusCode: 400,
        message: "ID \u0431\u0430\u043D\u043D\u0435\u0440\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    await prisma$2.banner.delete({
      where: { id: bannerId }
    });
    return { success: true };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0431\u0430\u043D\u043D\u0435\u0440\u0430"
    });
  }
});

const _id__delete$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$c
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$a = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    const bannerId = getRouterParam(event, "id");
    console.log("[Admin Banners] \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0431\u0430\u043D\u043D\u0435\u0440\u0430 \u043F\u043E ID:", bannerId);
    await requireAdminAuth(event);
    if (!bannerId) {
      throw createError({
        statusCode: 400,
        message: "ID \u0431\u0430\u043D\u043D\u0435\u0440\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    console.log("[Admin Banners] \u041F\u043E\u0438\u0441\u043A \u0431\u0430\u043D\u043D\u0435\u0440\u0430 \u0432 \u0411\u0414...");
    const banner = await prisma$2.banner.findUnique({
      where: { id: bannerId }
    });
    if (!banner) {
      console.log("[Admin Banners] \u0411\u0430\u043D\u043D\u0435\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D:", bannerId);
      throw createError({
        statusCode: 404,
        message: "\u0411\u0430\u043D\u043D\u0435\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    console.log("[Admin Banners] \u0411\u0430\u043D\u043D\u0435\u0440 \u043D\u0430\u0439\u0434\u0435\u043D:", banner.id);
    return banner;
  } catch (error) {
    console.error("[Admin Banners] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0431\u0430\u043D\u043D\u0435\u0440\u0430:", error);
    console.error("[Admin Banners] \u0414\u0435\u0442\u0430\u043B\u0438:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      statusCode: error.statusCode
    });
    if (error.statusCode) {
      throw error;
    }
    if (((_a = error.message) == null ? void 0 : _a.includes("does not exist")) || ((_b = error.message) == null ? void 0 : _b.includes("relation")) || ((_c = error.message) == null ? void 0 : _c.includes("table")) || error.code === "P2021" || error.code === "P2001" || error.code === "42P01") {
      console.warn("[Admin Banners] \u0422\u0430\u0431\u043B\u0438\u0446\u0430 banners \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442");
      throw createError({
        statusCode: 404,
        message: "\u0411\u0430\u043D\u043D\u0435\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0431\u0430\u043D\u043D\u0435\u0440\u0430"
    });
  }
});

const _id__get$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$a
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$e = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const bannerId = getRouterParam(event, "id");
    if (!bannerId) {
      throw createError({
        statusCode: 400,
        message: "ID \u0431\u0430\u043D\u043D\u0435\u0440\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const body = await readBody(event);
    const { title, image, link, isActive, sortOrder } = body;
    if (!title || !image) {
      throw createError({
        statusCode: 400,
        message: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F (\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435)"
      });
    }
    const banner = await prisma$2.banner.update({
      where: { id: bannerId },
      data: {
        title,
        image,
        link: link || null,
        isActive: isActive !== void 0 ? isActive : true,
        sortOrder: sortOrder !== void 0 ? sortOrder : 0
      }
    });
    return banner;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0431\u0430\u043D\u043D\u0435\u0440\u0430"
    });
  }
});

const _id__put$f = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$e
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$s = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    await requireAdminAuth(event);
    const banners = await prisma$2.banner.findMany({
      orderBy: {
        sortOrder: "asc"
      }
    });
    return banners;
  } catch (error) {
    console.error("[Admin Banners] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u043F\u0438\u0441\u043A\u0430 \u0431\u0430\u043D\u043D\u0435\u0440\u043E\u0432:", error);
    console.error("[Admin Banners] \u0414\u0435\u0442\u0430\u043B\u0438:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      statusCode: error.statusCode
    });
    if (error.statusCode) {
      throw error;
    }
    if (((_a = error.message) == null ? void 0 : _a.includes("does not exist")) || ((_b = error.message) == null ? void 0 : _b.includes("relation")) || ((_c = error.message) == null ? void 0 : _c.includes("table")) || error.code === "P2021" || error.code === "P2001" || error.code === "42P01") {
      console.warn("[Admin Banners] \u0422\u0430\u0431\u043B\u0438\u0446\u0430 banners \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442, \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C \u043F\u0443\u0441\u0442\u043E\u0439 \u043C\u0430\u0441\u0441\u0438\u0432");
      return [];
    }
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0431\u0430\u043D\u043D\u0435\u0440\u043E\u0432"
    });
  }
});

const index_get$t = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$s
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$g = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const body = await readBody(event);
    const { title, image, link, isActive, sortOrder } = body;
    if (!title || !image) {
      throw createError({
        statusCode: 400,
        message: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0432\u0441\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F (\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435)"
      });
    }
    const banner = await prisma$2.banner.create({
      data: {
        title,
        image,
        link: link || null,
        isActive: isActive !== void 0 ? isActive : true,
        sortOrder: sortOrder || 0
      }
    });
    return banner;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0431\u0430\u043D\u043D\u0435\u0440\u0430"
    });
  }
});

const index_post$h = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$g
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$8 = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const id = getRouterParam(event, "id");
    const zone = await prisma$2.deliveryZone.findUnique({
      where: { id }
    });
    if (!zone) {
      throw createError({
        statusCode: 404,
        message: "\u0417\u043E\u043D\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
      });
    }
    return {
      id: zone.id,
      name: zone.name,
      description: zone.description,
      minOrderAmount: Number(zone.minOrderAmount),
      deliveryPrice: Number(zone.deliveryPrice),
      freeDeliveryThreshold: zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null,
      estimatedTime: zone.estimatedTime,
      isActive: zone.isActive,
      coordinates: zone.coordinates
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0437\u043E\u043D\u044B \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    });
  }
});

const _id__get$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$8
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$c = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const { name, description, minOrderAmount, deliveryPrice, freeDeliveryThreshold, estimatedTime, isActive, coordinates } = body;
    const updateData = {};
    if (name !== void 0) updateData.name = name;
    if (description !== void 0) updateData.description = description || null;
    if (minOrderAmount !== void 0) updateData.minOrderAmount = minOrderAmount;
    if (deliveryPrice !== void 0) updateData.deliveryPrice = deliveryPrice;
    if (freeDeliveryThreshold !== void 0) updateData.freeDeliveryThreshold = freeDeliveryThreshold || null;
    if (estimatedTime !== void 0) updateData.estimatedTime = estimatedTime;
    if (isActive !== void 0) updateData.isActive = isActive;
    if (coordinates !== void 0) updateData.coordinates = coordinates;
    const zone = await prisma$2.deliveryZone.update({
      where: { id },
      data: updateData
    });
    return {
      success: true,
      zone: {
        id: zone.id,
        name: zone.name,
        description: zone.description,
        minOrderAmount: Number(zone.minOrderAmount),
        deliveryPrice: Number(zone.deliveryPrice),
        freeDeliveryThreshold: zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null,
        estimatedTime: zone.estimatedTime,
        isActive: zone.isActive
      }
    };
  } catch (error) {
    if (error.code === "P2025") {
      throw createError({
        statusCode: 404,
        message: "\u0417\u043E\u043D\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
      });
    }
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u0437\u043E\u043D\u044B \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    });
  }
});

const _id__put$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$c
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$q = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const zones = await prisma$2.deliveryZone.findMany({
      orderBy: {
        minOrderAmount: "asc"
      }
    });
    const formattedZones = zones.map((zone) => ({
      id: zone.id,
      name: zone.name,
      description: zone.description,
      minOrderAmount: Number(zone.minOrderAmount),
      deliveryPrice: Number(zone.deliveryPrice),
      freeDeliveryThreshold: zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null,
      estimatedTime: zone.estimatedTime,
      isActive: zone.isActive,
      coordinates: zone.coordinates
    }));
    return formattedZones;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0437\u043E\u043D \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    });
  }
});

const index_get$r = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$q
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$e = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const body = await readBody(event);
    const { name, description, minOrderAmount, deliveryPrice, freeDeliveryThreshold, estimatedTime, isActive, coordinates } = body;
    if (!name || minOrderAmount === void 0 || deliveryPrice === void 0) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u044B \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F"
      });
    }
    const zone = await prisma$2.deliveryZone.create({
      data: {
        name,
        description: description || null,
        minOrderAmount,
        deliveryPrice,
        freeDeliveryThreshold: freeDeliveryThreshold || null,
        estimatedTime: estimatedTime || 60,
        isActive: isActive !== void 0 ? isActive : true,
        coordinates: coordinates || [[53.0194, 158.6509], [53.0194, 158.651], [53.0195, 158.651], [53.0195, 158.6509]]
      }
    });
    return {
      success: true,
      zone: {
        id: zone.id,
        name: zone.name,
        description: zone.description,
        minOrderAmount: Number(zone.minOrderAmount),
        deliveryPrice: Number(zone.deliveryPrice),
        freeDeliveryThreshold: zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null,
        estimatedTime: zone.estimatedTime,
        isActive: zone.isActive
      }
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0437\u043E\u043D\u044B \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    });
  }
});

const index_post$f = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$e
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$o = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    let widget = await prisma$2.promocodeWidget.findFirst({
      orderBy: {
        createdAt: "desc"
      }
    });
    if (!widget) {
      widget = await prisma$2.promocodeWidget.create({
        data: {
          code: "3101",
          description: "\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u043D\u043E\u0432\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432",
          isActive: true
        }
      });
    }
    return widget;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0432\u0438\u0434\u0436\u0435\u0442\u0430 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430"
    });
  }
});

const index_get$p = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$o
}, Symbol.toStringTag, { value: 'Module' }));

const index_put = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const body = await readBody(event);
    const { code, description, isActive } = body;
    if (!code || !description) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D \u043A\u043E\u0434 \u0438\u043B\u0438 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430"
      });
    }
    let widget = await prisma$2.promocodeWidget.findFirst({
      orderBy: {
        createdAt: "desc"
      }
    });
    if (widget) {
      widget = await prisma$2.promocodeWidget.update({
        where: { id: widget.id },
        data: {
          code,
          description,
          isActive: isActive !== void 0 ? isActive : true
        }
      });
    } else {
      widget = await prisma$2.promocodeWidget.create({
        data: {
          code,
          description,
          isActive: isActive !== void 0 ? isActive : true
        }
      });
    }
    return {
      success: true,
      widget
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0432\u0438\u0434\u0436\u0435\u0442\u0430 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430"
    });
  }
});

const index_put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_put
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$a = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const promotionId = getRouterParam(event, "id");
    if (!promotionId) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D ID \u0430\u043A\u0446\u0438\u0438"
      });
    }
    await prisma$2.promotion.delete({
      where: { id: promotionId }
    });
    return {
      success: true,
      message: "\u0410\u043A\u0446\u0438\u044F \u0443\u0434\u0430\u043B\u0435\u043D\u0430"
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0430\u043A\u0446\u0438\u0438"
    });
  }
});

const _id__delete$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$a
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$a = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const promotionId = getRouterParam(event, "id");
    const body = await readBody(event);
    const { title, description, image, date, isActive, sortOrder } = body;
    if (!promotionId) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D ID \u0430\u043A\u0446\u0438\u0438"
      });
    }
    const updateData = {};
    if (title !== void 0) updateData.title = title;
    if (description !== void 0) updateData.description = description || null;
    if (image !== void 0) updateData.image = image || null;
    if (date !== void 0) updateData.date = date ? new Date(date) : null;
    if (isActive !== void 0) updateData.isActive = isActive;
    if (sortOrder !== void 0) updateData.sortOrder = sortOrder;
    const promotion = await prisma$2.promotion.update({
      where: { id: promotionId },
      data: updateData
    });
    return {
      success: true,
      promotion
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0430\u043A\u0446\u0438\u0438"
    });
  }
});

const _id__put$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$a
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$m = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const promotions = await prisma$2.promotion.findMany({
      orderBy: {
        sortOrder: "asc"
      }
    });
    return promotions;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0430\u043A\u0446\u0438\u0439"
    });
  }
});

const index_get$n = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$m
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$c = defineEventHandler(async (event) => {
  try {
    await requireAdminAuth(event);
    const body = await readBody(event);
    const { title, description, image, date, isActive, sortOrder } = body;
    if (!title) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0430\u043A\u0446\u0438\u0438"
      });
    }
    const promotion = await prisma$2.promotion.create({
      data: {
        title,
        description: description || null,
        image: image || null,
        date: date ? new Date(date) : null,
        isActive: isActive !== void 0 ? isActive : true,
        sortOrder: sortOrder || 0
      }
    });
    return {
      success: true,
      promotion
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0430\u043A\u0446\u0438\u0438"
    });
  }
});

const index_post$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$c
}, Symbol.toStringTag, { value: 'Module' }));

const settings_get = defineEventHandler(async (event) => {
  try {
    return {
      isMaintenanceMode: false,
      maintenanceMessage: "\u0421\u0430\u0439\u0442 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u0412\u0435\u0434\u0443\u0442\u0441\u044F \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0440\u0430\u0431\u043E\u0442\u044B.",
      estimatedReadyTime: 30,
      maxConcurrentOrders: 10
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A"
    });
  }
});

const settings_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: settings_get
}, Symbol.toStringTag, { value: 'Module' }));

const settings_put = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return {
      success: true,
      message: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B (\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430)"
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A"
    });
  }
});

const settings_put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: settings_put
}, Symbol.toStringTag, { value: 'Module' }));

const health_get = defineEventHandler(async (event) => {
  try {
    const apiKey = process.env.IIKO_API_KEY;
    const organizationId = process.env.IIKO_ORGANIZATION_ID;
    const terminalGroupId = process.env.IIKO_TERMINAL_GROUP_ID;
    const baseUrl = process.env.IIKO_API_URL;
    const isConfigured = !!(apiKey && organizationId && terminalGroupId);
    if (!isConfigured) {
      return {
        configured: false,
        connected: false,
        note: "iikoCloud API \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D. \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 IIKO_API_KEY, IIKO_ORGANIZATION_ID \u0438 IIKO_TERMINAL_GROUP_ID"
      };
    }
    let apiConnected = false;
    let apiError = null;
    try {
      const { getIikoClient } = await Promise.resolve().then(function () { return iikoClient; });
      const client = getIikoClient();
      const health = await client.healthCheck();
      apiConnected = health.connected;
    } catch (error) {
      apiError = error.message;
      apiConnected = false;
    }
    let menuStats = null;
    try {
      const categoriesCount = await prisma$2.category.count({
        where: { isActive: true }
      });
      const productsCount = await prisma$2.product.count({
        where: { isActive: true }
      });
      const lastUpdatedProduct = await prisma$2.product.findFirst({
        orderBy: { updatedAt: "desc" },
        select: { updatedAt: true }
      });
      const lastSyncTime = (lastUpdatedProduct == null ? void 0 : lastUpdatedProduct.updatedAt) || null;
      menuStats = {
        categoriesCount,
        productsCount,
        lastSyncTime: lastSyncTime ? lastSyncTime.toISOString() : null,
        isSynced: categoriesCount > 0 || productsCount > 0
      };
    } catch (error) {
      console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0438 \u043C\u0435\u043D\u044E:", error);
      menuStats = {
        error: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0443 \u043C\u0435\u043D\u044E"
      };
    }
    return {
      configured: true,
      connected: apiConnected,
      organizationId,
      terminalGroupId,
      baseUrl: baseUrl || "https://api-ru.iiko.services",
      apiError: apiError || void 0,
      menu: menuStats,
      note: apiConnected ? (menuStats == null ? void 0 : menuStats.isSynced) ? "iikoCloud API \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u041C\u0435\u043D\u044E \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043E." : "iikoCloud API \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u041C\u0435\u043D\u044E \u043D\u0435 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043E - \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 POST /api/aiko/sync" : "iikoCloud API \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D, \u043D\u043E \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F"
    };
  } catch (error) {
    return {
      configured: false,
      connected: false,
      error: error.message,
      note: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F iikoCloud API"
    };
  }
});

const health_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: health_get
}, Symbol.toStringTag, { value: 'Module' }));

const status_get$2 = defineEventHandler(async (event) => {
  try {
    const aikoOrderId = getRouterParam(event, "aikoOrderId");
    if (!aikoOrderId) {
      throw createError({
        statusCode: 400,
        message: "ID \u0437\u0430\u043A\u0430\u0437\u0430 \u0410\u0419\u041A\u041E \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const aikoStatus = await aikoClient.getOrderStatus(aikoOrderId);
    const order = await prisma$2.order.findFirst({
      where: { aikoOrderId }
    });
    if (order) {
      const statusMap = {
        "pending": "PENDING",
        "confirmed": "CONFIRMED",
        "preparing": "PREPARING",
        "ready": "READY",
        "delivering": "DELIVERING",
        "delivered": "DELIVERED",
        "cancelled": "CANCELLED"
      };
      const mappedStatus = statusMap[aikoStatus.status.toLowerCase()] || aikoStatus.status;
      if (order.status !== mappedStatus) {
        const updatedOrder = await prisma$2.order.update({
          where: { id: order.id },
          data: { status: mappedStatus },
          include: {
            user: {
              select: {
                id: true
              }
            }
          }
        });
        if (mappedStatus === "DELIVERED" && updatedOrder.userId && updatedOrder.user) {
          try {
            const { awardBonusForDeliveredOrder } = await Promise.resolve().then(function () { return bonus; });
            await awardBonusForDeliveredOrder(updatedOrder.id);
          } catch (error) {
            console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0431\u043E\u043D\u0443\u0441\u043E\u0432:", error);
          }
        }
        try {
          const { broadcastOrderUpdate } = await Promise.resolve().then(function () { return orders; });
          broadcastOrderUpdate(order.id, mappedStatus, {
            orderNumber: order.orderNumber,
            estimatedTime: aikoStatus.estimatedTime
          });
        } catch (error) {
          console.log("WebSocket \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D, \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0435\u043C broadcast");
        }
      }
    }
    return {
      success: true,
      aikoOrderId,
      status: aikoStatus.status,
      estimatedTime: aikoStatus.estimatedTime,
      message: aikoStatus.message,
      updatedAt: aikoStatus.updatedAt
    };
  } catch (error) {
    console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u0430:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u043A\u0430\u0437\u0430 \u0438\u0437 iikoCloud",
      data: {
        error: error.message,
        note: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 IIKO_API_KEY, IIKO_ORGANIZATION_ID \u0438 IIKO_TERMINAL_GROUP_ID"
      }
    });
  }
});

const status_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: status_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$a = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { orderId } = body;
    if (!orderId) {
      throw createError({
        statusCode: 400,
        message: "ID \u0437\u0430\u043A\u0430\u0437\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const order = await prisma$2.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true,
            modifiers: {
              include: {
                option: true
              }
            }
          }
        },
        address: true,
        deliveryZone: true
      }
    });
    if (!order) {
      throw createError({
        statusCode: 404,
        message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    const aikoOrderData = {
      orderNumber: order.orderNumber,
      phone: order.phone,
      name: order.name,
      address: order.addressText || (order.address ? `${order.address.street}, \u0434. ${order.address.house}${order.address.apartment ? `, \u043A\u0432. ${order.address.apartment}` : ""}` : null),
      deliveryType: order.deliveryType,
      deliveryTime: order.deliveryTime,
      comment: order.comment,
      items: order.items.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        price: Number(item.price),
        modifiers: item.modifiers.map((mod) => ({
          name: mod.name,
          price: Number(mod.price)
        }))
      })),
      total: Number(order.total),
      subtotal: Number(order.subtotal),
      deliveryPrice: Number(order.deliveryPrice)
    };
    const aikoResponse = await aikoClient.createOrder(aikoOrderData);
    await prisma$2.order.update({
      where: { id: orderId },
      data: {
        aikoOrderId: aikoResponse.aikoOrderId
      }
    });
    return {
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      aikoOrderId: aikoResponse.aikoOrderId,
      message: "\u0417\u0430\u043A\u0430\u0437 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0432 iikoCloud"
    };
  } catch (error) {
    console.error("[\u0410\u0419\u041A\u041E] \u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0437\u0430\u043A\u0430\u0437\u0430:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0437\u0430\u043A\u0430\u0437\u0430 \u0432 iikoCloud",
      data: {
        error: error.message,
        note: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 IIKO_API_KEY, IIKO_ORGANIZATION_ID \u0438 IIKO_TERMINAL_GROUP_ID"
      }
    });
  }
});

const index_post$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$a
}, Symbol.toStringTag, { value: 'Module' }));

const syncOrdersStatus_post = defineEventHandler(async (event) => {
  try {
    console.log("[\u0410\u0419\u041A\u041E] \u041D\u0430\u0447\u0430\u043B\u043E \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u0432 \u0437\u0430\u043A\u0430\u0437\u043E\u0432...");
    const activeOrders = await prisma$2.order.findMany({
      where: {
        aikoOrderId: { not: null },
        status: {
          notIn: ["DELIVERED", "CANCELLED"]
        }
      },
      include: {
        user: {
          select: {
            id: true
          }
        }
      }
    });
    console.log(`[\u0410\u0419\u041A\u041E] \u041D\u0430\u0439\u0434\u0435\u043D\u043E ${activeOrders.length} \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0434\u043B\u044F \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438`);
    let syncedCount = 0;
    let updatedCount = 0;
    const errors = [];
    for (const order of activeOrders) {
      if (!order.aikoOrderId) continue;
      try {
        const aikoStatus = await aikoClient.getOrderStatus(order.aikoOrderId);
        const statusMap = {
          "New": "PENDING",
          "Bill": "CONFIRMED",
          "CookingStarted": "PREPARING",
          "CookingCompleted": "READY",
          "OnWay": "DELIVERING",
          "Closed": "DELIVERED",
          "Deleted": "CANCELLED"
        };
        const mappedStatus = statusMap[aikoStatus.status] || aikoStatus.status.toUpperCase();
        const statusOrder = {
          "PENDING": 1,
          "CONFIRMED": 2,
          "PREPARING": 3,
          "READY": 4,
          "DELIVERING": 5,
          "DELIVERED": 6,
          "CANCELLED": 99
          // CANCELLED можно установить в любой момент
        };
        const currentStatusOrder = statusOrder[order.status] || 0;
        const newStatusOrder = statusOrder[mappedStatus] || 0;
        const shouldUpdate = order.status !== mappedStatus && (newStatusOrder >= currentStatusOrder || mappedStatus === "CANCELLED");
        if (shouldUpdate) {
          const updatedOrder = await prisma$2.order.update({
            where: { id: order.id },
            data: { status: mappedStatus },
            include: {
              user: {
                select: {
                  id: true
                }
              }
            }
          });
          console.log(`[\u0410\u0419\u041A\u041E] \u2705 \u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430 ${order.orderNumber} \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D: ${order.status} \u2192 ${mappedStatus}`);
          updatedCount++;
        } else if (order.status !== mappedStatus && newStatusOrder < currentStatusOrder) {
          console.log(`[\u0410\u0419\u041A\u041E] \u26A0\uFE0F  \u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430 ${order.orderNumber} \u043D\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D (\u043E\u0442\u043A\u0430\u0442 \u043D\u0430\u0437\u0430\u0434 \u043F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0449\u0435\u043D): ${order.status} \u2192 ${mappedStatus}`);
        }
        syncedCount++;
      } catch (error) {
        const errorMsg = `\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0437\u0430\u043A\u0430\u0437\u0430 ${order.orderNumber}: ${error.message}`;
        errors.push(errorMsg);
        console.error(`[\u0410\u0419\u041A\u041E] ${errorMsg}`);
      }
    }
    console.log(`[\u0410\u0419\u041A\u041E] \u2705 \u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430: ${syncedCount} \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043E, ${updatedCount} \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E`);
    return {
      success: true,
      message: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u0432 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430",
      stats: {
        totalOrders: activeOrders.length,
        syncedCount,
        updatedCount,
        errorsCount: errors.length,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      },
      errors: errors.length > 0 ? errors : void 0
    };
  } catch (error) {
    console.error("[\u0410\u0419\u041A\u041E] \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u0432 \u0437\u0430\u043A\u0430\u0437\u043E\u0432:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u043E\u0432 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u0438\u0437 iikoCloud",
      data: {
        error: error.message
      }
    });
  }
});

const syncOrdersStatus_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: syncOrdersStatus_post
}, Symbol.toStringTag, { value: 'Module' }));

const syncStatus_get = defineEventHandler(async (event) => {
  try {
    const categoriesCount = await prisma$2.category.count({
      where: { isActive: true }
    });
    const productsCount = await prisma$2.product.count({
      where: { isActive: true }
    });
    const lastUpdatedProduct = await prisma$2.product.findFirst({
      orderBy: { updatedAt: "desc" },
      select: {
        updatedAt: true,
        name: true
      }
    });
    const lastUpdatedCategory = await prisma$2.category.findFirst({
      orderBy: { updatedAt: "desc" },
      select: {
        updatedAt: true,
        name: true
      }
    });
    const lastSyncTime = (lastUpdatedProduct == null ? void 0 : lastUpdatedProduct.updatedAt) || (lastUpdatedCategory == null ? void 0 : lastUpdatedCategory.updatedAt) || null;
    return {
      success: true,
      status: "ok",
      stats: {
        categoriesCount,
        productsCount,
        lastSyncTime: lastSyncTime ? lastSyncTime.toISOString() : null,
        lastUpdatedProduct: (lastUpdatedProduct == null ? void 0 : lastUpdatedProduct.name) || null,
        lastUpdatedCategory: (lastUpdatedCategory == null ? void 0 : lastUpdatedCategory.name) || null
      },
      message: lastSyncTime ? `\u041C\u0435\u043D\u044E \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043E. \u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439: ${categoriesCount}, \u0422\u043E\u0432\u0430\u0440\u043E\u0432: ${productsCount}` : "\u041C\u0435\u043D\u044E \u0435\u0449\u0435 \u043D\u0435 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043E. \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044E \u0447\u0435\u0440\u0435\u0437 POST /api/aiko/sync"
    };
  } catch (error) {
    console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438:", error);
    return {
      success: false,
      status: "error",
      error: error.message,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438"
    };
  }
});

const syncStatus_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: syncStatus_get
}, Symbol.toStringTag, { value: 'Module' }));

const sync_post = defineEventHandler(async (event) => {
  try {
    console.log("[iikoCloud] \u041D\u0430\u0447\u0430\u043B\u043E \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u043C\u0435\u043D\u044E \u0438 \u0446\u0435\u043D...");
    const iikoMenu = await aikoClient.getMenu();
    let syncedCategories = 0;
    let syncedProducts = 0;
    let updatedPrices = 0;
    const errors = [];
    for (const category of iikoMenu.categories) {
      try {
        await prisma$2.category.upsert({
          where: { slug: category.slug },
          create: {
            id: category.id,
            name: category.name,
            slug: category.slug,
            isActive: true
          },
          update: {
            name: category.name,
            isActive: true
          }
        });
        syncedCategories++;
      } catch (error) {
        errors.push(`\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 ${category.name}: ${error.message}`);
        console.error(`[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 ${category.name}:`, error);
      }
    }
    for (const product of iikoMenu.products) {
      try {
        let categoryId = product.categoryId;
        if (categoryId) {
          const category = await prisma$2.category.findUnique({
            where: { id: categoryId }
          });
          if (!category) {
            const firstCategory = await prisma$2.category.findFirst({
              where: { isActive: true }
            });
            if (firstCategory) {
              categoryId = firstCategory.id;
            }
          }
        }
        if (!categoryId) {
          errors.push(`\u041F\u0440\u043E\u043F\u0443\u0449\u0435\u043D \u0442\u043E\u0432\u0430\u0440 ${product.name}: \u043D\u0435\u0442 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438`);
          continue;
        }
        const slug = (product.name || product.id).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-а-яё]/g, "").substring(0, 100);
        const existing = await prisma$2.product.findUnique({
          where: { slug }
        });
        const productData = {
          name: product.name,
          description: product.description || null,
          price: product.price || 0,
          categoryId,
          image: product.image || null,
          isActive: true
        };
        if (existing) {
          if (Number(existing.price) !== Number(product.price)) {
            await prisma$2.product.update({
              where: { id: existing.id },
              data: {
                ...productData,
                price: product.price || existing.price
              }
            });
            updatedPrices++;
          } else {
            await prisma$2.product.update({
              where: { id: existing.id },
              data: productData
            });
          }
        } else {
          await prisma$2.product.create({
            data: {
              id: product.id,
              slug,
              ...productData
            }
          });
          syncedProducts++;
        }
      } catch (error) {
        errors.push(`\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0442\u043E\u0432\u0430\u0440\u0430 ${product.name}: ${error.message}`);
        console.error(`[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u0442\u043E\u0432\u0430\u0440\u0430 ${product.name}:`, error);
      }
    }
    console.log("[iikoCloud] \u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430");
    return {
      success: true,
      message: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430",
      stats: {
        syncedCategories,
        syncedProducts,
        updatedPrices,
        errorsCount: errors.length,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      },
      errors: errors.length > 0 ? errors : void 0
    };
  } catch (error) {
    console.error("[iikoCloud] \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441 iikoCloud",
      data: {
        error: error.message,
        note: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 IIKO_API_KEY, IIKO_ORGANIZATION_ID \u0438 IIKO_TERMINAL_GROUP_ID"
      }
    });
  }
});

const sync_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sync_post
}, Symbol.toStringTag, { value: 'Module' }));

const SMS_RU_BASE_URL = "https://sms.ru";
function getSmsRuApiKey() {
  const config = useRuntimeConfig();
  return config.smsRuApiKey || "66CCA90D-74B8-6CCB-30C5-05A1D6661AE6";
}
async function sendSmsCode(phone, code) {
  var _a;
  try {
    const normalizedPhone = phone.replace(/\D/g, "");
    const phoneNumber = normalizedPhone.startsWith("8") ? "7" + normalizedPhone.slice(1) : normalizedPhone.startsWith("7") ? normalizedPhone : "7" + normalizedPhone;
    const message = `\u0412\u0430\u0448 \u043A\u043E\u0434 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438: ${code}. \u041D\u0435 \u0441\u043E\u043E\u0431\u0449\u0430\u0439\u0442\u0435 \u0435\u0433\u043E \u043D\u0438\u043A\u043E\u043C\u0443.`;
    const params = new URLSearchParams({
      api_id: getSmsRuApiKey(),
      to: phoneNumber,
      msg: message,
      json: "1"
    });
    const url = `${SMS_RU_BASE_URL}/sms/send?${params.toString()}`;
    console.log("[SMS.RU] Request URL:", url.replace(getSmsRuApiKey(), "***"));
    console.log("[SMS.RU] Phone:", phoneNumber);
    console.log("[SMS.RU] Message:", message);
    const response = await $fetch(url);
    console.log("[SMS.RU] Full response:", JSON.stringify(response, null, 2));
    const globalSuccess = response.status === "OK" || response.status_code === 100;
    const smsResult = (_a = response.sms) == null ? void 0 : _a[phoneNumber];
    const smsSuccess = (smsResult == null ? void 0 : smsResult.status) === "OK" || (smsResult == null ? void 0 : smsResult.status_code) === 100;
    if (globalSuccess && (smsSuccess || !smsResult)) {
      console.log("[SMS.RU] \u2705 SMS sent successfully");
      if (smsResult == null ? void 0 : smsResult.sms_id) {
        console.log("[SMS.RU] SMS ID:", smsResult.sms_id);
      }
      return {
        success: true,
        message: "SMS \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E"
      };
    } else {
      console.error("[SMS.RU] \u274C API Error:", JSON.stringify(response, null, 2));
      const errorMessage = (smsResult == null ? void 0 : smsResult.status_text) || response.status_text || `\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 SMS: ${(smsResult == null ? void 0 : smsResult.status_code) || response.status_code || "unknown"}`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 SMS \u0447\u0435\u0440\u0435\u0437 SMS.RU:", error);
    throw error;
  }
}
async function verifySmsCode(phone, code) {
  try {
    const normalizedPhone = phone.replace(/\D/g, "");
    const phoneNumber = normalizedPhone.startsWith("8") ? "7" + normalizedPhone.slice(1) : normalizedPhone.startsWith("7") ? normalizedPhone : "7" + normalizedPhone;
    const params = new URLSearchParams({
      api_id: getSmsRuApiKey(),
      phone: phoneNumber,
      code,
      json: "1"
    });
    const response = await $fetch(`${SMS_RU_BASE_URL}/code/check?${params.toString()}`);
    if (response.status === "OK" || response.status_code === 100) {
      return {
        success: true,
        message: "\u041A\u043E\u0434 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D"
      };
    } else {
      return {
        success: false,
        message: response.status_text || "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u0434"
      };
    }
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043A\u043E\u0434\u0430 \u0447\u0435\u0440\u0435\u0437 SMS.RU:", error);
    return {
      success: false,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043A\u043E\u0434\u0430"
    };
  }
}

const sendSms_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  try {
    const body = await readBody(event);
    const { phone } = body;
    if (!phone || phone.length < 10) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"
      });
    }
    const normalizedPhone = phone.replace(/\D/g, "");
    const phoneNumber = normalizedPhone.startsWith("8") ? "7" + normalizedPhone.slice(1) : normalizedPhone.startsWith("7") ? normalizedPhone : "7" + normalizedPhone;
    const code = Math.floor(1e3 + Math.random() * 9e3).toString();
    try {
      await createSmsCodesTable();
    } catch (migrationError) {
      console.error("Migration error (non-fatal):", migrationError.message);
    }
    try {
      await prisma$2.smsCode.deleteMany({
        where: {
          phone: phoneNumber,
          verified: false,
          expiresAt: {
            lt: /* @__PURE__ */ new Date()
          }
        }
      });
    } catch (error) {
      if ((_a = error.message) == null ? void 0 : _a.includes("does not exist")) {
        await createSmsCodesTable();
      } else {
        throw error;
      }
    }
    const expiresAt = new Date(Date.now() + 5 * 60 * 1e3);
    try {
      await prisma$2.smsCode.create({
        data: {
          phone: phoneNumber,
          code,
          expiresAt,
          verified: false
        }
      });
    } catch (error) {
      if (((_b = error.message) == null ? void 0 : _b.includes("does not exist")) || ((_c = error.message) == null ? void 0 : _c.includes("column")) || ((_d = error.message) == null ? void 0 : _d.includes("verified")) || ((_e = error.message) == null ? void 0 : _e.includes("invalid input syntax for type integer"))) {
        console.log("\u26A0\uFE0F  Fixing table structure...", error.message);
        await createSmsCodesTable();
        await new Promise((resolve) => setTimeout(resolve, 500));
        await prisma$2.smsCode.create({
          data: {
            phone: phoneNumber,
            code,
            expiresAt,
            verified: false
          }
        });
      } else {
        throw error;
      }
    }
    try {
      await sendSmsCode(phoneNumber, code);
      console.log(`[SMS] \u041A\u043E\u0434 ${code} \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 \u043D\u043E\u043C\u0435\u0440 ${phoneNumber} \u0447\u0435\u0440\u0435\u0437 SMS.RU`);
    } catch (smsError) {
      console.error("[SMS] \u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0447\u0435\u0440\u0435\u0437 SMS.RU:", smsError);
      throw createError({
        statusCode: 500,
        message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 SMS. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0437\u0436\u0435."
      });
    }
    return {
      success: true,
      message: "\u041A\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"
    };
  } catch (error) {
    console.error("[SMS Send Error]", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    if (error.statusCode) {
      throw error;
    }
    if ((_f = error.message) == null ? void 0 : _f.includes("invalid input syntax for type integer")) {
      console.error("\u274C Integer type error - \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0430 \u0441 \u0442\u0438\u043F\u0430\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u0432 \u0411\u0414");
    }
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 SMS"
    });
  }
});

const sendSms_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sendSms_post
}, Symbol.toStringTag, { value: 'Module' }));

const verifySms_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    const body = await readBody(event);
    const { phone, code } = body;
    if (!phone || !code) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 \u043A\u043E\u0434"
      });
    }
    const normalizedPhone = phone.replace(/\D/g, "");
    const phoneNumber = normalizedPhone.startsWith("8") ? "7" + normalizedPhone.slice(1) : normalizedPhone.startsWith("7") ? normalizedPhone : "7" + normalizedPhone;
    const smsCodeRecord = await prisma$2.smsCode.findFirst({
      where: {
        phone: phoneNumber,
        code,
        verified: false,
        expiresAt: {
          gt: /* @__PURE__ */ new Date()
          // Код еще не истек
        }
      },
      orderBy: {
        createdAt: "desc"
        // Берем последний код
      }
    });
    if (!smsCodeRecord) {
      const verifyResult = await verifySmsCode(phoneNumber, code);
      if (!verifyResult.success) {
        throw createError({
          statusCode: 400,
          message: "\u041A\u043E\u0434 \u043D\u0435\u0432\u0435\u0440\u0435\u043D \u0438\u043B\u0438 \u0438\u0441\u0442\u0435\u043A"
        });
      }
    } else {
      await prisma$2.smsCode.update({
        where: { id: smsCodeRecord.id },
        data: { verified: true }
      });
    }
    let user = null;
    try {
      try {
        user = await prisma$2.user.findUnique({
          where: { phone: phoneNumber },
          select: {
            id: true,
            phone: true,
            name: true,
            email: true
          }
        });
      } catch (findError) {
        console.log("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0438\u0441\u043A\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0447\u0435\u0440\u0435\u0437 Prisma, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0435\u043C \u0441\u043E\u0437\u0434\u0430\u0442\u044C:", findError.message);
      }
      if (!user) {
        try {
          user = await prisma$2.user.create({
            data: {
              phone: phoneNumber,
              name: null,
              bonusBalance: 0
            },
            select: {
              id: true,
              phone: true,
              name: true,
              email: true
            }
          });
        } catch (createError2) {
          if (((_a = createError2.message) == null ? void 0 : _a.includes("bonusBalance")) || ((_b = createError2.message) == null ? void 0 : _b.includes("column")) || ((_c = createError2.message) == null ? void 0 : _c.includes("does not exist"))) {
            await prisma$2.$executeRawUnsafe(
              `INSERT INTO users (id, phone, name, email, "createdAt", "updatedAt") 
               VALUES (gen_random_uuid()::text, $1, NULL, NULL, NOW(), NOW())
               ON CONFLICT (phone) DO NOTHING`,
              phoneNumber
            );
            user = await prisma$2.user.findUnique({
              where: { phone: phoneNumber },
              select: {
                id: true,
                phone: true,
                name: true,
                email: true
              }
            });
          } else {
            throw createError2;
          }
        }
      }
      if (!user) {
        throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0438\u043B\u0438 \u043D\u0430\u0439\u0442\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F");
      }
    } catch (error) {
      throw createError({
        statusCode: 500,
        message: `\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F: ${error.message}`
      });
    }
    const { generateToken } = await Promise.resolve().then(function () { return jwt; });
    const token = await generateToken({
      userId: user.id,
      phone: user.phone
    });
    return {
      success: true,
      token,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043A\u043E\u0434\u0430"
    });
  }
});

const verifySms_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: verifySms_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$k = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    const banners = await prisma$2.banner.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        sortOrder: "asc"
      }
    });
    return banners;
  } catch (error) {
    console.error("[Banners API] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0431\u0430\u043D\u043D\u0435\u0440\u043E\u0432:", error);
    console.error("[Banners API] \u0414\u0435\u0442\u0430\u043B\u0438 \u043E\u0448\u0438\u0431\u043A\u0438:", {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    if (((_a = error.message) == null ? void 0 : _a.includes("does not exist")) || ((_b = error.message) == null ? void 0 : _b.includes("relation")) || ((_c = error.message) == null ? void 0 : _c.includes("table")) || error.code === "P2021" || error.code === "P2001" || error.code === "42P01") {
      console.warn("[Banners API] \u0422\u0430\u0431\u043B\u0438\u0446\u0430 banners \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430, \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C \u043F\u0443\u0441\u0442\u043E\u0439 \u043C\u0430\u0441\u0441\u0438\u0432");
      return [];
    }
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0431\u0430\u043D\u043D\u0435\u0440\u043E\u0432"
    });
  }
});

const index_get$l = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$k
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$8 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    await prisma$2.category.update({
      where: { id },
      data: { isActive: false }
    });
    return { success: true };
  } catch (error) {
    if (error.code === "P2025") {
      throw createError({
        statusCode: 404,
        message: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"
    });
  }
});

const _id__delete$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$8
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$6 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const category = await prisma$2.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });
    if (!category) {
      throw createError({
        statusCode: 404,
        message: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
      });
    }
    return category;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"
    });
  }
});

const _id__get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$6
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$8 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const updateData = {};
    if (body.name !== void 0) updateData.name = body.name;
    if (body.slug !== void 0) updateData.slug = body.slug;
    if (body.icon !== void 0) updateData.icon = body.icon;
    if (body.image !== void 0) updateData.image = body.image;
    if (body.description !== void 0) updateData.description = body.description;
    if (body.sortOrder !== void 0) updateData.sortOrder = body.sortOrder;
    if (body.isActive !== void 0) updateData.isActive = body.isActive;
    const category = await prisma$2.category.update({
      where: { id },
      data: updateData
    });
    return category;
  } catch (error) {
    if (error.code === "P2025") {
      throw createError({
        statusCode: 404,
        message: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"
    });
  }
});

const _id__put$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$8
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$i = defineEventHandler(async (event) => {
  try {
    const categories = await prisma$2.category.findMany({
      where: {
        isActive: true,
        // Фильтруем тестовые категории
        NOT: {
          OR: [
            { name: { contains: "test", mode: "insensitive" } },
            { name: { contains: "\u0442\u0435\u0441\u0442", mode: "insensitive" } },
            { name: { contains: "dummy", mode: "insensitive" } },
            { name: { contains: "example", mode: "insensitive" } },
            { name: { contains: "\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430", mode: "insensitive" } },
            { slug: { contains: "test", mode: "insensitive" } },
            { slug: { contains: "tes1", mode: "insensitive" } }
          ]
        }
      },
      include: {
        _count: {
          select: {
            products: {
              where: {
                isActive: true
              }
            }
          }
        }
      },
      orderBy: {
        sortOrder: "asc"
      }
    });
    return categories;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439"
    });
  }
});

const index_get$j = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$i
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$8 = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const category = await prisma$2.category.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
        icon: body.icon,
        image: body.image,
        description: body.description,
        sortOrder: body.sortOrder || 0,
        isActive: body.isActive !== void 0 ? body.isActive : true
      }
    });
    return category;
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        message: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u0441 \u0442\u0430\u043A\u0438\u043C slug \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"
    });
  }
});

const index_post$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$8
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$6 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    await prisma$2.deliveryZone.update({
      where: { id },
      data: { isActive: false }
    });
    return { success: true };
  } catch (error) {
    if (error.code === "P2025") {
      throw createError({
        statusCode: 404,
        message: "\u0417\u043E\u043D\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u0437\u043E\u043D\u044B \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    });
  }
});

const _id__delete$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$6
}, Symbol.toStringTag, { value: 'Module' }));

const calculate_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { lat, lng, subtotal } = body;
    if (!lat || !lng) {
      throw createError({
        statusCode: 400,
        message: "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u044B"
      });
    }
    const zones = await prisma$2.deliveryZone.findMany({
      where: {
        isActive: true
      }
    });
    let matchedZone = null;
    for (const zone of zones) {
      const coordinates = zone.coordinates;
      if (isPointInZone$1(lat, lng, coordinates)) {
        matchedZone = zone;
        break;
      }
    }
    if (!matchedZone) {
      throw createError({
        statusCode: 404,
        message: "\u0410\u0434\u0440\u0435\u0441 \u043D\u0435 \u0432\u0445\u043E\u0434\u0438\u0442 \u0432 \u0437\u043E\u043D\u0443 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
      });
    }
    let deliveryPrice = Number(matchedZone.deliveryPrice);
    const orderSubtotal = subtotal || 0;
    if (matchedZone.freeDeliveryThreshold && orderSubtotal >= Number(matchedZone.freeDeliveryThreshold)) {
      deliveryPrice = 0;
    }
    return {
      zone: {
        id: matchedZone.id,
        name: matchedZone.name,
        estimatedTime: matchedZone.estimatedTime
      },
      deliveryPrice,
      freeDeliveryThreshold: matchedZone.freeDeliveryThreshold ? Number(matchedZone.freeDeliveryThreshold) : null,
      minOrderAmount: Number(matchedZone.minOrderAmount)
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0440\u0430\u0441\u0447\u0435\u0442\u0435 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    });
  }
});
function isPointInZone$1(lat, lng, coordinates) {
  if (Array.isArray(coordinates) && coordinates.length > 0) {
    const polygon = Array.isArray(coordinates[0][0]) ? coordinates[0] : coordinates;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][1] || polygon[i][0];
      const yi = polygon[i][0] || polygon[i][1];
      const xj = polygon[j][1] || polygon[j][0];
      const yj = polygon[j][0] || polygon[j][1];
      const intersect = yi > lng !== yj > lng && lat < (xj - xi) * (lng - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }
  return false;
}

const calculate_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: calculate_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$g = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const lat = query.lat ? parseFloat(query.lat) : void 0;
    const lng = query.lng ? parseFloat(query.lng) : void 0;
    const zones = await prisma$2.deliveryZone.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        minOrderAmount: "asc"
      }
    });
    let matchedZone = null;
    if (lat !== void 0 && lng !== void 0) {
      for (const zone of zones) {
        const coordinates = zone.coordinates;
        if (isPointInZone(lat, lng, coordinates)) {
          matchedZone = zone;
          break;
        }
      }
    }
    const formattedZones = zones.map((zone) => ({
      id: zone.id,
      name: zone.name,
      description: zone.description,
      minOrderAmount: Number(zone.minOrderAmount),
      deliveryPrice: Number(zone.deliveryPrice),
      freeDeliveryThreshold: zone.freeDeliveryThreshold ? Number(zone.freeDeliveryThreshold) : null,
      estimatedTime: zone.estimatedTime,
      isMatched: (matchedZone == null ? void 0 : matchedZone.id) === zone.id
    }));
    return {
      zones: formattedZones,
      matchedZone: matchedZone ? {
        id: matchedZone.id,
        name: matchedZone.name,
        minOrderAmount: Number(matchedZone.minOrderAmount),
        deliveryPrice: Number(matchedZone.deliveryPrice),
        freeDeliveryThreshold: matchedZone.freeDeliveryThreshold ? Number(matchedZone.freeDeliveryThreshold) : null,
        estimatedTime: matchedZone.estimatedTime
      } : null
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0437\u043E\u043D \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    });
  }
});
function isPointInZone(lat, lng, coordinates) {
  if (Array.isArray(coordinates) && coordinates.length > 0) {
    const polygon = Array.isArray(coordinates[0][0]) ? coordinates[0] : coordinates;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][1] || polygon[i][0];
      const yi = polygon[i][0] || polygon[i][1];
      const xj = polygon[j][1] || polygon[j][0];
      const yj = polygon[j][0] || polygon[j][1];
      const intersect = yi > lng !== yj > lng && lat < (xj - xi) * (lng - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }
  return false;
}

const index_get$h = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$g
}, Symbol.toStringTag, { value: 'Module' }));

const migrateSmsTable_post = defineEventHandler(async () => {
  try {
    await createSmsCodesTable();
    return {
      success: true,
      message: "Migration completed successfully"
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Migration failed"
    };
  }
});

const migrateSmsTable_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: migrateSmsTable_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$4 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u0437\u0430\u043A\u0430\u0437\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const auth = event.context.auth;
    const userId = (auth == null ? void 0 : auth.userId) || null;
    let order;
    if (userId) {
      order = await prisma$2.order.findFirst({
        where: {
          id,
          userId
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true
                }
              }
            }
          },
          address: true,
          deliveryZone: true
        }
      });
    } else {
      order = await prisma$2.order.findFirst({
        where: {
          id
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true
                }
              }
            }
          },
          address: true,
          deliveryZone: true
        }
      });
    }
    if (!order) {
      throw createError({
        statusCode: 404,
        message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    const result = {
      ...order,
      subtotal: Number(order.subtotal),
      deliveryPrice: Number(order.deliveryPrice),
      discount: Number(order.discount),
      total: Number(order.total),
      hasIikoSync: !!order.aikoOrderId,
      iikoOrderId: order.aikoOrderId
    };
    return result;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
});

const _id__get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$6 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u0437\u0430\u043A\u0430\u0437\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const updateData = {};
    if (body.status !== void 0) updateData.status = body.status;
    if (body.paymentStatus !== void 0) updateData.paymentStatus = body.paymentStatus;
    if (body.paymentId !== void 0) updateData.paymentId = body.paymentId;
    if (body.aikoOrderId !== void 0) updateData.aikoOrderId = body.aikoOrderId;
    if (body.comment !== void 0) updateData.comment = body.comment;
    if (body.deliveryTime !== void 0) {
      updateData.deliveryTime = body.deliveryTime ? new Date(body.deliveryTime) : null;
    }
    const order = await prisma$2.order.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true
          }
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        }
      }
    });
    if (updateData.status === "DELIVERED" && order.userId && order.user) {
      try {
        const { awardBonusForDeliveredOrder } = await Promise.resolve().then(function () { return bonus; });
        await awardBonusForDeliveredOrder(order.id);
      } catch (error) {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0431\u043E\u043D\u0443\u0441\u043E\u0432:", error);
      }
    }
    if (updateData.status) {
      try {
        const { broadcastOrderUpdate } = await Promise.resolve().then(function () { return orders; });
        broadcastOrderUpdate(id, updateData.status, {
          orderNumber: order.orderNumber,
          status: order.status
        });
      } catch (error) {
        console.log("WebSocket \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D, \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0435\u043C broadcast");
      }
    }
    return {
      ...order,
      subtotal: Number(order.subtotal),
      deliveryPrice: Number(order.deliveryPrice),
      discount: Number(order.discount),
      total: Number(order.total)
    };
  } catch (error) {
    if (error.code === "P2025") {
      throw createError({
        statusCode: 404,
        message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
});

const _id__put$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$6
}, Symbol.toStringTag, { value: 'Module' }));

const syncStatus_post = defineEventHandler(async (event) => {
  try {
    const orderId = getRouterParam(event, "id");
    if (!orderId) {
      throw createError({
        statusCode: 400,
        message: "ID \u0437\u0430\u043A\u0430\u0437\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const order = await prisma$2.order.findUnique({
      where: { id: orderId }
    });
    if (!order) {
      throw createError({
        statusCode: 404,
        message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    if (!order.aikoOrderId) {
      throw createError({
        statusCode: 400,
        message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u0431\u044B\u043B \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0432 iikoCloud (\u043D\u0435\u0442 aikoOrderId)"
      });
    }
    const aikoStatus = await aikoClient.getOrderStatus(order.aikoOrderId);
    const statusMap = {
      "New": "PENDING",
      "Bill": "CONFIRMED",
      "CookingStarted": "PREPARING",
      "CookingCompleted": "READY",
      "OnWay": "DELIVERING",
      "Closed": "DELIVERED",
      "Deleted": "CANCELLED"
    };
    const mappedStatus = statusMap[aikoStatus.status] || aikoStatus.status.toUpperCase();
    const statusOrder = {
      "PENDING": 1,
      "CONFIRMED": 2,
      "PREPARING": 3,
      "READY": 4,
      "DELIVERING": 5,
      "DELIVERED": 6,
      "CANCELLED": 99
      // CANCELLED можно установить в любой момент
    };
    const currentStatusOrder = statusOrder[order.status] || 0;
    const newStatusOrder = statusOrder[mappedStatus] || 0;
    const shouldUpdate = order.status !== mappedStatus && (newStatusOrder >= currentStatusOrder || mappedStatus === "CANCELLED");
    if (shouldUpdate) {
      const updatedOrder = await prisma$2.order.update({
        where: { id: order.id },
        data: { status: mappedStatus },
        include: {
          user: {
            select: {
              id: true
            }
          }
        }
      });
      console.log(`[\u0410\u0419\u041A\u041E] \u2705 \u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430 ${order.orderNumber} \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D: ${order.status} \u2192 ${mappedStatus}`);
      if (mappedStatus === "DELIVERED" && updatedOrder.userId && updatedOrder.user) {
        try {
          const { awardBonusForDeliveredOrder } = await Promise.resolve().then(function () { return bonus; });
          await awardBonusForDeliveredOrder(updatedOrder.id);
        } catch (error) {
          console.error("[\u0410\u0419\u041A\u041E] \u041E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0431\u043E\u043D\u0443\u0441\u043E\u0432:", error);
        }
      }
      try {
        const { broadcastOrderUpdate } = await Promise.resolve().then(function () { return orders; });
        broadcastOrderUpdate(order.id, mappedStatus, {
          orderNumber: order.orderNumber,
          estimatedTime: aikoStatus.estimatedTime
        });
      } catch (error) {
        console.log("[\u0410\u0419\u041A\u041E] WebSocket \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D, \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0435\u043C broadcast");
      }
    } else if (order.status !== mappedStatus && newStatusOrder < currentStatusOrder) {
      console.log(`[\u0410\u0419\u041A\u041E] \u26A0\uFE0F  \u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430 ${order.orderNumber} \u043D\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D (\u043E\u0442\u043A\u0430\u0442 \u043D\u0430\u0437\u0430\u0434 \u043F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0449\u0435\u043D): ${order.status} \u2192 ${mappedStatus}`);
    }
    return {
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      oldStatus: order.status,
      newStatus: mappedStatus,
      iikoStatus: aikoStatus.status,
      updated: order.status !== mappedStatus,
      message: aikoStatus.message,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("[\u0410\u0419\u041A\u041E] \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u043A\u0430\u0437\u0430:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u0437\u0430\u043A\u0430\u0437\u0430 \u0438\u0437 iikoCloud",
      data: {
        error: error.message
      }
    });
  }
});

const syncStatus_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: syncStatus_post
}, Symbol.toStringTag, { value: 'Module' }));

const all_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const status = query.status;
    const limit = query.limit ? parseInt(query.limit) : 100;
    const offset = query.offset ? parseInt(query.offset) : 0;
    const where = {};
    if (status) {
      where.status = status;
    }
    const [orders, total] = await Promise.all([
      prisma$2.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true
                }
              },
              modifiers: true
            }
          },
          address: true,
          deliveryZone: true,
          promoCode: true
        },
        orderBy: {
          createdAt: "desc"
        },
        take: limit,
        skip: offset
      }),
      prisma$2.order.count({ where })
    ]);
    return {
      orders: orders.map((order) => ({
        ...order,
        subtotal: Number(order.subtotal),
        deliveryPrice: Number(order.deliveryPrice),
        discount: Number(order.discount),
        total: Number(order.total),
        hasIikoSync: !!order.aikoOrderId,
        iikoOrderId: order.aikoOrderId
      })),
      total,
      limit,
      offset
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0437\u0430\u043A\u0430\u0437\u043E\u0432"
    });
  }
});

const all_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: all_get
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$6 = defineEventHandler(async (event) => {
  var _a;
  try {
    try {
      const settings = await $fetch("/api/admin/settings").catch(() => null);
      if (settings == null ? void 0 : settings.isMaintenanceMode) {
        throw createError({
          statusCode: 503,
          message: settings.maintenanceMessage || "\u0421\u0430\u0439\u0442 \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u0412\u0435\u0434\u0443\u0442\u0441\u044F \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0440\u0430\u0431\u043E\u0442\u044B."
        });
      }
    } catch (error) {
      if (error.statusCode === 503) {
        throw error;
      }
    }
    const body = await readBody(event);
    const auth = event.context.auth;
    const userId = (auth == null ? void 0 : auth.userId) || body.userId || null;
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const deliveryTypeEnum = ((_a = body.deliveryType) == null ? void 0 : _a.toUpperCase()) === "PICKUP" ? "PICKUP" : "DELIVERY";
    const validItems = (body.items || []).filter((item) => {
      var _a2;
      const productId = ((_a2 = item.product) == null ? void 0 : _a2.id) || item.productId;
      if (productId && (productId.startsWith("utensils-") || productId.startsWith("spice-"))) {
        console.log(`\u0418\u0441\u043A\u043B\u044E\u0447\u0430\u0435\u043C \u0442\u043E\u0432\u0430\u0440 \u0438\u0437 \u0437\u0430\u043A\u0430\u0437\u0430 (\u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u043C \u0432 \u0411\u0414): ${productId}`);
        return false;
      }
      return true;
    });
    const productIds = validItems.map((item) => {
      var _a2;
      return ((_a2 = item.product) == null ? void 0 : _a2.id) || item.productId;
    }).filter(Boolean);
    if (productIds.length > 0) {
      const existingProducts = await prisma$2.product.findMany({
        where: {
          id: { in: productIds }
        },
        select: { id: true }
      });
      const existingProductIds = new Set(existingProducts.map((p) => p.id));
      const itemsWithValidProducts = validItems.filter((item) => {
        var _a2;
        const productId = ((_a2 = item.product) == null ? void 0 : _a2.id) || item.productId;
        if (!productId || !existingProductIds.has(productId)) {
          console.log(`\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0432 \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445: ${productId}`);
          return false;
        }
        return true;
      });
      if (itemsWithValidProducts.length === 0) {
        throw createError({
          statusCode: 400,
          message: "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043D\u0435\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0434\u043B\u044F \u0437\u0430\u043A\u0430\u0437\u0430"
        });
      }
      const order = await prisma$2.order.create({
        data: {
          userId,
          orderNumber,
          status: "PENDING",
          deliveryType: deliveryTypeEnum,
          deliveryZoneId: body.deliveryZoneId,
          addressId: body.addressId,
          addressText: body.addressText,
          phone: body.phone,
          name: body.name,
          comment: body.comment,
          deliveryTime: body.deliveryTime ? new Date(body.deliveryTime) : null,
          subtotal: body.subtotal,
          deliveryPrice: body.deliveryPrice,
          discount: body.discount || 0,
          total: body.total,
          promoCodeId: body.promoCodeId,
          paymentMethod: body.paymentMethod || "CASH",
          paymentStatus: "PENDING",
          items: {
            create: itemsWithValidProducts.map((item) => {
              var _a2;
              return {
                productId: ((_a2 = item.product) == null ? void 0 : _a2.id) || item.productId,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity,
                modifiers: {
                  create: (item.selectedModifiers || []).flatMap(
                    (modifier) => (modifier.optionIds || []).map((optionId) => {
                      var _a3, _b, _c;
                      const productModifier = (_b = (_a3 = item.product) == null ? void 0 : _a3.modifiers) == null ? void 0 : _b.find(
                        (m) => m.id === modifier.modifierId
                      );
                      const option = (_c = productModifier == null ? void 0 : productModifier.options) == null ? void 0 : _c.find((o) => o.id === optionId);
                      return {
                        modifierId: modifier.modifierId,
                        optionId,
                        name: `${(productModifier == null ? void 0 : productModifier.name) || ""} - ${(option == null ? void 0 : option.name) || ""}`,
                        price: (option == null ? void 0 : option.price) || 0
                      };
                    })
                  )
                }
              };
            })
          }
        },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true
                }
              },
              modifiers: true
            }
          },
          address: true,
          deliveryZone: true
        }
      });
      if (body.promoCodeId) {
        await prisma$2.promoCode.update({
          where: { id: body.promoCodeId },
          data: {
            usedCount: {
              increment: 1
            }
          }
        });
      }
      const autoSendToAiko = process.env.AUTO_SEND_TO_AIKO !== "false";
      if (autoSendToAiko) {
        try {
          console.log("[\u0410\u0419\u041A\u041E] \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0437\u0430\u043A\u0430\u0437\u0430 \u0432 iikoCloud...");
          const { aikoClient } = await Promise.resolve().then(function () { return aikoClient$1; });
          const aikoResponse = await aikoClient.createOrder({
            orderNumber: order.orderNumber,
            phone: order.phone,
            name: order.name,
            address: order.addressText || (order.address ? `${order.address.street}, \u0434. ${order.address.house}${order.address.apartment ? `, \u043A\u0432. ${order.address.apartment}` : ""}` : null),
            deliveryType: order.deliveryType,
            deliveryTime: order.deliveryTime,
            comment: order.comment,
            items: order.items.map((item) => ({
              productId: item.productId,
              productName: item.product.name,
              quantity: item.quantity,
              price: Number(item.price),
              modifiers: (item.modifiers || []).map((mod) => ({
                name: mod.name,
                price: Number(mod.price)
              }))
            })),
            total: Number(order.total),
            subtotal: Number(order.subtotal),
            deliveryPrice: Number(order.deliveryPrice)
          });
          await prisma$2.order.update({
            where: { id: order.id },
            data: { aikoOrderId: aikoResponse.aikoOrderId }
          });
          console.log("[\u0410\u0419\u041A\u041E] \u2705 \u0417\u0430\u043A\u0430\u0437 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0432 iikoCloud, ID:", aikoResponse.aikoOrderId);
        } catch (error) {
          console.error("[\u0410\u0419\u041A\u041E] \u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0437\u0430\u043A\u0430\u0437\u0430:", error.message);
        }
      } else {
        console.log("[\u0410\u0419\u041A\u041E] \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430 (AUTO_SEND_TO_AIKO=false)");
      }
      return {
        ...order,
        subtotal: Number(order.subtotal),
        deliveryPrice: Number(order.deliveryPrice),
        discount: Number(order.discount),
        total: Number(order.total)
      };
    } else {
      throw createError({
        statusCode: 400,
        message: "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043D\u0435\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0434\u043B\u044F \u0437\u0430\u043A\u0430\u0437\u0430"
      });
    }
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430:", error);
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0437\u0430\u043A\u0430\u0437\u0430"
    });
  }
});

const index_post$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$6
}, Symbol.toStringTag, { value: 'Module' }));

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const YUKASSA_SHOP_ID = process.env.YUKASSA_SHOP_ID;
const YUKASSA_SECRET_KEY = process.env.YUKASSA_SECRET_KEY;
class PaymentClient {
  constructor() {
    __publicField(this, "shopId");
    __publicField(this, "secretKey");
    if (!YUKASSA_SHOP_ID || !YUKASSA_SECRET_KEY) {
      console.warn("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u042EKassa \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0440\u0435\u0436\u0438\u043C \u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0438.");
    }
    this.shopId = YUKASSA_SHOP_ID || "";
    this.secretKey = YUKASSA_SECRET_KEY || "";
  }
  /**
   * Создание платежа в ЮKassa
   */
  async createPayment(paymentData) {
    console.log("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043F\u043B\u0430\u0442\u0435\u0436\u0430 (\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430):", paymentData);
    const paymentId = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      id: paymentId,
      status: "pending",
      confirmation: {
        type: "redirect",
        confirmation_url: `${paymentData.returnUrl}?payment_id=${paymentId}&status=pending`
      },
      amount: {
        value: paymentData.amount.toFixed(2),
        currency: paymentData.currency
      },
      description: paymentData.description,
      metadata: {
        orderId: paymentData.orderId,
        orderNumber: paymentData.orderNumber,
        ...paymentData.metadata
      }
    };
  }
  /**
   * Получение статуса платежа
   */
  async getPaymentStatus(paymentId) {
    console.log("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u0430 (\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430):", paymentId);
    return {
      id: paymentId,
      status: "succeeded",
      paid: true,
      amount: {
        value: "0.00",
        currency: "RUB"
      },
      captured_at: (/* @__PURE__ */ new Date()).toISOString(),
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  /**
   * Отмена платежа
   */
  async cancelPayment(paymentId, reason) {
    console.log("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041E\u0442\u043C\u0435\u043D\u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u0430 (\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430):", paymentId, reason);
    return {
      id: paymentId,
      status: "canceled",
      paid: false,
      amount: {
        value: "0.00",
        currency: "RUB"
      },
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  /**
   * Возврат платежа
   */
  async refundPayment(paymentId, amount, reason) {
    console.log("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u043F\u043B\u0430\u0442\u0435\u0436\u0430 (\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430):", paymentId, amount, reason);
    return {
      id: `refund_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: "succeeded",
      amount: {
        value: amount.toFixed(2),
        currency: "RUB"
      },
      payment_id: paymentId,
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  /**
   * Проверка подписи webhook
   */
  verifyWebhookSignature(body, signature) {
    console.log("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043F\u043E\u0434\u043F\u0438\u0441\u0438 webhook (\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430)");
    return true;
  }
}
const paymentClient = new PaymentClient();

const cancel_post = defineEventHandler(async (event) => {
  try {
    const paymentId = getRouterParam(event, "paymentId");
    const body = await readBody(event);
    const { reason } = body;
    if (!paymentId) {
      throw createError({
        statusCode: 400,
        message: "ID \u043F\u043B\u0430\u0442\u0435\u0436\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const canceledPayment = await paymentClient.cancelPayment(paymentId, reason);
    const order = await prisma$2.order.findFirst({
      where: { paymentId }
    });
    if (order) {
      await prisma$2.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "FAILED"
        }
      });
    }
    return {
      success: true,
      paymentId,
      status: canceledPayment.status,
      message: "\u041F\u043B\u0430\u0442\u0435\u0436 \u043E\u0442\u043C\u0435\u043D\u0435\u043D (\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430)",
      note: "\u042D\u0442\u043E \u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430. \u0420\u0435\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0441 \u042EKassa \u0431\u0443\u0434\u0435\u0442 \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u0430 \u043F\u043E\u0437\u0436\u0435."
    };
  } catch (error) {
    console.error("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0442\u043C\u0435\u043D\u044B \u043F\u043B\u0430\u0442\u0435\u0436\u0430:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0442\u043C\u0435\u043D\u0435 \u043F\u043B\u0430\u0442\u0435\u0436\u0430",
      data: {
        error: error.message
      }
    });
  }
});

const cancel_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: cancel_post
}, Symbol.toStringTag, { value: 'Module' }));

const refund_post = defineEventHandler(async (event) => {
  try {
    const paymentId = getRouterParam(event, "paymentId");
    const body = await readBody(event);
    const { amount, reason } = body;
    if (!paymentId) {
      throw createError({
        statusCode: 400,
        message: "ID \u043F\u043B\u0430\u0442\u0435\u0436\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    if (!amount || amount <= 0) {
      throw createError({
        statusCode: 400,
        message: "\u0421\u0443\u043C\u043C\u0430 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0430 \u0438\u043B\u0438 \u043D\u0435\u0432\u0435\u0440\u043D\u0430"
      });
    }
    const order = await prisma$2.order.findFirst({
      where: { paymentId }
    });
    if (!order) {
      throw createError({
        statusCode: 404,
        message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    if (order.paymentStatus !== "PAID") {
      throw createError({
        statusCode: 400,
        message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043E\u043F\u043B\u0430\u0447\u0435\u043D, \u0432\u043E\u0437\u0432\u0440\u0430\u0442 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u0435\u043D"
      });
    }
    const refund = await paymentClient.refundPayment(paymentId, amount, reason);
    await prisma$2.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: "REFUNDED"
      }
    });
    return {
      success: true,
      refundId: refund.id,
      paymentId,
      amount: refund.amount,
      status: refund.status,
      message: "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D (\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430)",
      note: "\u042D\u0442\u043E \u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430. \u0420\u0435\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0441 \u042EKassa \u0431\u0443\u0434\u0435\u0442 \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u0430 \u043F\u043E\u0437\u0436\u0435."
    };
  } catch (error) {
    console.error("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041E\u0448\u0438\u0431\u043A\u0430 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u0430:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0435 \u043F\u043B\u0430\u0442\u0435\u0436\u0430",
      data: {
        error: error.message
      }
    });
  }
});

const refund_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: refund_post
}, Symbol.toStringTag, { value: 'Module' }));

const status_get = defineEventHandler(async (event) => {
  try {
    const paymentId = getRouterParam(event, "paymentId");
    if (!paymentId) {
      throw createError({
        statusCode: 400,
        message: "ID \u043F\u043B\u0430\u0442\u0435\u0436\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const paymentStatus = await paymentClient.getPaymentStatus(paymentId);
    const order = await prisma$2.order.findFirst({
      where: { paymentId }
    });
    if (order) {
      const paymentStatusMap = {
        "pending": "PENDING",
        "succeeded": "PAID",
        "canceled": "FAILED"
      };
      const mappedStatus = paymentStatusMap[paymentStatus.status] || "PENDING";
      if (order.paymentStatus !== mappedStatus) {
        await prisma$2.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: mappedStatus
          }
        });
        if (mappedStatus === "PAID" && !order.aikoOrderId) {
          try {
            const { aikoClient } = await Promise.resolve().then(function () { return aikoClient$1; });
          } catch (error) {
            console.error("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0432 \u0410\u0419\u041A\u041E:", error);
          }
        }
      }
    }
    return {
      success: true,
      paymentId,
      status: paymentStatus.status,
      paid: paymentStatus.paid,
      amount: paymentStatus.amount,
      orderId: order == null ? void 0 : order.id,
      note: "\u042D\u0442\u043E \u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430. \u0420\u0435\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0441 \u042EKassa \u0431\u0443\u0434\u0435\u0442 \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u0430 \u043F\u043E\u0437\u0436\u0435."
    };
  } catch (error) {
    console.error("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u0430:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u0430",
      data: {
        error: error.message
      }
    });
  }
});

const status_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: status_get
}, Symbol.toStringTag, { value: 'Module' }));

const create_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { orderId, returnUrl } = body;
    if (!orderId) {
      throw createError({
        statusCode: 400,
        message: "ID \u0437\u0430\u043A\u0430\u0437\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const order = await prisma$2.order.findUnique({
      where: { id: orderId }
    });
    if (!order) {
      throw createError({
        statusCode: 404,
        message: "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    if (order.paymentStatus === "PAID") {
      throw createError({
        statusCode: 400,
        message: "\u0417\u0430\u043A\u0430\u0437 \u0443\u0436\u0435 \u043E\u043F\u043B\u0430\u0447\u0435\u043D"
      });
    }
    const payment = await paymentClient.createPayment({
      amount: Number(order.total),
      currency: "RUB",
      orderId: order.id,
      orderNumber: order.orderNumber,
      description: `\u041E\u043F\u043B\u0430\u0442\u0430 \u0437\u0430\u043A\u0430\u0437\u0430 #${order.orderNumber}`,
      returnUrl: returnUrl || `${process.env.NUXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment/callback`,
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        userId: order.userId
      }
    });
    await prisma$2.order.update({
      where: { id: orderId },
      data: {
        paymentId: payment.id,
        paymentStatus: "PENDING"
      }
    });
    return {
      success: true,
      paymentId: payment.id,
      confirmationUrl: payment.confirmation.confirmation_url,
      status: payment.status,
      note: "\u042D\u0442\u043E \u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430. \u0420\u0435\u0430\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0441 \u042EKassa \u0431\u0443\u0434\u0435\u0442 \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u0430 \u043F\u043E\u0437\u0436\u0435."
    };
  } catch (error) {
    console.error("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u043B\u0430\u0442\u0435\u0436\u0430:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u043F\u043B\u0430\u0442\u0435\u0436\u0430",
      data: {
        error: error.message,
        note: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 YUKASSA_SHOP_ID \u0438 YUKASSA_SECRET_KEY"
      }
    });
  }
});

const create_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: create_post
}, Symbol.toStringTag, { value: 'Module' }));

const webhook_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const signature = getHeader(event, "x-yookassa-signature") || getHeader(event, "authorization") || "";
    const bodyString = JSON.stringify(body);
    const isValid = paymentClient.verifyWebhookSignature(bodyString, signature);
    if (!isValid) {
      console.warn("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u043F\u043E\u0434\u043F\u0438\u0441\u044C webhook");
    }
    const eventType = body.event || body.type;
    const paymentData = body.object || body;
    console.log("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] Webhook \u043F\u043E\u043B\u0443\u0447\u0435\u043D:", {
      event: eventType,
      paymentId: paymentData.id,
      status: paymentData.status
    });
    const order = await prisma$2.order.findFirst({
      where: { paymentId: paymentData.id }
    });
    if (!order) {
      console.warn("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0434\u043B\u044F \u043F\u043B\u0430\u0442\u0435\u0436\u0430:", paymentData.id);
      return { received: true };
    }
    let paymentStatus = "PENDING";
    if (eventType === "payment.succeeded" || paymentData.status === "succeeded") {
      paymentStatus = "PAID";
    } else if (eventType === "payment.canceled" || paymentData.status === "canceled") {
      paymentStatus = "FAILED";
    } else if (eventType === "refund.succeeded") {
      paymentStatus = "REFUNDED";
    }
    await prisma$2.order.update({
      where: { id: order.id },
      data: {
        paymentStatus
      }
    });
    if (paymentStatus === "PAID" && !order.aikoOrderId) {
      try {
        const { aikoClient } = await Promise.resolve().then(function () { return aikoClient$1; });
        console.log("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041F\u043B\u0430\u0442\u0435\u0436 \u0443\u0441\u043F\u0435\u0448\u0435\u043D, \u0437\u0430\u043A\u0430\u0437 \u0433\u043E\u0442\u043E\u0432 \u043A \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0432 \u0410\u0419\u041A\u041E");
      } catch (error) {
        console.error("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0432 \u0410\u0419\u041A\u041E:", error);
      }
    }
    return {
      received: true,
      processed: true,
      orderId: order.id,
      paymentStatus,
      note: "Webhook \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D (\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430)"
    };
  } catch (error) {
    console.error("[\u041F\u043B\u0430\u0442\u0435\u0436\u0438] \u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 webhook:", error);
    return {
      received: true,
      error: error.message,
      note: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 webhook (\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430)"
    };
  }
});

const webhook_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: webhook_post
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete$4 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u0442\u043E\u0432\u0430\u0440\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    await prisma$2.product.update({
      where: { id },
      data: { isActive: false }
    });
    return { success: true };
  } catch (error) {
    if (error.code === "P2025") {
      throw createError({
        statusCode: 404,
        message: "\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u0442\u043E\u0432\u0430\u0440\u0430"
    });
  }
});

const _id__delete$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$4
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get$2 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u0442\u043E\u0432\u0430\u0440\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const product = await prisma$2.product.findUnique({
      where: {
        id
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true
          }
        },
        modifiers: {
          include: {
            options: {
              orderBy: {
                sortOrder: "asc"
              }
            }
          },
          orderBy: {
            sortOrder: "asc"
          }
        }
      }
    });
    if (!product) {
      throw createError({
        statusCode: 404,
        message: "\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    return {
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      modifiers: product.modifiers.map((modifier) => ({
        ...modifier,
        price: Number(modifier.price),
        options: modifier.options.map((option) => ({
          ...option,
          price: Number(option.price)
        }))
      }))
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0442\u043E\u0432\u0430\u0440\u0430"
    });
  }
});

const _id__get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$4 = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u0442\u043E\u0432\u0430\u0440\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const updateData = {};
    if (body.categoryId !== void 0) updateData.categoryId = body.categoryId;
    if (body.name !== void 0) updateData.name = body.name;
    if (body.slug !== void 0) updateData.slug = body.slug;
    if (body.description !== void 0) updateData.description = body.description;
    if (body.image !== void 0) updateData.image = body.image;
    if (body.images !== void 0) updateData.images = body.images;
    if (body.price !== void 0) updateData.price = body.price;
    if (body.oldPrice !== void 0) {
      const oldPriceValue = body.oldPrice === "" || body.oldPrice === null || body.oldPrice === void 0 || isNaN(Number(body.oldPrice)) || Number(body.oldPrice) <= 0 ? null : Number(body.oldPrice);
      updateData.oldPrice = oldPriceValue;
    }
    if (body.weight !== void 0) {
      const weightValue = body.weight === "" || body.weight === null || body.weight === void 0 || isNaN(Number(body.weight)) || Number(body.weight) <= 0 ? null : Number(body.weight);
      updateData.weight = weightValue;
    }
    if (body.calories !== void 0) {
      const caloriesValue = body.calories === "" || body.calories === null || body.calories === void 0 || isNaN(Number(body.calories)) || Number(body.calories) <= 0 ? null : Number(body.calories);
      updateData.calories = caloriesValue;
    }
    if (body.isActive !== void 0) updateData.isActive = body.isActive;
    if (body.isPopular !== void 0) updateData.isPopular = body.isPopular;
    if (body.isNew !== void 0) updateData.isNew = body.isNew;
    if (body.isHot !== void 0) updateData.isHot = body.isHot;
    if (body.sortOrder !== void 0) updateData.sortOrder = body.sortOrder;
    const product = await prisma$2.product.update({
      where: { id },
      data: updateData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true
          }
        }
      }
    });
    return {
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null
    };
  } catch (error) {
    if (error.code === "P2025") {
      throw createError({
        statusCode: 404,
        message: "\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u0442\u043E\u0432\u0430\u0440\u0430"
    });
  }
});

const _id__put$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$e = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const categoryId = query.categoryId;
    const search = query.search;
    const sortBy = query.sortBy || "sortOrder";
    const sortOrder = query.sortOrder || "asc";
    const isPopular = query.isPopular === "true";
    const limit = query.limit ? parseInt(query.limit) : void 0;
    const offset = query.offset ? parseInt(query.offset) : void 0;
    const where = {
      isActive: true,
      // Фильтруем тестовые/заглушечные товары
      NOT: {
        OR: [
          { name: { contains: "tes1", mode: "insensitive" } },
          { name: { contains: "test", mode: "insensitive" } },
          { name: { contains: "\u0442\u0435\u0441\u0442", mode: "insensitive" } },
          { name: { contains: "dummy", mode: "insensitive" } },
          { name: { contains: "example", mode: "insensitive" } },
          { name: { contains: "\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430", mode: "insensitive" } },
          { name: { contains: "sample", mode: "insensitive" } }
        ]
      }
    };
    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }
    if (isPopular) {
      where.isPopular = true;
    }
    const orderBy = {};
    if (sortBy === "price") {
      orderBy.price = sortOrder;
    } else if (sortBy === "name") {
      orderBy.name = sortOrder;
    } else {
      orderBy.sortOrder = sortOrder;
    }
    const products = await prisma$2.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true
          }
        },
        modifiers: {
          include: {
            options: {
              orderBy: {
                sortOrder: "asc"
              }
            }
          },
          orderBy: {
            sortOrder: "asc"
          }
        }
      },
      orderBy,
      take: limit,
      skip: offset
    });
    const total = await prisma$2.product.count({ where });
    const formattedProducts = products.filter((product) => product && product.id && product.name).map((product) => ({
      ...product,
      name: product.name || "",
      image: product.image || null,
      price: Number(product.price) || 0,
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      modifiers: (product.modifiers || []).map((modifier) => ({
        ...modifier,
        price: Number(modifier.price),
        options: modifier.options.map((option) => ({
          ...option,
          price: Number(option.price)
        }))
      }))
    }));
    return {
      products: formattedProducts,
      total,
      limit,
      offset
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0442\u043E\u0432\u0430\u0440\u043E\u0432"
    });
  }
});

const index_get$f = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$e
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$4 = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const oldPriceValue = body.oldPrice === "" || body.oldPrice === null || body.oldPrice === void 0 || isNaN(Number(body.oldPrice)) || Number(body.oldPrice) <= 0 ? null : Number(body.oldPrice);
    const weightValue = body.weight === "" || body.weight === null || body.weight === void 0 || isNaN(Number(body.weight)) || Number(body.weight) <= 0 ? null : Number(body.weight);
    const caloriesValue = body.calories === "" || body.calories === null || body.calories === void 0 || isNaN(Number(body.calories)) || Number(body.calories) <= 0 ? null : Number(body.calories);
    const product = await prisma$2.product.create({
      data: {
        categoryId: body.categoryId,
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
        description: body.description,
        image: body.image,
        images: body.images || [],
        price: body.price,
        oldPrice: oldPriceValue,
        weight: weightValue,
        calories: caloriesValue,
        isActive: body.isActive !== void 0 ? body.isActive : true,
        isPopular: body.isPopular || false,
        isNew: body.isNew || false,
        isHot: body.isHot || false,
        sortOrder: body.sortOrder || 0
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true
          }
        }
      }
    });
    return {
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null
    };
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        message: "\u0422\u043E\u0432\u0430\u0440 \u0441 \u0442\u0430\u043A\u0438\u043C slug \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0442\u043E\u0432\u0430\u0440\u0430"
    });
  }
});

const index_post$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$4
}, Symbol.toStringTag, { value: 'Module' }));

async function getUserIdFromToken(event) {
  try {
    const authHeader = getHeader(event, "authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    const token = authHeader.substring(7);
    if (!token) {
      return null;
    }
    const payload = await verifyToken(token);
    return payload.userId || null;
  } catch (error) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0442\u043E\u043A\u0435\u043D\u0430:", error);
    return null;
  }
}
async function requireAuth(event) {
  const userId = await getUserIdFromToken(event);
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: "\u041D\u0435\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F"
    });
  }
  return userId;
}

const _id__delete$2 = defineEventHandler(async (event) => {
  try {
    const userId = await getUserIdFromToken(event);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"
      });
    }
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const existingAddress = await prisma$2.address.findUnique({
      where: { id }
    });
    if (!existingAddress) {
      throw createError({
        statusCode: 404,
        message: "\u0410\u0434\u0440\u0435\u0441 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    if (existingAddress.userId !== userId) {
      throw createError({
        statusCode: 403,
        message: "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u044D\u0442\u043E\u043C\u0443 \u0430\u0434\u0440\u0435\u0441\u0443"
      });
    }
    await prisma$2.address.delete({
      where: { id }
    });
    return { success: true };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u0430\u0434\u0440\u0435\u0441\u0430:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u0430\u0434\u0440\u0435\u0441\u0430"
    });
  }
});

const _id__delete$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete$2
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put$2 = defineEventHandler(async (event) => {
  try {
    const userId = await getUserIdFromToken(event);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"
      });
    }
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID \u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const existingAddress = await prisma$2.address.findUnique({
      where: { id }
    });
    if (!existingAddress) {
      throw createError({
        statusCode: 404,
        message: "\u0410\u0434\u0440\u0435\u0441 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    if (existingAddress.userId !== userId) {
      throw createError({
        statusCode: 403,
        message: "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u044D\u0442\u043E\u043C\u0443 \u0430\u0434\u0440\u0435\u0441\u0443"
      });
    }
    const body = await readBody(event);
    if (body.isDefault) {
      await prisma$2.address.updateMany({
        where: {
          userId,
          id: { not: id },
          isDefault: true
        },
        data: {
          isDefault: false
        }
      });
    }
    const address = await prisma$2.address.update({
      where: { id },
      data: {
        street: body.street,
        house: body.house,
        apartment: body.apartment,
        entrance: body.entrance,
        floor: body.floor,
        intercom: body.intercom,
        comment: body.comment,
        isDefault: body.isDefault || false
      }
    });
    return address;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u0430\u0434\u0440\u0435\u0441\u0430:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u0430\u0434\u0440\u0435\u0441\u0430"
    });
  }
});

const _id__put$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$c = defineEventHandler(async (event) => {
  try {
    const userId = await getUserIdFromToken(event);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"
      });
    }
    const addresses = await prisma$2.address.findMany({
      where: {
        userId
      },
      orderBy: [
        { isDefault: "desc" },
        { createdAt: "desc" }
      ]
    });
    return addresses;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0430\u0434\u0440\u0435\u0441\u043E\u0432:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0430\u0434\u0440\u0435\u0441\u043E\u0432"
    });
  }
});

const index_get$d = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$c
}, Symbol.toStringTag, { value: 'Module' }));

const index_post$2 = defineEventHandler(async (event) => {
  try {
    const userId = await getUserIdFromToken(event);
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"
      });
    }
    const body = await readBody(event);
    if (body.isDefault) {
      await prisma$2.address.updateMany({
        where: {
          userId,
          isDefault: true
        },
        data: {
          isDefault: false
        }
      });
    }
    const address = await prisma$2.address.create({
      data: {
        userId,
        street: body.street,
        house: body.house,
        apartment: body.apartment,
        entrance: body.entrance,
        floor: body.floor,
        intercom: body.intercom,
        comment: body.comment,
        isDefault: body.isDefault || false
      }
    });
    return address;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0430\u0434\u0440\u0435\u0441\u0430:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0430\u0434\u0440\u0435\u0441\u0430"
    });
  }
});

const index_post$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$a = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f;
  try {
    const userId = await requireAuth(event);
    let balance = 0;
    let history = [];
    try {
      const user = await prisma$2.user.findUnique({
        where: { id: userId },
        select: {
          bonusBalance: true
        }
      });
      if (user) {
        balance = Number(user.bonusBalance || 0);
      }
      history = await prisma$2.bonusTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 50,
        include: {
          order: {
            select: {
              id: true,
              orderNumber: true
            }
          }
        }
      });
    } catch (error) {
      console.log("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u0447\u0435\u0440\u0435\u0437 Prisma:", error.message);
      if (((_a = error.message) == null ? void 0 : _a.includes("bonus")) || ((_b = error.message) == null ? void 0 : _b.includes("does not exist")) || ((_c = error.message) == null ? void 0 : _c.includes("column")) || ((_d = error.message) == null ? void 0 : _d.includes("Unknown arg"))) {
        try {
          const bonusCheck = await prisma$2.$queryRawUnsafe(
            `SELECT column_name 
             FROM information_schema.columns 
             WHERE table_name = 'users' AND column_name = 'bonusBalance'`
          );
          if (bonusCheck.length > 0) {
            const balanceResult = await prisma$2.$queryRawUnsafe(
              `SELECT COALESCE("bonusBalance"::text, '0') as "bonusBalance" 
               FROM users 
               WHERE id = $1`,
              userId
            );
            balance = Number(((_e = balanceResult[0]) == null ? void 0 : _e.bonusBalance) || 0);
            const tableCheck = await prisma$2.$queryRawUnsafe(
              `SELECT table_name 
               FROM information_schema.tables 
               WHERE table_name = 'bonus_transactions'`
            );
            if (tableCheck.length > 0) {
              const historyResult = await prisma$2.$queryRawUnsafe(
                `SELECT 
                  bt.id,
                  bt.amount::text as amount,
                  bt.description,
                  bt."createdAt",
                  bt."orderId"
                FROM bonus_transactions bt
                WHERE bt."userId" = $1
                ORDER BY bt."createdAt" DESC
                LIMIT 50`,
                userId
              );
              for (const transaction of historyResult) {
                if (transaction.orderId) {
                  const orderResult = await prisma$2.$queryRawUnsafe(
                    `SELECT "orderNumber" FROM orders WHERE id = $1`,
                    transaction.orderId
                  );
                  history.push({
                    id: transaction.id,
                    amount: Number(transaction.amount),
                    description: transaction.description || (orderResult[0] ? `\u041D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0435 \u0437\u0430 \u0437\u0430\u043A\u0430\u0437 \u2116${orderResult[0].orderNumber}` : "\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u044F \u0431\u043E\u043D\u0443\u0441\u043E\u0432"),
                    createdAt: transaction.createdAt,
                    orderNumber: (_f = orderResult[0]) == null ? void 0 : _f.orderNumber
                  });
                } else {
                  history.push({
                    id: transaction.id,
                    amount: Number(transaction.amount),
                    description: transaction.description || "\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u044F \u0431\u043E\u043D\u0443\u0441\u043E\u0432",
                    createdAt: transaction.createdAt
                  });
                }
              }
            }
          } else {
            console.log("\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u0435\u0449\u0435 \u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0430 \u043A \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 (\u043F\u043E\u043B\u0435 bonusBalance \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E)");
          }
        } catch (sqlError) {
          console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u0447\u0435\u0440\u0435\u0437 raw SQL:", sqlError.message);
        }
      } else {
        throw error;
      }
    }
    return {
      balance,
      history: history.map((transaction) => {
        var _a2;
        return {
          id: transaction.id,
          amount: Number(transaction.amount),
          description: transaction.description || (transaction.order ? `\u041D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0435 \u0437\u0430 \u0437\u0430\u043A\u0430\u0437 \u2116${transaction.order.orderNumber}` : "\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u044F \u0431\u043E\u043D\u0443\u0441\u043E\u0432"),
          createdAt: transaction.createdAt,
          orderNumber: (_a2 = transaction.order) == null ? void 0 : _a2.orderNumber
        };
      })
    };
  } catch (error) {
    if (error.statusCode === 401 || error.statusCode === 404) {
      throw error;
    }
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0431\u043E\u043D\u0443\u0441\u043E\u0432:", error);
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0431\u043E\u043D\u0443\u0441\u043E\u0432"
    });
  }
});

const index_get$b = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$a
}, Symbol.toStringTag, { value: 'Module' }));

const _productId__delete = defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, "productId");
    const userId = await requireAuth(event);
    if (!productId) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D ID \u0442\u043E\u0432\u0430\u0440\u0430"
      });
    }
    await prisma$2.productFavorite.delete({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });
    return { success: true };
  } catch (error) {
    if (error.code === "P2025") {
      return { success: true };
    }
    if (error.statusCode) {
      throw error;
    }
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E:", error);
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E"
    });
  }
});

const _productId__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _productId__delete
}, Symbol.toStringTag, { value: 'Module' }));

const _productId__get = defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, "productId");
    const userId = await getUserIdFromToken(event);
    if (!userId) {
      return { isFavorite: false };
    }
    if (!productId) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D ID \u0442\u043E\u0432\u0430\u0440\u0430"
      });
    }
    const favorite = await prisma$2.productFavorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });
    return { isFavorite: !!favorite };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E:", error);
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E"
    });
  }
});

const _productId__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _productId__get
}, Symbol.toStringTag, { value: 'Module' }));

const _productId__post = defineEventHandler(async (event) => {
  try {
    const productId = getRouterParam(event, "productId");
    const userId = await requireAuth(event);
    if (!productId) {
      throw createError({
        statusCode: 400,
        message: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D ID \u0442\u043E\u0432\u0430\u0440\u0430"
      });
    }
    const favorite = await prisma$2.productFavorite.upsert({
      where: {
        userId_productId: {
          userId,
          productId
        }
      },
      create: {
        userId,
        productId
      },
      update: {}
    });
    return favorite;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435:", error);
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435"
    });
  }
});

const _productId__post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _productId__post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$8 = defineEventHandler(async (event) => {
  try {
    const userId = await requireAuth(event);
    const favorites = await prisma$2.productFavorite.findMany({
      where: {
        userId
      },
      include: {
        product: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return favorites.map((fav) => ({
      ...fav,
      product: {
        ...fav.product,
        price: Number(fav.product.price),
        oldPrice: fav.product.oldPrice ? Number(fav.product.oldPrice) : null
      }
    }));
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E:", error);
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E"
    });
  }
});

const index_get$9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$8
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$6 = defineEventHandler(async (event) => {
  try {
    const userId = await requireAuth(event);
    const orders = await prisma$2.order.findMany({
      where: {
        userId
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          }
        },
        address: true,
        deliveryZone: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return orders.map((order) => ({
      ...order,
      subtotal: Number(order.subtotal),
      deliveryPrice: Number(order.deliveryPrice),
      discount: Number(order.discount),
      total: Number(order.total),
      hasIikoSync: !!order.aikoOrderId,
      iikoOrderId: order.aikoOrderId,
      items: order.items.map((item) => ({
        ...item,
        price: Number(item.price),
        subtotal: Number(item.subtotal)
      }))
    }));
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0437\u0430\u043A\u0430\u0437\u043E\u0432"
    });
  }
});

const index_get$7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$6
}, Symbol.toStringTag, { value: 'Module' }));

const _id__delete = defineEventHandler(async (event) => {
  try {
    let id = getRouterParam(event, "id");
    const url = event.node.req.url || "";
    const method = event.node.req.method;
    if (!id && url) {
      const match = url.match(/\/api\/promo-codes\/([^/?]+)/);
      if (match && match[1]) {
        id = match[1];
        console.log("[PromoCode Delete] ID \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D \u0438\u0437 URL:", id);
      }
    }
    console.log("[PromoCode Delete] \u0417\u0430\u043F\u0440\u043E\u0441:", { method, url, id, routerParams: event.context.params });
    if (!id) {
      console.error("[PromoCode Delete] ID \u043D\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D \u0438\u0437 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430 \u0438\u043B\u0438 URL");
      throw createError({
        statusCode: 400,
        message: "ID \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    if (id.length <= 20 && id === id.toUpperCase() && /^[A-Z0-9]+$/.test(id)) {
      throw createError({
        statusCode: 404,
        message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    console.log("[PromoCode Delete] \u041F\u043E\u0438\u0441\u043A \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430 \u043F\u043E ID \u0434\u043B\u044F \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F:", id);
    const promoCode = await prisma$2.promoCode.findUnique({
      where: { id }
    });
    if (!promoCode) {
      console.log("[PromoCode Delete] \u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0432 \u0411\u0414 \u0434\u043B\u044F ID:", id);
      const promoByCode = await prisma$2.promoCode.findFirst({
        where: { code: id }
      });
      if (promoByCode) {
        console.log("[PromoCode Delete] \u041D\u0430\u0439\u0434\u0435\u043D \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043F\u043E \u043A\u043E\u0434\u0443, \u043D\u043E \u0437\u0430\u043F\u0440\u043E\u0441 \u0431\u044B\u043B \u043F\u043E ID. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 endpoint [code]");
      }
      throw createError({
        statusCode: 404,
        message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    console.log("[PromoCode Delete] \u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0430\u0439\u0434\u0435\u043D, \u0443\u0434\u0430\u043B\u044F\u0435\u043C:", promoCode.id, promoCode.code);
    await prisma$2.promoCode.delete({
      where: { id }
    });
    return { success: true };
  } catch (error) {
    console.error("[PromoCode Delete] \u041E\u0448\u0438\u0431\u043A\u0430:", {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
      stack: error.stack
    });
    if (error.statusCode) {
      throw error;
    }
    if (error.code === "P2025") {
      throw createError({
        statusCode: 404,
        message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    console.error("[PromoCode Delete] \u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430"
    });
  }
});

const _id__delete$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__delete
}, Symbol.toStringTag, { value: 'Module' }));

const _id__get = defineEventHandler(async (event) => {
  try {
    let id = getRouterParam(event, "id");
    const url = event.node.req.url || "";
    const params = event.context.params || {};
    console.log("[PromoCode Get] \u0417\u0430\u043F\u0440\u043E\u0441:", { url, params, id });
    if (!id) {
      const match = url.match(/\/api\/promo-codes\/([^/?]+)/);
      if (match && match[1]) {
        id = match[1];
        console.log("[PromoCode Get] ID \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D \u0438\u0437 URL:", id);
      } else if (params.code) {
        id = params.code;
        console.log("[PromoCode Get] ID \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D \u0438\u0437 routerParams.code:", id);
      } else if (params.id) {
        id = params.id;
        console.log("[PromoCode Get] ID \u0438\u0437\u0432\u043B\u0435\u0447\u0435\u043D \u0438\u0437 routerParams.id:", id);
      }
    }
    if (!id) {
      throw createError({
        statusCode: 404,
        message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    if (id.length <= 20 && id === id.toUpperCase() && /^[A-Z0-9]+$/.test(id)) {
      throw createError({
        statusCode: 404,
        message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    console.log("[PromoCode Get] \u041F\u043E\u0438\u0441\u043A \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430 \u043F\u043E ID:", id);
    const promoCode = await prisma$2.promoCode.findUnique({
      where: { id }
    });
    if (!promoCode) {
      console.log("[PromoCode Get] \u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0432 \u0411\u0414 \u0434\u043B\u044F ID:", id);
      const promoByCode = await prisma$2.promoCode.findFirst({
        where: { code: id }
      });
      if (promoByCode) {
        console.log("[PromoCode Get] \u041D\u0430\u0439\u0434\u0435\u043D \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043F\u043E \u043A\u043E\u0434\u0443, \u043D\u043E \u0437\u0430\u043F\u0440\u043E\u0441 \u0431\u044B\u043B \u043F\u043E ID. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 endpoint [code]");
      }
      throw createError({
        statusCode: 404,
        message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    console.log("[PromoCode Get] \u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0430\u0439\u0434\u0435\u043D:", promoCode.id, promoCode.code);
    return {
      ...promoCode,
      discountValue: Number(promoCode.discountValue),
      minOrderAmount: promoCode.minOrderAmount ? Number(promoCode.minOrderAmount) : null,
      maxDiscount: promoCode.maxDiscount ? Number(promoCode.maxDiscount) : null
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430"
    });
  }
});

const _id__get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__get
}, Symbol.toStringTag, { value: 'Module' }));

const _id__put = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const promoCode = await prisma$2.promoCode.update({
      where: { id },
      data: {
        code: body.code,
        description: body.description,
        discountType: body.discountType,
        discountValue: body.discountValue,
        minOrderAmount: body.minOrderAmount,
        maxDiscount: body.maxDiscount,
        usageLimit: body.usageLimit,
        validFrom: body.validFrom ? new Date(body.validFrom) : null,
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
        isActive: body.isActive
      }
    });
    return {
      ...promoCode,
      discountValue: Number(promoCode.discountValue),
      minOrderAmount: promoCode.minOrderAmount ? Number(promoCode.minOrderAmount) : null,
      maxDiscount: promoCode.maxDiscount ? Number(promoCode.maxDiscount) : null
    };
  } catch (error) {
    if (error.code === "P2025") {
      throw createError({
        statusCode: 404,
        message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430"
    });
  }
});

const _id__put$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: _id__put
}, Symbol.toStringTag, { value: 'Module' }));

const byCode_get = defineEventHandler(async (event) => {
  try {
    const code = getRouterParam(event, "code");
    if (!code) {
      throw createError({
        statusCode: 400,
        message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D"
      });
    }
    const codeUpper = code.toUpperCase();
    const promoCode = await prisma$2.promoCode.findFirst({
      where: {
        code: codeUpper,
        isActive: true,
        validFrom: { lte: /* @__PURE__ */ new Date() },
        OR: [{ validUntil: null }, { validUntil: { gte: /* @__PURE__ */ new Date() } }]
      }
    });
    if (!promoCode) {
      throw createError({
        statusCode: 404,
        message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0438\u043B\u0438 \u043D\u0435\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u0435\u043D"
      });
    }
    if (promoCode.usageLimit !== null) {
      const usageCount = await prisma$2.order.count({
        where: {
          promoCodeId: promoCode.id
        }
      });
      if (usageCount >= promoCode.usageLimit) {
        throw createError({
          statusCode: 400,
          message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u0438\u0441\u0447\u0435\u0440\u043F\u0430\u043B \u043B\u0438\u043C\u0438\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0439"
        });
      }
    }
    return {
      code: promoCode.code,
      discountType: promoCode.discountType,
      discountValue: Number(promoCode.discountValue),
      minOrderAmount: Number(promoCode.minOrderAmount),
      maxDiscount: promoCode.maxDiscount ? Number(promoCode.maxDiscount) : void 0
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430"
    });
  }
});

const byCode_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: byCode_get
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$4 = defineEventHandler(async (event) => {
  try {
    const query = getQuery$1(event);
    const isActive = query.isActive !== void 0 ? query.isActive === "true" : void 0;
    const where = {};
    if (isActive !== void 0) {
      where.isActive = isActive;
    }
    const promoCodes = await prisma$2.promoCode.findMany({
      where,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        _count: {
          select: {
            orders: true
          }
        }
      }
    });
    console.log("[PromoCode List] \u041D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u043E\u0432:", promoCodes.length);
    promoCodes.forEach((code) => {
      console.log("[PromoCode List] \u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434:", { id: code.id, code: code.code });
    });
    return promoCodes.map((code) => {
      var _a;
      return {
        ...code,
        discountValue: Number(code.discountValue),
        minOrderAmount: code.minOrderAmount ? Number(code.minOrderAmount) : null,
        maxDiscount: code.maxDiscount ? Number(code.maxDiscount) : null,
        usedCount: ((_a = code._count) == null ? void 0 : _a.orders) || 0,
        usageLimit: code.usageLimit
      };
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u043E\u0432"
    });
  }
});

const index_get$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$4
}, Symbol.toStringTag, { value: 'Module' }));

const index_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const promoCode = await prisma$2.promoCode.create({
      data: {
        code: body.code.toUpperCase(),
        description: body.description,
        discountType: body.discountType,
        discountValue: body.discountValue,
        minOrderAmount: body.minOrderAmount,
        maxDiscount: body.maxDiscount,
        usageLimit: body.usageLimit,
        validFrom: body.validFrom ? new Date(body.validFrom) : null,
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
        isActive: body.isActive !== void 0 ? body.isActive : true
      }
    });
    return {
      ...promoCode,
      discountValue: Number(promoCode.discountValue),
      minOrderAmount: promoCode.minOrderAmount ? Number(promoCode.minOrderAmount) : null,
      maxDiscount: promoCode.maxDiscount ? Number(promoCode.maxDiscount) : null
    };
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 409,
        message: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 \u0441 \u0442\u0430\u043A\u0438\u043C \u043A\u043E\u0434\u043E\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"
      });
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430"
    });
  }
});

const index_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_post
}, Symbol.toStringTag, { value: 'Module' }));

const index_get$2 = defineEventHandler(async (event) => {
  try {
    const widget = await prisma$2.promocodeWidget.findFirst({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return widget || null;
  } catch (error) {
    console.error("[Promocode Widget] \u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0432\u0438\u0434\u0436\u0435\u0442\u0430:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0432\u0438\u0434\u0436\u0435\u0442\u0430 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u0430"
    });
  }
});

const index_get$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get$2
}, Symbol.toStringTag, { value: 'Module' }));

const index_get = defineEventHandler(async (event) => {
  try {
    const promotions = await prisma$2.promotion.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        sortOrder: "asc"
      }
    });
    return promotions;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0430\u043A\u0446\u0438\u0439"
    });
  }
});

const index_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: index_get
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":false};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  const result = [];
  for (const _chunk of chunks) {
    const chunk = _chunk?.trim();
    if (chunk) {
      result.push(chunk);
    }
  }
  return result;
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));

async function awardBonusForDeliveredOrder(orderId) {
  var _a, _b;
  try {
    const order = await prisma$2.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            id: true
          }
        }
      }
    });
    if (!order) {
      console.log(`[\u0411\u043E\u043D\u0443\u0441\u044B] \u0417\u0430\u043A\u0430\u0437 ${orderId} \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D`);
      return false;
    }
    if (order.status !== "DELIVERED") {
      console.log(`[\u0411\u043E\u043D\u0443\u0441\u044B] \u0417\u0430\u043A\u0430\u0437 ${order.orderNumber} \u0435\u0449\u0435 \u043D\u0435 \u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D (\u0441\u0442\u0430\u0442\u0443\u0441: ${order.status})`);
      return false;
    }
    if (order.paymentStatus !== "PAID") {
      console.log(`[\u0411\u043E\u043D\u0443\u0441\u044B] \u0417\u0430\u043A\u0430\u0437 ${order.orderNumber} \u043D\u0435 \u043E\u043F\u043B\u0430\u0447\u0435\u043D (\u0441\u0442\u0430\u0442\u0443\u0441 \u043E\u043F\u043B\u0430\u0442\u044B: ${order.paymentStatus})`);
      return false;
    }
    if (!order.userId || !order.user) {
      console.log(`[\u0411\u043E\u043D\u0443\u0441\u044B] \u0423 \u0437\u0430\u043A\u0430\u0437\u0430 ${order.orderNumber} \u043D\u0435\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F`);
      return false;
    }
    const existingBonus = await prisma$2.bonusTransaction.findFirst({
      where: {
        orderId: order.id,
        userId: order.userId
      }
    });
    if (existingBonus) {
      console.log(`[\u0411\u043E\u043D\u0443\u0441\u044B] \u0411\u043E\u043D\u0443\u0441\u044B \u0437\u0430 \u0437\u0430\u043A\u0430\u0437 ${order.orderNumber} \u0443\u0436\u0435 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u044B`);
      return false;
    }
    try {
      const bonusFieldCheck = await prisma$2.$queryRawUnsafe(
        `SELECT column_name 
         FROM information_schema.columns 
         WHERE table_name = 'users' AND column_name = 'bonusBalance'`
      );
      const tableCheck = await prisma$2.$queryRawUnsafe(
        `SELECT table_name 
         FROM information_schema.tables 
         WHERE table_name = 'bonus_transactions'`
      );
      if (bonusFieldCheck.length === 0 || tableCheck.length === 0) {
        console.log("[\u0411\u043E\u043D\u0443\u0441\u044B] \u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u0435\u0449\u0435 \u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0430 \u043A \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445");
        return false;
      }
    } catch (error) {
      if (((_a = error.message) == null ? void 0 : _a.includes("bonus")) || ((_b = error.message) == null ? void 0 : _b.includes("does not exist"))) {
        console.log("[\u0411\u043E\u043D\u0443\u0441\u044B] \u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u0435\u0449\u0435 \u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0430 \u043A \u0431\u0430\u0437\u0435 \u0434\u0430\u043D\u043D\u044B\u0445");
        return false;
      }
      throw error;
    }
    const bonusAmount = new Decimal(Number(order.total) * 0.01);
    await prisma$2.user.update({
      where: { id: order.userId },
      data: {
        bonusBalance: {
          increment: bonusAmount
        }
      }
    });
    await prisma$2.bonusTransaction.create({
      data: {
        userId: order.userId,
        orderId: order.id,
        amount: bonusAmount,
        description: `\u041D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0435 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u0437\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0437\u0430\u043A\u0430\u0437 \u2116${order.orderNumber} (1% \u043E\u0442 \u0441\u0443\u043C\u043C\u044B ${Number(order.total)} \u20BD)`
      }
    });
    console.log(`[\u0411\u043E\u043D\u0443\u0441\u044B] \u2705 \u041D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E ${Number(bonusAmount)} \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E \u0437\u0430 \u0437\u0430\u043A\u0430\u0437 ${order.orderNumber}`);
    return true;
  } catch (error) {
    console.error(`[\u0411\u043E\u043D\u0443\u0441\u044B] \u274C \u041E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u0437\u0430 \u0437\u0430\u043A\u0430\u0437 ${orderId}:`, error.message);
    return false;
  }
}

const bonus = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  awardBonusForDeliveredOrder: awardBonusForDeliveredOrder
}, Symbol.toStringTag, { value: 'Module' }));

const connections = /* @__PURE__ */ new Map();
function broadcastOrderUpdate(orderId, status, data) {
  const orderConnections = connections.get(orderId);
  if (orderConnections) {
    const message = JSON.stringify({
      type: "status_update",
      orderId,
      status,
      data,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    orderConnections.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  }
}

const orders = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  broadcastOrderUpdate: broadcastOrderUpdate
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map

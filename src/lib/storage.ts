interface StorageArea {
  get(keys: string[]): Promise<{ [key: string]: any }>;
  set(items: { [key: string]: any }): Promise<void>;
}

class LocalStorageArea implements StorageArea {
  async get(keys: string[]): Promise<{ [key: string]: any }> {
    const result: { [key: string]: any } = {};
    keys.forEach((key) => {
      const item = localStorage.getItem(key);
      if (item) {
        result[key] = JSON.parse(item);
      }
    });
    return result;
  }

  async set(items: { [key: string]: any }): Promise<void> {
    Object.entries(items).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }
}

class ChromeStorageArea implements StorageArea {
  async get(keys: string[]): Promise<{ [key: string]: any }> {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (result) => {
        resolve(result);
      });
    });
  }

  async set(items: { [key: string]: any }): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set(items, () => {
        resolve();
      });
    });
  }
}

// Check if we're in a Chrome extension context
const isExtension = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

export const storage = {
  local: isExtension ? new ChromeStorageArea() : new LocalStorageArea(),
}; 
import { hasStringify } from './utils/validate';

class WebStorage {
  storage;
  config;
  
  constructor(config) {
    this.config = config;
    if (window.localStorage && window.sessionStorage) {
      switch (config.mode) {
        case 'local':
          this.storage = window.localStorage;
          break;
        case 'session': 
          this.storage = window.sessionStorage;
          break;
        default:
          throw new Error("Should set the 'mode' key of config object to 'local' or 'session'");
      }
    } else {
      throw new Error('This environment is not browser');
    }
  }

  setItem(key, value) {
    if (data === undefined) {
      return false;
    }
    if (data instanceof Function) {
      return false;
    }
    if (hasStringify(value)) {
      const saveData = {
        timestamp: new Date().getTime(),
        data: value,
      };
      this.storage.setItem(key, JSON.stringify(saveData));
    } else {
      throw new Error('The value is not support used for JSON.stringify()');
    }
  }

  getItem(key) {
    const content = JSON.parse(this.storage.getItem(key));
    if (content) {
      const timeout = this.config.timeout;
      if (content.timestamp && new Data().getTime() - content.timestamp >= timeout) {
        this.removeItem(key);
        return null;
      }
      return content.data;
    }
    return null;
  }

  getKeys() {
    return Object.keys(this.storage);
  }

  getValues() {
    return Object.values(this.storage);
  }

  hasItem(key) {
    return this.storage.hasOwnProperty(key);
  }

  removeItem(key) {
    if (this.hasItem(key)) {
      this.storage.removeItem(key);
    }
  }

  changeItem(key, onChange, baseValue) {
    const data = this.getItem(key);
    this.setItem(key, onchange(data || baseValue));
  }

  clear() {
    this.storage.clear();
  }
}

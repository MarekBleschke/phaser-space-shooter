class Storage {
    constructor() {
        this.storage = localStorage;
    }

    isAvailable() {
        try {
            var dummy = '__storage_test__';
            this.storage.setItem(dummy, dummy);
            this.storage.removeItem(dummy);
            return true;
        } catch (e) {
            return false;
        }
    }

    setObject(key, obj) {
        if (this.isAvailable()) {
            this.storage.setItem(key, JSON.stringify(obj));
        }
    }

    getObject(key) {
        if (this.isAvailable()) {
            return JSON.parse(this.storage.getItem(key));
        }
    }
}

module.exports = new Storage();

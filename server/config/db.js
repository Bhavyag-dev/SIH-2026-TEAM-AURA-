import mongoose from 'mongoose';

// Resilient memory store fallback if MongoDB service is not running locally
class MemoryStore {
  constructor() {
    this.data = {};
  }

  _norm(name) {
    let str = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (str.endsWith('ies')) str = str.slice(0, -3) + 'y';
    else if (str.endsWith('s')) str = str.slice(0, -1);
    return str;
  }

  get(collection) {
    const key = this._norm(collection);
    if (!this.data[key]) {
      this.data[key] = [];
    }
    return this.data[key];
  }

  set(collection, items) {
    const key = this._norm(collection);
    this.data[key] = [...items];
  }

  find(collection, filter = {}) {
    const list = this.get(collection);
    return list.filter(item => {
      for (const key of Object.keys(filter)) {
        if (filter[key] !== undefined && item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  findById(collection, id) {
    const list = this.get(collection);
    return list.find(item => item._id === id || item.id === id) || null;
  }

  insert(collection, doc) {
    const list = this.get(collection);
    const newDoc = {
      _id: doc._id || 'doc_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...doc
    };
    list.push(newDoc);
    return newDoc;
  }

  updateById(collection, id, updates) {
    const list = this.get(collection);
    const index = list.findIndex(item => item._id === id || item.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
      return list[index];
    }
    return null;
  }

  deleteById(collection, id) {
    const list = this.get(collection);
    const index = list.findIndex(item => item._id === id || item.id === id);
    if (index !== -1) {
      const removed = list.splice(index, 1);
      return removed[0];
    }
    return null;
  }
}

export const memoryStore = new MemoryStore();
export let isMongoConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.log(`[DB] No MONGO_URI specified. Operating in resilient embedded in-memory mode with full seed data.`);
    isMongoConnected = false;
    return;
  }
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    isMongoConnected = true;
    console.log(`[DB] Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[DB] MongoDB not detected (${error.message}).`);
    console.log(`[DB] Operating in resilient embedded in-memory mode with full seed data.`);
  }
};

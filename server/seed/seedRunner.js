import { isMongoConnected, memoryStore } from '../config/db.js';
import { initialSeedData } from './seedData.js';
import mongoose from 'mongoose';

export async function seedDatabase() {
  console.log('[SEED] Checking database state for initial demo dataset...');

  // 1. Seed MemoryStore directly (so memory mode always has immediate data)
  for (const [key, items] of Object.entries(initialSeedData)) {
    memoryStore.set(key, [...items]);
  }

  // 2. If Mongo is connected, seed MongoDB collections if empty
  if (isMongoConnected) {
    try {
      const collections = mongoose.connection.collections;
      for (const [key, items] of Object.entries(initialSeedData)) {
        // Map key to model name (users -> User, etc.)
        const modelName = key.charAt(0).toUpperCase() + key.slice(1, -1);
        const Model = mongoose.models[modelName] || mongoose.models[key];
        if (Model) {
          const count = await Model.countDocuments();
          if (count === 0) {
            await Model.insertMany(items);
            console.log(`[SEED] Populated MongoDB collection '${key}' with ${items.length} records.`);
          }
        }
      }
    } catch (err) {
      console.warn(`[SEED] MongoDB seeding warning: ${err.message}`);
    }
  }

  console.log('[SEED] Pilot corridor data ready: 6 Supplies, 3 Demands, Fleet & Warehouses initialized.');
}

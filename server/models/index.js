import mongoose from 'mongoose';
import { isMongoConnected, memoryStore } from '../config/db.js';
export { memoryStore, isMongoConnected };

// Define Schemas
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['farmer', 'buyer', 'consumer', 'logistics', 'admin'], required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  location: {
    villageOrCity: String,
    district: String,
    state: String,
    pincode: String,
    coordinates: { lat: Number, lng: Number }
  },
  fpoName: String,
  language: { type: String, default: 'en' },
  verificationStatus: { type: String, enum: ['verified', 'pending', 'rejected'], default: 'verified' },
  rating: { type: Number, default: 4.8 }
}, { timestamps: true });

const supplyListingSchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  crop: { type: String, required: true },
  variety: { type: String },
  quantity: { type: Number, required: true }, // in Quintals (1 Quintal = 100 kg)
  unit: { type: String, default: 'Quintal' },
  askingPricePerUnit: { type: Number, required: true }, // in ₹
  qualityGrade: { type: String, enum: ['Grade A (Export/Premium)', 'Grade B (Standard Mandi)', 'Grade C (Processing)'], default: 'Grade A (Export/Premium)' },
  harvestDate: { type: String },
  readyForPickup: { type: Boolean, default: true },
  location: {
    address: String,
    district: String,
    state: String,
    coordinates: { lat: Number, lng: Number }
  },
  images: [String],
  status: { type: String, enum: ['available', 'allocated', 'completed', 'cancelled'], default: 'available' }
}, { timestamps: true });

const demandSchema = new mongoose.Schema({
  buyerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerType: { type: String, enum: ['bulk_buyer', 'consumer_pool', 'fpo_institutional'], default: 'bulk_buyer' },
  crop: { type: String, required: true },
  variety: { type: String },
  quantity: { type: Number, required: true }, // in Quintals
  unit: { type: String, default: 'Quintal' },
  qualityGrade: { type: String, default: 'Grade A (Export/Premium)' },
  destination: {
    facilityName: String,
    address: String,
    district: String,
    state: String,
    coordinates: { lat: Number, lng: Number }
  },
  requiredDate: { type: String },
  targetLandedPrice: { type: Number }, // Max budget per Quintal
  status: { type: String, enum: ['open', 'matched', 'in_fulfilment', 'completed', 'cancelled'], default: 'open' },
  notes: String
}, { timestamps: true });

const fulfilmentPlanSchema = new mongoose.Schema({
  demandId: { type: String, required: true },
  crop: { type: String, required: true },
  demandedQuantity: { type: Number, required: true },
  selectedSupplies: [{
    supplyId: String,
    farmerName: String,
    allocatedQty: Number,
    farmgateRate: Number,
    location: {
      address: String,
      coordinates: { lat: Number, lng: Number }
    }
  }],
  aggregationHub: {
    hubId: String,
    hubName: String,
    location: {
      address: String,
      coordinates: { lat: Number, lng: Number }
    },
    useStorage: Boolean,
    storageCostPerQuintal: Number,
    storageReason: String
  },
  vehicle: {
    vehicleId: String,
    model: String,
    type: String,
    capacityQuintals: Number,
    ratePerKm: Number
  },
  route: {
    stops: [{
      sequence: Number,
      name: String,
      type: { type: String, enum: ['farm_pickup', 'aggregation_hub', 'buyer_dropoff'] },
      action: String,
      coordinates: { lat: Number, lng: Number }
    }],
    totalDistanceKm: Number,
    estimatedTransitHours: Number
  },
  economics: {
    farmerRealizationTotal: Number,
    farmerRealizationPerQuintal: Number,
    buyerLandedCostTotal: Number,
    buyerLandedCostPerQuintal: Number,
    logisticsCost: Number,
    handlingAggregationCost: Number,
    platformCoordinationFee: Number,
    expectedWastagePercent: Number,
    expectedWastageKg: Number,
    traditionalBaseline: {
      mandiTraderRate: Number,
      apmcCessAndCommission: Number,
      fragmentedTransportCost: Number,
      traditionalWastagePercent: Number,
      baselineFarmerNetRealization: Number,
      baselineBuyerLandedCost: Number
    },
    economicGains: {
      farmerRealizationUpliftPercent: Number,
      buyerCostReductionPercent: Number,
      netTotalSavingsRupees: Number,
      foodWasteReductionKg: Number
    }
  },
  status: { type: String, enum: ['recommended', 'accepted', 'active_dispatch', 'delivered'], default: 'recommended' }
}, { timestamps: true });

const logisticsResourceSchema = new mongoose.Schema({
  providerName: String,
  vehicleNumber: String,
  vehicleType: String, // e.g., 'Eicher Pro Reefer 6.5T', 'Tata 407 3T', 'Mahindra Bolero Pickup 1.5T'
  capacityQuintals: Number,
  hasColdChain: Boolean,
  costPerKm: Number,
  currentLocation: {
    city: String,
    coordinates: { lat: Number, lng: Number }
  },
  status: { type: String, enum: ['available', 'assigned', 'in_transit', 'maintenance'], default: 'available' },
  driverName: String,
  driverPhone: String
}, { timestamps: true });

const warehouseSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['Collection Hub', 'Cold Storage & Packhouse', 'Distribution Center'] },
  location: {
    address: String,
    district: String,
    coordinates: { lat: Number, lng: Number }
  },
  totalCapacityQuintals: Number,
  availableCapacityQuintals: Number,
  storageCostPerQuintalDay: Number,
  supportedCommodities: [String],
  temperatureRange: String,
  qualityTestingFacility: Boolean
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  demandId: String,
  fulfilmentPlanId: String,
  crop: String,
  totalQuantityQuintals: Number,
  buyerName: String,
  totalAmount: Number,
  escrowStatus: { type: String, enum: ['pending', 'funded', 'released_to_farmers', 'disputed'], default: 'funded' },
  fulfilmentStatus: { type: String, enum: ['order_confirmed', 'dispatch_scheduled', 'farm_collection_in_progress', 'hub_precooled', 'en_route_delivery', 'delivered_and_settled'], default: 'order_confirmed' },
  paymentBreakdown: {
    farmersPayout: Number,
    logisticsPayout: Number,
    hubStorageFee: Number,
    platformFee: Number
  },
  currentMilestone: {
    step: Number,
    label: String,
    updatedAt: String
  }
}, { timestamps: true });

const priceHistorySchema = new mongoose.Schema({
  crop: String,
  variety: String,
  mandiName: String,
  district: String,
  state: String,
  minPrice: Number,
  maxPrice: Number,
  modalPrice: Number, // Reference trading price per Quintal
  date: String,
  trendDirection: { type: String, enum: ['up', 'stable', 'down'], default: 'up' },
  forecastNextWeekModal: Number
}, { timestamps: true });

// Mongoose Models
const MongooseModels = {
  User: mongoose.model('User', userSchema),
  SupplyListing: mongoose.model('SupplyListing', supplyListingSchema),
  Demand: mongoose.model('Demand', demandSchema),
  FulfilmentPlan: mongoose.model('FulfilmentPlan', fulfilmentPlanSchema),
  LogisticsResource: mongoose.model('LogisticsResource', logisticsResourceSchema),
  Warehouse: mongoose.model('Warehouse', warehouseSchema),
  Order: mongoose.model('Order', orderSchema),
  PriceHistory: mongoose.model('PriceHistory', priceHistorySchema)
};

// Generic DAO wrapper that seamlessly routes to MongoDB or MemoryStore
export const db = {
  async find(collectionName, filter = {}) {
    if (isMongoConnected && MongooseModels[collectionName]) {
      return await MongooseModels[collectionName].find(filter).lean();
    }
    return memoryStore.find(collectionName, filter);
  },

  async findById(collectionName, id) {
    if (isMongoConnected && MongooseModels[collectionName]) {
      return await MongooseModels[collectionName].findById(id).lean();
    }
    return memoryStore.findById(collectionName, id);
  },

  async findOne(collectionName, filter = {}) {
    if (isMongoConnected && MongooseModels[collectionName]) {
      return await MongooseModels[collectionName].findOne(filter).lean();
    }
    const results = memoryStore.find(collectionName, filter);
    return results.length > 0 ? results[0] : null;
  },

  async create(collectionName, doc) {
    if (isMongoConnected && MongooseModels[collectionName]) {
      const created = await MongooseModels[collectionName].create(doc);
      return created.toObject();
    }
    return memoryStore.insert(collectionName, doc);
  },

  async updateById(collectionName, id, updates) {
    if (isMongoConnected && MongooseModels[collectionName]) {
      return await MongooseModels[collectionName].findByIdAndUpdate(id, updates, { new: true }).lean();
    }
    return memoryStore.updateById(collectionName, id, updates);
  },

  async deleteById(collectionName, id) {
    if (isMongoConnected && MongooseModels[collectionName]) {
      return await MongooseModels[collectionName].findByIdAndDelete(id).lean();
    }
    return memoryStore.deleteById(collectionName, id);
  }
};

import express from 'express';
import { db, memoryStore } from '../models/index.js';
import { optimizeFulfilmentPlan } from '../services/optimizationEngine.js';

const router = express.Router();

// --- AUTH & USERS ---
router.get('/users', async (req, res) => {
  try {
    const users = await db.find('User');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/auth/demo-switch', async (req, res) => {
  try {
    const { role } = req.body;
    const users = await db.find('User');
    const matched = users.find(u => u.role === role) || users[0];
    res.json(matched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SUPPLY LISTINGS ---
router.get('/supply', async (req, res) => {
  try {
    const { crop, farmerId } = req.query;
    let list = await db.find('SupplyListing');
    if (crop) {
      list = list.filter(s => s.crop.toLowerCase().includes(crop.toLowerCase()));
    }
    if (farmerId) {
      list = list.filter(s => s.farmerId === farmerId);
    }
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/supply', async (req, res) => {
  try {
    const doc = req.body;
    if (!doc.farmerName) doc.farmerName = 'Rameshwar Patil (FPO)';
    if (!doc.quantity) return res.status(400).json({ error: 'Quantity is required' });
    if (!doc.askingPricePerUnit) return res.status(400).json({ error: 'Price is required' });
    
    // Default image if missing
    if (!doc.images || doc.images.length === 0) {
      if (doc.crop?.toLowerCase().includes('tomato')) {
        doc.images = ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'];
      } else if (doc.crop?.toLowerCase().includes('orange')) {
        doc.images = ['https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&auto=format&fit=crop&q=80'];
      } else {
        doc.images = ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'];
      }
    }

    const created = await db.create('SupplyListing', {
      ...doc,
      farmerId: doc.farmerId || 'usr_farmer_1',
      status: 'available'
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/supply/:id', async (req, res) => {
  try {
    const deleted = await db.deleteById('SupplyListing', req.params.id);
    res.json({ message: 'Deleted successfully', deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DEMAND / PROCUREMENT RFQ ---
router.get('/demand', async (req, res) => {
  try {
    const demands = await db.find('Demand');
    res.json(demands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/demand', async (req, res) => {
  try {
    const doc = req.body;
    if (!doc.crop || !doc.quantity) {
      return res.status(400).json({ error: 'Crop and quantity are required' });
    }
    const created = await db.create('Demand', {
      ...doc,
      buyerId: doc.buyerId || 'usr_buyer_1',
      buyerName: doc.buyerName || 'BigBasket Wholesale Hub (Bhiwandi)',
      status: 'open'
    });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- OPTIMIZATION ENGINE ---
router.post('/optimizer/run', async (req, res) => {
  try {
    const { demandId, customDemand } = req.body;
    let targetDemand = null;

    if (demandId) {
      targetDemand = await db.findById('Demand', demandId);
    } else if (customDemand) {
      targetDemand = customDemand;
    }

    if (!targetDemand) {
      const allDemands = await db.find('Demand');
      targetDemand = allDemands[0];
    }

    const availableSupplies = await db.find('SupplyListing');
    const vehicles = await db.find('LogisticsResource');
    const warehouses = await db.find('Warehouse');

    const optimizedPlan = optimizeFulfilmentPlan({
      demand: targetDemand,
      availableSupplies,
      vehicles,
      warehouses
    });

    if (!optimizedPlan.success) {
      return res.status(400).json(optimizedPlan);
    }

    // Save generated plan to repository
    const savedPlan = await db.create('FulfilmentPlan', optimizedPlan);

    res.json({
      plan: savedPlan,
      demand: targetDemand
    });
  } catch (err) {
    console.error('Optimization error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/optimizer/plans', async (req, res) => {
  try {
    const plans = await db.find('FulfilmentPlan');
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/optimizer/confirm-plan', async (req, res) => {
  try {
    const { planId, demandId } = req.body;
    let plan = await db.findById('FulfilmentPlan', planId);
    let demand = demandId ? await db.findById('Demand', demandId) : null;

    if (!plan) {
      // Fallback to latest plan
      const allPlans = await db.find('FulfilmentPlan');
      plan = allPlans[allPlans.length - 1];
    }

    // Update status
    if (plan?._id) {
      await db.updateById('FulfilmentPlan', plan._id, { status: 'accepted' });
    }
    if (demand?._id) {
      await db.updateById('Demand', demand._id, { status: 'in_fulfilment' });
    }

    // Create active order with locked escrow
    const orderNumber = 'ORD-2026-KS-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = await db.create('Order', {
      orderNumber,
      demandId: demand?._id || 'dem_custom',
      fulfilmentPlanId: plan?._id || 'plan_custom',
      crop: plan?.crop || 'Nashik Red Onion',
      totalQuantityQuintals: plan?.allocatedQuantity || 200,
      buyerName: demand?.buyerName || 'Wholesale Buyer Depot',
      totalAmount: plan?.economics?.buyerLandedCostTotal || 638000,
      escrowStatus: 'funded',
      fulfilmentStatus: 'dispatch_scheduled',
      currentMilestone: {
        step: 1,
        label: 'Escrow Locked. Multi-stop dispatch scheduled with fleet transporter.',
        updatedAt: new Date().toLocaleTimeString()
      },
      paymentBreakdown: {
        farmersPayout: plan?.economics?.farmerRealizationTotal || 516000,
        logisticsPayout: plan?.economics?.logisticsCost || 84000,
        hubStorageFee: plan?.economics?.handlingAggregationCost || 12000,
        platformFee: plan?.economics?.platformCoordinationFee || 9500
      }
    });

    res.json({
      success: true,
      message: 'Plan approved, escrow funded, and dispatch scheduled!',
      order: newOrder
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ORDERS & TRACKING ---
router.get('/orders', async (req, res) => {
  try {
    const orders = await db.find('Order');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { status, milestoneStep, milestoneLabel } = req.body;
    const updated = await db.updateById('Order', req.params.id, {
      fulfilmentStatus: status,
      currentMilestone: {
        step: milestoneStep || 2,
        label: milestoneLabel || `Status advanced to ${status}`,
        updatedAt: new Date().toLocaleTimeString()
      }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- LOGISTICS & WAREHOUSES ---
router.get('/logistics/vehicles', async (req, res) => {
  try {
    const vehicles = await db.find('LogisticsResource');
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/logistics/warehouses', async (req, res) => {
  try {
    const warehouses = await db.find('Warehouse');
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- CONSUMER GROUP BUYING POOLS ---
router.get('/pools', async (req, res) => {
  try {
    const pools = memoryStore.get('consumerPools');
    res.json(pools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/pools/:id/pledge', async (req, res) => {
  try {
    const { pledgeKg } = req.body;
    const pools = memoryStore.get('consumerPools');
    const pool = pools.find(p => p._id === req.params.id || p.id === req.params.id);
    if (!pool) return res.status(404).json({ error: 'Pool not found' });

    const added = Number(pledgeKg) || 5;
    pool.currentPledgedKg = Math.min(pool.minBatchTargetKg, pool.currentPledgedKg + added);
    pool.participantsCount += 1;

    res.json({
      success: true,
      message: `Pledged ${added} kg successfully to ${pool.poolTitle}!`,
      pool
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- MANDI MARKET PRICES & AGMARKNET BENCHMARKS ---
router.get('/mandi/prices', async (req, res) => {
  try {
    const prices = await db.find('PriceHistory');
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- MACRO ANALYTICS (DoCA OVERSIGHT) ---
router.get('/analytics/macro', async (req, res) => {
  try {
    const supplies = await db.find('SupplyListing');
    const demands = await db.find('Demand');
    const orders = await db.find('Order');

    const totalVolumeQuintals = orders.reduce((sum, o) => sum + (o.totalQuantityQuintals || 0), 0) + 380;
    const totalTransactionRupees = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) + 1240000;

    res.json({
      totalVolumeCoordinatedQuintals: totalVolumeQuintals,
      totalVolumeTonnes: Math.round(totalVolumeQuintals / 10),
      totalFarmerPayoutRupees: Math.round(totalTransactionRupees * 0.78),
      avgFarmerIncomeUpliftPercent: 19.4,
      avgBuyerLandedCostSavingsPercent: 13.8,
      totalWastagePreventedTonnes: 14.8,
      activeFposCount: 18,
      verifiedTransportVehicles: 34,
      settlementSuccessRatePercent: 99.8,
      activePilotCorridor: 'Maharashtra Agri Corridor (Nashik - Junnar - MMR)'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

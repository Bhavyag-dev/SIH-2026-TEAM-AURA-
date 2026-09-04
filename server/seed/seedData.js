export const initialSeedData = {
  users: [
    {
      _id: 'usr_farmer_shree',
      role: 'farmer',
      name: 'Rameshwar Choudhary',
      phone: '+91 98290 14829',
      email: 'rameshwar@shreekrishi.org',
      fpoName: 'Shree Krishi FPO',
      location: {
        villageOrCity: 'Chittorgarh',
        district: 'Chittorgarh',
        state: 'Rajasthan',
        pincode: '312001',
        coordinates: { lat: 24.8887, lng: 74.6269 }
      },
      verificationStatus: 'verified',
      rating: 4.9
    },
    {
      _id: 'usr_farmer_greenfields',
      role: 'farmer',
      name: 'Kailash Meena',
      phone: '+91 94140 88123',
      email: 'kailash@greenfields.coop',
      fpoName: 'GreenFields Cooperative',
      location: {
        villageOrCity: 'Tonk',
        district: 'Tonk',
        state: 'Rajasthan',
        pincode: '304001',
        coordinates: { lat: 26.1669, lng: 75.7885 }
      },
      verificationStatus: 'verified',
      rating: 4.8
    },
    {
      _id: 'usr_farmer_pragati',
      role: 'farmer',
      name: 'Bhagwan Sahay',
      phone: '+91 98281 66201',
      email: 'bhagwan@kisanpragati.org',
      fpoName: 'Kisan Pragati FPO',
      location: {
        villageOrCity: 'Sikar',
        district: 'Sikar',
        state: 'Rajasthan',
        pincode: '332001',
        coordinates: { lat: 27.6094, lng: 75.1399 }
      },
      verificationStatus: 'verified',
      rating: 4.7
    },
    {
      _id: 'usr_buyer_jaipur',
      role: 'buyer',
      name: 'Rajesh Singhania',
      phone: '+91 98290 44910',
      email: 'rajesh.singhania@rajasthanfresh.in',
      company: 'Jaipur Mega Agro Mart (Jaipur, Rajasthan)',
      location: {
        facilityName: 'Muhana Mandi Wholesale Terminal',
        address: 'Muhana Terminal Market, Sanganer, Jaipur',
        district: 'Jaipur',
        state: 'Rajasthan',
        coordinates: { lat: 26.8289, lng: 75.7533 }
      },
      verificationStatus: 'verified'
    },
    {
      _id: 'usr_farmer_2',
      role: 'farmer',
      name: 'Sunita Jadhav',
      phone: '+91 94227 88123',
      email: 'sunita.jadhav@godavarikrishi.org',
      fpoName: 'Godavari Krishi Producer Ltd',
      location: {
        villageOrCity: 'Niphad',
        district: 'Nashik',
        state: 'Maharashtra',
        pincode: '422303',
        coordinates: { lat: 20.0825, lng: 74.1086 }
      },
      verificationStatus: 'verified',
      rating: 4.8
    },
    {
      _id: 'usr_farmer_3',
      role: 'farmer',
      name: 'Ganesh Shinde',
      phone: '+91 98231 66201',
      email: 'ganesh.shinde@shivnerifpo.in',
      fpoName: 'Shivneri Agro FPO',
      location: {
        villageOrCity: 'Junnar',
        district: 'Pune',
        state: 'Maharashtra',
        pincode: '410502',
        coordinates: { lat: 19.2081, lng: 73.8767 }
      },
      verificationStatus: 'verified',
      rating: 4.7
    },
    {
      _id: 'usr_buyer_1',
      role: 'buyer',
      name: 'Vikram Mehta',
      phone: '+91 98200 44910',
      email: 'vikram.mehta@bigbasket.com',
      company: 'BigBasket Wholesale Hub (Bhiwandi)',
      location: {
        facilityName: 'Bhiwandi Mega Fulfillment Center',
        address: 'Bhiwandi Logistics Corridor',
        district: 'Thane',
        state: 'Maharashtra',
        coordinates: { lat: 19.2965, lng: 73.0631 }
      },
      verificationStatus: 'verified'
    },
    {
      _id: 'usr_logistics_1',
      role: 'logistics',
      name: 'Rajesh More',
      phone: '+91 98601 22938',
      company: 'QuickAgri Cold Fleet Services',
      location: {
        city: 'Nashik Industrial Zone',
        coordinates: { lat: 19.9975, lng: 73.7898 }
      },
      verificationStatus: 'verified'
    },
    {
      _id: 'usr_admin_1',
      role: 'admin',
      name: 'Dr. V. K. Sharma',
      phone: '+91 11 2338 4120',
      email: 'vksharma.doca@nic.in',
      department: 'Department of Consumer Affairs (DoCA)',
      verificationStatus: 'verified'
    }
  ],

  supplyListings: [
    {
      _id: 'sup_shree_tomato',
      farmerId: 'usr_farmer_shree',
      farmerName: 'Shree Krishi FPO',
      fpoName: 'Shree Krishi FPO (Chittorgarh)',
      crop: 'Tomato',
      variety: 'Desi Hybrid Premium',
      quantity: 250, // Quintals (25 tonnes)
      unit: 'Quintal',
      askingPricePerUnit: 1500, // ₹15/kg
      qualityGrade: 'Grade A (Export/Premium)',
      harvestDate: '2026-09-24',
      readyForPickup: true,
      matchScore: 92,
      location: {
        address: 'Chittorgarh Agro Hub, Rajasthan',
        district: 'Chittorgarh',
        state: 'Rajasthan',
        coordinates: { lat: 24.8887, lng: 74.6269 }
      },
      images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'],
      status: 'available'
    },
    {
      _id: 'sup_greenfields_tomato',
      farmerId: 'usr_farmer_greenfields',
      farmerName: 'GreenFields Cooperative',
      fpoName: 'GreenFields Cooperative (Tonk)',
      crop: 'Tomato',
      variety: 'Abhinav Hybrid',
      quantity: 200, // Quintals (20 tonnes)
      unit: 'Quintal',
      askingPricePerUnit: 1800, // ₹18/kg
      qualityGrade: 'Grade A (Export/Premium)',
      harvestDate: '2026-09-25',
      readyForPickup: true,
      matchScore: 88,
      location: {
        address: 'Tonk Highway Belt, Rajasthan',
        district: 'Tonk',
        state: 'Rajasthan',
        coordinates: { lat: 26.1669, lng: 75.7885 }
      },
      images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'],
      status: 'available'
    },
    {
      _id: 'sup_pragati_tomato',
      farmerId: 'usr_farmer_pragati',
      farmerName: 'Kisan Pragati FPO',
      fpoName: 'Kisan Pragati FPO (Sikar)',
      crop: 'Tomato',
      variety: 'Red Gold',
      quantity: 300, // Quintals (30 tonnes)
      unit: 'Quintal',
      askingPricePerUnit: 2000, // ₹20/kg
      qualityGrade: 'Grade A (Export/Premium)',
      harvestDate: '2026-09-26',
      readyForPickup: true,
      matchScore: 85,
      location: {
        address: 'Sikar Agro Mandi Road, Rajasthan',
        district: 'Sikar',
        state: 'Rajasthan',
        coordinates: { lat: 27.6094, lng: 75.1399 }
      },
      images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'],
      status: 'available'
    },
    {
      _id: 'sup_wheat_jaipur',
      farmerId: 'usr_farmer_greenfields',
      farmerName: 'GreenFields Cooperative',
      fpoName: 'GreenFields Cooperative (Tonk)',
      crop: 'Wheat (Sharbati 10T)',
      variety: 'Sharbati Gold',
      quantity: 100, // Quintals (10 Tonnes)
      unit: 'Quintal',
      askingPricePerUnit: 2450,
      qualityGrade: 'Grade A (Export/Premium)',
      harvestDate: '2026-09-20',
      readyForPickup: true,
      matchScore: 94,
      location: {
        address: 'Tonk Grain Yard, Rajasthan',
        district: 'Tonk',
        state: 'Rajasthan',
        coordinates: { lat: 26.1669, lng: 75.7885 }
      },
      images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'],
      status: 'available'
    },
    {
      _id: 'sup_onion_1',
      farmerId: 'usr_farmer_1',
      farmerName: 'Rameshwar Patil',
      fpoName: 'Sahyadri Farmers Producer Co.',
      crop: 'Nashik Red Onion',
      variety: 'Garwa Kharif Late',
      quantity: 90, // Quintals
      unit: 'Quintal',
      askingPricePerUnit: 2580,
      qualityGrade: 'Grade A (Export/Premium)',
      harvestDate: '2026-08-28',
      readyForPickup: true,
      location: {
        address: 'Plot 14, Lasalgaon Mandi Road, Nashik',
        district: 'Nashik',
        state: 'Maharashtra',
        coordinates: { lat: 20.1472, lng: 74.2257 }
      },
      images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'],
      status: 'available'
    },
    {
      _id: 'sup_onion_2',
      farmerId: 'usr_farmer_2',
      farmerName: 'Sunita Jadhav',
      fpoName: 'Godavari Krishi Producer Ltd',
      crop: 'Nashik Red Onion',
      variety: 'Garwa Kharif Late',
      quantity: 80,
      unit: 'Quintal',
      askingPricePerUnit: 2550,
      qualityGrade: 'Grade A (Export/Premium)',
      harvestDate: '2026-08-30',
      readyForPickup: true,
      location: {
        address: 'Niphad Farm Cluster 3, Nashik',
        district: 'Nashik',
        state: 'Maharashtra',
        coordinates: { lat: 20.0825, lng: 74.1086 }
      },
      images: ['https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=600&auto=format&fit=crop&q=80'],
      status: 'available'
    },
    {
      _id: 'sup_onion_3',
      farmerId: 'usr_farmer_1',
      farmerName: 'Rameshwar Patil',
      fpoName: 'Sahyadri Farmers Producer Co.',
      crop: 'Nashik Red Onion',
      variety: 'Pol (Early Rabi)',
      quantity: 60,
      unit: 'Quintal',
      askingPricePerUnit: 2480,
      qualityGrade: 'Grade B (Standard Mandi)',
      harvestDate: '2026-09-01',
      readyForPickup: true,
      location: {
        address: 'Sinnar Agro Belt, Nashik',
        district: 'Nashik',
        state: 'Maharashtra',
        coordinates: { lat: 19.8512, lng: 73.9984 }
      },
      images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'],
      status: 'available'
    },
    {
      _id: 'sup_tomato_1',
      farmerId: 'usr_farmer_3',
      farmerName: 'Ganesh Shinde',
      fpoName: 'Shivneri Agro FPO',
      crop: 'Junnar Hybrid Tomato',
      variety: 'Abhinav 1057',
      quantity: 75,
      unit: 'Quintal',
      askingPricePerUnit: 2150,
      qualityGrade: 'Grade A (Export/Premium)',
      harvestDate: '2026-09-02',
      readyForPickup: true,
      location: {
        address: 'Narayangaon Belt, Junnar',
        district: 'Pune',
        state: 'Maharashtra',
        coordinates: { lat: 19.1214, lng: 73.9782 }
      },
      images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'],
      status: 'available'
    },
    {
      _id: 'sup_orange_1',
      farmerId: 'usr_farmer_2',
      farmerName: 'Sunita Jadhav',
      fpoName: 'Vidarbha Citrus Co-op',
      crop: 'Nagpur Mandarin Orange',
      variety: 'Ambia Bahar',
      quantity: 50,
      unit: 'Quintal',
      askingPricePerUnit: 4100,
      qualityGrade: 'Grade A (Export/Premium)',
      harvestDate: '2026-09-01',
      readyForPickup: true,
      location: {
        address: 'Katol Orchard Hub, Nagpur',
        district: 'Nagpur',
        state: 'Maharashtra',
        coordinates: { lat: 21.2721, lng: 78.5831 }
      },
      images: ['https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&auto=format&fit=crop&q=80'],
      status: 'available'
    }
  ],

  demands: [
    {
      _id: 'dem_jaipur_tomato',
      buyerId: 'usr_buyer_jaipur',
      buyerName: 'Jaipur Mega Agro Terminal (Jaipur, Rajasthan)',
      buyerType: 'bulk_buyer',
      crop: 'Tomato',
      variety: 'Desi Hybrid Premium',
      quantity: 200, // Quintals (20 Tonnes, matching Slide 3)
      unit: 'Quintal',
      qualityGrade: 'Grade A (Premium)',
      destination: {
        facilityName: 'Jaipur Agro Terminal Distribution Hub',
        address: 'Muhana Mandi Complex, Sanganer, Jaipur',
        district: 'Jaipur',
        state: 'Rajasthan',
        coordinates: { lat: 26.8289, lng: 75.7533 }
      },
      requiredDate: '2026-09-25',
      targetLandedPrice: 2100, // ₹21/kg
      status: 'open',
      notes: 'Direct farm aggregation for Rajasthan State Retail Network. Chittorgarh & Tonk FPO sourcing preferred.'
    },
    {
      _id: 'dem_jaipur_wheat',
      buyerId: 'usr_buyer_jaipur',
      buyerName: 'Jaipur Grain Processing Consortium',
      buyerType: 'bulk_buyer',
      crop: 'Wheat (Sharbati 10T)',
      variety: 'Sharbati Gold',
      quantity: 100, // 10 Tonnes (matching Slide 5)
      unit: 'Quintal',
      qualityGrade: 'Grade A (Premium)',
      destination: {
        facilityName: 'Jaipur Central Silo Depot',
        address: 'Jaipur Rural Road, Sanganer',
        district: 'Jaipur',
        state: 'Rajasthan',
        coordinates: { lat: 26.8289, lng: 75.7533 }
      },
      requiredDate: '2026-09-28',
      targetLandedPrice: 2850,
      status: 'open',
      notes: 'Direct FPO aggregation without arhtiya commission.'
    },
    {
      _id: 'dem_onion_bulk',
      buyerId: 'usr_buyer_1',
      buyerName: 'BigBasket Wholesale Hub (Bhiwandi)',
      buyerType: 'bulk_buyer',
      crop: 'Nashik Red Onion',
      variety: 'Garwa Kharif Late',
      quantity: 200, // Quintals (20 tonnes)
      unit: 'Quintal',
      qualityGrade: 'Grade A (Export/Premium)',
      destination: {
        facilityName: 'BigBasket Bhiwandi Central DC',
        address: 'Gala 102, Indian Corporation Logistics Park, Mankoli, Bhiwandi',
        district: 'Thane',
        state: 'Maharashtra',
        coordinates: { lat: 19.2965, lng: 73.0631 }
      },
      requiredDate: '2026-09-08',
      targetLandedPrice: 3250, // Max landed budget ₹/Q
      status: 'open',
      notes: 'Urgent procurement for Mumbai MMR retail network. Strict moisture < 12% and zero rot guarantee required.'
    },
    {
      _id: 'dem_tomato_bulk',
      buyerId: 'usr_buyer_1',
      buyerName: 'Reliance Retail Agri Depot',
      buyerType: 'bulk_buyer',
      crop: 'Junnar Hybrid Tomato',
      variety: 'Abhinav 1057',
      quantity: 70,
      unit: 'Quintal',
      qualityGrade: 'Grade A (Export/Premium)',
      destination: {
        facilityName: 'Reliance Fresh Ghansoli Depot',
        address: 'MIDC Industrial Area, Navi Mumbai',
        district: 'Thane',
        state: 'Maharashtra',
        coordinates: { lat: 19.1238, lng: 73.0033 }
      },
      requiredDate: '2026-09-06',
      targetLandedPrice: 2650,
      status: 'open',
      notes: 'Cold container transit mandatory. Firmness rating > 4.5.'
    },
    {
      _id: 'dem_orange_bulk',
      buyerId: 'usr_buyer_1',
      buyerName: 'Swiggy Instamart Dark Store Network',
      buyerType: 'bulk_buyer',
      crop: 'Nagpur Mandarin Orange',
      variety: 'Ambia Bahar',
      quantity: 45,
      unit: 'Quintal',
      qualityGrade: 'Grade A (Export/Premium)',
      destination: {
        facilityName: 'Thane West Central Hub',
        address: 'Wagle Estate, Thane',
        district: 'Thane',
        state: 'Maharashtra',
        coordinates: { lat: 19.1982, lng: 72.9485 }
      },
      requiredDate: '2026-09-09',
      targetLandedPrice: 4700,
      status: 'open',
      notes: 'Pre-graded table fruit with waxing preferred.'
    }
  ],

  logisticsResources: [
    {
      _id: 'veh_reefer_1',
      providerName: 'QuickAgri Cold Fleet Services',
      vehicleNumber: 'MH-15-EG-8291',
      vehicleType: 'Eicher Pro Reefer 6.5T (Cold Chain)',
      capacityQuintals: 75,
      hasColdChain: true,
      costPerKm: 32,
      currentLocation: {
        city: 'Nashik',
        coordinates: { lat: 19.9975, lng: 73.7898 }
      },
      status: 'available',
      driverName: 'Sanjay Pawar',
      driverPhone: '+91 97654 33109'
    },
    {
      _id: 'veh_heavy_1',
      providerName: 'Kisan Express Heavy Haulage',
      vehicleNumber: 'MH-12-RN-4402',
      vehicleType: 'Tata LPT 1613 (12 Tonne Crated)',
      capacityQuintals: 130,
      hasColdChain: false,
      costPerKm: 38,
      currentLocation: {
        city: 'Lasalgaon',
        coordinates: { lat: 20.1472, lng: 74.2257 }
      },
      status: 'available',
      driverName: 'Dilip Gaikwad',
      driverPhone: '+91 98229 01842'
    },
    {
      _id: 'veh_dost_1',
      providerName: 'Gramin Link Logistics',
      vehicleNumber: 'MH-14-BT-9104',
      vehicleType: 'Ashok Leyland Dost 2.5T (Multi-Pickup)',
      capacityQuintals: 30,
      hasColdChain: false,
      costPerKm: 20,
      currentLocation: {
        city: 'Niphad',
        coordinates: { lat: 20.0825, lng: 74.1086 }
      },
      status: 'available',
      driverName: 'Mahesh Kadam',
      driverPhone: '+91 94220 89174'
    }
  ],

  warehouses: [
    {
      _id: 'wh_lasalgaon',
      name: 'Lasalgaon Agro Pre-Cooling & Packhouse',
      type: 'Cold Storage & Packhouse',
      location: {
        address: 'Agri Logistics Zone, Lasalgaon',
        district: 'Nashik',
        coordinates: { lat: 20.1472, lng: 74.2257 }
      },
      totalCapacityQuintals: 5000,
      availableCapacityQuintals: 3400,
      storageCostPerQuintalDay: 35,
      supportedCommodities: ['Nashik Red Onion', 'Table Grapes', 'Pomegranate'],
      temperatureRange: '12°C to 18°C Controlled RH',
      qualityTestingFacility: true
    },
    {
      _id: 'wh_narayangaon',
      name: 'Narayangaon Tomato Consolidation Hub',
      type: 'Collection Hub',
      location: {
        address: 'Pune-Nashik Highway, Narayangaon',
        district: 'Pune',
        coordinates: { lat: 19.1214, lng: 73.9782 }
      },
      totalCapacityQuintals: 3000,
      availableCapacityQuintals: 2100,
      storageCostPerQuintalDay: 40,
      supportedCommodities: ['Junnar Hybrid Tomato', 'Capsicum', 'Cabbage'],
      temperatureRange: '8°C to 12°C Pre-cooling',
      qualityTestingFacility: true
    }
  ],

  consumerPools: [
    {
      _id: 'pool_powai_onion',
      poolTitle: 'Powai Green Collective - Grade A Lasalgaon Onions',
      crop: 'Nashik Red Onion',
      producerName: 'Sahyadri Farmers Producer Co.',
      minBatchTargetKg: 500,
      currentPledgedKg: 395,
      unitPriceInPool: 28, // ₹/kg
      retailMarketPrice: 42, // ₹/kg
      savingsPercent: 33.3,
      endsInHours: 18,
      distributionHub: 'Hiranandani Community Garden Gate 4, Powai, Mumbai',
      participantsCount: 48,
      status: 'active'
    },
    {
      _id: 'pool_kothrud_tomato',
      poolTitle: 'Kothrud Fresh Basket - Vine Ripened Junnar Tomatoes',
      crop: 'Junnar Hybrid Tomato',
      producerName: 'Shivneri Agro FPO',
      minBatchTargetKg: 400,
      currentPledgedKg: 340,
      unitPriceInPool: 24,
      retailMarketPrice: 38,
      savingsPercent: 36.8,
      endsInHours: 11,
      distributionHub: 'Yashwantrao Chavan Natyagruha Complex, Kothrud, Pune',
      participantsCount: 39,
      status: 'active'
    },
    {
      _id: 'pool_thane_oranges',
      poolTitle: 'Thane Citrus Drive - Sweet Ambia Nagpur Oranges',
      crop: 'Nagpur Mandarin Orange',
      producerName: 'Vidarbha Citrus Co-op',
      minBatchTargetKg: 300,
      currentPledgedKg: 280,
      unitPriceInPool: 48,
      retailMarketPrice: 75,
      savingsPercent: 36.0,
      endsInHours: 26,
      distributionHub: 'Upvan Lake Civic Center, Thane West',
      participantsCount: 32,
      status: 'active'
    }
  ],

  priceHistory: [
    {
      crop: 'Nashik Red Onion',
      mandiName: 'Lasalgaon APMC',
      district: 'Nashik',
      state: 'Maharashtra',
      minPrice: 2100,
      maxPrice: 2850,
      modalPrice: 2580,
      date: '2026-09-04',
      trendDirection: 'up',
      forecastNextWeekModal: 2690
    },
    {
      crop: 'Junnar Hybrid Tomato',
      mandiName: 'Narayangaon Sub-Market',
      district: 'Pune',
      state: 'Maharashtra',
      minPrice: 1800,
      maxPrice: 2400,
      modalPrice: 2120,
      date: '2026-09-04',
      trendDirection: 'down',
      forecastNextWeekModal: 2060
    },
    {
      crop: 'Nagpur Mandarin Orange',
      mandiName: 'Kalamna Mandi',
      district: 'Nagpur',
      state: 'Maharashtra',
      minPrice: 3600,
      maxPrice: 4600,
      modalPrice: 4150,
      date: '2026-09-04',
      trendDirection: 'up',
      forecastNextWeekModal: 4320
    }
  ],

  orders: [
    {
      _id: 'ord_demo_101',
      orderNumber: 'ORD-2026-KS-8891',
      crop: 'Nashik Red Onion',
      totalQuantityQuintals: 200,
      buyerName: 'BigBasket Wholesale Hub (Bhiwandi)',
      totalAmount: 638000,
      escrowStatus: 'funded',
      fulfilmentStatus: 'farm_collection_in_progress',
      currentMilestone: {
        step: 3,
        label: 'Batch Picked up from Niphad & Lasalgaon FPOs. Vehicle en-route to Bhiwandi DC.',
        updatedAt: '2026-09-04 19:30'
      },
      paymentBreakdown: {
        farmersPayout: 512000,
        logisticsPayout: 84000,
        hubStorageFee: 0,
        platformFee: 9570
      }
    }
  ]
};

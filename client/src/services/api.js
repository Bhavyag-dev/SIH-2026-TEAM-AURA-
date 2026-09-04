const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users`);
  return res.json();
}

export async function fetchSupplies(crop = '', farmerId = '') {
  const params = new URLSearchParams();
  if (crop) params.append('crop', crop);
  if (farmerId) params.append('farmerId', farmerId);
  const res = await fetch(`${API_BASE}/supply?${params.toString()}`);
  return res.json();
}

export async function createSupply(data) {
  const res = await fetch(`${API_BASE}/supply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteSupply(id) {
  const res = await fetch(`${API_BASE}/supply/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function fetchDemands() {
  const res = await fetch(`${API_BASE}/demand`);
  return res.json();
}

export async function createDemand(data) {
  const res = await fetch(`${API_BASE}/demand`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function runOptimizer(demandId = null, customDemand = null) {
  const res = await fetch(`${API_BASE}/optimizer/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ demandId, customDemand })
  });
  return res.json();
}

export async function confirmPlan(planId, demandId) {
  const res = await fetch(`${API_BASE}/optimizer/confirm-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planId, demandId })
  });
  return res.json();
}

export async function fetchOrders() {
  const res = await fetch(`${API_BASE}/orders`);
  return res.json();
}

export async function updateOrderStatus(orderId, status, milestoneStep, milestoneLabel) {
  const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, milestoneStep, milestoneLabel })
  });
  return res.json();
}

export async function fetchVehicles() {
  const res = await fetch(`${API_BASE}/logistics/vehicles`);
  return res.json();
}

export async function fetchWarehouses() {
  const res = await fetch(`${API_BASE}/logistics/warehouses`);
  return res.json();
}

export async function fetchConsumerPools() {
  const res = await fetch(`${API_BASE}/pools`);
  return res.json();
}

export async function pledgeToPool(poolId, pledgeKg) {
  const res = await fetch(`${API_BASE}/pools/${poolId}/pledge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pledgeKg })
  });
  return res.json();
}

export async function fetchMandiPrices() {
  const res = await fetch(`${API_BASE}/mandi/prices`);
  return res.json();
}

export async function fetchMacroAnalytics() {
  const res = await fetch(`${API_BASE}/analytics/macro`);
  return res.json();
}

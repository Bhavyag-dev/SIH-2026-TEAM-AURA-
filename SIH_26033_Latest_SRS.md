# Software Requirements Specification (SRS)

## Intelligent Agricultural Transaction & Fulfilment Coordination Platform

**Problem Statement ID:** SIH26033  
**Problem Statement:** Multiple intermediaries reduce farmers' earnings and increase consumer prices.  
**Organization:** Ministry of Consumer Affairs, Food & Public Distribution  
**Department:** Department of Consumer Affairs (DoCA)  
**Category:** Software  
**Theme:** Agriculture, FoodTech & Rural Development

---

## 1. Introduction

### 1.1 Purpose

This document specifies the requirements for a digital agricultural transaction and fulfilment coordination platform that helps farmers/FPOs reach buyers more efficiently by coordinating fragmented supply, demand, logistics, storage and transaction economics.

The platform is designed around the core idea:

> **Find the best economic path from farm to buyer, not just the nearest seller.**

Instead of attempting to eliminate every intermediary or rebuild the entire agricultural ecosystem, the platform reduces avoidable coordination costs and improves the execution of direct or shortened supply-chain transactions.

### 1.2 Problem Context

Agricultural supply chains involve fragmented producers, buyers, logistics providers, storage facilities and quality requirements. Existing mechanisms provide many individual capabilities, but direct transactions can still be difficult because quantity, quality, location, timing, transport, storage and pricing are not always coordinated end-to-end.

The system therefore focuses on the **coordination and economic-optimization layer** between supply and demand.

### 1.3 Objectives

The system aims to:

- Improve farmer net realization.
- Reduce buyer/consumer landed cost.
- Reduce unnecessary transportation, handling and storage.
- Reduce avoidable post-harvest losses.
- Improve utilization of available logistics and storage capacity.
- Make supply and demand matching more reliable.
- Provide transparent transaction economics.
- Support direct and aggregated farmer/FPO-to-buyer transactions.

### 1.4 Scope

The system will:

- Capture buyer demand for agricultural produce.
- Capture farmer/FPO supply information.
- Match demand with suitable supply.
- Combine supply from multiple farmers/FPOs when required.
- Evaluate storage and aggregation options.
- Optimize logistics, routing and fulfilment timing.
- Calculate farmer net realization and buyer landed cost.
- Compare baseline fulfilment with the recommended plan.
- Support transaction confirmation, tracking and settlement.
- Support aggregated consumer demand where individual orders can be pooled economically.
- Provide dashboards and analytics for platform administrators.

The MVP will focus on proving the **transaction optimization engine** before expanding to a complete marketplace ecosystem.

### 1.5 Intended Audience

- Developers
- Project mentors
- SIH evaluators
- Farmers/FPOs
- Bulk buyers
- Consumer-demand aggregators
- Logistics partners
- Warehouse/collection-hub operators
- Government/DoCA stakeholders

### 1.6 Definitions

| Term | Meaning |
|---|---|
| FPO | Farmer Producer Organization |
| SRS | Software Requirements Specification |
| VRP | Vehicle Routing Problem |
| API | Application Programming Interface |
| JWT | JSON Web Token |
| Landed Cost | Total cost paid by the buyer after procurement, fulfilment, logistics and applicable handling costs |
| Farmer Net Realization | Amount retained by the farmer/FPO after applicable fulfilment costs and deductions |
| Demand Pooling | Combining multiple geographically compatible consumer demands into an economically meaningful procurement requirement |
| Fulfilment Plan | Complete supply, aggregation, storage and logistics plan for satisfying a demand |
| Baseline Plan | Reference/conventional fulfilment configuration used to compare the optimized plan |

---

# 2. Overall Description

## 2.1 Product Perspective

The platform is a **mobile-first web/PWA system** with role-based portals for:

- Farmer/FPO
- Consumer
- Bulk Buyer
- Logistics Partner / Hub Operator
- Administrator

It is backed by:

- Node.js/Express API layer
- MongoDB data store
- Redis caching
- Python/FastAPI AI and optimization services

The system is intended to coordinate existing ecosystem participants rather than require ownership of farms, warehouses or transport fleets.

## 2.2 Primary Operating Model

The primary transaction is:

**Buyer Demand → Supply Matching → Supply Aggregation → Fulfilment Optimization → Economic Evaluation → Confirmation → Physical Fulfilment → Settlement**

A secondary consumer flow supports:

**Consumer Demand → Geographic Demand Pooling → Aggregated Procurement → Fulfilment → Local Distribution**

## 2.3 User Classes

### Farmer/FPO User
- Publish or update available produce.
- Specify quantity, quality, price and harvest readiness.
- Receive matched demand.
- Accept/reject proposed fulfilment plans.
- View expected net realization.
- Track collection and payment.

### Consumer
- Browse available produce where supported.
- Place individual demand.
- Participate in pooled demand.
- View order and delivery status.
- Request refunds/dispute resolution where applicable.

### Bulk Buyer
- Create structured demand.
- Specify quantity, quality, location, deadline and target/max price.
- Review matched supply.
- Review alternative fulfilment plans.
- Confirm a plan.
- Track fulfilment and settlement.

### Logistics Partner / Hub Operator
- Provide vehicle/capacity information.
- Receive assigned pickup/delivery batches.
- Update movement status.
- Manage collection/fulfilment events.

### Administrator
- Verify participants.
- Manage disputes.
- Monitor transactions and optimization outcomes.
- Manage reference data and system configuration.
- View aggregate performance analytics.

---

# 3. Operating Environment

## 3.1 Frontend

- React JS
- Responsive PWA
- Mobile-first interface
- Low-bandwidth friendly design
- Offline-first draft support for relevant farmer actions

## 3.2 Backend

- Node.js
- Express
- REST API

## 3.3 Database

- MongoDB
- MongoDB Atlas or self-hosted
- Redis for caching sessions/reference prices/frequently accessed data

## 3.4 AI / Optimization Services

- Python
- FastAPI
- Demand forecasting models
- OR-Tools-based optimization / VRP
- Rule and constraint processing

## 3.5 Hosting

- AWS / GCP / Azure
- CDN for static frontend assets

---

# 4. Functional Requirements

## 4.1 Farmer/FPO Module

**FR1.1:** Register/login using mobile OTP.

**FR1.2:** Create a supply listing containing:
- Crop/product
- Quantity
- Unit
- Asking price
- Quality grade
- Expected/actual harvest date
- Location
- Images where required

**FR1.3:** View matched buyer demand.

**FR1.4:** View proposed quantity allocation within a fulfilment plan.

**FR1.5:** Accept/reject a matched transaction.

**FR1.6:** View expected farmer net realization before confirmation.

**FR1.7:** View order, collection and payment status.

**FR1.8:** View demand/price trends where sufficient data is available.

## 4.2 Buyer Module

**FR2.1:** Register/login using mobile/email.

**FR2.2:** Create a demand request:
- Product
- Quantity
- Quality/grade
- Delivery location
- Required date/time window
- Target/max landed price
- Additional requirements

**FR2.3:** Receive suitable farmer/FPO matches.

**FR2.4:** Receive one or more complete fulfilment plans.

**FR2.5:** Compare fulfilment plans by:
- Buyer landed cost
- Farmer realization
- Logistics cost
- Expected wastage
- Fulfilment time
- Reliability/risk indicators

**FR2.6:** Accept or reject a proposed plan.

**FR2.7:** Track the transaction.

**FR2.8:** Rate transaction/partner performance and raise disputes.

## 4.3 Consumer Module

**FR3.1:** Browse supported produce.

**FR3.2:** Place retail orders.

**FR3.3:** Participate in geographic demand pooling where enabled.

**FR3.4:** View pooled-demand progress and expected fulfilment window.

**FR3.5:** Track delivery.

**FR3.6:** Raise disputes/refund requests.

### Consumer Delivery Principle

The MVP will avoid inefficient one-farmer-to-one-household fulfilment where possible.

Consumer demand may be geographically pooled and routed through suitable fulfilment/collection points before last-mile delivery.

## 4.4 Supply-Demand Matching Module

**FR4.1:** Match demand against suitable supply using:
- Product compatibility
- Quantity
- Quality
- Location
- Harvest readiness
- Availability date

**FR4.2:** Support multi-source fulfilment when one farmer/FPO cannot satisfy the complete demand.

**FR4.3:** Rank feasible supply combinations.

**FR4.4:** Provide the reason for a recommended match in understandable terms.

## 4.5 Aggregation Module

**FR5.1:** Combine compatible supply lots.

**FR5.2:** Determine whether aggregation is beneficial based on quantity, distance and fulfilment constraints.

**FR5.3:** Assign or recommend a suitable collection/aggregation point.

**FR5.4:** Track aggregated quantity against buyer demand.

## 4.6 Fulfilment Optimization Module

This is the core system capability.

**FR6.1:** Generate multiple feasible fulfilment configurations.

**FR6.2:** Evaluate:
- Farmer supply
- Quantity allocation
- Collection sequence
- Vehicle capacity
- Distance/time
- Storage requirement
- Handling cost
- Expected wastage
- Delivery deadline
- Buyer price constraints

**FR6.3:** Select the recommended complete fulfilment plan.

**FR6.4:** Support vehicle routing optimization using VRP-based methods.

**FR6.5:** Support “storage vs. no-storage” decision logic.

**FR6.6:** Recalculate the plan when major conditions change.

## 4.7 Economic Optimization Module

**FR7.1:** Calculate farmer net realization.

**FR7.2:** Calculate buyer landed cost.

**FR7.3:** Break down major transaction costs.

**FR7.4:** Compare baseline and optimized fulfilment.

**FR7.5:** Support multi-objective evaluation using:
- Farmer realization
- Buyer landed cost
- Logistics cost
- Expected wastage
- Fulfilment time
- Reliability/risk

**FR7.6:** Display the expected economic benefit before confirmation.

### Core Objective

The optimization engine should seek a feasible plan that:

**increases farmer realization while keeping buyer landed cost competitive, subject to logistics, quality, time and capacity constraints.**

The system must not assume that every intermediary cost is avoidable.

## 4.8 Demand Forecasting Module

**FR8.1:** Forecast crop-wise/region-wise demand using historical data where available.

**FR8.2:** Use time, region, product and market signals where data supports them.

**FR8.3:** Provide forecast confidence/uncertainty indicators.

**FR8.4:** Use forecasts to support planning, not to replace actual buyer demand.

## 4.9 Logistics Module

**FR9.1:** Register available vehicles and capacities.

**FR9.2:** Generate pickup/delivery batches.

**FR9.3:** Calculate route options using Maps API data.

**FR9.4:** Assign or recommend logistics resources.

**FR9.5:** Track:
- Scheduled
- Pickup started
- Collected
- In transit
- Delivered

**FR9.6:** Support contingency reassignment for vehicle delays/cancellations.

## 4.10 Storage / Hub Module

**FR10.1:** Register storage/collection hubs.

**FR10.2:** Store:
- Capacity
- Available capacity
- Location
- Storage cost
- Commodity suitability
- Perishability/cold-storage capability

**FR10.3:** Determine whether storage improves overall fulfilment economics.

**FR10.4:** Recommend suitable storage when required.

## 4.11 Trust & Risk Module

**FR11.1:** Verify farmers/FPOs, buyers and service providers where applicable.

**FR11.2:** Maintain transaction history and reliability scores.

**FR11.3:** Support buyer cancellation policies.

**FR11.4:** Support farmer/FPO cancellation policies.

**FR11.5:** Track quality-rejection and dispute events.

**FR11.6:** Support security deposit/advance logic for high-value or high-commitment transactions where enabled.

### Risk Allocation Principle

The system should allocate committed cancellation losses primarily to the party causing the loss, according to transparent pre-agreed rules.

## 4.12 Price Transparency Module

**FR12.1:** Show farmer sale price.

**FR12.2:** Show major fulfilment/handling/logistics costs.

**FR12.3:** Show buyer landed cost.

**FR12.4:** Show estimated savings versus the selected baseline.

**FR12.5:** Maintain an auditable transaction breakdown.

## 4.13 Payment & Settlement Module

**FR13.1:** Support payment through a suitable gateway such as Razorpay/UPI.

**FR13.2:** Record payment status.

**FR13.3:** Support transaction settlement records.

**FR13.4:** Support refund workflows where applicable.

**FR13.5:** Support distribution of payment records between relevant parties.

## 4.14 Notifications

**FR14.1:** Send notifications for:
- New demand
- New match
- Plan acceptance
- Pickup reminder
- Delivery status
- Payment
- Cancellation
- Dispute updates

**FR14.2:** Support SMS/OTP and optional messaging channels where integrated.

## 4.15 Admin Module

**FR15.1:** Verify participants.

**FR15.2:** Monitor transactions and fulfilment.

**FR15.3:** Review disputes and suspicious activity.

**FR15.4:** View region-wise and commodity-wise analytics.

**FR15.5:** Compare baseline vs optimized performance.

**FR15.6:** Manage reference data, rules and service-provider records.

---

# 5. Core System Workflow

```text
Buyer / Consumer Demand
          ↓
Demand Validation
          ↓
Supply Discovery
          ↓
Supply Matching
          ↓
Multi-FPO Aggregation
          ↓
Fulfilment Optimization
          ↓
Storage / No-Storage Decision
          ↓
Route & Vehicle Optimization
          ↓
Economic Evaluation
          ↓
Recommended Plan
          ↓
Buyer + FPO Confirmation
          ↓
Collection → Grading/Handling → Storage* → Delivery
          ↓
Payment & Settlement
          ↓
Performance / Savings Record
```

`* Storage is used only when the optimization logic determines that it is useful.`

---

# 6. AI & Optimization Approach

## 6.1 Demand Forecasting

Potential inputs:

- Historical platform demand
- Historical market/mandi prices
- Seasonality
- Region
- Crop/product
- Time trends
- Other validated signals

The forecasting component should produce:

- Expected demand
- Forecast range/confidence
- Regional demand trend

## 6.2 Supply Matching

A hybrid approach may combine:

- Deterministic filters
- Distance calculations
- Quantity constraints
- Quality constraints
- Readiness/availability constraints
- Ranking/scoring

## 6.3 Fulfilment Optimization

Use **OR-Tools / Vehicle Routing Problem (VRP)** techniques for route and resource allocation.

Optimization may consider:

- Vehicle capacity
- Pickup locations
- Delivery locations
- Delivery deadlines
- Travel distance/time
- Logistics cost
- Storage capacity
- Handling cost
- Expected wastage

## 6.4 Multi-Objective Economic Optimization

The engine should evaluate:

> **Farmer realization ↑**  
> **Buyer landed cost ↓**  
> **Wastage ↓**  
> **Fulfilment time ↓**  
> **Reliability ↑**

The exact objective weights should be configurable and validated using transaction simulations.

---

# 7. Trust, Cancellation & Exception Handling

## 7.1 Buyer Cancellation

Cancellation stages:

1. Before supply commitment
2. After supply commitment
3. After logistics commitment
4. After dispatch

Penalty increases with actual committed cost/risk.

Security deposit/advance may be used for high-value orders.

## 7.2 Farmer/FPO Cancellation

The system records reliability history and attempts:

- Re-match available supply
- Substitute another eligible FPO
- Recalculate fulfilment
- Notify buyer

## 7.3 Quality Rejection

Possible process:

**Delivery → quality check → accepted/rejected quantity → evidence → dispute workflow**

## 7.4 Logistics Failure

The system can attempt:

**reassign vehicle → recalculate route → update ETA → notify affected parties**

---

# 8. External Interfaces

## 8.1 Payment API

- Razorpay/UPI or suitable payment provider
- Payment status webhooks

## 8.2 OTP / Notification API

- SMS/OTP gateway
- Optional WhatsApp/SMS notification integration

## 8.3 Maps API

- Google Maps or Mapbox
- Distance matrix
- Route calculation
- Estimated travel time
- Geocoding where required

## 8.4 Agricultural Market Data

- Agmarknet / mandi price data where publicly available
- e-NAM-related data/API only where actual access is available

The system must not assume undocumented government APIs.

## 8.5 Future Network Integrations

Potential integrations may include:

- e-NAM
- ONDC
- FPO databases/networks
- Warehouse networks
- Logistics providers

These should be treated as integration opportunities subject to actual technical and policy access.

---

# 9. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Target responsive API performance under normal prototype load |
| Scalability | Modular services capable of horizontal scaling |
| Availability | Target 99.5% uptime for deployed production version |
| Security | JWT-based authentication, HTTPS, RBAC, encrypted sensitive data |
| Usability | Farmer-facing workflows should be simple and low-friction |
| Accessibility | Hindi and regional-language support should be supported progressively |
| Connectivity | Lightweight payloads and offline draft support for low-bandwidth environments |
| Reliability | Transaction and payment state changes should be consistent |
| Maintainability | Modular backend and separate AI/optimization services |
| Portability | PWA usable across modern Android/iOS browsers |

---

# 10. Data Model

The initial MongoDB collections are expected to include:

### users
- _id
- role
- name
- phone
- email
- location
- language
- verificationStatus

### farmers / fpos
- _id
- name
- region
- member information
- verification status

### supplyListings
- _id
- farmer/fpo ID
- crop
- quantity
- price
- quality
- location
- harvestDate
- availability
- images
- status

### demands
- _id
- buyer/consumer ID
- crop
- quantity
- quality
- destination
- requiredDate
- targetPrice
- status

### fulfilmentPlans
- _id
- demand ID
- selected supply sources
- quantity allocations
- hub/storage choice
- vehicles
- route
- estimated costs
- farmer realization
- buyer landed cost
- expected waste
- status

### logisticsResources
- _id
- provider
- vehicle
- capacity
- current/available area
- cost model
- availability

### warehouses
- _id
- name
- location
- capacity
- availableCapacity
- commodity suitability
- storageCost

### orders
- _id
- demand ID
- fulfilmentPlan ID
- status
- payment status
- settlement information

### priceHistory
- _id
- crop
- region
- market
- reference price
- date

### routes
- _id
- fulfilmentPlan ID
- stops
- optimizedSequence
- vehicle ID
- ETA
- status

### disputes
- _id
- order ID
- raisedBy
- reason
- evidence
- status
- resolution

### transactionMetrics
- _id
- order ID
- baselineCost
- optimizedCost
- farmerRealization
- buyerLandedCost
- logisticsCost
- wasteEstimate
- timeSaved
- savings

---

# 11. MVP Scope

The first MVP should prove the core hypothesis, not attempt nationwide deployment.

## MVP Focus

### Input
- One crop
- One pilot geography
- Multiple FPO/farmer sources
- Multiple buyer demands
- Limited logistics resources
- Limited warehouse/collection options

### Core Demo

**Demand → supply matching → aggregation → optimization → baseline comparison → recommended plan**

### MVP Output

Show:

- Selected farmers/FPOs
- Allocated quantities
- Selected vehicle(s)
- Route
- Storage decision
- Farmer realization
- Buyer landed cost
- Logistics cost
- Expected waste
- Baseline vs optimized comparison

### MVP Exclusions

The initial version should avoid:

- Full nationwide marketplace
- Building/owning physical logistics
- Building/owning warehouses
- Complex consumer last-mile infrastructure
- Unnecessary blockchain implementation
- Advanced IoT systems
- Full crop-insurance/credit products
- Large-scale autonomous quality grading

These can remain future extensions if justified.

---

# 12. Success Metrics

The prototype should measure:

### Economic
- Farmer realization improvement
- Buyer landed-cost reduction
- Logistics cost reduction

### Operational
- Fulfilment time reduction
- Vehicle utilization
- Aggregation efficiency
- Expected wastage reduction

### Reliability
- Match success rate
- Order fulfilment rate
- Cancellation rate
- Exception recovery time

The exact improvement percentages should be derived from validated transaction simulations or later pilot data, not invented for presentation.

---

# 13. Business / Revenue Model

### Primary Model

**Small transaction/coordination fee**, preferably charged on the buyer/business side.

The fee should apply when a transaction is successfully executed.

### Future Revenue Streams

- FPO/buyer SaaS plans
- Logistics coordination fees
- Enterprise analytics
- Institutional/government deployment

The platform should remain economically attractive to farmers and avoid making farmer participation expensive during early adoption.

---

# 14. Security Requirements

- JWT-based authentication
- Role-Based Access Control
- HTTPS
- Secure storage of sensitive personal information
- Payment data handled through compliant payment providers
- Audit logs for critical actions
- Access logging for administrative actions
- Validation of user input and uploaded data

---

# 15. Future Enhancements

Potential future capabilities:

- e-NAM / ONDC integration where technically and operationally feasible
- More crops and geographies
- Voice-based farmer interaction
- Regional-language expansion
- IoT-based cold-chain monitoring
- Quality-assessment assistance
- Crop insurance / credit integration
- Advanced predictive pricing
- More sophisticated risk prediction
- Shared logistics/storage capacity marketplace
- Automated contract and settlement workflows

---

# 16. Key Design Principles

1. **Coordinate rather than blindly eliminate intermediaries.**
2. **Optimize the complete transaction, not only one route or one component.**
3. **Optimize farmer realization and buyer landed cost together.**
4. **Use storage only when it improves the overall economics or reliability.**
5. **Keep the farmer interaction simple; hide operational complexity behind the platform.**
6. **Use existing ecosystem infrastructure and partners wherever practical.**
7. **Make all economic assumptions transparent and measurable.**
8. **Treat AI as a decision-support component, not as decoration.**
9. **Design for low-bandwidth and gradual adoption.**
10. **Validate every claimed benefit with measurable baseline comparisons.**

---

# 17. High-Level Architecture

```text
┌──────────────────────────────────────────────┐
│       React JS / PWA User Interfaces         │
│ Farmer | FPO | Buyer | Consumer | Admin      │
└───────────────────────┬──────────────────────┘
                        │
                   REST / HTTPS
                        │
┌───────────────────────▼──────────────────────┐
│          Node.js / Express Backend           │
│ Auth | Users | Demand | Supply | Orders      │
│ Payments | Notifications | Admin             │
└──────────────┬──────────────────────┬────────┘
               │                      │
               ▼                      ▼
        ┌──────────────┐      ┌─────────────────┐
        │   MongoDB    │      │      Redis      │
        │ Operational  │      │ Cache / Session │
        │    Data      │      │ / Reference     │
        └──────────────┘      └─────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│          Python / FastAPI Services            │
│                                              │
│ Demand Forecasting                           │
│ Supply Matching                              │
│ Fulfilment Optimization                      │
│ OR-Tools / VRP                               │
│ Economic Optimization                        │
└──────────────────────┬───────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
   Maps / Routing   Market Data   Payment APIs
```

---

# 18. MVP Validation Experiment

A core demonstration scenario should contain:

- 1 crop
- 1 buyer demand
- 4–5 FPO/farmer supply sources
- 2–3 vehicle options
- 1–2 storage/collection options

The system should compare:

### Baseline
A conventional/separately planned fulfilment approach.

### Optimized
The recommended supply + aggregation + storage + logistics plan.

The comparison should report:

**Farmer realization → Buyer landed cost → Logistics cost → Expected wastage → Fulfilment time**

All assumptions must be explicitly documented.

---

# 19. Final Product Definition

> **An intelligent agricultural transaction and fulfilment platform that converts buyer demand into an optimized farm-to-buyer plan by matching fragmented supply, aggregating compatible lots, selecting suitable storage and logistics, and balancing farmer net realization with buyer landed cost.**

The platform is intended to **coordinate existing agricultural ecosystem participants rather than replace the entire ecosystem**.

---

*This SRS is the working product specification for the SIH 2026 PS 26033 project and should be updated only when a deliberate product decision is made and agreed by the team.*

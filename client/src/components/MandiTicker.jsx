import React from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

export default function MandiTicker({ prices = [] }) {
  const defaultPrices = [
    { crop: 'Nashik Red Onion', mandiName: 'Lasalgaon APMC', modalPrice: 2580, trendDirection: 'up', forecastNextWeekModal: 2690, change: '+3.4%' },
    { crop: 'Junnar Hybrid Tomato', mandiName: 'Narayangaon Sub-Market', modalPrice: 2120, trendDirection: 'down', forecastNextWeekModal: 2060, change: '-1.8%' },
    { crop: 'Nagpur Mandarin Orange', mandiName: 'Kalamna Mandi', modalPrice: 4150, trendDirection: 'up', forecastNextWeekModal: 4320, change: '+5.1%' },
    { crop: 'Pimpalgaon Garlic', mandiName: 'Pimpalgaon Baswant', modalPrice: 8900, trendDirection: 'up', forecastNextWeekModal: 9200, change: '+2.9%' },
    { crop: 'Shimla Royal Apple', mandiName: 'Parwanoo Terminal', modalPrice: 7200, trendDirection: 'up', forecastNextWeekModal: 7450, change: '+3.8%' }
  ];

  const displayPrices = prices.length > 0 ? prices : defaultPrices;

  return (
    <div className="mandi-ticker-strip">
      <div className="ticker-label">
        <Sparkles size={14} className="sparkle-icon" />
        <span>AGMARKNET MANDI BENCHMARK</span>
      </div>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {displayPrices.concat(displayPrices).map((p, idx) => {
            const isUp = p.trendDirection === 'up';
            return (
              <div key={idx} className="ticker-item">
                <span className="ticker-crop">{p.crop}</span>
                <span className="ticker-mandi">({p.mandiName})</span>
                <span className="ticker-price">₹{p.modalPrice}/Q</span>
                <span className={`ticker-trend ${isUp ? 'trend-up' : 'trend-down'}`}>
                  {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {p.change || (isUp ? '+3.2%' : '-1.5%')}
                </span>
                <span className="ticker-forecast">7D Pred: ₹{p.forecastNextWeekModal}/Q</span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .mandi-ticker-strip {
          background: var(--bg-card);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          height: 36px;
          overflow: hidden;
          font-size: 0.76rem;
          color: var(--text-secondary);
        }

        .ticker-label {
          background: var(--primary-green-subtle);
          color: var(--primary-green-dark);
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          padding: 0 14px;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 6px;
          border-right: 1px solid var(--border-color);
          white-space: nowrap;
          z-index: 2;
        }

        .ticker-viewport {
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        .ticker-track {
          display: flex;
          gap: 32px;
          width: max-content;
          animation: marquee 35s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .ticker-crop {
          font-weight: 700;
          color: var(--text-primary);
        }

        .ticker-mandi {
          color: var(--text-muted);
          font-size: 0.72rem;
        }

        .ticker-price {
          font-weight: 700;
          color: var(--text-primary);
        }

        .ticker-trend {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          font-weight: 700;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .trend-up {
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
        }

        .trend-down {
          background: rgba(239, 68, 68, 0.12);
          color: #dc2626;
        }

        .ticker-forecast {
          color: var(--text-muted);
          font-size: 0.7rem;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border-color);
          padding: 1px 6px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

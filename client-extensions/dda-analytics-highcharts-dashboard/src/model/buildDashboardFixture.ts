import engagementChunk from '@/data/api-samples/engagement-chunk.json';
import filtersResponse from '@/data/api-samples/filters-response.json';
import kpisResponse from '@/data/api-samples/kpis-response.json';
import metaResponse from '@/data/api-samples/meta-response.json';
import passengerAirportChunk from '@/data/api-samples/passenger-airport-chunk.json';
import publicTransportChunk from '@/data/api-samples/public-transport-chunk.json';
import revenueByProductChunk from '@/data/api-samples/revenue-by-product-chunk.json';

type ApiEnvelope<T> = { success: boolean; data: T };

function unwrap<T>(res: ApiEnvelope<T>): T {
  if (!res.success) {
    throw new Error('Bundled API sample must use success: true');
  }
  return res.data;
}

type PassengerRow = { Year: string; Passengers: number };
type TransportRow = { TransportType: string; Rides: number };
type RevenueRow = {
  productId: string;
  productName: string;
  color: string;
  quarter: string;
  segment1: number;
  segment2: number;
  segment3: number;
};
type EngagementRow = { Month: string; StorefrontViews: number; Purchases: number };

const QUARTER_ORDER = ['Q1', 'Q2', 'Q3', 'Q4'] as const;

const PUBLIC_TRANSPORT_COLORS = ['#000044', '#00205c', '#004080', '#0082c8', '#00AEEF'] as const;

function passengerAirportFromChunk(res: ApiEnvelope<PassengerRow[]>) {
  const rows = unwrap(res);
  return {
    title: 'Number of passengers at Dubai International Airport',
    subtitle: 'From 2014 to 2024',
    unit: 'millions',
    categories: rows.map((r) => r.Year),
    series: [
      {
        name: 'Passengers',
        color: '#0055A4',
        data: rows.map((r) => r.Passengers),
      },
    ],
  };
}

function publicTransportFromChunk(res: ApiEnvelope<TransportRow[]>) {
  const rows = unwrap(res);
  return {
    title: 'Number of public transport rides in Dubai, UAE',
    subtitle: 'Year 2023, by Type',
    categories: rows.map((r) => r.TransportType),
    colors: rows.map((_, i) => PUBLIC_TRANSPORT_COLORS[i % PUBLIC_TRANSPORT_COLORS.length]),
    data: rows.map((r) => r.Rides),
  };
}

function revenueByProductFromChunk(res: ApiEnvelope<RevenueRow[]>) {
  const rows = unwrap(res);
  const byProduct = new Map<string, RevenueRow[]>();
  for (const row of rows) {
    const list = byProduct.get(row.productId);
    if (list) {
      list.push(row);
    } else {
      byProduct.set(row.productId, [row]);
    }
  }

  const products = [...byProduct.values()].map((list) => {
    const first = list[0];
    const sorted = [...list].sort(
      (a, b) =>
        QUARTER_ORDER.indexOf(a.quarter as (typeof QUARTER_ORDER)[number]) -
        QUARTER_ORDER.indexOf(b.quarter as (typeof QUARTER_ORDER)[number])
    );
    return {
      id: first.productId,
      name: first.productName,
      color: first.color,
      quarters: sorted.map((r) => [r.segment1, r.segment2, r.segment3]),
    };
  });

  return {
    title: 'Revenue by Product',
    subtitle: 'Quarterly revenue trends for each product category',
    categories: [...QUARTER_ORDER],
    products,
  };
}

function engagementFromChunk(res: ApiEnvelope<EngagementRow[]>) {
  const rows = unwrap(res);
  return {
    title: 'Views vs Purchases',
    subtitle: 'Monthly comparison of storefront views and purchase volumes',
    categories: rows.map((r) => r.Month),
    series: [
      {
        name: 'Storefront Views',
        color: '#0055A4',
        data: rows.map((r) => r.StorefrontViews),
      },
      {
        name: 'Purchases',
        color: '#00AEEF',
        data: rows.map((r) => r.Purchases),
      },
    ],
  };
}

export function buildDashboardFixture() {
  return {
    meta: unwrap(metaResponse),
    kpis: unwrap(kpisResponse),
    filters: unwrap(filtersResponse),
    charts: {
      passengerAirport: passengerAirportFromChunk(passengerAirportChunk),
      publicTransport: publicTransportFromChunk(publicTransportChunk),
      revenueByProduct: revenueByProductFromChunk(revenueByProductChunk),
      engagement: engagementFromChunk(engagementChunk),
    },
  } as const;
}

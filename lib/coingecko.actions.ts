'use server'

import qs from 'query-string'

const BASE_URL = process.env.COINGECKO_BASE_URL
const API_KEY = process.env.COINGECKO_API_KEY

if (!BASE_URL) throw new Error('Could not get base url')
if (!API_KEY) throw new Error('Could not get api key')

async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  )

  const response = await fetch(url, {
    headers: {
      'x-cg-api-key': API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  })

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}))

    throw new Error(
      `API Error: ${response.status}: ${errorBody.error || response.statusText} `,
    )
  }

  return response.json()
}
export async function fetchCoinDetails(coinId: string) {
  return fetcher<CoinDetailsData>(`/coins/${coinId}`, {
    dex_pair_format: 'symbol',
  })
}

export async function fetchOHLC(coinId: string, days: number) {
  return fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
    vs_currency: 'inr',
    days,
  })
}

export async function fetchTrending() {
  return fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300)
}
export async function fetchCategories() {
  return fetcher<Category[]>('/coins/categories')
}
export async function fetchCoinsMarkets(page: number, perPage: number) {
  return fetcher<CoinMarketData[]>('/coins/markets', {
    vs_currency: 'inr',
    order: 'market_cap_desc',
    per_page: perPage,
    page,
    sparkline: 'false',
    price_change_percentage: '24h',
  })
}

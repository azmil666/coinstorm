import React from 'react'
import { fetchCoinDetails, fetchOHLC } from '@/lib/coingecko.actions'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Converter from '@/components/Converter'
import CandleStickChart from '@/components/CandleStickChart'
import CoinHeader from '@/components/CoinHeader'

const Page = async ({ params }: NextPageProps) => {
  const { id } = await params

  let coinData: CoinDetailsData
  let coinOHLCData: OHLCData[]

  try {
    ;[coinData, coinOHLCData] = await Promise.all([
      fetchCoinDetails(id),
      fetchOHLC(id, 1),
    ])
  } catch (error) {
    console.error('Failed to load coin details:', error)
    return <div className='p-6'>Failed to load coin data.</div>
  }

  const platform = coinData.asset_platform_id
    ? coinData.detail_platforms?.[coinData.asset_platform_id]
    : null
  const network = platform?.geckoterminal_url.split('/')[3] || null
  const contractAddress = platform?.contract_address || null

  const coinDetails = [
    {
      label: 'Market Cap',
      value: formatCurrency(coinData.market_data.market_cap.inr, 2, 'INR'),
    },
    {
      label: 'Market Cap Rank',
      value: `# ${coinData.market_cap_rank}`,
    },
    {
      label: 'Total Volume',
      value: formatCurrency(coinData.market_data.total_volume.inr, 2, 'INR'),
    },
    {
      label: 'Website',
      value: '-',
      link: coinData.links.homepage[0],
      linkText: 'Homepage',
    },
    {
      label: 'Explorer',
      value: '-',
      link: coinData.links.blockchain_site[0],
      linkText: 'Explorer',
    },
    {
      label: 'Community',
      value: '-',
      link: coinData.links.subreddit_url,
      linkText: 'Community',
    },
  ]

  return (
    <main id='coin-details-page'>
      <section className='primary'>
        <CoinHeader
          name={coinData.name}
          image={coinData.image.large}
          livePrice={coinData.market_data.current_price.inr}
          livePriceChangePercentage24h={
            coinData.market_data.price_change_percentage_24h_in_currency.inr
          }
          priceChangePercentage30d={
            coinData.market_data.price_change_percentage_30d_in_currency.inr
          }
          priceChange24h={coinData.market_data.price_change_24h_in_currency.inr}
        />
        <div className='trend-card'>
          <div className='trend-header'>
            <h4>Price Trend</h4>
            <span className='text-sm text-gray-400'>Last 24 hours</span>
          </div>

          <CandleStickChart
            data={coinOHLCData}
            coinId={id}
            initialPeriod='daily'
            mode='historical'
          >
            <div />
          </CandleStickChart>
        </div>
      </section>

      <section className='secondary'>
        <Converter
          symbol={coinData.symbol}
          icon={coinData.image.small}
          priceList={coinData.market_data.current_price}
        />
        <div className='details'>
          <h4>Coin Details</h4>

          <ul className='details-grid'>
            {coinDetails.map(({ label, value, link, linkText }, index) => (
              <li key={index}>
                <p className={label.toLowerCase().replace(/\s+/g, '-')}>
                  {label}
                </p>

                {link ? (
                  <div className='link'>
                    <Link href={link} target='_blank'>
                      {linkText || label}
                    </Link>
                    <ArrowUpRight size={16} />
                  </div>
                ) : (
                  <p className='text-base font-medium'>{value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
export default Page

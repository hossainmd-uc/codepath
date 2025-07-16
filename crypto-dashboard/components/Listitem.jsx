import React from 'react'

const Listitem = ({data}) => {
  return (
    <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div>
              <div className="text-sm font-medium text-gray-900">{data.name}</div>
              <div className="text-sm text-gray-500">{data.symbol}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ${data.quote.USD.price.toFixed(2)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          ${data.quote.USD.volume_24h.toLocaleString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`text-sm font-medium ${
            data.quote.USD.percent_change_1h >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {data.quote.USD.percent_change_1h >= 0 ? '+' : ''}
            {data.quote.USD.percent_change_1h.toFixed(2)}%
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {data.max_supply ? data.max_supply.toLocaleString() : 'N/A'}
        </td>
    </tr>
  )
}

export default Listitem
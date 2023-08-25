import { MouseEventHandler } from 'react'
import { BsClockHistory, BsTrash3 } from 'react-icons/bs'
import classNames from 'classnames'

import Widget from './Widget'

type HistoryProps = {
  marginTop: boolean
  history: {
    id: number,
    name: string,
    city: string,
    country: string,
  }[]
  handleDeleteHistory: (id: number) => MouseEventHandler<HTMLButtonElement> 
  handleRefetchHistory: (city: string, country: string) => MouseEventHandler<HTMLDivElement>
}

const History: React.FC<HistoryProps> = ({
  marginTop,
  history,
  handleDeleteHistory,
  handleRefetchHistory,
}) => {
  return (
    <Widget
      icon={<BsClockHistory />}
      className={classNames({ 'mt-4': marginTop })}
      title='HISTORY'
    >
      {history.length === 0 && <div className='py-4'>History not found</div>}

      {history.map((item, index) => {
        const itemDate = new Date(item.id)
        let itemHour = itemDate.getHours()
        let amPm = 'AM'

        if(itemHour > 12 ) {
          itemHour -= 12
          amPm = 'PM'
        }

        const itemDateString = `${itemHour}:${itemDate.getMinutes()}:${itemDate.getMinutes()} ${amPm}`

        return (
          <div
            key={item.id}
            className='flex justify-between border-b border-white/[.2] last:border-b-0 py-2 cursor-pointer'
            onClick={handleRefetchHistory(item.city, item.country)}
          >
            <div className='py-2'>{index + 1}. {item.name}, {item.country}</div>

            <div className='flex items-center'>
              <div className='mr-3'>{itemDateString}</div>

              <button
                className='bg-white/[.1] h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/[.2]'
                onClick={handleDeleteHistory(item.id)}
              >
                <BsTrash3 />
              </button>
            </div>
          </div>
        )
      })}
    </Widget>
  )
}

export default History

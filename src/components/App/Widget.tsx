import { PropsWithChildren, ReactNode } from 'react'
import classNames from 'classnames'

type WidgetProps = PropsWithChildren<{
  className?: string
  icon?: ReactNode
  title: string
}>

const Widget: React.FC<WidgetProps> = ({
  className,
  icon,
  title,
  children,
}) => {
  return (
    <div
      className={classNames(
        'rounded-widget bg-black/[.4] backdrop-blur-md basis-3/6',
        className,
      )}
    >
      <div className='flex flex-col px-4 h-full'>
        <div className='flex items-center text-white/[.5] border-b border-white/[.2]'>
          <div className='relative inline-flex items-center text-xs mr-2 top-1'>{icon}</div>
          <div className='leading-10 text-xs pt-2 inline-block font-medium'>{title}</div>
        </div>

        <div className='flex items-center justify-center grow'>
          <div className='w-full'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Widget


import { classNames } from '../lib/cssTools'

const Tag = ({ children, backgroundColor, color, className}) => {
  return (
    <div className={classNames('py-1 px-2 rounded-full', className)} style={{color, backgroundColor}}>{children}</div>
  )
}

export default Tag
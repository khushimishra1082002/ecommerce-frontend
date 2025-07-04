import React from 'react'

const ErrorMessagess = ({props}) => {
  return (
    <>
      <div className='font-body text-sm text-orange-600'>
        {props.children}
      </div>
    </>
  )
}

export default ErrorMessagess

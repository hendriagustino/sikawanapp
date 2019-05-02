import React from 'react'

export default function index({show}) {
  return (
    <div className="loader" style={{
      visibility: show ? 'visible' : 'hidden',
      opacity: show ? '1' : '0'
    }}>
      <div className="spinner">
      </div>
    </div>
  )
}

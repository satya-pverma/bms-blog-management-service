'use client'

import React, { useEffect, useState } from 'react'

type Props = {
  timestamp: number
}

const LocalDateTime: React.FC<Props> = ({ timestamp }) => {
  const [formatted, setFormatted] = useState('')

  useEffect(() => {
    const date = new Date(timestamp)
    const value = `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    setFormatted(value)
  }, [timestamp])

  return <span>{formatted}</span>
}

export default LocalDateTime

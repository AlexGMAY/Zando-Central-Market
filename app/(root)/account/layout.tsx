import React from 'react'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex-1'>
      <div>{children}</div>
    </div>
  )
}

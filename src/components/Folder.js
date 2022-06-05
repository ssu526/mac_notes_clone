import React from 'react'

export const Folder = ({folder}) => {
  return (
      <div className="folder" data-id={folder.id}>{folder.name}</div>
  )
}

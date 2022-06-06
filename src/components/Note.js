export const Note = ({note}) => {
  const firstLineBreakIndex = note.body.indexOf("\n");

  let title = firstLineBreakIndex === -1 ? note.body.substring(0, 15) : note.body.substring(0, firstLineBreakIndex);
  let preview = firstLineBreakIndex === -1 ? "": note.body.substring(firstLineBreakIndex)

  return (
    <div className='note-snippet'>
          <div className="note-title-container">
            {note.passwordProtected===true ? <i className="fa-solid fa-lock"></i> : <i></i>}
            <p className='note-title'>
              {title.length>15 ? title.substring(0,15)+"..." : title}
            </p>
          </div>
          <p className='note-preview'>{preview.length>15 ? preview.substring(0,15)+"..." : preview}</p>
    </div>
  )
}

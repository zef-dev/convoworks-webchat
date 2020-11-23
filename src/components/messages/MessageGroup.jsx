import React, { useEffect } from 'react'
import Message from './Message'

function MessageGroup(props) {
  const handleResponses = (items) => {
    return items.map((item, index) => {
      return <Message type={'response'} text={item} key={index} timeout={600} scrollArea={props.scrollArea} scrollAnchor={props.scrollAnchor} />
    })
  }

  return (
    <React.Fragment>
      <Message type={''} text={props.text} scrollArea={props.scrollArea} scrollAnchor={props.scrollAnchor} />
      {handleResponses(props.text_responses)}
    </React.Fragment>
  )
}

export default MessageGroup

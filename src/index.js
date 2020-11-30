import React from 'react'
import ConvoChat from './components/ConvoChat'

export const ConvoChatComponent = (props) => {
	return <ConvoChat serviceId={props.serviceId} variant={props.variant} isLaunch={props.isLaunch} />
}

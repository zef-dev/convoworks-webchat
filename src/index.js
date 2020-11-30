import React from 'react'
import Chat from './components/Chat'

export default function ConvoworksWebchat(props){
	return <Chat apiUrl={props.apiUrl} serviceId={props.serviceId} variant={props.variant} isLaunch={props.isLaunch} />
}

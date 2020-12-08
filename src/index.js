import React from 'react'
import Chat from './components/Chat'

export default function ConvoworksWebchat(props){
	return <Chat title={props.title} apiUrl={props.apiUrl} serviceId={props.serviceId} variant={props.variant} />
}

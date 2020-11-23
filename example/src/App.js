import React from 'react'

import 'convo-chat/dist/index.css'
import { ConvoChatComponent } from 'convo-chat'

const App = () => {
  return <ConvoChatComponent serviceId='servis' variant='b' isLaunch={false} />
}

export default App

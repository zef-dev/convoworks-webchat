import React from 'react'
import { useState, useEffect } from 'react'

function Message(props) {
	const [visible, setVisible] = useState(false);

	//Finds y value of given object
	function findPos(obj) {
		var curtop = 0;
		if (obj.offsetParent) {
			do {
				curtop += obj.offsetTop;
			} while ((obj = obj.offsetParent));
			return [curtop];
		}
	}

	// scroll to bottom of the chatbox when a message is sent
	function handleScroll() {
		props.scrollArea.current.scroll(0, findPos(props.scrollAnchor.current));
	}

	useEffect(() => {
		if (props.timeout) {
			setTimeout(() => {
				setVisible(true);
			}, [props.timeout])
		} else {
			setVisible(true)
		}
	}, [props]);

	useEffect(() => {
		handleScroll();
	}, [visible])

	if (visible) {
		return (
			<div className={props.type === 'response' ? 'message message--response' : 'message message--user'}>
				<div className="message__inner">{props.text}</div>
			</div>
		)
	} else {
		return null
	}
}

export default Message

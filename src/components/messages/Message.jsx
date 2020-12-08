import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { styleVars } from "../styles";

const MessageBlob = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
	overflow: hidden;
	font-size: 1em;
	line-height: 1.6;

	&:after {
		content: "";
		display: block;
		height: 0.625rem;
	}

	> div {
		border: 1px solid ${styleVars.color_primary};
		padding: 0.5rem 1rem;
		padding-bottom: 0.75rem;
		border-radius: 0.875rem;
	}
`;

const MessageBlobResponse = styled(MessageBlob)`
	justify-content: flex-start;
	text-align: left;
	color: ${styleVars.color_black};

	> div {
		background: ${styleVars.color_white};
		border-bottom-left-radius: 0;
		margin-right: auto;
	}
`;

const MessageBlobUser = styled(MessageBlob)`
	justify-content: flex-end;
	text-align: right;
	color: ${styleVars.color_white};

	> div {
		background: ${styleVars.color_primary};
		border-bottom-right-radius: 0;
		margin-left: auto;
		
		&:empty {
			display: none;
		}
	}
`;

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
			}, [props.timeout]);
		} else {
			setVisible(true);
		}
	}, [props]);

	useEffect(() => {
		handleScroll();
	}, [visible]);

	if (visible) {
		return (
			<React.Fragment>
				{props.type === "response" ? (
					<MessageBlobResponse className="chat-message chat-message--response">
						<div className="chat-message__inner">{props.text}</div>
					</MessageBlobResponse>
				) : (
					<MessageBlobUser className="chat-message chat-message--inner">
						<div className="chat-message__inner">{props.text}</div>
					</MessageBlobUser>
				)}
			</React.Fragment>
		);
	} else {
		return null;
	}
}

export default Message;

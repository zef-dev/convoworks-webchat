import React from "react";
import "./convo_chat.scss";
import { useState, useRef } from "react";
import axios from "axios";
import MessageGroup from "./messages/MessageGroup";
import IconSend from "../assets/icons/IconSend";
import { useEffect } from "react";

const ConvoChat = (props) => {
	//State params
	const [message, setMessage] = useState("");
	const [messageGroups, setMessageGroups] = useState([]);
	const [chatVisible, setChatVisible] = useState(true);
	const [deviceId, setDeviceId] = useState(null);

	// Props 
	const serviceId = props.serviceId;
	const variant = props.variant;
	const isLaunch = props.isLaunch;

	//Refs
	const mainInput = useRef(null);
	const scrollArea = useRef(null);
	const scrollAnchor = useRef(null);

	//Api Routes
	const convoPublicApiBaseUrl = `http://localhost:9090/rest_public/convo/v1`;

	useEffect(() => {
		setDeviceId('device');
	}, [])

	// handle message submit 
	function sendMessage(text) {
		if (!variant) {
			variant = "develop";
		}

		// request variables
		const url = convoPublicApiBaseUrl + "/service-run/webchat/" + variant + "/" + serviceId;
		const data = { device_id: deviceId, text: text, lunch: isLaunch };

		// post request 
		axios({ method: "post", url: url, data: data })
			.then((res) => {
				setMessageGroups([
					...messageGroups,
					{
						text: message,
						text_responses: res.data.text_responses,
					},
				]);
				setMessage(null);
				mainInput.current.value = "";
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="convo-chat">
			<header
				class="convo-chat__header"
				onClick={() => {
					setChatVisible(!chatVisible);
				}}
			>
				Chat
			</header>
			{chatVisible && (
				<React.Fragment>
					<div className="convo-chat__body" ref={scrollArea}>
						{messageGroups.map((item, index) => {
							return (
								<MessageGroup
									key={index}
									text={item.text}
									text_responses={item.text_responses}
									scrollArea={scrollArea}
									scrollAnchor={scrollAnchor}
								/>
							);
						})}
						<div
							className="convo-chat__anchor"
							ref={scrollAnchor}
						/>
					</div>
					<form
						className="convo-chat__form"
						onSubmit={(e) => {
							e.preventDefault();
							message &&
								sendMessage(
									message
								);
						}}
					>
						<input
							ref={mainInput}
							type="text"
							defaultValue={""}
							placeholder="Type a message"
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button type="submit">
							<IconSend />
						</button>
					</form>
				</React.Fragment>
			)}
		</div>
	);
};

export default ConvoChat;

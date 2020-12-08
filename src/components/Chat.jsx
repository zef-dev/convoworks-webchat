import React from "react";
import { useState, useRef } from "react";
import axios from "axios";
import MessageGroup from "./messages/MessageGroup";
import { IconRefresh, IconSend } from "../assets/icons/Icons";
import { useEffect } from "react";
import styled from "styled-components";
import { styleVars } from "./styles";

const Wrapper = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	height: 100%;
	width: 100%;
	margin: auto;
	background: ${styleVars.color_white};
	box-sizing: border-box;

	* {
		box-sizing: border-box;
	}

	button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background: none;
		outline: none;
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
	}
`;

const Header = styled.header`
	height: 3.125rem;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${styleVars.color_primary};
	padding: ${styleVars.input_padding};
	color: ${styleVars.color_white};
	font-size: 0.875rem;
`;

const HeaderActions = styled.div`
	display: flex;
	align-items: center;

	button {
		padding: 0.35rem;
		margin-left: 0.625rem;
		color: ${styleVars.color_white};

		svg {
			stroke: ${styleVars.color_white};
		}
	}
`;

const Body = styled.div`
	height: 22rem;
	width: 100%;
	border: ${styleVars.border};
	border-bottom: none;
	padding: 1rem 1.25rem;
	overflow: hidden;
	overflow-y: scroll;
	scroll-behavior: smooth;
`;

const Anchor = styled.div`
	padding-bottom: 0.625rem;
`;

const Form = styled.form`
	width: 100%;
	border: ${styleVars.border};
	border-top: ${styleVars.border};
	display: flex;
	align-items: center;
`;

const FormInput = styled.input`
	text-align: left;
	width: 100%;
	padding: 0.875rem 1.25rem;
	border: none;
	line-height: 1.6;
	border-top: none;
	height: 3.125rem;
`;

const FormButton = styled.button`
	width: 2rem;
	height: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${styleVars.color_primary};
	border: none;
	outline: none;
	border-radius: 50%;
	transition: ${styleVars.transition};

	&:hover {
		cursor: pointer;
		opacity: 0.75;
	}

	svg {
		filter: brightness(0) invert(1);
		width: 1rem;
	}
`;

const Chat = (props) => {
	//State params
	const [message, setMessage] = useState("");
	const [messageGroups, setMessageGroups] = useState([]);
	const [chatVisible, setChatVisible] = useState(true);
	const [deviceId, setDeviceId] = useState(null);

	// Props
	const serviceId = props.serviceId;
	const variant = props.variant;

	//Refs
	const mainInput = useRef(null);
	const scrollArea = useRef(null);
	const scrollAnchor = useRef(null);

	//Api Routes
	const convoPublicApiBaseUrl = props.apiUrl;

	useEffect(() => {
		setDeviceId(Math.random().toString(36).substring(7));
	}, []);

	useEffect(() => {
		sendMessage('');
	}, []);

	// handle message submit
	function sendMessage(text) {
		if (!variant) {
			variant = "develop";
		}

		// request variables
		const url =
			convoPublicApiBaseUrl +
			"/service-run/convo_chat/" +
			variant +
			"/" +
			serviceId;
		const data = { device_id: deviceId, text: text, lunch: true };

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
		<Wrapper className="convo-chat">
			<Header
				className="convo-chat__header"
			>
				<span>{props.title ? props.title : 'Title'}</span>
				<HeaderActions>
					<button onClick={() => {
						setDeviceId(Math.random().toString(36).substring(7));
						setMessageGroups([]);
						setMessage("");
					}}>
						<IconRefresh />
					</button>
					<button
						onClick={() => {
							setChatVisible(!chatVisible);
						}}
					>_</button>
				</HeaderActions>
			</Header>
			{chatVisible && (
				<React.Fragment>
					<Body className="convo-chat__body" ref={scrollArea}>
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
						<Anchor
							className="convo-chat__anchor"
							ref={scrollAnchor}
						/>
					</Body>
					<Form
						className="convo-chat__form"
						onSubmit={(e) => {
							e.preventDefault();
							message && sendMessage(message);
						}}
					>
						<FormInput
							ref={mainInput}
							type="text"
							defaultValue={""}
							placeholder="Type a message"
							onChange={(e) => {
								console.log(e);
								setMessage(e.target.value);
							}}
						/>
						<FormButton type="submit">
							<IconSend />
						</FormButton>
					</Form>
				</React.Fragment>
			)}
		</Wrapper>
	);
};

export default Chat;

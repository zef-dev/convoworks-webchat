import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const styleVars = {
  color_primary: "#2f74ea",
  color_secondary: "red",
  color_white: "#fff",
  color_black: "#000",
  text_color: "#fff",
  input_padding: "0.875rem 1.25rem",
  border: "1px solid rgba(#000, 0.1)",
  transition: "all 220ms ease-in-out"
};

let _ = t => t,
    _t,
    _t2,
    _t3;
const MessageBlob = styled.div(_t || (_t = _`
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
	overflow: hidden;
	font-size: 0.875rem;
	line-height: 1.6;

	&:after {
		content: "";
		display: block;
		height: 0.625rem;
	}

	> div {
		border: 1px solid ${0};
		padding: 0.5rem 1rem;
		padding-bottom: 0.75rem;
		border-radius: 0.875rem;
	}
`), styleVars.color_primary);
const MessageBlobResponse = styled(MessageBlob)(_t2 || (_t2 = _`
	justify-content: flex-start;
	text-align: left;
	color: ${0};

	> div {
		background: ${0};
		border-bottom-left-radius: 0;
		margin-right: auto;
	}
`), styleVars.color_black, styleVars.color_white);
const MessageBlobUser = styled(MessageBlob)(_t3 || (_t3 = _`
	justify-content: flex-end;
	text-align: right;
	color: ${0};

	> div {
		background: ${0};
		border-bottom-right-radius: 0;
		margin-left: auto;
	}
`), styleVars.color_white, styleVars.color_primary);

function Message(props) {
  const [visible, setVisible] = useState(false);

  function findPos(obj) {
    var curtop = 0;

    if (obj.offsetParent) {
      do {
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);

      return [curtop];
    }
  }

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
    return /*#__PURE__*/React.createElement(React.Fragment, null, props.type === "response" ? /*#__PURE__*/React.createElement(MessageBlobResponse, {
      className: "chat-message chat-message--response"
    }, /*#__PURE__*/React.createElement("div", {
      className: "chat-message__inner"
    }, props.text)) : /*#__PURE__*/React.createElement(MessageBlobUser, {
      className: "chat-message chat-message--inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "chat-message__inner"
    }, props.text)));
  } else {
    return null;
  }
}

function MessageGroup(props) {
  const handleResponses = items => {
    return items.map((item, index) => {
      return /*#__PURE__*/React.createElement(Message, {
        type: 'response',
        text: item,
        key: index,
        timeout: 600,
        scrollArea: props.scrollArea,
        scrollAnchor: props.scrollAnchor
      });
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Message, {
    type: '',
    text: props.text,
    scrollArea: props.scrollArea,
    scrollAnchor: props.scrollAnchor
  }), handleResponses(props.text_responses));
}

let _$1 = t => t,
    _t$1;
const Icon = styled.div(_t$1 || (_t$1 = _$1`
	display: flex;
	justify-content: center;
	align-items: center;
`));

function IconSend() {
  return /*#__PURE__*/React.createElement(Icon, {
    className: "convo-chat__icon"
  }, /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "feather feather-send"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "2",
    x2: "11",
    y2: "13"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "22 2 15 22 11 13 2 9 22 2"
  })));
}

let _$2 = t => t,
    _t$2,
    _t2$1,
    _t3$1,
    _t4,
    _t5,
    _t6,
    _t7;
const Wrapper = styled.div(_t$2 || (_t$2 = _$2`
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	height: 100%;
	width: 18.75rem;
	margin: auto;
	background: ${0};
`), styleVars.color_white);
const Header = styled.header(_t2$1 || (_t2$1 = _$2`
	height: 3rem;
	width: 100%;
	display: flex;
	align-items: center;
	background: ${0};
	padding: ${0};
	color: ${0};
	cursor: pointer;
	font-size: 0.875rem;
`), styleVars.color_primary, styleVars.input_padding, styleVars.color_white);
const Body = styled.div(_t3$1 || (_t3$1 = _$2`
	height: 22rem;
	width: 100%;
	border: ${0};
	border-bottom: none;
	padding: 1rem 1.25rem;
	overflow: hidden;
	overflow-y: scroll;
	scroll-behavior: smooth;
`), styleVars.border);
const Anchor = styled.div(_t4 || (_t4 = _$2`
	padding-bottom: 0.625rem;
`));
const Form = styled.form(_t5 || (_t5 = _$2`
	width: 100%;
	border: ${0};
	border-top: ${0};
	padding: 0 0.625rem;
	padding-left: 1.25rem;
	display: flex;
	align-items: center;
`), styleVars.border, styleVars.border);
const FormInput = styled.input(_t6 || (_t6 = _$2`
	text-align: left;
	width: 100%;
	padding: 0.875rem 0;
	border: none;
	line-height: 1.6;
	border-top: none;
`));
const FormButton = styled.button(_t7 || (_t7 = _$2`
	width: 2rem;
	height: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${0};
	border: none;
	outline: none;
	border-radius: 50%;
	transition: ${0};

	&:hover {
		cursor: pointer;
		opacity: 0.75;
	}

	svg {
		filter: brightness(0) invert(1);
		width: 1rem;
	}
`), styleVars.color_primary, styleVars.transition);

const ConvoChat = props => {
  const [message, setMessage] = useState("");
  const [messageGroups, setMessageGroups] = useState([]);
  const [chatVisible, setChatVisible] = useState(true);
  const [deviceId, setDeviceId] = useState(null);
  const serviceId = props.serviceId;
  const variant = props.variant;
  const isLaunch = props.isLaunch;
  const mainInput = useRef(null);
  const scrollArea = useRef(null);
  const scrollAnchor = useRef(null);
  const convoPublicApiBaseUrl = `http://localhost:9090/rest_public/convo/v1`;
  useEffect(() => {
    setDeviceId("device");
  }, []);

  function sendMessage(text) {
    if (!variant) {
      variant = "develop";
    }

    const url = convoPublicApiBaseUrl + "/service-run/webchat/" + variant + "/" + serviceId;
    const data = {
      device_id: deviceId,
      text: text,
      lunch: isLaunch
    };
    axios({
      method: "post",
      url: url,
      data: data
    }).then(res => {
      setMessageGroups([...messageGroups, {
        text: message,
        text_responses: res.data.text_responses
      }]);
      setMessage(null);
      mainInput.current.value = "";
    }).catch(err => console.log(err));
  }

  return /*#__PURE__*/React.createElement(Wrapper, {
    className: "convo-chat"
  }, /*#__PURE__*/React.createElement(Header, {
    className: "convo-chat__header",
    onClick: () => {
      setChatVisible(!chatVisible);
    }
  }, "Chat"), chatVisible && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Body, {
    className: "convo-chat__body",
    ref: scrollArea
  }, messageGroups.map((item, index) => {
    return /*#__PURE__*/React.createElement(MessageGroup, {
      key: index,
      text: item.text,
      text_responses: item.text_responses,
      scrollArea: scrollArea,
      scrollAnchor: scrollAnchor
    });
  }), /*#__PURE__*/React.createElement(Anchor, {
    className: "convo-chat__anchor",
    ref: scrollAnchor
  })), /*#__PURE__*/React.createElement(Form, {
    className: "convo-chat__form",
    onSubmit: e => {
      e.preventDefault();
      message && sendMessage(message);
    }
  }, /*#__PURE__*/React.createElement(FormInput, {
    ref: mainInput,
    type: "text",
    defaultValue: "",
    placeholder: "Type a message",
    onChange: e => {
      console.log(e);
      setMessage(e.target.value);
    }
  }), /*#__PURE__*/React.createElement(FormButton, {
    type: "submit"
  }, /*#__PURE__*/React.createElement(IconSend, null)))));
};

const ConvoChatComponent = props => {
  return /*#__PURE__*/React.createElement(ConvoChat, {
    serviceId: props.serviceId,
    variant: props.variant,
    isLaunch: props.isLaunch
  });
};

export { ConvoChatComponent };
//# sourceMappingURL=index.modern.js.map

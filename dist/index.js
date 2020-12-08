function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var axios = _interopDefault(require('axios'));
var styled = _interopDefault(require('styled-components'));

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

var styleVars = {
  color_primary: "#2f74ea",
  color_secondary: "red",
  color_white: "#fff",
  color_black: "#000",
  text_color: "#fff",
  input_padding: "0.875rem 1.25rem",
  border: "1px solid rgba(0,0,0, 0.1)",
  transition: "all 220ms ease-in-out"
};

function _templateObject3() {
  var data = _taggedTemplateLiteralLoose(["\n\tjustify-content: flex-end;\n\ttext-align: right;\n\tcolor: ", ";\n\n\t> div {\n\t\tbackground: ", ";\n\t\tborder-bottom-right-radius: 0;\n\t\tmargin-left: auto;\n\t\t\n\t\t&:empty {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteralLoose(["\n\tjustify-content: flex-start;\n\ttext-align: left;\n\tcolor: ", ";\n\n\t> div {\n\t\tbackground: ", ";\n\t\tborder-bottom-left-radius: 0;\n\t\tmargin-right: auto;\n\t}\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: flex;\n\tflex-direction: column;\n\twidth: 100%;\n\tposition: relative;\n\toverflow: hidden;\n\tfont-size: 0.875rem;\n\tline-height: 1.6;\n\n\t&:after {\n\t\tcontent: \"\";\n\t\tdisplay: block;\n\t\theight: 0.625rem;\n\t}\n\n\t> div {\n\t\tborder: 1px solid ", ";\n\t\tpadding: 0.5rem 1rem;\n\t\tpadding-bottom: 0.75rem;\n\t\tborder-radius: 0.875rem;\n\t}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var MessageBlob = styled.div(_templateObject(), styleVars.color_primary);
var MessageBlobResponse = styled(MessageBlob)(_templateObject2(), styleVars.color_black, styleVars.color_white);
var MessageBlobUser = styled(MessageBlob)(_templateObject3(), styleVars.color_white, styleVars.color_primary);

function Message(props) {
  var _useState = React.useState(false),
      visible = _useState[0],
      setVisible = _useState[1];

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

  React.useEffect(function () {
    if (props.timeout) {
      setTimeout(function () {
        setVisible(true);
      }, [props.timeout]);
    } else {
      setVisible(true);
    }
  }, [props]);
  React.useEffect(function () {
    handleScroll();
  }, [visible]);

  if (visible) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, props.type === "response" ? /*#__PURE__*/React__default.createElement(MessageBlobResponse, {
      className: "chat-message chat-message--response"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "chat-message__inner"
    }, props.text)) : /*#__PURE__*/React__default.createElement(MessageBlobUser, {
      className: "chat-message chat-message--inner"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "chat-message__inner"
    }, props.text)));
  } else {
    return null;
  }
}

function MessageGroup(props) {
  var handleResponses = function handleResponses(items) {
    return items.map(function (item, index) {
      return /*#__PURE__*/React__default.createElement(Message, {
        type: 'response',
        text: item,
        key: index,
        timeout: 600,
        scrollArea: props.scrollArea,
        scrollAnchor: props.scrollAnchor
      });
    });
  };

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Message, {
    type: '',
    text: props.text,
    scrollArea: props.scrollArea,
    scrollAnchor: props.scrollAnchor
  }), handleResponses(props.text_responses));
}

function _templateObject$1() {
  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\twidth: 1.125rem;\n\n\tsvg {\n\t\twidth: 100%;\n\t}\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Icon = styled.div(_templateObject$1());
function IconSend() {
  return /*#__PURE__*/React__default.createElement(Icon, {
    className: "convo-chat__icon"
  }, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "class": "feather feather-send"
  }, /*#__PURE__*/React__default.createElement("line", {
    x1: "22",
    y1: "2",
    x2: "11",
    y2: "13"
  }), /*#__PURE__*/React__default.createElement("polygon", {
    points: "22 2 15 22 11 13 2 9 22 2"
  })));
}
function IconRefresh() {
  return /*#__PURE__*/React__default.createElement(Icon, {
    className: "convo-chat__icon"
  }, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, /*#__PURE__*/React__default.createElement("polyline", {
    points: "23 4 23 10 17 10"
  }), /*#__PURE__*/React__default.createElement("polyline", {
    points: "1 20 1 14 7 14"
  }), /*#__PURE__*/React__default.createElement("path", {
    d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
  })));
}
function IconMinus() {
  return /*#__PURE__*/React__default.createElement(Icon, {
    className: "convo-chat__icon"
  }, /*#__PURE__*/React__default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, /*#__PURE__*/React__default.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })));
}

function _templateObject9() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 4rem;\n\theight: 100%;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tbackground: ", ";\n\tborder: none;\n\toutline: none;\n\ttransition: ", ";\n\n\t&:hover {\n\t\tcursor: pointer;\n\t\topacity: 0.75;\n\t}\n\n\tsvg {\n\t\tfilter: brightness(0) invert(1);\n\t\twidth: 1rem;\n\t}\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteralLoose(["\n\ttext-align: left;\n\twidth: 100%;\n\tpadding: 0.875rem 1.25rem;\n\tborder: none;\n\tline-height: 1.6;\n\tborder-top: none;\n\theight: 3.125rem;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100%;\n\tborder: ", ";\n\tborder-top: ", ";\n\tdisplay: flex;\n\talign-items: center;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteralLoose(["\n\tpadding-bottom: 0.625rem;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100%;\n\tborder: ", ";\n\tborder-bottom: none;\n\tpadding: 1rem 1.25rem;\n\toverflow: hidden;\n\toverflow-y: scroll;\n\tscroll-behavior: smooth;\n\tflex: 1;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteralLoose(["\n\twidth: 100%;\n\tflex-direction: column;\n\tflex: 1;\n\tflex-basis: auto;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteralLoose(["\n\tdisplay: flex;\n\talign-items: center;\n\n\tbutton {\n\t\tpadding: 0.35rem;\n\t\tmargin-left: 0.625rem;\n\t\tcolor: ", ";\n\n\t\tsvg {\n\t\t\tstroke: ", ";\n\t\t}\n\t}\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteralLoose(["\n\theight: 3.125rem;\n\twidth: 100%;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tbackground: ", ";\n\tpadding: ", ";\n\tcolor: ", ";\n\tfont-size: 1rem;\n\n\tbutton {\n\t\tbackground: transparent;\n\t}\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteralLoose(["\n\ttext-align: center;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: flex-end;\n\talign-items: center;\n\theight: 100%;\n\twidth: 100%;\n\tflex-basis: auto;\n\tmargin: auto;\n\tbackground: ", ";\n\tbox-sizing: border-box;\n\n\t* {\n\t\tbox-sizing: border-box;\n\t}\n\n\tbutton {\n\t\tdisplay: inline-flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\toutline: none;\n\t\tborder: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tcursor: pointer;\n\t}\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var Wrapper = styled.div(_templateObject$2(), styleVars.color_white);
var Header = styled.header(_templateObject2$1(), styleVars.color_primary, styleVars.input_padding, styleVars.color_white);
var HeaderActions = styled.div(_templateObject3$1(), styleVars.color_white, styleVars.color_white);
var BodyWrapper = styled.div(_templateObject4());
var Body = styled.div(_templateObject5(), styleVars.border);
var Anchor = styled.div(_templateObject6());
var Form = styled.form(_templateObject7(), styleVars.border, styleVars.border);
var FormInput = styled.input(_templateObject8());
var FormButton = styled.button(_templateObject9(), styleVars.color_primary, styleVars.transition);

var Chat = function Chat(props) {
  var _useState = React.useState(""),
      message = _useState[0],
      setMessage = _useState[1];

  var _useState2 = React.useState([]),
      messageGroups = _useState2[0],
      setMessageGroups = _useState2[1];

  var _useState3 = React.useState(true),
      chatVisible = _useState3[0],
      setChatVisible = _useState3[1];

  var _useState4 = React.useState(null),
      deviceId = _useState4[0],
      setDeviceId = _useState4[1];

  var serviceId = props.serviceId;
  var variant = props.variant;
  var mainInput = React.useRef(null);
  var scrollArea = React.useRef(null);
  var scrollAnchor = React.useRef(null);
  var convoPublicApiBaseUrl = props.apiUrl;
  React.useEffect(function () {
    setDeviceId(Math.random().toString(36).substring(7));
  }, []);
  React.useEffect(function () {
    sendMessage('');
  }, [deviceId]);

  function sendMessage(text) {
    if (!variant) {
      variant = (_readOnlyError("variant"), "develop");
    }

    var url = convoPublicApiBaseUrl + "/service-run/convo_chat/" + variant + "/" + serviceId;
    var data = {
      device_id: deviceId,
      text: text,
      lunch: true
    };
    axios({
      method: "post",
      url: url,
      data: data
    }).then(function (res) {
      setMessageGroups([].concat(messageGroups, [{
        text: message,
        text_responses: res.data.text_responses
      }]));
      setMessage(null);
      mainInput.current.value = "";
    })["catch"](function (err) {
      return console.log(err);
    });
  }

  var chatBodyStyle = {
    display: chatVisible ? 'flex' : 'none'
  };
  return /*#__PURE__*/React__default.createElement(Wrapper, {
    className: "convo-chat"
  }, /*#__PURE__*/React__default.createElement(Header, {
    className: "convo-chat__header"
  }, /*#__PURE__*/React__default.createElement("span", null, props.title ? props.title : 'Title'), /*#__PURE__*/React__default.createElement(HeaderActions, null, /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick() {
      setMessageGroups([]);
      setMessage("");
    }
  }, /*#__PURE__*/React__default.createElement(IconRefresh, null)), /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick() {
      setChatVisible(!chatVisible);
    }
  }, /*#__PURE__*/React__default.createElement(IconMinus, null)))), /*#__PURE__*/React__default.createElement(BodyWrapper, {
    style: chatBodyStyle
  }, /*#__PURE__*/React__default.createElement(Body, {
    className: "convo-chat__body",
    ref: scrollArea
  }, messageGroups.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement(MessageGroup, {
      key: index,
      text: item.text,
      text_responses: item.text_responses,
      scrollArea: scrollArea,
      scrollAnchor: scrollAnchor
    });
  }), /*#__PURE__*/React__default.createElement(Anchor, {
    className: "convo-chat__anchor",
    ref: scrollAnchor
  })), /*#__PURE__*/React__default.createElement(Form, {
    className: "convo-chat__form",
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      message && sendMessage(message);
    }
  }, /*#__PURE__*/React__default.createElement(FormInput, {
    ref: mainInput,
    type: "text",
    defaultValue: "",
    placeholder: "Type a message",
    onChange: function onChange(e) {
      console.log(e);
      setMessage(e.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(FormButton, {
    type: "submit"
  }, /*#__PURE__*/React__default.createElement(IconSend, null)))));
};

function ConvoworksWebchat(props) {
  return /*#__PURE__*/React__default.createElement(Chat, {
    title: props.title,
    apiUrl: props.apiUrl,
    serviceId: props.serviceId,
    variant: props.variant
  });
}

module.exports = ConvoworksWebchat;
//# sourceMappingURL=index.js.map

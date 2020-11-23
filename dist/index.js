function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var axios = _interopDefault(require('axios'));

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

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
    return /*#__PURE__*/React__default.createElement("div", {
      className: props.type === 'response' ? 'message message--response' : 'message message--user'
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "message__inner"
    }, props.text));
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

function IconSend() {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "icon"
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

var ConvoChat = function ConvoChat(props) {
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
  var isLaunch = props.isLaunch;
  var mainInput = React.useRef(null);
  var scrollArea = React.useRef(null);
  var scrollAnchor = React.useRef(null);
  var convoPublicApiBaseUrl = "http://localhost:9090/rest_public/convo/v1";
  React.useEffect(function () {
    setDeviceId('device');
  }, []);

  function sendMessage(text) {
    if (!variant) {
      variant = (_readOnlyError("variant"), "develop");
    }

    var url = convoPublicApiBaseUrl + "/service-run/webchat/" + variant + "/" + serviceId;
    var data = {
      device_id: deviceId,
      text: text,
      lunch: isLaunch
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

  return /*#__PURE__*/React__default.createElement("div", {
    className: "convo-chat"
  }, /*#__PURE__*/React__default.createElement("header", {
    "class": "convo-chat__header",
    onClick: function onClick() {
      setChatVisible(!chatVisible);
    }
  }, "Chat"), chatVisible && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
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
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "convo-chat__anchor",
    ref: scrollAnchor
  })), /*#__PURE__*/React__default.createElement("form", {
    className: "convo-chat__form",
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      message && sendMessage(message);
    }
  }, /*#__PURE__*/React__default.createElement("input", {
    ref: mainInput,
    type: "text",
    defaultValue: "",
    placeholder: "Type a message",
    onChange: function onChange(e) {
      return setMessage(e.target.value);
    }
  }), /*#__PURE__*/React__default.createElement("button", {
    type: "submit"
  }, /*#__PURE__*/React__default.createElement(IconSend, null)))));
};

var ConvoChatComponent = function ConvoChatComponent(props) {
  return /*#__PURE__*/React__default.createElement(ConvoChat, {
    serviceId: props.serviceId,
    variant: props.variant,
    isLaunch: props.isLaunch
  });
};

exports.ConvoChatComponent = ConvoChatComponent;
//# sourceMappingURL=index.js.map
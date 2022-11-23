import { useState } from "preact/hooks";
import { WebSocketClient, StandardWebSocketClient } from "https://deno.land/x/websocket@v0.1.4/mod.ts";
import { tw } from "@twind";
const endpoint = "wss://xxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/production";
const ws: WebSocketClient = new StandardWebSocketClient(endpoint);

ws.on("open", function() {
  console.log("ws connected!")
});

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [comment, setComment] = useState("")
  function addMessage(message) {
    console.log(message)
    setMessages([...messages, message.data])
  }

  ws.on("message", function (message: string) {
    addMessage(message)
  });

  function sendMessage() {
    //ws.send('{ \"action\": \"sendmessage\", \"message\": "' + comment + '" }')
    ws.send(JSON.stringify({ "action": "sendmessage", "message": comment}))
    // 自分で送ったメッセージはws経由でcallbackされないので直接追加
    addMessage({ data: comment })
  }

  function viewMessages() {
    const renderHtml = []
    messages.forEach((m) => {
      renderHtml.push(<>{m}<hr /></>)
    })
    return <div>{ renderHtml }</div>
  }

  return (
    <div class="flex gap-2 w-full">
      <div
        className={tw`bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg`}
      >
        <div className={tw`mb-4`}>
         {viewMessages()}
        </div>
        <div className={tw`mb-4`}>
          <input
            className={tw`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            onChange={(e) => setComment(e.currentTarget.value)}
            id="chat-comment"
            type="text"
            name="comment"
          />
        </div>
        <button
          onClick={() => sendMessage()}
          className={tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

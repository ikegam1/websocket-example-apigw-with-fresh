import { Head } from "$fresh/runtime.ts";
import Chat from "../islands/Chat.tsx";
import { tw } from "@twind";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div
        className={tw`h-100 w-full flex flex-col items-center justify-center bg-teal-lightest font-sans`}
      >
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <div
          className={tw`bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg`}
        >
          <h2>api gatewayとLambdaでリアルタイムチャットしてみる</h2>
          <Chat />
        </div>
      </div>
    </>
  );
}

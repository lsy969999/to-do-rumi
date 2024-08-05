import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { alertMessage, confirmMessage } from "./ffi";
import toast, { Toaster } from "react-hot-toast";
import { ping } from '../plugins/tauri-plugin-sqlite/guest-js'

function Test() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const test = import.meta.env.VITE_TEST;
  console.log('test', test)

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  async function pingtest() {
    const str = await ping('ping!');
    setGreetMsg(str || '');
  }

  return (
    <div >
      <h1>Welcome to Tauri!</h1>
      <div className="border-b-2"></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
      <div className="border-b-2"></div>
      <button onClick={async () => { await alertMessage('hi') }} className="border bg-indigo-400 text-white">
        alert
      </button>

      <button onClick={async () => { await confirmMessage('hi') }} className="border bg-indigo-400 text-white">
        confirm
      </button>

      <button onClick={async () => { toast('Here is your toast.') }} className="border bg-indigo-400 text-white">
        toast
      </button>
      <Toaster />
      <div className="border-b-2"></div>
      <button onClick={pingtest } className="border bg-indigo-400 text-white">
        ping
      </button>
    </div>
  );
}

export default Test;

import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { alertMessage, confirmMessage, platform, store_clear, store_get, store_keys, store_remove, store_set } from "./ffi";
import toast, { Toaster } from "react-hot-toast";
import { ping, get_db_user_version } from '../plugins/tauri-plugin-sqlite/guest-js'

function Test() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [kvKey, setKvKey] = useState("");
  const [kvVal, setKvVal] = useState("");

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
      <button onClick={() => { const plf = platform(); setGreetMsg(plf); }} className="border bg-indigo-400 text-white">
        platform
      </button>
      <div className="border-b-2 "></div>
      <button onClick={pingtest } className="p-2 m-2 border bg-indigo-400 text-white">
        ping
      </button>
      <div className="border-b-2 "></div>
      <div className="p-2">
        <span>key: [{kvKey}], val: [{kvVal}]</span>
        <input className="border" onChange={(e) => setKvKey(e.currentTarget.value)} placeholder="key" />
        <input className="border" onChange={(e) => setKvVal(e.currentTarget.value)} placeholder="val" />
        <button onClick={async() => {const v = await store_get(kvKey); setKvVal(JSON.stringify(v))}} className="border p-2 m-2 bg-indigo-400 text-white">get</button>
        <button onClick={async() => {await store_set(kvKey, kvVal); }} className="border p-2 m-2 bg-indigo-400 text-white">set</button>
        <button onClick={async() => {await store_remove(kvKey); }} className="border p-2 m-2 bg-indigo-400 text-white">del</button>
        <button onClick={async() => {await store_clear(); }} className="border p-2 m-2 bg-indigo-400 text-white">clear</button>
        <button onClick={async() => { console.log(await store_keys()); }} className="border p-2 m-2 bg-indigo-400 text-white">keys</button>
      </div>

      <div className="border-b-2 "></div>
      <div>
        <button onClick={async () => {const v = await get_db_user_version(); setGreetMsg(JSON.stringify(v))}} className="bg-indigo-400 m-2 p-2">get_db_version</button>
      </div>
    </div>
  );
}

export default Test;

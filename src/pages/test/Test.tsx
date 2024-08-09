import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { alertMessage, confirmMessage, platform, storeClear, storeGet, storeKeys, storeRemove, storeSet } from "../../ffi";
import toast, { Toaster } from "react-hot-toast";
import { ping, getDbUserVersion, getAllTodo, insertTodo } from '../../../plugins/tauri-plugin-sqlite/guest-js'
import { Todo } from "../../../plugins/tauri-plugin-sqlite/guest-js/types";
import { Link } from "react-router-dom";

function Test() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [kvKey, setKvKey] = useState("");
  const [kvVal, setKvVal] = useState("");
  const [testTodo, setTestTodo] = useState("");
  const [todoData, setTodoData] = useState<Todo[]>([]);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  async function pingtest() {
    const str = await ping('ping!');
    setGreetMsg(str || '');
  }

  async function handleInsertTodo() {
    const rowid = await insertTodo(testTodo);
    console.log('inesrt row id', rowid);
  }

  async function handleGetAllTodo() {
    const todos = await getAllTodo()
    console.log('todos:', todos)
    setTodoData(todos)
    console.log(todoData)
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
        <button onClick={async() => {const v = await storeGet(kvKey); setKvVal(JSON.stringify(v))}} className="border p-2 m-2 bg-indigo-400 text-white">get</button>
        <button onClick={async() => {await storeSet(kvKey, kvVal); }} className="border p-2 m-2 bg-indigo-400 text-white">set</button>
        <button onClick={async() => {await storeRemove(kvKey); }} className="border p-2 m-2 bg-indigo-400 text-white">del</button>
        <button onClick={async() => {await storeClear(); }} className="border p-2 m-2 bg-indigo-400 text-white">clear</button>
        <button onClick={async() => { console.log(await storeKeys()); }} className="border p-2 m-2 bg-indigo-400 text-white">keys</button>
      </div>

      <div className="border-b-2 "></div>
      <div>
        <button onClick={async () => {const v = await getDbUserVersion(); setGreetMsg(JSON.stringify(v))}} className="bg-indigo-400 m-2 p-2">get_db_version</button>
      </div>
      <div className="border-b-2 "></div>
      <div>
        <input className="border" onChange={(e) => setTestTodo(e.currentTarget.value)} placeholder="todo" />
        <button onClick={handleInsertTodo} className="border p-2 m-2 bg-indigo-400 text-white">Insert</button>
        <button onClick={handleGetAllTodo} className="border p-2 m-2 bg-indigo-400 text-white">GetAll</button>
        {
            todoData.map(a => {
                return <div key={a.sn}>{a.todo}</div>
            })
        }
      </div>
      <Link to={"/test/calendar"}>
        <button className="bg-indigo-400 m-2 p-2">testcalendar</button>
      </Link>
      <Link to={"/test/calendarcustom"}>
        <button className="bg-indigo-400 m-2 p-2">testcalendarcustom</button>
      </Link>
      <Link to={"/test/gesture"}>
        <button className="bg-indigo-400 m-2 p-2">testgesture</button>
      </Link>
      <Link to={"/test/date"}>
        <button className="bg-indigo-400 m-2 p-2">testdate</button>
      </Link>
    </div>
  );
}

export default Test;

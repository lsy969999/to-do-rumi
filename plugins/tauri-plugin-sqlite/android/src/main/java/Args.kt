package lsy969999.plugin.todolumi.sqlite

import app.tauri.annotation.InvokeArg

@InvokeArg
class PingArgs {
    var value: String? = null
}

@InvokeArg
class InsertTodoReq {
    var todo: String? = null
}

data class GetAllTodoRes(val todos: List<TodoWithTodoGroup>)

data class InsertTodoRes(val rowid: Long)
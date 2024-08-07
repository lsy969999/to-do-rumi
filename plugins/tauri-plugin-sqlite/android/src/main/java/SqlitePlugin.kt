package lsy969999.plugin.todolumi.sqlite

import android.app.Activity
import android.webkit.WebView
import app.tauri.Logger
import app.tauri.annotation.Command
import app.tauri.annotation.TauriPlugin
import app.tauri.plugin.JSObject
import app.tauri.plugin.Plugin
import app.tauri.plugin.Invoke
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@TauriPlugin
class SqlitePlugin(private val activity: Activity): Plugin(activity) {
    private lateinit var webView: WebView
    private lateinit var db: AppDatabase
    override fun load(webView: WebView) {
        super.load(webView);
        this.webView = webView;
        this.db = AppDatabase.getInstance(activity);
    }

    @Command
    fun ping(invoke: Invoke) {
        val args = invoke.parseArgs(PingArgs::class.java)
        invoke.resolveObject(mapOf("value" to args.value))
    }

    @Command
    fun getDbUserVersion(invoke: Invoke) {
        CoroutineScope(Dispatchers.IO).launch {
            val userVersion = AppDatabase.getDbUserVersion(activity)
            invoke.resolveObject(mapOf("version" to userVersion))
        }
    }

    @Command
    fun getAllTodo(invoke: Invoke) {
        CoroutineScope(Dispatchers.IO).launch {
            val todos = db.todoDao().fetchAllTodo()
            invoke.resolveObject(GetAllTodoRes(todos = todos))
        }
    }

    @Command
    fun insertTodo(invoke: Invoke) {
        val args = invoke.parseArgs(InsertTodoReq::class.java)
        CoroutineScope(Dispatchers.IO).launch {
            val todo = TbTodo(todo = args.todo.orEmpty())
            val rowid = db.todoDao().insertTodo(todo);
            invoke.resolveObject(InsertTodoRes(rowid = rowid))
        }
    }
}

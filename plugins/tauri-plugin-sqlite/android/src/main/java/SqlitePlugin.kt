package lsy969999.plugin.todolumi.sqlite

import android.app.Activity
import android.util.Log
import android.webkit.WebView
import androidx.room.Room
import app.tauri.annotation.Command
import app.tauri.annotation.InvokeArg
import app.tauri.annotation.TauriPlugin
import app.tauri.plugin.JSObject
import app.tauri.plugin.Plugin
import app.tauri.plugin.Invoke
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


@InvokeArg
class PingArgs {
  var value: String? = null
}

@TauriPlugin
class SqlitePlugin(private val activity: Activity): Plugin(activity) {
    private lateinit var dbManager: DatabaseManager
    private lateinit var appDb: AppDatabase
    override fun load(webView: WebView) {
        super.load(webView)
        dbManager = DatabaseManager(activity)
        dbManager.open()
        appDb = Room.databaseBuilder(
            activity,
            AppDatabase::class.java, "database-name"
        ).build()

    }

    @Command
    fun ping(invoke: Invoke) {
//        dbManager.insert("testname", 123);
//        dbManager.fetchAll().forEach {
//            Log.d("TAG", "ping: ${it.id} ${it.name} ${it.age}" )
//        }

        CoroutineScope(Dispatchers.IO).launch {
            appDb.userDao().insertAll(Users(null,"firstname test", "lastname test"))
            appDb.userDao().getAll().forEach {
                Log.d("TAG", "ping: ${it.uid} ${it.firstName} ${it.lastName}" )
            }
        }


        val args = invoke.parseArgs(PingArgs::class.java)
        val ret = JSObject()
        ret.put("value", args.value)
        invoke.resolve(ret)
    }
}

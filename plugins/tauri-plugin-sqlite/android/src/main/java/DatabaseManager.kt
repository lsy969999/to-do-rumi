package lsy969999.plugin.todolumi.sqlite

import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import android.database.SQLException
import android.database.sqlite.SQLiteDatabase
data class User(
    val id: Int,
    val name: String,
    val age: Int
)
class DatabaseManager (context: Context){
    private val dbHelper: DatabaseHelper = DatabaseHelper(context)
    private lateinit var database: SQLiteDatabase

    @Throws(SQLException::class)
    fun open(): DatabaseManager {
        database = dbHelper.writableDatabase
        return this
    }

    fun close() {
        dbHelper.close()
    }

    fun insert(name: String, age: Int) {
        val sql = "INSERT INTO User (name, age) VALUES (?, ?);"
        database.execSQL(sql, arrayOf(name, age))
    }

    fun fetchAll(): List<User> {
        val sql = "SELECT * FROM User;";
        val cursor = database.rawQuery(sql, null)
        val users = mutableListOf<User>()
        if (cursor.moveToFirst()) {
            do {
                val id = cursor.getInt(cursor.getColumnIndexOrThrow("id"))
                val name = cursor.getString(cursor.getColumnIndexOrThrow("name"))
                val age = cursor.getInt(cursor.getColumnIndexOrThrow("age"))
                users.add(User(id, name, age))
            } while (cursor.moveToNext())
        }

        cursor.close()
        return users
    }
}
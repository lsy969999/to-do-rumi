package lsy969999.plugin.todolumi.sqlite

import android.content.Context
import android.database.SQLException
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

//data class User(
//    val id: Int,
//    val name: String,
//    val age: Int
//)
//class DatabaseHelper(context: Context): SQLiteOpenHelper(context, DATABASE_NAME, null, DATABASE_VERSION) {
//
//    override fun onCreate(db: SQLiteDatabase) {
//        db.execSQL("""
//           CREATE TABLE IF NOT EXISTS User(
//                id INTEGER PRIMARY KEY AUTOINCREMENT,
//                name TEXT,
//                age INTEGER
//           );
//        """)
//    }
//
//    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
//        db.execSQL("DROP TABLE IF EXISTS User")
//        onCreate(db)
//    }
//
//    companion object {
//        const val DATABASE_NAME = "example.db"
//        const val DATABASE_VERSION = 1
//    }
//}
//
//class DatabaseManager (context: Context){
//    private val dbHelper: DatabaseHelper = DatabaseHelper(context)
//    private lateinit var database: SQLiteDatabase
//
//    @Throws(SQLException::class)
//    fun open(): DatabaseManager {
//        database = dbHelper.writableDatabase
//        return this
//    }
//
//    fun close() {
//        dbHelper.close()
//    }
//
//    fun insert(name: String, age: Int) {
//        val sql = "INSERT INTO User (name, age) VALUES (?, ?);"
//        database.execSQL(sql, arrayOf(name, age))
//    }
//
//    fun fetchAll(): List<User> {
//        val sql = "SELECT * FROM User;";
//        val cursor = database.rawQuery(sql, null)
//        val users = mutableListOf<User>()
//        if (cursor.moveToFirst()) {
//            do {
//                val id = cursor.getInt(cursor.getColumnIndexOrThrow("id"))
//                val name = cursor.getString(cursor.getColumnIndexOrThrow("name"))
//                val age = cursor.getInt(cursor.getColumnIndexOrThrow("age"))
//                users.add(User(id, name, age))
//            } while (cursor.moveToNext())
//        }
//
//        cursor.close()
//        return users
//    }
//}
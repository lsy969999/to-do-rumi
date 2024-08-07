package lsy969999.plugin.todolumi.sqlite

import android.content.Context
import androidx.room.ColumnInfo
import androidx.room.Dao
import androidx.room.Database
import androidx.room.Entity
import androidx.room.Insert
import androidx.room.PrimaryKey
import androidx.room.Query
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverter
import androidx.room.TypeConverters
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
import app.tauri.Logger
import java.time.LocalDateTime

class Converters {
    @TypeConverter
    fun fromTimestamp(value: String?): LocalDateTime? {
        return value?.let { LocalDateTime.parse(it) }
    }

    @TypeConverter
    fun dateToTimestamp(date: LocalDateTime?): String? {
        return date?.toString()
    }
}

@Database(entities = [TbUser::class, TbTodoGroup::class, TbTodo::class], version = AppDatabase.DB_VERSION, exportSchema = false)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun userDao(): UserDao
    abstract fun todoDao(): TodoDao
    abstract fun todoGroupDao(): TodoGroupDao

    companion object {
        const val DB_VERSION = 1;
        private const val DB_NAME = "todolumi.db";
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    DB_NAME
                )
//                    .addMigrations(MIGRATION1_2)
                    .addCallback(object : Callback() {
                        override fun onCreate(db: SupportSQLiteDatabase) {
                            super.onCreate(db)
                            Logger.debug("AppDatabase onCreate")
//                            CoroutineScope(Dispatchers.IO).launch {
//                                getInstance(context).userDao().insertUser(TbUser(name = "LOCAL_USER", uuid = null))
//                            }
                        }
                    })
                    .build();
                INSTANCE = instance
                instance
            }
        }
        fun getDbUserVersion(context: Context): Int {
            val supportDb: SupportSQLiteDatabase = getInstance(context).openHelper.writableDatabase;
            val cursor = supportDb.query("PRAGMA user_version");
            cursor.moveToFirst();
            val userVersion = cursor.getInt(0);
            Logger.debug("getDbUserVersion $userVersion")
            cursor.close()
            return userVersion;
        }
        private val MIGRATION1_2 = object : Migration(1, 2) {
            override fun migrate(db: SupportSQLiteDatabase) {
                //TODO
                Logger.debug("MIGRATION 1_2")
//                db.execSQL("");
            }
        }
    }
}
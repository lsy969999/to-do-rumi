package lsy969999.plugin.todolumi.sqlite

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import java.time.LocalDateTime

abstract class BaseEntity {
    @PrimaryKey(autoGenerate = true) @ColumnInfo(name = "sn") var sn: Long? = null
    @ColumnInfo(name = "is_deleted") var isDeleted: Boolean = false
    @ColumnInfo(name = "created_by") var createdBy: Long? = null
    @ColumnInfo(name = "created_at") var createdAt: LocalDateTime = LocalDateTime.now()
    @ColumnInfo(name = "updated_by") var updatedBy: Long? = null
    @ColumnInfo(name = "updated_at") var updatedAt: LocalDateTime = LocalDateTime.now()
}

@Entity(tableName = "tb_user")
data class TbUser(
    @ColumnInfo(name = "name") val name: String?,
    @ColumnInfo(name = "uuid") val uuid: String?,
): BaseEntity()

@Entity(tableName = "tb_todo_group")
data class TbTodoGroup(
    @ColumnInfo(name = "name") val name: String,
): BaseEntity()

@Entity(tableName = "tb_todo")
data class TbTodo(
    @ColumnInfo(name = "todo_group_sn") val todoGroupSn: Long? = null,
    @ColumnInfo(name = "todo") val todo: String,
    @ColumnInfo(name = "is_clear") val isClear: Boolean = false,
    @ColumnInfo(name = "progress") val progress: Int = 0,
    @ColumnInfo(name = "order") val order: Int? = null,
    @ColumnInfo(name = "start_at") val startAt: LocalDateTime? = null,
    @ColumnInfo(name = "end_at") val endAt: LocalDateTime? = null,
    @ColumnInfo(name = "is_repeat") val isRepeat: Boolean = false,
    @ColumnInfo(name = "repeat_type") val repeatType: String? = null,
    @ColumnInfo(name = "is_alarm") val isAlarm: Boolean = false,
    @ColumnInfo(name = "alarm_type") val alarmType: String? = null,
): BaseEntity() {

}
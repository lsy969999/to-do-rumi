package lsy969999.plugin.todolumi.sqlite

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface TodoDao {
    @Query("""
        SELECT
            t_t.sn as sn,
            t_t.todo as todo,
            t_t_g.name as name --left join nullable
        FROM tb_todo as t_t
        LEFT JOIN tb_todo_group as t_t_g
            ON t_t.todo_group_sn = t_t_g.sn 
        WHERE t_t.is_deleted = FALSE
    """)
    fun fetchAllTodo(): List<TodoWithTodoGroup>

    @Insert
    fun insertTodo(todo: TbTodo): Long
}

@Dao
interface TodoGroupDao {
    @Insert
    fun insertTodoGroup(todoGroup: TbTodoGroup): Long
}
@Dao
interface UserDao {
    @Insert
    fun insertUser(user: TbUser)

    @Query("SELECT * FROM tb_user")
    fun fetchAllUser(): List<TbUser>
}

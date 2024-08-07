//
//  File.swift
//  
//
//  Created by SY L on 8/6/24.
//

import Foundation
import SQLite
import Tauri


struct TodoDao {
    static func getAllTodo(db: Connection) throws -> [Todo] {
        let query = tb_todo
            .select(
                tb_todo[*],
                tb_todo_group[*]
            )
            .join(
                .leftOuter, tb_todo_group,
                on: tb_todo_group[todo_group_sn] == tb_todo[todo_todo_group_sn]
            )
            .filter(tb_todo[is_deleted] != b_true);
        Logger.debug("[getAllTodo] query: \(query)");
        let todos: [Todo] = try db.prepare(query).map { row in
            let todo_sn = row[tb_todo[todo_sn]];
            let todo_todo = row[tb_todo[todo_todo]];
            return Todo(sn: todo_sn, todo: todo_todo);
        }
        return todos
    }

    static func getAllTodoCnt(db: Connection) {
        
    }

    static func getTodoPage(db: Connection) {
        
    }

    static func insertTodo(db: Connection, todo: String) throws -> Int64  {
        let rowid = try db.run(tb_todo.insert(todo_todo <- todo))
        return rowid
    }

    static func updateTodo(db: Connection) {
        
    }
}

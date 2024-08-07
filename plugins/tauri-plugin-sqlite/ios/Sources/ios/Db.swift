//
//  File.swift
//  
//
//  Created by SY L on 8/7/24.
//

import Foundation
import SQLite
import Tauri

func todolumi_migration(db: Connection) {
    do {
        if db.userVersion == 0 {
            try todolumi_migration_0_to_1(db: db);
        }
    } catch {
        // TODO: Migration 실패하면 어케하지
        Logger.error("Migration Failed error \(error)")
    }
}

func todolumi_migration_0_to_1(db: Connection) throws {
    Logger.debug("[todolumi_migration_0_to_1] start!")
    try db.transaction {
        // user_table 생성
        try db.run(tb_user.create(ifNotExists: true) { t in
            t.column(user_sn, primaryKey: .autoincrement);
            t.column(user_name);
            t.column(user_uuid);
            // common
            t.column(is_deleted, defaultValue: b_false);
            t.column(created_at, defaultValue: Date());
            t.column(created_by);
            t.column(updated_at, defaultValue: Date());
            t.column(updated_by);
        });
        
        // todo_group_table 생성
        try db.run(tb_todo_group.create(ifNotExists: true) { t in
            t.column(todo_group_sn, primaryKey: .autoincrement);
            t.column(todo_group_name);
            // common
            t.column(is_deleted, defaultValue: b_false);
            t.column(created_at, defaultValue: Date());
            t.column(created_by);
            t.column(updated_at, defaultValue: Date());
            t.column(updated_by);
        });
        
        // todo table 생성
        try db.run(tb_todo.create(ifNotExists: true) { t in
            t.column(todo_sn, primaryKey: .autoincrement);
            t.column(todo_todo_group_sn);
            t.column(todo_todo);
            t.column(todo_is_clear, defaultValue: b_false);
            t.column(todo_progress, defaultValue: 0);
            t.column(todo_order);
            t.column(todo_start_at);
            t.column(todo_end_at);
            t.column(todo_is_repeat, defaultValue: b_false);
            t.column(todo_repeat_type);
            t.column(todo_is_alarm, defaultValue: b_false);
            t.column(todo_alarm_type);
            // common
            t.column(is_deleted, defaultValue: b_false);
            t.column(created_at, defaultValue: Date());
            t.column(created_by);
            t.column(updated_at, defaultValue: Date());
            t.column(updated_by);
        });
        db.userVersion = 1
    }
    Logger.debug("[todolumi_migration_0_to_1] end!")
}
func todolumi_migration_1_to_2(db: Connection) throws {
    Logger.debug("[todolumi_migration_1_to_2] start!")
    // TODO: handle mig
    try db.transaction {
        db.userVersion = 2
    }
    Logger.debug("[todolumi_migration_1_to_2] end!")
}

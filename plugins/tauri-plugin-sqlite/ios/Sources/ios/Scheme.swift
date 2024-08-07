//
//  File 2.swift
//  
//
//  Created by SY L on 8/6/24.
//

import Foundation
import SQLite
import os.log
import Tauri


let b_true: Int64 = 1;
let b_false: Int64 = 0;

let local_user_sn: Int64 = 0;

// 공통
let is_deleted = Expression<Int64>("is_deleted");
let created_at = Expression<Date>("created_at")
let created_by = Expression<Int64?>("created_by");
let updated_at = Expression<Date>("updated_at");
let updated_by = Expression<Int64?>("updated_by");
let deleted_at = Expression<Date?>("deleted_at");

// 유저테이블
let tb_user = Table("tb_user");
let user_sn = Expression<Int64>("sn");
let user_name = Expression<String?>("name");
let user_uuid = Expression<String?>("uuid");

// 투두그룹 테이블
let tb_todo_group = Table("tb_todo_group");
let todo_group_sn = Expression<Int64>("sn");
let todo_group_name = Expression<String>("name");

// 투두 테이블
let tb_todo = Table("tb_todo");
let todo_sn = Expression<Int64>("sn");
let todo_todo_group_sn = Expression<Int64?>("todo_group_sn");
let todo_todo = Expression<String>("todo");
let todo_is_clear = Expression<Int64>("is_clear");
let todo_progress = Expression<Int64>("progress");
let todo_order = Expression<Int64?>("order");
let todo_start_at = Expression<Date?>("start_at");
let todo_end_at = Expression<Date?>("end_at");
let todo_is_repeat = Expression<Int64>("is_repeat");
let todo_repeat_type = Expression<String?>("repeat_type");
let todo_is_alarm = Expression<Int64>("is_alarm");
let todo_alarm_type = Expression<String?>("alarm_type");


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


struct Todo: Codable {
    let sn: Int64
    let todo: String
}

struct TodoGroup: Codable {
    
}

struct User: Codable {
    
}

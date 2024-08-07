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

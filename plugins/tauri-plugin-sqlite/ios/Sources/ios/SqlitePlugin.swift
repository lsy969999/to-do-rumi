// The Swift Programming Language
// https://docs.swift.org/swift-book

import UIKit
import WebKit
import Tauri
import os.log
import SQLite3
import SQLite


class SqlitePlugin: Plugin {
    var webView: WKWebView!
    var db: Connection!
    @objc public override func load(webview: WKWebView) {
        self.webView = webview
        let fileURL = try! FileManager
            .default
            .url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
            .appendingPathComponent(db_name)
        self.db = try! Connection(fileURL.path)
        
        Logger.debug("migration before userVersion: \(String(describing: self.db.userVersion))")
        todolumi_migration(db: self.db)
        Logger.debug("migration after userVersion: \(String(describing: self.db.userVersion))")
    }
    @objc public func ping(_ invoke: Invoke) throws {
        Logger.debug("userVersion: \(String(describing: self.db.userVersion))")
        let args = try invoke.parseArgs(PingReq.self)
        invoke.resolve(PingRes(value: args.value))
    }
    @objc public func getDbUserVersion(_ invoke: Invoke) throws {
        let version = self.db.userVersion;
        invoke.resolve(GetDbUserVersionRes(version: version));
    }
    @objc public func getAllTodo(_ invoke: Invoke) throws {
        let todos = try TodoDao.getAllTodo(db: self.db);
        invoke.resolve(GetAllTodoRes(todos: todos));
    }
    @objc public func insertTodo(_ invoke: Invoke) throws {
        let args = try invoke.parseArgs(InsertTodoReq.self);
        let rowid = try TodoDao.insertTodo(db: self.db, todo: args.todo);
        invoke.resolve(InsertTodoRes(rowid: rowid));
    }
}

@_cdecl("init_plugin_sqlite")
func initPlugin() -> Plugin {
    return SqlitePlugin()
}

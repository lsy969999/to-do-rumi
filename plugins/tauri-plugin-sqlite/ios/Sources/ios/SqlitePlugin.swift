// The Swift Programming Language
// https://docs.swift.org/swift-book

import UIKit
import WebKit
import Tauri
import os.log
import SQLite3
import SQLite
import SwiftyBeaver

let log = SwiftyBeaver.self
// 콘솔 로그 설정
struct PingArgs: Decodable {
    let value: String?
}

let users = Table("users")
let id = Expression<Int64>("id")
let name = Expression<String?>("name")
let email = Expression<String>("email")

class SqlitePlugin: Plugin {
    var webView: WKWebView!
//    var dm: DBManager!
    var db: Connection!
    override init() {
        log.addDestination(ConsoleDestination())
    }
    @objc public override func load(webview: WKWebView) {
        self.webView = webview
//        self.dm = DBManager()
        let fileURL = try! FileManager.default
        .url(for: .applicationSupportDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
        .appendingPathComponent("database2.db")
        self.db = try! Connection(fileURL.path)
        try! self.db.run(users.create(ifNotExists: true) { t in
            t.column(id, primaryKey: .autoincrement)
            t.column(name)
            t.column(email)
        })
    }
    @objc public func ping(_ invoke: Invoke) throws {
//        dm.insertUser(name: "testname", email: "testemail", password: "testpassword");
//        let us = dm.getAllUsers();
//        for u in us {
//            if #available(iOS 14.0, *) {
//                os_log("user \(u.id), \(u.name), \(u.email), \(u.password)")
//            } else {
//                // Fallback on earlier versions
//            }
//        }
//        let users = Table("users")
//        let id = Expression<Int64>("id")
//        let name = Expression<String?>("name")
//        let email = Expression<String>("email")
        // 새로운 사용자 데이터 삽입
        
       do {
           log.info("gogogo");
           let insert = users.insert(name <- "Alice", email <- "alice@mac.com")
           let rowid = try db.run(insert)

           // 모든 사용자 데이터 조회 및 로그 기록
           for user in try db.prepare(users) {
               log.info("hi \(user[id])")
           }
       } catch {
           if #available(iOS 14.0, *) {
               os_log("삽입 또는 조회 오류: %{public}@", log: OSLog.default, type: .error, "\(error)")
           } else {
               // iOS 14.0 이전 버전용 대체 코드
               print("삽입 또는 조회 오류: \(error)")
           }
       }
        let args = try invoke.parseArgs(PingArgs.self)
        invoke.resolve(["value": args.value])
    }
}

@_cdecl("init_plugin_sqlite")
func initPlugin() -> Plugin {
    return SqlitePlugin()
}

func test() {
    do {
        //let filePath = try! FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false).appendingPathComponent("example")
        let db = try Connection("example")
        let users = Table("users")
        let id = Expression<Int64>("id")
        let name = Expression<String?>("name")
        let email = Expression<String>("email")
        try db.run(users.create { t in
            t.column(id, primaryKey: true)
            t.column(name)
            t.column(email, unique: true)
        })
        let insert = users.insert(name <- "Alice", email <- "alice@mac.com")
        let rowid = try db.run(insert)
        for user in try db.prepare(users) {
            print("id: \(user[id]), name: \(String(describing: user[name])), email: \(user[email])")
            
        }
    } catch {
        print(error)
    }
}

//
//  File.swift
//  
//
//  Created by SY L on 8/6/24.
//

import Foundation

struct PingReq: Decodable {
    let value: String?
}

struct PingRes: Encodable {
    let value: String?
}

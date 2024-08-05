use std::{env, fs, path::PathBuf};

use rusqlite::Connection;
use serde::de::DeserializeOwned;
use tauri::{plugin::PluginApi, AppHandle, Runtime};

use crate::models::*;

#[derive(Debug)]
struct Person {
    id: i32,
    name: String,
    data: Option<Vec<u8>>,
}

fn get_db_path_window() -> PathBuf {
    let app_data_dir = env::var("LOCALAPPDATA").unwrap_or_else(|_| ".".into());
    let db_path = PathBuf::from(app_data_dir).join("MyApp").join("example.db");
    
    // 디렉토리가 없는 경우 생성
    if let Some(parent) = db_path.parent() {
        fs::create_dir_all(parent).unwrap();
    }

    db_path
}

fn get_db_path_mac() -> PathBuf {
    let home_dir = env::var("HOME").unwrap_or_else(|_| ".".into());
    let db_path = PathBuf::from(home_dir)
        .join("Library")
        .join("Application Support")
        .join("MyApp")
        .join("example.db");

    // 디렉토리가 없는 경우 생성
    if let Some(parent) = db_path.parent() {
        fs::create_dir_all(parent).unwrap();
    }

    db_path
}

fn get_db_path_linux() -> PathBuf {
    let home_dir = env::var("HOME").unwrap_or_else(|_| ".".into());
    let db_path = PathBuf::from(home_dir)
        .join(".myapp")
        .join("example.db");

    // 디렉토리가 없는 경우 생성
    if let Some(parent) = db_path.parent() {
        fs::create_dir_all(parent).unwrap();
    }

    db_path
}

pub fn init<R: Runtime, C: DeserializeOwned>(
  app: &AppHandle<R>,
  _api: PluginApi<R, C>,
) -> crate::Result<Sqlite<R>> {
    #[cfg(target_os = "windows")]
    let db_path = get_db_path_window();
    #[cfg(target_os = "macos")]
    let db_path = get_db_path_linux();
    #[cfg(target_os = "linux")]
    let db_path = get_db_path_linux();

    let conn = Connection::open(db_path)?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS person (
            id    INTEGER PRIMARY KEY,
            name  TEXT NOT NULL,
            data  BLOB
        )",
        (), // empty list of parameters.
    )?; 
    let me = Person {
        id: 0,
        name: "Steven".to_string(),
        data: None,
    };
    conn.execute(
        "INSERT INTO person (name, data) VALUES (?1, ?2)",
        (&me.name, &me.data),
    )?;

    let mut stmt = conn.prepare("SELECT id, name, data FROM person")?;
    let person_iter = stmt.query_map([], |row| {
        Ok(Person {
            id: row.get(0)?,
            name: row.get(1)?,
            data: row.get(2)?,
        })
    })?;

    for person in person_iter {
        println!("Found person {:?}", person.unwrap());
    }

  Ok(Sqlite(app.clone()))
}

/// Access to the sqlite APIs.
pub struct Sqlite<R: Runtime>(AppHandle<R>);

impl<R: Runtime> Sqlite<R> {
  pub fn ping(&self, payload: PingRequest) -> crate::Result<PingResponse> {
    Ok(PingResponse {
      value: payload.value,
    })
  }
}

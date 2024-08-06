
use rusqlite::Connection;
use serde::de::DeserializeOwned;
use tauri::{plugin::PluginApi, AppHandle, Manager, Runtime};
use crate::models::*;

#[derive(Debug)]
struct Person {
    id: i32,
    name: String,
    data: Option<Vec<u8>>,
}

pub fn init<R: Runtime, C: DeserializeOwned>(
  app: &AppHandle<R>,
  _api: PluginApi<R, C>,
) -> crate::Result<Sqlite<R>> {
    let mut app_data_dir = app.path().app_data_dir()?;
    app_data_dir.push("example.db");

    let conn = Connection::open(dunce::simplified(app_data_dir.as_path()))?;
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

  pub fn get_db_user_version(&self, payload: GetDbUserVersionReq) -> crate::Result<GetDbUserVersionRes> {
    todo!()
  }

  pub fn get_all_todo(&self, payload: GetAllTodoReq) -> crate::Result<GetAllTodoRes> {
    todo!()
  }

  pub fn insert_todo(&self, payload: InsertTodoReq) -> crate::Result<InsertTodoRes> {
    todo!()
  }
}

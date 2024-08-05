use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::Sqlite;
#[cfg(mobile)]
use mobile::Sqlite;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the sqlite APIs.
pub trait SqliteExt<R: Runtime> {
  fn sqlite(&self) -> &Sqlite<R>;
}

impl<R: Runtime, T: Manager<R>> crate::SqliteExt<R> for T {
  fn sqlite(&self) -> &Sqlite<R> {
    self.state::<Sqlite<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("sqlite")
    .invoke_handler(tauri::generate_handler![commands::ping])
    .setup(|app, api| {
      #[cfg(mobile)]
      let sqlite = mobile::init(app, api)?;
      #[cfg(desktop)]
      let sqlite = desktop::init(app, api)?;
      app.manage(sqlite);
      Ok(())
    })
    .build()
}

const COMMANDS: &[&str] = &["ping", "get_db_user_version", "get_all_todo", "insert_todo"];

fn main() {
  tauri_plugin::Builder::new(COMMANDS)
    .android_path("android")
    .ios_path("ios")
    .build();
}

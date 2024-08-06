const COMMANDS: &[&str] = &["ping", "get_db_user_version"];

fn main() {
  tauri_plugin::Builder::new(COMMANDS)
    .android_path("android")
    .ios_path("ios")
    .build();
}

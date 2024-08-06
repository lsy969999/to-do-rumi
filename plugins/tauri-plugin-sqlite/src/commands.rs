use tauri::{AppHandle, command, Runtime};

use crate::models::*;
use crate::Result;
use crate::SqliteExt;

#[command]
pub(crate) async fn ping<R: Runtime>(
    app: AppHandle<R>,
    payload: PingRequest,
) -> Result<PingResponse> {
    app.sqlite().ping(payload)
}

#[command]
pub(crate) async fn get_db_user_version<R: Runtime>(
    app: AppHandle<R>,
) -> Result<GetDbUserVersionRes> {
    app.sqlite().get_db_user_version(GetDbUserVersionReq)
}

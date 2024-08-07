use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct Todo {
    pub sn: u32,
    pub todo: String
}
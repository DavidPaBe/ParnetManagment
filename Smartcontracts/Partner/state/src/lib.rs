#![no_std]
use gmeta::metawasm;
use gstd::{prelude::*, ActorId};
use partner_io::*;

#[metawasm]
pub mod metafns {
    pub type State = Partner;

    pub fn user(state: State) -> ActorId {
        state.user
    }

    pub fn project(state: State) -> ActorId {
        state.project
    }

    pub fn partner_state(state: State) -> PartnerState {
        state.state
    }
}
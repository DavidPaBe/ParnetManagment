#![no_std]
use gstd::{msg, prelude::*, ActorId};
use partner_io::*;

static mut PARTNER: Option<Partner> = None;

#[no_mangle]
extern "C" fn handle() {
    let action: PartnerAction = msg::load().expect("Unable to decode `PartnerAction`");
    let partner: &mut Partner = unsafe { PARTNER.as_mut().expect("The contract is not initialized") };
    match action {
        PartnerAction::Depositar => partner.deposit(),
        PartnerAction::ConfirmarEnvio => partner.confirm_delivery(),
    }
}

#[no_mangle]
extern "C" fn init() {
    let init_config: InitPartner = msg::load().expect("Error in decoding `InitPartner`");
    let partner = Partner {
        user: init_config.user,
        project: init_config.project,
        price: init_config.price,
        state: PartnerState::EsperandoPago,
    };
    unsafe { PARTNER = Some(partner) };
}

#[no_mangle]
extern "C" fn state() {
    let partner = unsafe {
        PARTNER.get_or_insert(Default::default())
    };
    msg::reply(partner, 0).expect("Failed to share state");
}
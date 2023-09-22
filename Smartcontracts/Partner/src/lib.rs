// No depende de biblioteca de Rust
#![no_std]
// Modulos
use gstd::{msg, prelude::*, ActorId};
use partner_io::*;

// Inicialización variable mutable para el estado del partner
static mut PARTNER: Option<Partner> = None;

#[no_mangle]

// Funciones para el partner
extern "C" fn handle() {
    // Carga acción enviada al contrato
    let action: PartnerAction = msg::load().expect("Unable to decode `PartnerAction`");
    // Almaceno referencia del partner en variable estática
    let partner: &mut Partner = unsafe { PARTNER.as_mut().expect("The contract is not initialized") };

    match action {
        // Si la acción es "Depositar" entonces llama a deposit() del partner
        PartnerAction::Depositar => partner.deposit(),
        // Si la acción es "Confirmar" entonces llama a confirm_delivery() del partner
        PartnerAction::ConfirmarEnvio => partner.confirm_delivery(),
    }
}

#[no_mangle]

extern "C" fn init() {
    // Carga la confirmación inicial
    let init_config: InitPartner = msg::load().expect("Error in decoding `InitPartner`");
    // Crea una instancia de `Partner` utilizando la configuración inicial.
    let partner = Partner {
        user: init_config.user,
        project: init_config.project,
        price: init_config.price,
        state: PartnerState::EsperandoPago,
    };

    // Almaceno la instncia del partner
    unsafe { PARTNER = Some(partner) };
}

#[no_mangle]
extern "C" fn state() {

    // Guarda una referencia del estd actual del partner,
    // o por defecto crea uno.
    let partner = unsafe {
        PARTNER.get_or_insert(Default::default())
    };

    // Devuelve estado actual del partner
    msg::reply(partner, 0).expect("Failed to share state");
}
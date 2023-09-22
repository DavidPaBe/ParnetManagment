#![no_std]

use gmeta::{In, InOut, Metadata};
use gstd::{msg, prelude::*, ActorId};
use scale_info::TypeInfo;

pub struct ProgramMetadata;
// HOLA, GAY EL QUE LO LEA
impl Metadata for ProgramMetadata {
    type Init = In<InitPartner>;
    type Handle = InOut<PartnerAction, PartnerEvent>;
    type Reply = ();
    type Others = ();
    type Signal = ();
    type State = Partner;
}

#[derive(Encode, Decode, TypeInfo, PartialEq, Debug, Default)]
pub enum PartnerState {
    #[default]
    EsperandoPago,
    EsperandoEnvio,
    Closed,
}

#[derive(Encode, Decode, TypeInfo, Default)]
pub struct Partner {
    pub user: ActorId,
    pub project: ActorId,
    pub price: u128,
    pub state: PartnerState,
}

#[derive(Encode, Decode, TypeInfo)]
pub struct InitPartner {
    pub user: ActorId,
    pub project: ActorId,
    pub price: u128,
}

#[derive(Encode, Decode, TypeInfo)]
pub enum PartnerEvent {
    FondosDepositados,
    ConfirmarEnvio,
}

impl Partner {
    pub fn deposit(&mut self) {
        assert_eq!(
            self.state,
            PartnerState::EsperandoPago,
            "State must be `AwaitingPayment`"
        );

        assert_eq!(
            msg::source(),
            self.project,
            "The message sender must be a project"
        );

        assert_eq!(
            msg::value(),
            self.price,
            "The attached value must be equal to set price"
        );

        self.state = PartnerState::EsperandoEnvio;
        msg::reply(PartnerEvent::FondosDepositados, 0)
            .expect("Error in reply PartnerEvent::FondosDepositados");
    }
    pub fn confirm_delivery(&mut self) {}
}

#[derive(Encode, Decode, TypeInfo)]
pub enum PartnerAction {
    Depositar,
    ConfirmarEnvio,
}
#![no_std]

// Librerias necesarias.
use gmeta::{In, InOut, Metadata};
use gstd::{msg, prelude::*, ActorId};
use scale_info::TypeInfo;

// Definición de un tipo de metadatos para el programa.
pub struct ProgramMetadata;

// Implementación de la trait Metadata para ProgramMetadata.
impl Metadata for ProgramMetadata {
    type Init = In<InitPartner>;     // Mensaje de inicialización del programa.
    type Handle = InOut<PartnerAction, PartnerEvent>;     // Mensajes manejados por el programa con entrada y salida.
    type Reply = (); // Mensaje de respuesta.
    type Others = (); // Mensajes no especificados.
    type Signal = (); // Utilizada para manejar señales o eventos en los smart contracts.
    type State = Partner; // Tipo de estado en el programa, definido como partner.
}

// Definición del enum que representa los posibles estados de un socio o colaborador.
#[derive(Encode, Decode, TypeInfo, PartialEq, Debug, Default)]
pub enum PartnerState {
    #[default]
    EsperandoPago,
    EsperandoEnvio,
    Closed,
}

// Definición de la estructura que representa a un socio o colaborador.
#[derive(Encode, Decode, TypeInfo, Default)]
pub struct Partner {
    pub user: ActorId,
    pub project: ActorId,
    pub price: u128,
    pub state: PartnerState,
}

// Definición de la estructura que representa el mensaje de inicialización de un socio.
#[derive(Encode, Decode, TypeInfo)]
pub struct InitPartner {
    pub user: ActorId,
    pub project: ActorId,
    pub price: u128,
}

// Definición del enum que representa los eventos relacionados con un socio.
#[derive(Encode, Decode, TypeInfo)]
pub enum PartnerEvent {
    FondosDepositados,
    ConfirmarEnvio,
}

impl Partner {
    // Implementación de una función para realizar un depósito.
    pub fn deposit(&mut self) {

        // Verifica que el estado sea "EsperandoPago".
        assert_eq!(
            self.state,
            PartnerState::EsperandoPago,
            "State must be `AwaitingPayment`"
        );

        // Verificación sobre el remitente del mensaje para saber si es un proyecto.
        assert_eq!(
            msg::source(),
            self.project,
            "The message sender must be a project"
        );

        // Verificación sobre valor adjunto para que sea igual al precio establecido.
        assert_eq!(
            msg::value(),
            self.price,
            "The attached value must be equal to set price"
        );

        // Actualiza el estado a "EsperandoEnvio" y envía una respuesta.
        self.state = PartnerState::EsperandoEnvio;
        msg::reply(PartnerEvent::FondosDepositados, 0)
            .expect("Error in reply PartnerEvent::FondosDepositados");
    }
    
    // Función de confirmación de la entrega.
    pub fn confirm_delivery(&mut self) {}
}

// Definición del enum que representa las posibles acciones de un socio.
#[derive(Encode, Decode, TypeInfo)]
pub enum PartnerAction {
    Depositar,
    ConfirmarEnvio,
}
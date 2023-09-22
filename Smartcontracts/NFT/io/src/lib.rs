#![no_std]

// Librerias necesarias.
use gear_lib::non_fungible_token::{
    io::{NFTApproval, NFTTransfer, NFTTransferPayout},
    royalties::*,
    state::NFTState,
    token::*,
};
use gmeta::{In, InOut, Metadata};
use gstd::{prelude::*, ActorId};

// Importación de un mensaje de aprobación delegada.
pub use gear_lib::non_fungible_token::delegated::DelegatedApproveMessage;
use primitive_types::H256;

// Definición de metadatos para el NFT.
pub struct NFTMetadata;

// Definición de una estructura de restricciones para el NFT.
#[derive(Default, Debug, Encode, Decode, PartialEq, Eq, PartialOrd, Ord, Clone, TypeInfo, Hash)]
pub struct Constraints {
    pub max_mint_count: Option<u32>,
    pub authorized_minters: Vec<ActorId>,
}

// Definición de un mensaje de inicialización para el NFT.
#[derive(Default, Debug, Encode, Decode, PartialEq, Eq, PartialOrd, Ord, Clone, TypeInfo, Hash)]
pub struct InitNFT {
    pub collection: Collection,
    pub royalties: Option<Royalties>,
    pub constraints: Constraints,
}

// Definición de una estructura de colección para el NFT.
#[derive(Default, Debug, Encode, Decode, PartialEq, Eq, PartialOrd, Ord, Clone, TypeInfo, Hash)]
pub struct Collection {
    pub name: String,
    pub description: String,
}

// Implementación de la trait Metadata para NFTMetadata.
impl Metadata for NFTMetadata {
    type Init = In<InitNFT>;
    type Handle = InOut<NFTAction, NFTEvent>;
    type Reply = ();
    type Others = ();
    type Signal = ();
    type State = IoNFT;
}

// Definición de las acciones que pueden realizarse en relación al NFT.
#[derive(Debug, Encode, Decode, PartialEq, Eq, PartialOrd, Ord, Clone, TypeInfo, Hash)]
pub enum NFTAction {
    // Todas estas acciones representacion operaciones comunes en el NFT.
   
    Mint {
        transaction_id: u64,
        token_metadata: TokenMetadata,
    },
    Burn {
        transaction_id: u64,
        token_id: TokenId,
    },
    Transfer {
        transaction_id: u64,
        to: ActorId,
        token_id: TokenId,
    },
    TransferPayout {
        transaction_id: u64,
        to: ActorId,
        token_id: TokenId,
        amount: u128,
    },
    NFTPayout {
        owner: ActorId,
        amount: u128,
    },
    Approve {
        transaction_id: u64,
        to: ActorId,
        token_id: TokenId,
    },
    DelegatedApprove {
        transaction_id: u64,
        message: DelegatedApproveMessage,
        signature: [u8; 64],
    },
    Owner {
        token_id: TokenId,
    },
    IsApproved {
        to: ActorId,
        token_id: TokenId,
    },
    Clear {
        transaction_hash: H256,
    },
    AddMinter {
        transaction_id: u64,
        minter_id: ActorId,
    },
}

// Definición de eventos relacionados con el NFT.
#[derive(Debug, Encode, Decode, PartialEq, Eq, PartialOrd, Ord, Clone, TypeInfo, Hash)]
pub enum NFTEvent {
    Transfer(NFTTransfer),
    TransferPayout(NFTTransferPayout),
    NFTPayout(Payout),
    Approval(NFTApproval),
    Owner {
        owner: ActorId,
        token_id: TokenId,
    },
    IsApproved {
        to: ActorId,
        token_id: TokenId,
        approved: bool,
    },
    MinterAdded {
        minter_id: ActorId,
    },
}

// Definición de un estado para el NFT en formato IO.
#[derive(Default, Debug, Encode, Decode, PartialEq, Eq, PartialOrd, Ord, Clone, TypeInfo, Hash)]
pub struct IoNFTState {
    pub name: String,
    pub symbol: String,
    pub base_uri: String,
    pub owner_by_id: Vec<(TokenId, ActorId)>,
    pub token_approvals: Vec<(TokenId, Vec<ActorId>)>,
    pub token_metadata_by_id: Vec<(TokenId, Option<TokenMetadata>)>,
    pub tokens_for_owner: Vec<(ActorId, Vec<TokenId>)>,
    pub royalties: Option<Royalties>,
}

// Definición de una estructura de NFT en formato IO.
#[derive(Default, Debug, Encode, Decode, PartialEq, Eq, PartialOrd, Ord, Clone, TypeInfo, Hash)]
pub struct IoNFT {
    pub token: IoNFTState,
    pub token_id: TokenId,
    pub owner: ActorId,
    pub transactions: Vec<(H256, NFTEvent)>,
}

// Implementación para convertir desde NFTState a IoNFTState.
impl From<&NFTState> for IoNFTState {
    fn from(value: &NFTState) -> Self {
        // Mapeo de campos desde NFTState a IoNFTState.
        let NFTState {
            name,
            symbol,
            base_uri,
            owner_by_id,
            token_approvals,
            token_metadata_by_id,
            tokens_for_owner,
            royalties,
        } = value;

        let owner_by_id = owner_by_id
            .iter()
            .map(|(hash, actor_id)| (*hash, *actor_id))
            .collect();

        let token_approvals = token_approvals
            .iter()
            .map(|(key, approvals)| (*key, approvals.iter().copied().collect()))
            .collect();

        let token_metadata_by_id = token_metadata_by_id
            .iter()
            .map(|(id, metadata)| (*id, metadata.clone()))
            .collect();

        let tokens_for_owner = tokens_for_owner
            .iter()
            .map(|(id, tokens)| (*id, tokens.clone()))
            .collect();

        Self {
            name: name.clone(),
            symbol: symbol.clone(),
            base_uri: base_uri.clone(),
            owner_by_id,
            token_approvals,
            token_metadata_by_id,
            tokens_for_owner,
            royalties: royalties.clone(),
        }
    }
}

// Definición de una estructura para representar un NFT.
#[derive(Default, Debug, Encode, Decode, PartialEq, Eq, PartialOrd, Ord, Clone, TypeInfo, Hash)]
pub struct Nft {
    pub owner: ActorId,
    pub name: String,
    pub description: String,
    pub media_url: String,
    pub attrib_url: String,
}

// Definición de un estado general para el NFT.
#[derive(Default, Debug, Encode, Decode, PartialEq, Eq, PartialOrd, Ord, Clone, TypeInfo, Hash)]
pub struct State {
    pub tokens: Vec<(TokenId, Nft)>,
    pub owner: ActorId,
    pub transactions: Vec<(H256, NFTEvent)>,
    pub owners: Vec<(ActorId, TokenId)>,
    pub collection: Collection,
    pub nonce: TokenId,
    pub constraints: Constraints,
}
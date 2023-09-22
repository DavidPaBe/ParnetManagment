use partner_io::{InitPartner, PartnerAction, PartnerEvent};
use gtest::{Log, Program, System};

const PROJECT: u64 = 100;
const USER: u64 = 101;
const PRICE: u128 = 100_000;

#[test]
fn deposit() {
    let sys = System::new();
    sys.init_logger();
    let partner = Program::current(&sys);
    let res = partner.send(
        USER,
        InitPartner {
            user: USER.into(),
            project: PROJECT.into(),
            price: PRICE,
        },
    );
    assert!(!res.main_failed());
}
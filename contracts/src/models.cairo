use starknet::ContractAddress;

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct User {
    #[key]
    pub user_address: ContractAddress,
    pub team_stats: u128,
    pub history: History
}


#[derive(Copy, Drop, Debug, Serde, IntrospectPacked)]
pub struct History {
    wins: u8,
    losses: u8,
    draw: u8
}

#[derive(Copy, Drop, Serde, Debug, IntrospectPacked,PartialEq)]
#[dojo::model]
pub struct ProposalMatch {
    #[key]
    id: u8,
    #[key]
    player: ContractAddress,
    bet_size: u8,
    played: bool,
}


#[derive(Copy, Drop, Debug, Serde,PartialEq)]
#[dojo::model]
pub struct Match {
    #[key]
    id: u64,
    match_score: (u8, u8),
    proposal_local: ProposalMatch,
    proposal_visitant: ProposalMatch,
    winner_match: ContractAddress,
    is_finish: bool
}

#[derive(Copy, Drop, Serde, Debug)]
pub struct Shoot {
    match_id: u8,
    nonce: u8,
    shooter_address: ContractAddress,
    stopper_address: ContractAddress,
    shooter_point: Vec2,
    stopper_point_a: Vec2,
    stopper_point_b: Vec2,
}


#[derive(Copy, Drop, Serde, IntrospectPacked, Debug)]
pub struct Vec2 {
    pub x: u8,
    pub y: u8
}


#[generate_trait]
impl Vec2Impl of Vec2Trait {
    fn is_zero(self: Vec2) -> bool {
        if self.x - self.y == 0 {
            return true;
        }
        false
    }

    fn is_equal(self: Vec2, b: Vec2) -> bool {
        self.x == b.x && self.y == b.y
    }
}


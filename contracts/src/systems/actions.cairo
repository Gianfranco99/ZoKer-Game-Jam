use dojo_starter::models::{ProposalMatch, Vec2, Match, Shoot};
use starknet::ContractAddress;

// define the interface
#[starknet::interface]
trait IActions<T> {
    fn create_match(ref self: T, match_results: Match);
    fn find_match(ref self: T, match_proposal: ProposalMatch) -> u8;

    //Getters
    fn get_score(self: @T, match_id: u64) -> (u8, u8);
    fn get_result(self: @T, match_id: u64) -> (ContractAddress, (u8, u8));
}

#[dojo::contract]
pub mod actions {
    use super::{IActions};
    use starknet::{ContractAddress, get_caller_address};
    use dojo_starter::models::{Vec2, ProposalMatch, Shoot, Match};

    use dojo::model::{ModelStorage, ModelValueStorage};
    use dojo::event::EventStorage;


    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct ProposalCreated {
        #[key]
        pub proposal_id: u8,
        pub player_address: ContractAddress
    }

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct MatchCreated {
        #[key]
        pub match_id: u64,
        pub match_score: (u8, u8),
        pub proposal_local: ProposalMatch,
        pub proposal_visitant: ProposalMatch,
        pub winner_match: ContractAddress,
        pub is_finish: bool
    }


    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn create_match(ref self: ContractState, match_results: Match) {
            let mut world = self.world(@"dojo_starter");
            world.write_model(@match_results);
            world
                .emit_event(
                    @MatchCreated {
                        match_id: match_results.id,
                        match_score: match_results.match_score,
                        proposal_local: match_results.proposal_local,
                        proposal_visitant: match_results.proposal_visitant,
                        winner_match: match_results.winner_match,
                        is_finish: match_results.is_finish
                    }
                )
        }


        fn find_match(ref self: ContractState, match_proposal: ProposalMatch) -> u8 {
            let mut world = self.world(@"dojo_starter");

            let player_address = get_caller_address();

            let proposal_match = ProposalMatch {
                id: 0, player: player_address, bet_size: match_proposal.bet_size, played: false
            };

            world.write_model(@proposal_match);

            world.emit_event(@ProposalCreated { proposal_id: proposal_match.id, player_address });

            proposal_match.id
        }


        //GETTERS FUNCTIONS

        fn get_score(self: @ContractState, match_id: u64) -> (u8, u8) {
            let mut world = self.world(@"dojo_starter");
            let live_match: Match = world.read_model(match_id);

            live_match.match_score
        }

        fn get_result(self: @ContractState, match_id: u64) -> (ContractAddress, (u8, u8)) {
            let mut world = self.world(@"dojo_starter");
            let match_finished: Match = world.read_model(match_id);

            assert(match_finished.is_finish, 'Match not finish');

            return (match_finished.winner_match, (match_finished.match_score));
        }
    }
}


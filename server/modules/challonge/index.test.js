import {
  test
} from './index.js'

describe('challonge parseTournament single elimination', () => {
  it('returns a completed tournament', () => {
    const challongeTournament = {
      "tournament": {
        "id": 3195456,
        "name": "elimination1",
        "url": "a665dwbc",
        "description": "",
        "tournament_type": "single elimination",
        "started_at": "2017-02-07T02:36:06.844+00:00",
        "completed_at": null,
        "require_score_agreement": false,
        "notify_users_when_matches_open": true,
        "created_at": "2017-02-07T02:33:46.517+00:00",
        "updated_at": "2017-02-07T02:36:06.985+00:00",
        "state": "underway",
        "open_signup": false,
        "notify_users_when_the_tournament_ends": true,
        "progress_meter": 0,
        "quick_advance": false,
        "hold_third_place_match": false,
        "pts_for_game_win": "0.0",
        "pts_for_game_tie": "0.0",
        "pts_for_match_win": "1.0",
        "pts_for_match_tie": "0.5",
        "pts_for_bye": "1.0",
        "swiss_rounds": 0,
        "private": false,
        "ranked_by": "match wins",
        "show_rounds": true,
        "hide_forum": false,
        "sequential_pairings": false,
        "accept_attachments": false,
        "rr_pts_for_game_win": "0.0",
        "rr_pts_for_game_tie": "0.0",
        "rr_pts_for_match_win": "1.0",
        "rr_pts_for_match_tie": "0.5",
        "created_by_api": false,
        "credit_capped": false,
        "category": null,
        "hide_seeds": false,
        "prediction_method": 0,
        "predictions_opened_at": null,
        "anonymous_voting": false,
        "max_predictions_per_user": 1,
        "signup_cap": null,
        "game_id": null,
        "participants_count": 6,
        "group_stages_enabled": false,
        "allow_participant_match_reporting": true,
        "teams": false,
        "check_in_duration": null,
        "start_at": null,
        "started_checking_in_at": null,
        "tie_breaks": [
          "match wins vs tied",
          "game wins",
          "points scored"
        ],
        "locked_at": null,
        "event_id": null,
        "public_predictions_before_start_time": false,
        "ranked": null,
        "grand_finals_modifier": null,
        "predict_the_losers_bracket": false,
        "participants": [
          {
            "participant": {
              "id": 1,
              "tournament_id": 3195456,
              "name": "p1",
              "seed": 1,
              "active": true,
              "created_at": "2017-02-07T02:33:56.635+00:00",
              "updated_at": "2017-02-07T02:33:56.635+00:00",
              "invite_email": null,
              "final_rank": null,
              "misc": null,
              "icon": null,
              "on_waiting_list": false,
              "invitation_id": null,
              "group_id": null,
              "checked_in_at": null,
              "challonge_username": null,
              "challonge_email_address_verified": null,
              "removable": true,
              "participatable_or_invitation_attached": false,
              "confirm_remove": true,
              "invitation_pending": false,
              "display_name_with_invitation_email_address": "p1",
              "email_hash": null,
              "username": null,
              "display_name": "p1",
              "attached_participatable_portrait_url": null,
              "can_check_in": false,
              "checked_in": false,
              "reactivatable": false,
              "group_player_ids": []
            }
          },
          {
            "participant": {
              "id": 2,
              "tournament_id": 3195456,
              "name": "p2",
              "seed": 2,
              "active": true,
              "created_at": "2017-02-07T02:34:10.041+00:00",
              "updated_at": "2017-02-07T02:34:10.041+00:00",
              "invite_email": null,
              "final_rank": null,
              "misc": null,
              "icon": null,
              "on_waiting_list": false,
              "invitation_id": null,
              "group_id": null,
              "checked_in_at": null,
              "challonge_username": null,
              "challonge_email_address_verified": null,
              "removable": true,
              "participatable_or_invitation_attached": false,
              "confirm_remove": true,
              "invitation_pending": false,
              "display_name_with_invitation_email_address": "p2",
              "email_hash": null,
              "username": null,
              "display_name": "p2",
              "attached_participatable_portrait_url": null,
              "can_check_in": false,
              "checked_in": false,
              "reactivatable": false,
              "group_player_ids": []
            }
          },
          {
            "participant": {
              "id": 3,
              "tournament_id": 3195456,
              "name": "p3",
              "seed": 3,
              "active": true,
              "created_at": "2017-02-07T02:34:10.069+00:00",
              "updated_at": "2017-02-07T02:34:10.069+00:00",
              "invite_email": null,
              "final_rank": null,
              "misc": null,
              "icon": null,
              "on_waiting_list": false,
              "invitation_id": null,
              "group_id": null,
              "checked_in_at": null,
              "challonge_username": null,
              "challonge_email_address_verified": null,
              "removable": true,
              "participatable_or_invitation_attached": false,
              "confirm_remove": true,
              "invitation_pending": false,
              "display_name_with_invitation_email_address": "p3",
              "email_hash": null,
              "username": null,
              "display_name": "p3",
              "attached_participatable_portrait_url": null,
              "can_check_in": false,
              "checked_in": false,
              "reactivatable": false,
              "group_player_ids": []
            }
          },
          {
            "participant": {
              "id": 4,
              "tournament_id": 3195456,
              "name": "p4",
              "seed": 4,
              "active": true,
              "created_at": "2017-02-07T02:34:10.106+00:00",
              "updated_at": "2017-02-07T02:34:10.106+00:00",
              "invite_email": null,
              "final_rank": null,
              "misc": null,
              "icon": null,
              "on_waiting_list": false,
              "invitation_id": null,
              "group_id": null,
              "checked_in_at": null,
              "challonge_username": null,
              "challonge_email_address_verified": null,
              "removable": true,
              "participatable_or_invitation_attached": false,
              "confirm_remove": true,
              "invitation_pending": false,
              "display_name_with_invitation_email_address": "p4",
              "email_hash": null,
              "username": null,
              "display_name": "p4",
              "attached_participatable_portrait_url": null,
              "can_check_in": false,
              "checked_in": false,
              "reactivatable": false,
              "group_player_ids": []
            }
          },
          {
            "participant": {
              "id": 5,
              "tournament_id": 3195456,
              "name": "p5",
              "seed": 5,
              "active": true,
              "created_at": "2017-02-07T02:34:10.139+00:00",
              "updated_at": "2017-02-07T02:34:10.139+00:00",
              "invite_email": null,
              "final_rank": null,
              "misc": null,
              "icon": null,
              "on_waiting_list": false,
              "invitation_id": null,
              "group_id": null,
              "checked_in_at": null,
              "challonge_username": null,
              "challonge_email_address_verified": null,
              "removable": true,
              "participatable_or_invitation_attached": false,
              "confirm_remove": true,
              "invitation_pending": false,
              "display_name_with_invitation_email_address": "p5",
              "email_hash": null,
              "username": null,
              "display_name": "p5",
              "attached_participatable_portrait_url": null,
              "can_check_in": false,
              "checked_in": false,
              "reactivatable": false,
              "group_player_ids": []
            }
          },
          {
            "participant": {
              "id": 6,
              "tournament_id": 3195456,
              "name": "p6",
              "seed": 6,
              "active": true,
              "created_at": "2017-02-07T02:34:10.169+00:00",
              "updated_at": "2017-02-07T02:34:10.169+00:00",
              "invite_email": null,
              "final_rank": null,
              "misc": null,
              "icon": null,
              "on_waiting_list": false,
              "invitation_id": null,
              "group_id": null,
              "checked_in_at": null,
              "challonge_username": null,
              "challonge_email_address_verified": null,
              "removable": true,
              "participatable_or_invitation_attached": false,
              "confirm_remove": true,
              "invitation_pending": false,
              "display_name_with_invitation_email_address": "p6",
              "email_hash": null,
              "username": null,
              "display_name": "p6",
              "attached_participatable_portrait_url": null,
              "can_check_in": false,
              "checked_in": false,
              "reactivatable": false,
              "group_player_ids": []
            }
          }
        ],
        "matches": [
          {
            "match": {
              "id": 80234964,
              "tournament_id": 3195456,
              "state": "open",
              "player1_id": 4,
              "player2_id": 5,
              "player1_prereq_match_id": null,
              "player2_prereq_match_id": null,
              "player1_is_prereq_match_loser": false,
              "player2_is_prereq_match_loser": false,
              "winner_id": null,
              "loser_id": null,
              "started_at": "2017-02-07T02:36:06.937+00:00",
              "created_at": "2017-02-07T02:36:06.815+00:00",
              "updated_at": "2017-02-07T02:36:06.938+00:00",
              "identifier": "A",
              "has_attachment": false,
              "round": 1,
              "player1_votes": null,
              "player2_votes": null,
              "group_id": null,
              "attachment_count": null,
              "scheduled_time": null,
              "location": null,
              "underway_at": null,
              "optional": false,
              "rushb_id": null,
              "completed_at": null,
              "suggested_play_order": 1,
              "prerequisite_match_ids_csv": "",
              "scores_csv": ""
            }
          },
          {
            "match": {
              "id": 80234965,
              "tournament_id": 3195456,
              "state": "open",
              "player1_id": 3,
              "player2_id": 6,
              "player1_prereq_match_id": null,
              "player2_prereq_match_id": null,
              "player1_is_prereq_match_loser": false,
              "player2_is_prereq_match_loser": false,
              "winner_id": null,
              "loser_id": null,
              "started_at": "2017-02-07T02:36:06.958+00:00",
              "created_at": "2017-02-07T02:36:06.822+00:00",
              "updated_at": "2017-02-07T02:36:06.958+00:00",
              "identifier": "B",
              "has_attachment": false,
              "round": 1,
              "player1_votes": null,
              "player2_votes": null,
              "group_id": null,
              "attachment_count": null,
              "scheduled_time": null,
              "location": null,
              "underway_at": null,
              "optional": false,
              "rushb_id": null,
              "completed_at": null,
              "suggested_play_order": 2,
              "prerequisite_match_ids_csv": "",
              "scores_csv": ""
            }
          },
          {
            "match": {
              "id": 80234966,
              "tournament_id": 3195456,
              "state": "pending",
              "player1_id": 1,
              "player2_id": null,
              "player1_prereq_match_id": null,
              "player2_prereq_match_id": 80234964,
              "player1_is_prereq_match_loser": false,
              "player2_is_prereq_match_loser": false,
              "winner_id": null,
              "loser_id": null,
              "started_at": null,
              "created_at": "2017-02-07T02:36:06.828+00:00",
              "updated_at": "2017-02-07T02:36:06.828+00:00",
              "identifier": "C",
              "has_attachment": false,
              "round": 2,
              "player1_votes": null,
              "player2_votes": null,
              "group_id": null,
              "attachment_count": null,
              "scheduled_time": null,
              "location": null,
              "underway_at": null,
              "optional": false,
              "rushb_id": null,
              "completed_at": null,
              "suggested_play_order": 3,
              "prerequisite_match_ids_csv": "80234964",
              "scores_csv": ""
            }
          },
          {
            "match": {
              "id": 80234967,
              "tournament_id": 3195456,
              "state": "pending",
              "player1_id": 2,
              "player2_id": null,
              "player1_prereq_match_id": null,
              "player2_prereq_match_id": 80234965,
              "player1_is_prereq_match_loser": false,
              "player2_is_prereq_match_loser": false,
              "winner_id": null,
              "loser_id": null,
              "started_at": null,
              "created_at": "2017-02-07T02:36:06.834+00:00",
              "updated_at": "2017-02-07T02:36:06.834+00:00",
              "identifier": "D",
              "has_attachment": false,
              "round": 2,
              "player1_votes": null,
              "player2_votes": null,
              "group_id": null,
              "attachment_count": null,
              "scheduled_time": null,
              "location": null,
              "underway_at": null,
              "optional": false,
              "rushb_id": null,
              "completed_at": null,
              "suggested_play_order": 4,
              "prerequisite_match_ids_csv": "80234965",
              "scores_csv": ""
            }
          },
          {
            "match": {
              "id": 80234968,
              "tournament_id": 3195456,
              "state": "pending",
              "player1_id": null,
              "player2_id": null,
              "player1_prereq_match_id": 80234966,
              "player2_prereq_match_id": 80234967,
              "player1_is_prereq_match_loser": false,
              "player2_is_prereq_match_loser": false,
              "winner_id": null,
              "loser_id": null,
              "started_at": null,
              "created_at": "2017-02-07T02:36:06.839+00:00",
              "updated_at": "2017-02-07T02:36:06.839+00:00",
              "identifier": "E",
              "has_attachment": false,
              "round": 3,
              "player1_votes": null,
              "player2_votes": null,
              "group_id": null,
              "attachment_count": null,
              "scheduled_time": null,
              "location": null,
              "underway_at": null,
              "optional": false,
              "rushb_id": null,
              "completed_at": null,
              "suggested_play_order": 5,
              "prerequisite_match_ids_csv": "80234966,80234967",
              "scores_csv": ""
            }
          }
        ],
        "description_source": "",
        "subdomain": null,
        "full_challonge_url": "http://challonge.com/a665dwbc",
        "live_image_url": "http://challonge.com/a665dwbc.svg",
        "sign_up_url": null,
        "review_before_finalizing": true,
        "accepting_predictions": false,
        "participants_locked": true,
        "game_name": null,
        "participants_swappable": false,
        "team_convertable": false,
        "group_stages_were_started": false
      }
    }
    const tournament = test.parseTournament(challongeTournament)
    expect(tournament.type).toEqual('SingleElimination')
    const matches = tournament.matches
    expect(matches).toHaveLength(7)
    const findMatchByOrder = (order) => matches.find( (m) => m.order === order)


    expect(findMatchByOrder(7)).toBeMatch({player1: null, player2: null, order: 7, round: 3})
    expect(findMatchByOrder(6)).toBeMatch({player1: {id:2}, player2: null, order: 6, round: 2})
    expect(findMatchByOrder(5)).toBeMatch({player1: {id:1}, player2: null, order: 5, round: 2})
    expect(findMatchByOrder(4)).toBeMatch({player1: {id:3}, player2: {id:6}, order: 4, round: 1})
    expect(findMatchByOrder(3)).toBeMatch({player1: {id:2}, player2: null, order: 3, round: 1})
    expect(findMatchByOrder(2)).toBeMatch({player1: {id:4}, player2: {id:5}, order: 2, round: 1})
    expect(findMatchByOrder(1)).toBeMatch({player1: {id:1}, player2: null, order: 1, round: 1})

  })
})
expect.extend({
  toBeMatch(received, expected) {
    const fail = (property) => ({
      pass:false,
      message:`expect value ${this.utils.printExpected(expected[property])} for property ${property} but got ${this.utils.printReceived(received[property])}\
      \n\nFull expected object: ${this.utils.printExpected(expected)}\
      \n\nFull received object: ${this.utils.printReceived(received)}\
      `
    })

    for(let key in expected) {
      if(typeof expected[key] === 'object' ) {
        expect(received[key]).toBeMatch(expected[key])
      }
      else if(expected[key] !== received[key]) {
        return fail(key)
      }
    }

    return {pass:true}
  }
})

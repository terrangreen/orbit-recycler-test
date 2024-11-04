// crewManager.js

import { getState } from "../app/gameState";

function addCrewMember() {
    const crewMembers = getState('crewMembers');
    crewMembers.count++;
    // Optional: Adjust consumption rates if needed or trigger events
  }
  
  function removeCrewMember() {
    if (state.crewMembers.count > 0) {
      state.crewMembers.count--;
      // Optional: Adjust consumption rates if needed or trigger events
    }
  }  
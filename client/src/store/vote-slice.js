import { createSlice } from "@reduxjs/toolkit";

// const currentVoter = { id: "", token: "", isAdmin: false };
const currentVoter = JSON.parse(localStorage.getItem("currentUser")) || {
  id: "",
  token: "",
  isAdmin: false,
};

const initialState = {
  selectedVoteCandidate: "",
  currentVoter,
  selectedElection: "",
  idOfElectionToUpdate: "",
  addCandidateElectionId: "",
};

const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    changeSelectedVoteCandidate(state, action) {
      state.selectedVoteCandidate = action.payload;
    },
    changeCurrentVoter(state, action) {
      state.currentVoter = action.payload;
    },
    changeSelectedElection(state, action) {
      state.selectedElection = action.payload;
    },
    changeIdOfElectionToUpdate(state, action) {
      state.idOfElectionToUpdate = action.payload;
    },
    changeAddCandidateElectionId(state, action) {
      state.addCandidateElectionId = action.payload;
    },
  },
});

export const voteActions = voteSlice.actions;

export default voteSlice;

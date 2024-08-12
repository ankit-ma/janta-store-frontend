const initialState = {
  activity: [],
};

const activityreducer = (state = initialState, action) => {
  console.log("Action reducer: ", action);
  switch (action.type) {
    case "PARENT":
      return {
        ...state,

        activity: action.payload,
      };

    default:
      return state;
  }
};

export default activityreducer;

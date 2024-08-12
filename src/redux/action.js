export const login = (data) => ({
  type: "LOGIN",
  payload: {
    username: data.name,
  },
});

export const logout = () => ({
  type: "LOGOUT",
});

export const fetchActivityData = (activityData) => ({
  type: "PARENT",
  payload: { activityData },
});

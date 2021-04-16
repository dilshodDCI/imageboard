/* eslint-disable import/no-anonymous-default-export */
//import Posts from "../components/Posts/Posts";

export default (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    default:
      return posts;
  }
};

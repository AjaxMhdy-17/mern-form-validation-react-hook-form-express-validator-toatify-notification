import axios from "axios";

export const createPost = (postData) => {
  return (dispatch) => {
    console.log(postData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`/api/create_post`, postData, { config })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

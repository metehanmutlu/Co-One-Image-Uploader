import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-co-one-task-d23fc.cloudfunctions.net/api/",
  // baseURL: "https://co-one-task-api.herokuapp.com/api/",
  // baseURL: "http://localhost:3000/api/",
});

export default instance;

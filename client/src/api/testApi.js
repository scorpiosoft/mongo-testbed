import axios from "axios";

const getAge = () =>
{
  return axios.get("/api/test/age");
}
const setAge = () =>
{
  return axios.post("/api/test/age");
}
const testApi = { getAge, setAge };
export default testApi;
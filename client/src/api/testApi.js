import axios from "axios";

const getAge = () =>
{
  return axios.get("http://localhost:3001/api/test/age");
}
const setAge = () =>
{
  return axios.post("http://localhost:3001/api/test/age");
}
const testApi = { getAge, setAge };
export default testApi;
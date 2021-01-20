import axios from "axios";

const getAge = (data) =>
{
  return axios.get("http://localhost:3001/api/test/age", data);
}
const setAge = (data) =>
{
  return axios.post("http://localhost:3001/api/test/age", data);
}
const testApi = { getAge, setAge };
export default testApi;
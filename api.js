//const API_KEY = "81ba2e9858004b88b95155122233001";
const BASE_URL = `https://api.weatherapi.com/v1/current.json?key=81ba2e9858004b88b95155122233001&q=`;

const GET = async (city) => {
  const res = await fetch(`${BASE_URL}${city}`);
  const data = await res.json();
  return data;
};
export { GET };

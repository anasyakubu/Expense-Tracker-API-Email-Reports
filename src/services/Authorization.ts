import axios from "axios";

const MONNIFY_API = "https://sandbox.monnify.com";


export default class Authorization {

  private MONNIFY_API: string;

  constructor() {
    this.MONNIFY_API = MONNIFY_API;
  }

  public async MonnifyAccessToken() {
    try {

      const response = await axios.post(`${this.MONNIFY_API}/api/v1/auth/login`, {},
        { headers: { 'Content-Type': 'application/json', }, }
      );

      console.log("Monnify Access Token Response:", response.data); // for debugging (1)

      return response.data;

    } catch (error: any) {
      console.error('Error getting Monnify access token:', error.message);
      throw new Error('Failed to get Monnify access token');
    }
  }

}

const authorization = new Authorization();

const MonnifyAccessToken = async () => {
  return await authorization.MonnifyAccessToken();
};

export { MonnifyAccessToken }
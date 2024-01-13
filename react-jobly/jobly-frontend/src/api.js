import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
 
class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;


  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    // try{
    //   this.token = localStorage.getItem("token")
    // } catch(e) {
    //   return e
    // }
    
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all jobs. */
  static async getAllJobs(){
    let res = await this.request(`jobs`);
    return res.jobs
  }

  /** Get job by ID */
  static async getJobById(id){
    let res = await this.request(`jobs/${id}`);
    return res.job
  }


  /** Get jobs by company handle */
  static async getCompanyJobs(handle){
    let res = await this.request(`companies/${handle}`);
    return res.company.jobs
  }

  /** Apply for job */
  static async applyForJob(username, jobId){
    let res = await this.request(`${username}/jobs/${jobId}`, "post");
    return res
  }

  /** Search by job title */
  static async getJobs(title){
    let res = await this.request(`jobs?title=${title}`);
    return res.jobs
  }

  /** Get all companies */
  static async getAllCompanies(){
    let res = await this.request(`companies`);
    return res.companies
  }

  /** Login */ 
  static async login(data){
    console.log("----------Login called")
    let res = await this.request('auth/token', data, "post");
    console.log(`token -- ${res.token}`)
    return res.token
  }

  /** Signup */
  static async register(data){
    console.log(data)
    let res = await this.request(`auth/register`, data, "post");
    return res
  }

  /** Get current user */
  static async getUser(username){
    console.log("----------getuser called")
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update User */
  static async patchUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch")
    return res;
  }

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

    export default JoblyApi
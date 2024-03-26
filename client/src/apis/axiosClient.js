import axios from 'axios'
const env = process.env.NODE_ENV;
const baseUrl= env === "development" ? process.env.REACT_APP_API_LOCAL:process.env.REACT_APP_API_HOST;
const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  axiosClient.interceptors.request.use(config => {
    // Customize config before sending request
    return config;
  }, error => {
    // Do something with request error
    return Promise.reject(error);
  });
  axiosClient.interceptors.response.use(response => {
   if(response && response.data){
       return response.data
   }
    return response.data;
  }
  , error => {
    // Do something with response error
    return Promise.reject(error);
  }
  );

 export default axiosClient
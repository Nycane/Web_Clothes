import Toast from "../components/Toastify/Toastify";
const apiService ={
    handleApi({response}){
        console.log("handleApi",response)
        // // handle api success
        // if (response.status === 200) {
        //     // Nếu response status là 200, coi đó là thành công và không xử lý lỗi
        //     Toast("success",response.message) 
        //     return response;
        // }
        // Handle api eror
        if (response?.data?.status === 400) {
            // Xử lý lỗi 400 (Bad Request)
            Toast("error", response.data.message);
            // return Promise.reject(response.data);
            throw  new Error(response.data.message);

        }
        if (response?.data?.status === 401) {
            // if(response.data.message==="RefreshToken Invalid" || response.data.message==="RefreshToken Exprise"){              
            // }
            // Xử lý lỗi 401 (Unauthorized)
            Toast("error", response.data.message);
            // Chuyển hướng hoặc thực hiện các hành động khác liên quan đến quyền truy cập
            // return Promise.reject(response.data);
            throw  new Error(response.data.message);

        }
        if (response?.data?.status === 403) {
            // Xử lý lỗi 401 (Unauthorized)
            Toast("error", response.data.message);
            // Chuyển hướng hoặc thực hiện các hành động khác liên quan đến quyền truy cập
            // return Promise.reject(response.data);
            throw  new Error(response.data.message);
        }
    
        if (response?.data?.status === 404) {
            // Xử lý lỗi 404 (Not Found)
            Toast("error",response.data.message);
            // return Promise.reject(response.data);
            throw  new Error(response.data.message);
        }
        if (response?.data?.status === 500) {
            // Xử lý lỗi 404 (Not Found)
            Toast("error",response.data.message);
            // return Promise.reject(response.data);
            throw  new Error(response.data.message);
        }
        // Xử lý các trường hợp lỗi khác không được xác định trước
        Toast("error", "An unexpected error occurred.");
        // return Promise.reject(response);
        throw  new Error(response.data.message);

    }
}
// const apiService = {
//     handleApi(response) {
//       console.log("handleApi", response);
  
//       return new Promise((resolve, reject) => {
//         // handle api success
//         if (response.status === 200) {
//           Toast("success", response.message);
//           resolve(response);
//         }
  
//         // Handle api error
//         let { response: error } = response;
//         console.log(error);
  
//         switch (error.data.status) {
//           case 400:
//             // Xử lý lỗi 400 (Bad Request)
//             Toast("error", error.data.message);
//             reject(error.data);
//             break;
  
//           case 401:
//           case 403:
//             // Xử lý lỗi 401 hoặc 403 (Unauthorized)
//             Toast("error", error.data.message);
//             // Chuyển hướng hoặc thực hiện các hành động khác liên quan đến quyền truy cập
//             reject(error.data);
//             break;
  
//           case 404:
//           case 500:
//             // Xử lý lỗi 404 hoặc 500 (Not Found hoặc Internal Server Error)
//             Toast("error", error.data.message);
//             reject(error.data);
//             break;
  
//           default:
//             // Xử lý các trường hợp lỗi khác không được xác định trước
//             Toast("error", "An unexpected error occurred.");
//             reject(error);
//         }
//       });
//     },
//   };
  
  export default apiService;
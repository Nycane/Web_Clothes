import Toast from "../components/Toastify/Toastify";
const apiService ={
    handleApi({response}){
        // Handle api eror
        if (response?.data?.status === 400) {
            // Xử lý lỗi 400 (Bad Request)
            Toast("error", response.data.message);
            // return Promise.reject(response.data);
            throw  new Error(response.data.message);

        }
        if (response?.data?.status === 401) {
            // Xử lý lỗi 401 (Unauthorized)
            Toast("error", response.data.message);
            // Chuyển hướng hoặc thực hiện các hành động khác liên quan đến quyền truy cập
            throw  new Error(response.data.message);

        }
        if (response?.data?.status === 403) {
            // Xử lý lỗi 401 (Unauthorized)
            Toast("error", response.data.message);
            // Chuyển hướng hoặc thực hiện các hành động khác liên quan đến quyền truy cập
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
  export default apiService;
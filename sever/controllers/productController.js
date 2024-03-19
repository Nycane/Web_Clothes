const productService = require("../service/productService");
const handleResponse = require("../utils/handleResponse");
class productsController {
  // Get products
  async getProducts(req, res) {
    try {
      const result = await productService.getProducts();
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  // Get product best sellers
  async getBestSellerProducts(req, res) {
    try {
      const result = await productService.getBestSellerProducts();
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  // Get product trending
  async getTrendingProducts(req, res) {
    try {
      const result = await productService.getTrendingProducts();
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }
  
  async getRelatedProducts(req,res) {
    const id=req.params.id
    try {
      const result = await productService.getRelatedProducts(id);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  // Get product variant by id
  async getProductById(req, res) {
    try {
      const id = req.params.id;
      const result = await productService.getProductById(id);
      if(result.status !== 200) return handleResponse.sendError(res,res.status,result.message)
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  //Search product
  async getSearchProduct(req, res) {
    try {
      const result = await productService.getSearchProduct(req.query.q);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  // Get image product
  async getProductImageById(req, res) {
    try {
      const result = await productService.getProductImageById(req.params.id);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  // Get color product --------------------------
  async getProductColors(req, res) {
    try {
      const result = await productService.getProductColors();
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      handleResponse.sendError(res);
    }
  }

  async getProductColorByBrand(req, res) {
    try {
      const name = req.params.name;
      const result = await productService.getProductColorByBrand(name);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  async getProductColorByCategory(req, res) {
    try {
      const name = req.params.name;
      const result = await productService.getProductColorByCategory(name);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }
  // ------------------------------------------------

  //Get Size product--------------------------------
  async getProductSizes(req, res) {
    try {
      const result = await productService.getProductSizes();
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  async getProductSizeByBrand(req, res) {
    const name = req.params.name;
    try {
      const result = await productService.getProductSizeByBrand(name);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  async getProductSizeByCategory(req, res) {
    const name = req.params.name;
    try {
      const result = await productService.getProductSizeByCategory(name);
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }
  // --------------------------------------------------

  // Get categories
  async getProductCategories(req, res) {
    try {
      const result = await productService.getProductCategories();
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }
  async getProductBrands(req, res) {
    try {
      const result = await productService.getProductBrands();
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }
  async getLookBooks(req, res) {
    try {
      const result = await productService.getLookBooks();
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }

  //Filter product
  async filterProducts(req, res) {
    const { sort, min_price, max_price, color, size, category, brand } =
      req.query;
    try {
      const result = await productService.filterProducts(
        sort,
        min_price,
        max_price,
        color,
        size,
        category,
        brand
      );
      return handleResponse.sendSuccess(res, result.message, result.data);
    } catch (error) {
      console.log(error);
      return handleResponse.sendError(res);
    }
  }
}
module.exports = new productsController();

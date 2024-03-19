const pool = require("../db");
const utils = require("../utils/myUtils");
const handleResponse = require("../utils/handleResponse");
class productService {
  // GET PRODUCTS
  async getProducts() {
    try {
      const products = await this.selectAllProducts();
      let productVariants = await this.selectProductVariants(products);
      return handleResponse.createResponse(200, "Success", productVariants);
    } catch (error) {
      throw error;
    }
  }
  // GET BEST SELLER PRODUCTS
  async getBestSellerProducts() {
    try {
      const products = await this.selectBestSellerProducts();
      let productVariants = await this.selectProductVariants(products);
      return handleResponse.createResponse(200, "Success", productVariants);
    } catch (error) {
      throw error;
    }
  }
  //GET  TRENDING PRODUCTS
  async getTrendingProducts() {
    try {
      const products = await this.selectTrendingProducts();
      let productVariants = await this.selectProductVariants(products);
      return handleResponse.createResponse(200, "Success", productVariants);
    } catch (error) {
      throw error;
    }
  }
  // GET RELATED PRODUCTS
  async getRelatedProducts(idProduct) {
    try {
      const products = await this.selectRelatedProducts(idProduct);
      let productVariants = await this.selectProductVariants(products);
      return handleResponse.createResponse(200, "Success", productVariants);
    } catch (error) {
      throw error;
    }
  }
  //GET PRODUCT BY ID
  async getProductById(productId) {
    try {
      const product = await this.selectProductById(productId);
      if (utils.arrayIsEmpty(product))
        return handleResponse.createResponse(404, "Failed");
      const variant = await this.selectVariantById(productId);
      const data = { ...product[0], variant };
      return handleResponse.createResponse(200, "Success", data);
    } catch (error) {
      throw error;
    }
  }
  // GET SEARCH PRODUCT
  async getSearchProduct(nameProduct) {
    try {
      const product = await this.selectProductByName(nameProduct);
      const variantProducts = await this.selectProductVariants(product);
      return handleResponse.createResponse(200, "Success", variantProducts);
    } catch (error) {
      throw error;
    }
  }
  // GET PRODUCT IMAGE BY ID
  async getProductImageById(productId) {
    try {
      const productImage = await this.selectProductImgById(productId);
      return handleResponse.createResponse(200, "Success", productImage);
    } catch (error) {
      throw error;
    }
  }
  // GET PRODUCT COLORS
  async getProductColors() {
    try {
      const productColor = await this.selectProductColor();
      return handleResponse.createResponse(200, "Success", productColor);
    } catch (error) {
      throw error;
    }
  }
  // GET PRODUCT COLOR BY BRAND
  async getProductColorByBrand(name) {
    try {
      const productColor = await this.selectProductColorByBrand(name);
      return handleResponse.createResponse(200, "Success", productColor);
    } catch (error) {
      throw error;
    }
  }
  // GET PRODUCT COLOR BY CATEGORY
  async getProductColorByCategory(name) {
    try {
      const productColor = await this.selectProductColorByCategory(name);
      return handleResponse.createResponse(200, "Success", productColor);
    } catch (error) {
      throw error;
    }
  }
  // GET PRODUCT SIZES
  async getProductSizes() {
    try {
      const productSize = await this.selectProductSize();
      return handleResponse.createResponse(200, "Success", productSize);
    } catch (error) {
      throw error;
    }
  }
  // GET PRODUCT SIZE BY BRAND
  async getProductSizeByBrand(name) {
    try {
      const productSize = await this.selectProductSizeByBrand(name);
      return handleResponse.createResponse(200, "Success", productSize);
    } catch (error) {
      throw error;
    }
  }
  // GET PRODUCT SIZE BY CATEGORY
  async getProductSizeByCategory(name) {
    try {
      const productSize = await this.selectProductSizeByCategory(name);
      return handleResponse.createResponse(200, "Success", productSize);
    } catch (error) {
      throw error;
    }
  }
  //GET PRODUCT CATEGORIES
  async getProductCategories() {
    try {
      const productCategories = await this.selectProductCategories();
      return handleResponse.createResponse(200, "Success", productCategories);
    } catch (error) {
      throw error;
    }
  }
  //GET PRODUCT BRANDS
  async getProductBrands() {
    try {
      const productBrands = await this.selectProductBrands();
      return handleResponse.createResponse(200, "Success", productBrands);
    } catch (error) {
      throw error;
    }
  }
  async getLookBooks() {
    try {
      const lookBooks = await this.selectLookBook();
      return handleResponse.createResponse(200, "Success", lookBooks);
    } catch (error) {
      throw error;
    }
  }
  //FILTER PRODUCTS
  async filterProducts(
    sort,
    min_price,
    max_price,
    color,
    size,
    category,
    brand
  ) {
    try {
      let condition = `IF(products.price_discount >0, products.price_discount, price) between ${min_price} and ${max_price}`;
      let query = ``;
      if (category) {
        condition += ` and products.category_id = categories.id and categories.name = '${category}'`;
      }
      if (brand) {
        condition += ` and products.id_brand =brand.id and brand.name= '${brand}'`;
      }
      if (color) {
        condition += ` and color.name in ('${color.split(",").join("','")}')`;
      }

      if (size) {
        condition += ` and size.name in ('${size.split(",").join("','")}')`;
      }
      if (color || size) {
        query = `select distinct products.id,products.category_id,products.id_brand,products.name,products.description,products.price,products.price_discount,products.image from products,product_color_size,color,size,brand,categories where products.id=product_color_size.product_id and color.id = product_color_size.color_id and product_color_size.size_id=size.id and ${condition}`;
      } else {
        query = `select distinct products.id,products.category_id,products.id_brand,products.name,products.description,products.price,products.price_discount,products.image from products,brand,categories where ${condition}`;
      }
      if (sort && sort !== "Default") {
        query += ` order by IF(products.price_discount >0, products.price_discount, price) ${sort}`;
      }
      const [products] = await pool.query(query);
      let productVariants = await this.selectProductVariants(products);
      return handleResponse.createResponse(200, "Success", productVariants);
    } catch (error) {
      throw error;
    }
  }

  // ------------------------------------------------------------EXECUTE-------------------------------------------------------------------
  // SELECT PRODUCT BRANDS
  async selectProductBrands() {
    const [productBrands] = await pool.query(
      `SELECT brand.id, brand.name, COUNT(products.id) AS countproduct
    FROM brand, products
    WHERE brand.id = products.id_brand
    GROUP BY brand.id, brand.name`
    );
    return productBrands;
  }
  // SELECT RELATED PRODUCTS
  async selectRelatedProducts(idProduct) {
    const [product] = await pool.query("select * from products where id = ?", [
      idProduct,
    ]);
    const [relatedProducts] = await pool.query(
      `SELECT * FROM products WHERE (category_id = ? OR id_brand = ? OR price = ?) and id != ? limit 6`,
      [
        product[0].category_id,
        product[0].id_brand,
        product[0].price,
        product[0].id,
      ]
    );
    if (relatedProducts.length === 0) {
      const [defaultProducts] = await pool.query(
        "SELECT * FROM products order by id desc LIMIT 6"
      );
      return defaultProducts;
    }
    return relatedProducts;
  }
  // SELECT RRODUCT CATEGORIES
  async selectProductCategories() {
    const [productCategories] = await pool.query(
      `SELECT categories.id,categories.name,count(products.id) as countproduct from categories,products where categories.id=products.category_id GROUP BY categories.name`
    );
    return productCategories;
  }

  // SELECT PRODUCT SIZE BY BRAND
  async selectProductSizeByCategory(name) {
    const [productSize] = await pool.query(
      `SELECT DISTINCT size.name,size.id from product_color_size,size,products,categories WHERE product_color_size.product_id=products.id and product_color_size.size_id=size.id and products.category_id = categories.id and categories.name = ?`,
      [name]
    );
    return productSize;
  }

  // SELECT PRODUCT SIZE BY BRAND
  async selectProductSizeByBrand(name) {
    const [productSize] = await pool.query(
      `SELECT DISTINCT size.name,size.id from product_color_size,size,products,brand WHERE product_color_size.product_id=products.id and product_color_size.size_id=size.id and products.id_brand = brand.id and brand.name = ?`,
      [name]
    );
    return productSize;
  }

  // SELECT PRODUCT SIZE
  async selectProductSize() {
    const [productSize] = await pool.query(
      `SELECT DISTINCT size.name,size.id from product_color_size,size,products WHERE product_color_size.product_id=products.id and product_color_size.size_id=size.id`
    );
    return productSize;
  }

  // SELECT PRODUCT COLOR BY CATEGORY
  async selectProductColorByCategory(name) {
    const [productColor] = await pool.query(
      `SELECT DISTINCT color.name,color.id,color.code from product_color_size,color,products,categories WHERE product_color_size.product_id=products.id and product_color_size.color_id=color.id and products.category_id = categories.id and categories.name = ?`,
      [name]
    );
    return productColor;
  }

  // SELECT PRODUCT COLOR BY BRAND
  async selectProductColorByBrand(name) {
    const [productColor] = await pool.query(
      `SELECT DISTINCT color.name,color.id,color.code from product_color_size,color,products,brand WHERE product_color_size.product_id=products.id and product_color_size.color_id=color.id and products.id_brand =brand.id and brand.name= ?`,
      [name]
    );
    return productColor;
  }

  //SELECT PRODUCT COLOR
  async selectProductColor() {
    const [productColor] = await pool.query(
      `SELECT DISTINCT color.name,color.id,color.code from product_color_size,color,products WHERE product_color_size.product_id=products.id and product_color_size.color_id=color.id`
    );
    return productColor;
  }

  // SELECT PRODUCT IMAGE BY ID
  async selectProductImgById(productId) {
    const [productImages, productSubImages] = await Promise.all([
      pool.query(`SELECT image FROM products WHERE products.id=${productId}`),
      pool.query(
        `SELECT product_images.image FROM products, product_images WHERE product_images.product_id = products.id AND products.id= ?`,
        [productId]
      ),
    ]);
    return [...productImages[0], ...productSubImages[0]];
  }

  //SELECT PRODUCT BY NAME
  async selectProductByName(nameProduct) {
    const [products] = await pool.query(
      `SELECT * from products where name like'%${nameProduct}%'`
    );
    return products;
  }

  //SELECT ALL PRODUCTS
  async selectAllProducts() {
    const [listProducts] = await pool.query("select * from products");
    return listProducts;
  }

  //SELECT PRODUCT BEST SELLERS
  async selectBestSellerProducts() {
    const [listProducts] = await pool.query(
      "SELECT products.name, products.id,products.category_id,products.id_brand,products.description,products.price,products.price_discount,products.image FROM products LEFT JOIN order_details ON products.id = order_details.product_id GROUP BY products.id ORDER BY  COALESCE(SUM(order_details.quantity), 0) DESC limit 6"
    );
    return listProducts;
  }

  async selectTrendingProducts() {
    const [listProducts] = await pool.query(
      "SELECT products.name,products.id,products.category_id,products.id_brand,products.description,products.price,products.price_discount,products.image FROM products LEFT JOIN comments ON products.id =comments.product_id GROUP BY products.id ORDER BY  COALESCE(AVG(comments.rating), 0) DESC limit 6"
    );
    return listProducts;
  }
  // SELECT PRODUCTBYID
  async selectProductById(productId) {
    const [Product] = await pool.query(
      "SELECT products.name,products.id,categories.name as categoryName,brand.name as brandName,products.description,products.price,products.price_discount,products.image from products,brand,categories where products.id_brand = brand.id and products.category_id = categories.id and products.id = ?",
      [productId]
    );
    return Product;
  }

  // SELECT PRODUCT VARIANT
  async selectProductVariants(products) {
    const productVariants = await Promise.all(
      products.map(async (e, i) => {
        const [variant] = await pool.query(
          `SELECT DISTINCT color.name as namecolor,color.code,size.name as namesize,product_color_size.quantity from product_color_size,color,size,products WHERE product_color_size.product_id=products.id and product_color_size.color_id=color.id and product_color_size.size_id=size.id and products.id = ? order by color.name`,
          [e.id]
        );
        return { ...e, variant };
      })
    );
    return productVariants;
  }
  //SELECT VARIANT BY ID
  async selectVariantById(id) {
    const [variant] = await pool.query(
      `SELECT DISTINCT color.name as namecolor,color.code,size.name as namesize,product_color_size.quantity from product_color_size,color,size,products WHERE product_color_size.product_id=products.id and product_color_size.color_id=color.id and product_color_size.size_id=size.id and products.id=? order by color.name`,
      [id]
    );
    return variant;
  }
  async selectLookBook() {
    const [lookBook] = await pool.query(
      "SELECT products.id,products.name,products.price,products.price_discount,products.image AS productImg, look_book.image AS lookBookImg FROM products INNER JOIN look_book ON products.id = look_book.product_id"
    );
    return lookBook;
  }
}

module.exports = new productService();

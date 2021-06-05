//const BASE_URL= "http://admin.toolfixapp.com.au/";
//const BASE_URL= "http://sbfbarcode.developatmagna.com/";
const BASE_URL= "https://sbfapp.com.au/dashboard/";

const GLOBAL  = {
  api_url: function(url) {
    return BASE_URL + url;
  },
  login:BASE_URL +'api/login',
  forget_password:BASE_URL +'api/users/password',
  register_user:BASE_URL+'api/register',
  reset_password: function(user_id) {
    return GLOBAL.api_url('api/reset/'+user_id);
  },
  add_to_cart: function(user_id) {
    return GLOBAL.api_url('api/add-to-cart/'+user_id);
  },
  get_cart: function(user_id) {
    return GLOBAL.api_url('api/get-cart/'+user_id);
  },
  remove_item:function(item_id) {
    return GLOBAL.api_url('api/delete-cart/'+item_id);
  },
  clear_cart:function(user_id) {
    return GLOBAL.api_url('api/clear-cart/'+user_id);
  },
  confirm_order:function(user_id,order_id) {
    return GLOBAL.api_url('api/post-order/'+user_id+'/'+order_id);
  },
  get_my_orders:function(user_id) {
    return GLOBAL.api_url('api/get-orders/'+user_id);
  },
  get_product_detail:function(product_id,user_id) {
    return GLOBAL.api_url('api/product-detail/'+product_id+'/'+user_id);
  },

  COLOR: {
    THEME_ORANGE:'#d2232a',
    THEME_GREEN:"rgba(0, 116, 0, 100)",
    THEME_GREEN2:'#006D00',
    THEME_PURPLE:'#673ab7',
    DARK_PURPLE:'#6b27a7',
    THEME_RED:'#e5312d',
    WHITE_GRAY:'#D3D3D3',
    DARKGRAY: "#999",
    PISTACHIO:'#2E8B57',
    PINK:'#eb154c',
    GRAYWHITE: "#F7F7F7",
    LESSWHITE: "#FEFEFE",
    SILVER_GRAY: "#cccccc",
    SHADOW_GRAY: "#D0D3D3",
    PLACEHOLDER_TEXT:'#808080',
    BLACK_OPACITY: "rgba(0,0,0,0.6)",
    LESS_BLACKOPACITY: "rgba(0,0,0,0.1)",
    MODAL_BACK: "rgba(255, 255, 255, 0.9)",
    CAL_BACK: "rgba(255, 255, 255, 0.1)",
    MODAL_BORDER: "rgba(0, 0, 0, 0.1)",
    PURPLE: "#7636af",
    MESSAGE_SUCCESS: "#45AC89",
    MESSAGE_ERROR: "#C51E24",
    WHITE: "#ffffff",
    BLACK:'#000000',
    WHITE_OVERLAY: "#F5FCFF88"
  }
};
export default GLOBAL;
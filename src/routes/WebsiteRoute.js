export const WEBSITE_HOME = "/"
export const WEBSITE_LOGIN = "/auth/login"
export const WEBSITE_REGISTER = "/auth/register"
export const WEBSITE_RESETPASSWORD = "/auth/reset-password"


// User routes
export const USER_DASHBOARD = "/my-account"

// Shop routes
export const WEBSITE_SHOP = "/shop"

export const WEBSITE_PRODUCT_DETAILS = (slug) => slug ? `/product/${slug}` : "/product"
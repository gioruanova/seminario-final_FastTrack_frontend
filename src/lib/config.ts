export const config = {
  apiUrl:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" ? process.env.NEXT_PUBLIC_API_URL_DEV! : process.env.NEXT_PUBLIC_API_URL_PROD!,
};


export const slugs={
  publicApi: "publicApi",
  customersApi: "customersApi",
  superApi: "superApi",
}
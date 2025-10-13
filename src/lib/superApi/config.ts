import { config, slugs } from "../config";

export const SUPER_API = {
  GET_USERS: `${config.apiUrl}/${slugs.superApi}/users`,
  CREATE_USER: `${config.apiUrl}/${slugs.superApi}/users/create`,
};

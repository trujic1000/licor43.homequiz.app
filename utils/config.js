import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig() || {};

export const { SITE_URL, BASE_URL, STORAGE_URL } = publicRuntimeConfig;

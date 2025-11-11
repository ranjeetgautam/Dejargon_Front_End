import axios from "axios";
import { CAlertError } from "../components/Alerts/CAlert";
import { UrlConstants2 } from "../constants/UrlConstants2";
import store from "../redux/store/store";
import { languageConstant } from "../constants/LanguageConstants";
import { SESSION_ALREADY_EXISTS } from "@/constants/UtilityContants";
import { t } from "i18next";

const { BASE_URL } = UrlConstants2;

let isRefreshing = false;
let failedRequestsQueue = [];
const interMediateAPIs = new Set();

const apiInstance = axios.create({
  baseURL: BASE_URL,
});

const apiInstanceWithoutToken = axios.create({
  baseURL: BASE_URL,
});

// Get language from store
const getLanguage = () =>
  store?.getState("kccManager")?.kccManager?.language ||
  languageConstant.ENGLISH;

// Add a request interceptor to set the Authorization header
apiInstance.interceptors.request.use((config) => {
  // const authToken = Cookies.get('authToken');

  if (isRefreshing) {
    addIntermediateRequests(config.url);
    // updateIsRefreshing(true);
  }

  if (config.url.includes("/refresh")) {
    updateIsRefreshing(true);
  }

  const authToken = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${authToken}`; //authToken
  config.headers["Accept-Language"] = getLanguage();

  return config;
});

// Add a request interceptor to set the Without Token header

apiInstanceWithoutToken.interceptors.request.use((config) => {
  const thirdUser = localStorage.getItem("thirdUser");
  const LoanDetail_CBS = localStorage.getItem("LoanDetail_CBS");
  const LoanDocDetail = localStorage.getItem("LoanDocDetail");

  if (thirdUser) {
    config.headers["clientId"] = "amw4VnR5QTBsQU9sT0VFWE9meUxhNENNa2ZJYQ==";
    config.headers["secretKey"] = "NlJlUk93R2dscnI0eFJJOVQ2QlYyODQxbWtrYQ==";
  }

  if (LoanDetail_CBS) {
    config.headers["secretKey"] =
      "Q0JTSU5URUxMRUNUU0VDUkVUS0VZSU5URUdSQVRJT05XSVRIRUtDQw==";
  }

  if (LoanDocDetail) {
    config.headers["secretKey"] =
      "Q0JTSU5URUxMRUNUU0VDUkVUS0VZSU5URUdSQVRJT05XSVRIRUtDQw==";
    config.headers["Cookie"] = "JSESSIONID=979079643505C420E86C37C0BD644DB6";
  }

  config.headers["Accept-Language"] = getLanguage();

  return config;
});

// To update flag to check whether refresh token is under process or not
const updateIsRefreshing = (newValue) => {
  isRefreshing = newValue;
};

// To add interMediateAPIs request url while token is pending
const addIntermediateRequests = (url) => {
  if (!url.includes("/refresh")) {
    interMediateAPIs.add(url);
  }
};

// To remove interMediateAPIs request url as it have been re called
const removeIntermediateRequests = (url) => {
  interMediateAPIs.delete(url);
};

// To add 401 Request in queue to re call while refresh token was pending
const enqueueFailedRequest = (callback) => {
  failedRequestsQueue.push(callback);
};

// To handle refresh token Response
const handleRefreshTokenResponse = (response) => {
  if (response.config.url.includes("/refresh")) {
    try {
      // Retry all failed requests in the queue
      if (response?.data?.status === 200 && response?.data?.data?.id_token) {
        const newToken = response?.data?.data?.id_token;
        if (newToken) {
          // To Re call Failed API Call again with latest token
          failedRequestsQueue.forEach((callback) => {
            callback(newToken);
          });

          isRefreshing = false;
          // failedRequestsQueue = [];
          // interMediateAPIs.clear();
        }
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      return response;
    }
  }
};

// To handle 401 API Status while refresh token was pending
const handleAPIErrorWhileRefreshToken = (error) => {
  const originalRequest = error?.config;
  if (
    error?.response?.status === 401 &&
    interMediateAPIs.has(originalRequest?.url)
  ) {
    if (isRefreshing) {
      // Refresh Token is Still Pending But any API is Failed
      return new Promise((resolve) => {
        try {
          enqueueFailedRequest((newToken) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(apiInstance(originalRequest));
          });
        } catch (error) {
          console.error(error);
        }
      });
    } else {
      // Refresh Token have been fetched
      return new Promise((resolve) => {
        try {
          resolve(apiInstance(originalRequest));
          removeIntermediateRequests(originalRequest?.url);
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
};

/**
 * Create a custom Error object with additional status information.
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code of the error.
 * @returns {Error} - The custom Error object.
 */
const createError = (message, status) => {
  const error = new Error(message);

  // Check if status is defined before assigning it to the error object
  if (status !== undefined) {
    error.status = status;
  }

  return error;
};

/**
 * Handle the Axios response and return the data or throw an Error with the message.
 * @param {Object} response - The Axios response object.
 * @returns {Object} - The data returned by the API.
 * @throws {Error} - Throws an Error with the API error message if the status is not 200 or 201.
 */
const handleResponse = (response, showDefaultErrorMessage = true) => {
  if (
    response.status === 200 ||
    response.status === 201 ||
    !showDefaultErrorMessage
  ) {
    return response;
  } else if (
    showDefaultErrorMessage &&
    (response.status === 400 ||
      response.status === 404 ||
      response.status === 403 ||
      response.status === 409 ||
      response.status === 417)
  ) {
    const errorMessage = response?.message || "An error occurred";
    CAlertError(errorMessage);
    // throw new Error(errorMessage);
    return response;
  } else if (response.status === 500) {
    // localStorage.clear();
    // sessionStorage.clear();
    CAlertError("An error occurred");

    // Force reload to root with cache-busting param
    // window.location.href = "/?cachebust=" + new Date().getTime();
    // throw new Error(errorMessage);
  } else {
    throw new Error("An error occurred");
  }
};

/**
 * Handle Axios request errors and throw a custom Error object with the error message.
 * @param {Error} error - The Axios error object.
 * @throws {Error} - Throws a custom Error object with the error message and status.
 */
const handleRequestError = (error) => {
  if (error.response) {
    const errorStatus = error.response.status;
    let errorMessage =
      error.response?.data?.title ||
      error.response?.data?.message ||
      error?.message ||
      "";
    if (errorStatus !== 401) {
      if (error?.response?.data?.key === SESSION_ALREADY_EXISTS) {
        errorMessage = "";
      }
      errorMessage && CAlertError(errorMessage);
    }
    if (errorStatus === 401) {
      errorMessage && CAlertError(errorMessage || "An error occurred");
    }
    createError(errorMessage, errorStatus);
    // throw createError(errorMessage, errorStatus);
    return error.response;
  } else {
    createError(error?.message || "");
    // throw createError(error?.message || "");
  }
};

// Add an Axios interceptor to handle error responses globally
apiInstance.interceptors.response.use(
  (response) => {
    handleRefreshTokenResponse(response);
    return response;
  },
  async (error) => {
    // If 401 and refresh is in progress, enqueue the request for retry
    await handleAPIErrorWhileRefreshToken(error);

    if (
      error.response.status === 401 &&
      !interMediateAPIs.has(error?.config?.url)
    ) {
      if (typeof window !== "undefined") {
        localStorage.setItem("userName", ""); //To logout user from another tab
        localStorage.clear();
        window.location.href = "/logout?unauthorized=true";
      }
    }
    if (error.response && error.response.data) {
      return error.response.data;
      // alert(error.response.data.message); // Show the error message in an alert
    }
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error))
    );
  }
);
// Add an Axios interceptor to handle error responses globally
/**
 * Perform an HTTP GET request to the specified URL.
 * @param {string} url - The URL to send the GET request to.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const get = async (url, params) => {
  try {
    const response = await apiInstance.get(url, { params });
    return handleResponse(response);
  } catch (error) {
    handleRequestError(error);
  }
};

/**
 * Perform an HTTP GET request to the specified URL.
 * @param {string} url - The URL to send the GET request to.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const getWithoutToken = async (url, params) => {
  try {
    const response = await apiInstanceWithoutToken.get(url, { params });
    return handleResponse(response);
  } catch (error) {
    handleRequestError(error);
  }
};

/**
 * Perform an HTTP POST request to the specified URL.
 * @param {string} url - The URL to send the POST request to.
 * @param {Object} data - The data to be sent in the request body.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const post = async (url, data, params, showDefaultErrorMessage = true) => {
  try {
    const response = await apiInstance.post(url, data, { params });
    return handleResponse(response, showDefaultErrorMessage);
  } catch (error) {
    handleRequestError(error);
  }
};

const postWithoutToken = async (url, data, params) => {
  let _response = null;
  try {
    const response = await apiInstanceWithoutToken.post(url, data, { params });
    _response = handleResponse(response);
  } catch (error) {
    _response = handleRequestError(error);
  }
  return _response;
};

const putWithoutToken = async (url, data, params) => {
  let _response = null;
  try {
    const response = await apiInstanceWithoutToken.put(url, data, { params });
    _response = handleResponse(response);
  } catch (error) {
    _response = handleRequestError(error);
  }
  return _response;
};

const postForEsign = async (url, data, params) => {
  let _response = null;
  const urlEncodedPayload = new URLSearchParams();
  for (const key in data) {
    urlEncodedPayload.append(key, data[key]);
  }
  try {
    const response = await apiInstance.post(url, urlEncodedPayload.toString(), {
      params,
    });
    _response = handleResponse(response);
  } catch (error) {
    _response = handleRequestError(error);
  }
  return _response;
};

/**
 * Perform an HTTP PUT request to the specified URL.
 * @param {string} url - The URL to send the PUT request to.
 * @param {Object} data - The data to be sent in the request body.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const put = async (url, data, params) => {
  try {
    const response = await apiInstance.put(url, data, { params });
    return handleResponse(response);
  } catch (error) {
    handleRequestError(error);
  }
};

/**
 * Perform an HTTP DELETE request to the specified URL.
 * @param {string} url - The URL to send the DELETE request to.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const remove = async (url, params) => {
  try {
    const response = await apiInstance.delete(url, { params });
    return handleResponse(response);
  } catch (error) {
    handleRequestError(error);
  }
};

/**
 * Perform an HTTP form data request to specified URL.
 * @param {string} url - The URL
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */

const postWithFileFormData = async (url, formData, params, onProgress) => {
  try {
    const config = {
      onUploadProgress: (event) => {
        if (event.total) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          if (typeof onProgress === "function") onProgress(percentComplete); // Call progress function
        }
      },
    };
    const response = await apiInstance.post(url, formData, {
      params,
      ...config,
    });

    const _response = handleResponse(response);

    if (
      response?.status === 400 ||
      response?.status === 404 ||
      response?.status === 403 ||
      response?.status === 409 ||
      response?.status === 417
    ) {
      onProgress(0);
      return _response;
    } else {
      return _response;
    }
    // return handleResponse(response);
  } catch (error) {
    handleRequestError(error);
  }
};

/**
 * Perform an HTTP form data request to specified URL.
 * @param {string} url - The URL
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */

const postWithTokenFileFormData = async (url, formData, params, onProgress) => {
  try {
    const config = {
      onUploadProgress: (event) => {
        if (event.total) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          if (typeof onProgress === "function") onProgress(percentComplete); // Call progress function
        }
      },
    };
    const response = await apiInstanceWithoutToken.post(url, formData, {
      params,
      ...config,
    });
    return handleResponse(response);
  } catch (error) {
    handleRequestError(error);
  }
};

/**
 * Download a file from the specified URL.
 * @param {string} url - The URL to download the file from.
 * @returns {Promise<string|null>} - A promise that resolves with the image URL if it's an image, or null otherwise.
 */
const downloadSchemeFile = async (url, nameOfFile, item) => {
  try {
    // const authToken = Cookies.get('authToken');
    const authToken = localStorage.getItem("authToken");
    const response = await apiInstance.get(url, {
      responseType: "blob", // Specify the response type as a blob
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    // Check if the response is an image
    const contentType = response.headers["content-type"];
    if (contentType.startsWith("image/")) {
      // Create a URL for the blob
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      return blobUrl;
    } else {
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      // Create a temporary link element to trigger the download
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${nameOfFile}.pdf`; // Specify the filename here
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    return null;
  }
};

/**
 * Download a file from the specified URL.
 * @param {string} url - The URL to download the file from.
 * @returns {Promise<string|null>} - A promise that resolves with the image URL if it's an image, or null otherwise.
 */
const downloadFile = async (
  url,
  fileName = "sample",
  shouldDownload = false,
  updateProgress
) => {
  try {
    // const authToken = Cookies.get('authToken');
    const authToken = localStorage.getItem("authToken");
    const response = await apiInstance.get(url, {
      responseType: "blob", // Specify the response type as a blob
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        typeof updateProgress == "function" && updateProgress(percentCompleted);
      },
    });
    const contentType = response.headers["content-type"];
    if (contentType.startsWith("image/")) {
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      return blobUrl;
    } else {
      const blobUrl = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      let newTab = null;

      if (!shouldDownload) {
        newTab = window.open(blobUrl, "_blank");

        if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
          shouldDownload = true;
        }
      }

      // Set the filename if downloading
      if (shouldDownload) {
        // Create a link element for the file
        const a = document.createElement("a");
        a.href = blobUrl;
        a.target = "_blank";
        // const extension = contentType.split("/")[1] || "bin";
        a.download = `${fileName}.pdf`;
        // Append the link to the document
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      window.URL.revokeObjectURL(blobUrl);
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    return null;
  }
};

/**
 * Open or download a file from the specified URL.
 * @param {string} url - The URL to download the file from.
 * @param {string} fileName - A file name
 * @param {boolean} shouldDownload - Pass true if want to download a file
 * @returns {Promise<string|null>} - A promise that resolves with the image URL if it's an image, or null otherwise.
 */
const viewOrDownloadFile = async (
  url,
  fileName = "sample",
  shouldDownload = false,
  updateProgress = () => {}
) => {
  try {
    const authToken = localStorage.getItem("authToken");

    const response = await apiInstance.get(url, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        typeof updateProgress == "function" && updateProgress(percentCompleted);
      },
    });

    const contentType = response.headers["content-type"];
    const blob = new Blob([response.data], { type: contentType });
    const blobUrl = window.URL.createObjectURL(blob);

    if (contentType.startsWith("image/")) {
      return blobUrl;
    }

    let newTab = null;

    if (!shouldDownload) {
      newTab = window.open(blobUrl, "_blank");

      if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
        shouldDownload = true;
      }
    }

    if (shouldDownload) {
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${fileName}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    // Cleanup
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);

    typeof updateProgress == "function" && updateProgress(100);
  } catch (error) {
    console.log("Error downloading file:", error);
    typeof updateProgress == "function" && updateProgress(0);
    return null;
  } finally {
    typeof updateProgress == "function" && updateProgress(0);
  }
};

const downloadAndOpenFile = async (url, fileName = "sample") => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await apiInstance.get(url, {
      responseType: "blob", // Specify the response type as a blob
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const contentType = response.headers["content-type"];
    if (contentType.startsWith("image/")) {
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      return { blobUrl, file: response.data };
    } else {
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const file = new File([response.data], `${fileName}.pdf`, {
        type: contentType,
      });
      return { blobUrl, file };
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    return null;
  }
};

/**
 * Download a file from the specified URL.
 * @param {string} url - The URL to download the file from.
 * @returns {Promise<string|null>} - A promise that resolves with the image URL if it's an image, or null otherwise.
 */
const postDownloadFile = async (url, data, params, filename = "sample") => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await apiInstance.post(url, data, {
      params,
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading file:", error);
    return null;
  }
};

const postMISDownloadFile = async (url, data, params, filename = "sample") => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await apiInstance.post(url, data, {
      params,
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    // Convert blob to JSON if response status is not 200 (error case)
    if (response.status !== 200) {
      const text = await response.data.text();
      const errorData = JSON.parse(text);
      if (errorData.status === 400) {
        CAlertError(t("NoDataAvailable"));
        return null;
      }
    }

    // Handle normal file download if data exists
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  } catch (error) {
    CAlertError(t("NoDataAvailable"));
    console.error("Error downloading file:", error);
    return null;
  }
};

const getDownloadFile = async (url) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await apiInstance.get(url, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "downloaded_file.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading file:", error);
    return null;
  }
};

const getDownloadFileTxt = async (url) => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await apiInstance.get(url, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "downloaded_file.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading file:", error);
    return null;
  }
};

/**
 * Download a file from the specified URL.
 * @param {string} url - The URL to download the file from.
 * @returns {Promise<string|null>} - A promise that resolves with the image URL if it's an image, or null otherwise.
 */
const downloadFileWithoutToken = async (
  url,
  fileName = "sample",
  shouldDownload = false,
  updateProgress
) => {
  try {
    // Fetch the file
    const response = await apiInstanceWithoutToken.get(url, {
      responseType: "blob", // Specify the response type as a blob
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        typeof updateProgress == "function" && updateProgress(percentCompleted);
      },
    });

    // Content type sent from backend
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create a URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);

    let newTab = null;

    if (!shouldDownload) {
      newTab = window.open(blobUrl, "_blank");

      if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
        shouldDownload = true;
      }
    }

    // Set the filename if downloading
    if (shouldDownload) {
      // Create a link element for the file
      const a = document.createElement("a");
      a.href = blobUrl;
      a.target = "_blank";
      // const extension = contentType.split("/")[1] || "bin";
      a.download = `${fileName}.pdf`;
      // Append the link to the document
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    // Clean up
    window.URL.revokeObjectURL(blobUrl);

    return {
      data: response.data,
      status: response.status,
      blobUrl: blobUrl,
    };
  } catch (error) {
    console.error("Error downloading file:", error);
    typeof updateProgress == "function" && updateProgress(0);
    return null;
  } finally {
    typeof updateProgress == "function" && updateProgress(0);
  }
};

export {
  get,
  getWithoutToken,
  post,
  postWithoutToken,
  put,
  remove,
  postWithFileFormData,
  putWithoutToken,
  downloadFile,
  postDownloadFile,
  postMISDownloadFile,
  downloadSchemeFile,
  getDownloadFile,
  downloadAndOpenFile,
  postForEsign,
  downloadFileWithoutToken,
  viewOrDownloadFile,
  getDownloadFileTxt,
  postWithTokenFileFormData,
};

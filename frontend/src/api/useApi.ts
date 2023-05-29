import { useAxiosWrapper } from "./axiosWrapper";

const axiosWrapper = useAxiosWrapper();

export const useApi = () => {

  return {
    strategyPOST,
    statePOST
  }

  function statePOST(code: string) {
    const body = {
      code: code
    }

    return axiosWrapper.post(`/state`, body);
  }

  function strategyPOST(code: string) {
    const body = {
      code: code
    }

    return axiosWrapper.post(`/strategy`, body);
  }
}

export const useApiState = () => {

  return {
    statePOST
  }

  function statePOST(code: string) {
    const body = {
      code: code
    }

    return axiosWrapper.post(`/state`, body);
  }
}
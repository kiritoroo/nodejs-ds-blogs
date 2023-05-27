import { useAxiosWrapper } from "./axiosWrapper";

const axiosWrapper = useAxiosWrapper();

export const useApi = () => {

  return {
    strategyPOST
  }

  function strategyPOST(code: string) {
    const body = {
      code: code
    }

    return axiosWrapper.post(`/strategy`, body);
  }
}
import { useAxiosWrapper } from "./axiosWrapper";

const axiosWrapper = useAxiosWrapper();

export const useApi = () => {

  return {
    strategyPOST,
    statePOST, 
    observerPOST,
    mediatorPOST,
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


  function observerPOST(code: string) {
    const body = {
      code: code
    }

    return axiosWrapper.post(`/observer`, body);
  }

  
  function mediatorPOST(code: string) {
    const body = {
      code: code
    }

    return axiosWrapper.post(`/mediator`, body);
  }
}


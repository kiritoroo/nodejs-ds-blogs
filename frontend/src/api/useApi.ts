import { useAxiosWrapper } from "./axiosWrapper";

const axiosWrapper = useAxiosWrapper();

export const useApi = () => {

  return {
    strategyPOST,
    statePOST, 
    observerPOST,
    mediatorPOST,
    iteratorPOST,
    commandPOST,
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

  function iteratorPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/iterator`, body);
  }

  
  function commandPOST(code: string) {
    const body = {
      code: code
    }

    return axiosWrapper.post(`/command`, body);
  }
}


import { useAxiosWrapper } from "./axiosWrapper";

const axiosWrapper = useAxiosWrapper();

export const useApi = () => {

  return {
    abstractFactoryPOST,
    strategyPOST,
    statePOST, 
    observerPOST,
    mediatorPOST,
    iteratorPOST,
    commandPOST,
    mementoPOST,
    bridgePOST,
    decoratorPOST,
    flyweightPOST,
    factoryPOST,
    builderPOST,
    singletonPOST,
  }

  function abstractFactoryPOST(code: string) {
    const body = {
      code: code
    }

    return axiosWrapper.post(`/abstract-factory`, body)
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

  function mementoPOST(code: string) {
    const body = {
      code: code
    }

    return axiosWrapper.post(`/memento`, body);
  }

  function bridgePOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/bridge`, body);
  }

  function decoratorPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/decorator`, body);
  }

  function flyweightPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/flyweight`, body);
  }

  function factoryPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/factory-method`, body);
  }

  function builderPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/builder`, body);
  }

  function singletonPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/singleton`, body);
  }
  

}


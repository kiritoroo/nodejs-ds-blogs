import { useAxiosWrapper } from "./axiosWrapper";

const axiosWrapper = useAxiosWrapper();

export const useApi = () => {

  return {
    visitorPOST,
    templateMethodPOST,
    abstractFactoryPOST,
    prototypePOST,
    adapterPOST,
    compositePOST,
    facadePOST,
    proxyPOST,
    chainOfResponsibilityPOST,
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

  function visitorPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/visitor`, body)
  }

  function templateMethodPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/template-method`, body)
  }

  function abstractFactoryPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/abstract-factory`, body)
  }

  function prototypePOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/prototype`, body)
  }

  function adapterPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/adapter`, body)
  }

  function compositePOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/composite`, body)
  }

  function facadePOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/facade`, body)
  }

  function proxyPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/proxy`, body)
  }

  function chainOfResponsibilityPOST(code: string) {
    const body = {
      code: code
    }
    return axiosWrapper.post(`/chain-of-responsibility`, body)
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


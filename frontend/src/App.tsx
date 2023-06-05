import React from "react"
import { Routes, Route, HashRouter, useLocation } from "react-router-dom"
import { AppHeader } from "@comp/AppHeader"
import { designPaternsData } from "./data"
import IndexPage from "@page/IndexPage"
import FactoryMethodPage from "@page/creational/FatoryMethodPage"
import AbstractFactoryPage from "@page/creational/AbstractFactoryPage"
import BuilderPage from "@page/creational/BuilderPage"
import PrototypePage from "@page/creational/PrototypePage"
import SingletonPage from "@page/creational/SingletonPage"
import AdapterPage from "@page/structural/AdapterPage"
import BridgePage from "@page/structural/BridgePage"
import CompositePage from "@page/structural/CompositePage"
import DecoratorPage from "@page/structural/DecoratorPage"
import FacadePage from "@page/structural/FacadePage"
import FlyweightPage from "@page/structural/FlyweightPage"
import ProxyPage from "@page/structural/ProxyPage"
import ChainOfresponsibilityPage from "@page/behavioral/ChainOfresponsibilityPage"
import CommandPage from "@page/behavioral/CommandPage"
import IteratorPage from "@page/behavioral/IteratorPage"
import MediatorPage from "@page/behavioral/MediatorPage"
import MementoPage from "@page/behavioral/MementoPage"
import ObserverPage from "@page/behavioral/ObserverPage"
import StatePage from "@page/behavioral/StatePage"
import StrategyPage from "@page/behavioral/StrategyPage"
import TemplateMethodPage from "@page/behavioral/TemplateMethodPage"
import VisitorMethodPate from "@page/behavioral/VisitorPage"

export const App = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <AppHeader> NodeJS Design Pattern </AppHeader>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<IndexPage/>}/>
        {/* Creational route */}
        <Route path="/factory-method" element={<FactoryMethodPage info={designPaternsData.creational[0]}/>}/>
        <Route path="/abstract-factory" element={<AbstractFactoryPage info={designPaternsData.creational[1]}/>}/>
        <Route path="/builder" element={<BuilderPage info={designPaternsData.creational[2]}/>}/>
        <Route path="/prototype" element={<PrototypePage info={designPaternsData.creational[3]}/>}/>
        <Route path="/singleton" element={<SingletonPage info={designPaternsData.creational[4]}/>}/>
        {/* Structural route */}
        <Route path="/adapter" element={<AdapterPage info={designPaternsData.structural[0]}/>}/>
        <Route path="/bridge" element={<BridgePage info={designPaternsData.structural[1]}/>}/>
        <Route path="/composite" element={<CompositePage info={designPaternsData.structural[2]}/>}/>
        <Route path="/decorator" element={<DecoratorPage info={designPaternsData.structural[3]}/>}/>
        <Route path="/facade" element={<FacadePage info={designPaternsData.structural[4]}/>}/>
        <Route path="/flyweight" element={<FlyweightPage info={designPaternsData.structural[5]}/>}/>
        <Route path="/proxy" element={<ProxyPage info={designPaternsData.structural[6]}/>}/>
        {/* Behavioral route */}
        <Route path="/chain-of-responsibility" element={<ChainOfresponsibilityPage info={designPaternsData.behavioral[0]}/>}/>
        <Route path="/command" element={<CommandPage info={designPaternsData.behavioral[1]}/>}/>
        <Route path="/iterator" element={<IteratorPage info={designPaternsData.behavioral[2]}/>}/>
        <Route path="/mediator" element={<MediatorPage info={designPaternsData.behavioral[3]}/>}/>
        <Route path="/memento" element={<MementoPage info={designPaternsData.behavioral[4]}/>}/>
        <Route path="/observer" element={<ObserverPage info={designPaternsData.behavioral[5]}/>}/>
        <Route path="/state" element={<StatePage info={designPaternsData.behavioral[6]}/>}/>
        <Route path="/strategy" element={<StrategyPage info={designPaternsData.behavioral[7]}/>}/>
        <Route path="/template-method" element={<TemplateMethodPage info={designPaternsData.behavioral[8]}/>}/>
        <Route path="/visitor" element={<VisitorMethodPate info={designPaternsData.behavioral[9]}/>}/>
      </Routes>
    </React.Fragment>
  )
}

export default App

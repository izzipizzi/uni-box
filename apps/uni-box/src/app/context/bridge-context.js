import React from "react";

const BridgeContext = React.createContext()

const BridgeProvider = ({ value, children }) => {
  return <BridgeContext.Provider value={{ ...value }}>{children}</BridgeContext.Provider>
}

export {BridgeContext, BridgeProvider};

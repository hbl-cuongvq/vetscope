import React, {useEffect, useState, useRef} from 'react';

const WebviewContext = React.createContext();

const WebviewProvider = ({children}) => {
  const [urlList, setUrlList] = useState([]);
  return (
    <WebviewContext.Provider
      value={{
        urlList,
        setUrlList,
      }}>
      {children}
    </WebviewContext.Provider>
  );
};

export {WebviewContext, WebviewProvider};

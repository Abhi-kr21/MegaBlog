import React from 'react'

function Container({children,className=""}) {
  
  return <div className={`${className} w-full max-w-7xl mx-auto px-4`}>{children}</div>;
  
}

export default Container
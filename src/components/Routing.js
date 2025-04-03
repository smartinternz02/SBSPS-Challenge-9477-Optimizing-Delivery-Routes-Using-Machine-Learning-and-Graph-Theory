import { useEffect, useState } from "react";

function Routing() {
    
  const [html, setHTML] = useState({__html: ""});

  useEffect(() => {
    async function createMarkup() {
      let response = await fetch(`https://route-optimization-backend.onrender.com/route`);
       const backendHtmlString = await response.text()
       console.log(backendHtmlString)
        return {__html: backendHtmlString};
     }
     createMarkup().then(result => setHTML(result));
  }, []);
  

  return <div dangerouslySetInnerHTML={html} />;
}

export default Routing;
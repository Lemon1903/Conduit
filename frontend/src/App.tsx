import { useState } from "react";

import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="grid min-h-screen place-items-center content-center space-y-2">
      <h1>Count: {count}</h1>
      <Button onClick={handleClick}>Click Me!</Button>
    </div>
  );
}

export default App;

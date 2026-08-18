import { useEffect } from 'react'
import { useState } from 'react'

const TitleChange = () => {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('Hi');


  useEffect(() => {
    if (!name) {
      document.title = 'Welcome!';
    } else {
      document.title = `${greeting}, ${name}`;
    }
  }, [name, greeting])
  console.log('name:', name, 'greeting:', greeting);


return (
    <div>
      <h2>Enter Your Name:</h2>
      <input type="text" value={name} onChange={(e) => 
      setName(e.target.value)}/>

      <h2>Enter a greeting:</h2>
      <input type="text" value={greeting} onChange={(e) => 
      setGreeting(e.target.value)}/>
    </div>
  );
}


export default TitleChange

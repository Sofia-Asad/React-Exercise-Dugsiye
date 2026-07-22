import Blog from './Blog';
import UserCard from './UserCard';
import UserCard2 from './UserCard2';

function App(){
  return(
    <>
    <UserCard/>
    <Blog/>

     <UserCard2 name="Sofia" email="sofia654@gmail.com" />
     <UserCard2 name="Ahmed" email="ahmed@gmail.com" />
     <UserCard2 name="Ayaan" email="ayaan@gmail.com" />
    </>
  )
}

export default App;
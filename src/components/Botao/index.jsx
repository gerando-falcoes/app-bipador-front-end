
// import { InputGroup, Button, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Produto = (props) => {

  return (
    <>
        <Link  to={"/bip/" +props.valor1 + "/" + props.valor2 + "/" +props.valor3} >te amo</Link> 
    </>
  )
}



export default Produto
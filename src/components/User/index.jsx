import '../User/User.css'
import Botao from '../Botao/index'
import { Form, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const User = () => {
    
    const state = {
        unidade: '',
        persona: '',
        senha: '',
        redirect: false
    }
    //validação 
    var bip = window.location.href
    const senha1 = 'tamojunt'
    const poa = 'vaikida'
    const commerce = 'eh noi'
    const cn = "trabalho dur"
    const unidade = async (e) => {
        state.unidade = e.target.value
    }
    const persona = async (e) => {
        state.persona = e.target.value

    }
    const senha = async (e) => {
        state.senha = e.target.value

    }
    // const validacao = (e) => {
    //     e.preventDefault()
    //     bip = window.location.href + `bip/${state.unidade}/${state.persona}`

    //     window.location.replace(bip)

    //     alert('Validacao')
    //     if (state.unidade === '1') {
    //         state.redirect = true
    //         alert(state.redirect)
    //         if (state.senha === cd) {
    //             console.log(state);
    //             alert('Senha correta')

    //             bip = window.location.href + `bip/${state.unidade}/${state.persona}`
    //             alert(bip)
    //             window.location.replace(bip)

    //         } else {
    //             alert('Senha incorreta')
    //         }
    //     }
    //     if (state.unidade === 2) {
    //         if (state.senha === poa) {
    //             alert('Senha correta')

    //             bip = window.location.href + `bip/${state.unidade}/${state.persona}`

    //             window.location.replace(bip)
    //         } else {
    //             alert('Senha incorreta')
    //         }
    //     }
    //     if (state.unidade === 3) {
    //         if (state.senha === commerce) {
    //             alert('Senha correta')

    //             bip = window.location.href + `bip/${state.unidade}/${state.persona}`

    //             window.location.replace(bip)
    //         } else {
    //             alert('Senha incorreta')
    //         }
    //     }
    //     if (state.unidade === 4) {
    //         if (state.senha === cn) {
    //             alert('Senha correta')

    //             bip = window.location.href + `bip/${state.unidade}/${state.persona}`

    //             window.location.replace(bip)
    //         } else {
    //             alert('Senha incorreta')
    //         }
    //     }
    //     console.log(state);
    // }
    const handleKeyPress = async (e) => {
        // const valor = Object.assign(e.target)
        // if (valor)
        // console.log(state.redirect);
        // console.log(e.target.value);
        if (state.unidade === '1' && state.senha === senha1) {
            // alert(state.redirect)
            state.redirect = true
            console.log(state.redirect);
        }
        console.log(state);
        // alert(state.unidade)

    }
    var valor3 = 'asda'
    const valida = async (e) => {
        alert(state.senha);
        if (state.unidade === '1' && state.senha === senha1){

            valor3 = 'aaaa'
            alert(state)
            alert(valor3);
        }
    }
    return (
        <>
            {


                <main>

                    <Form onClick={handleKeyPress}>
                        {/* <Form > */}
                        <fieldset >

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="">Selecione a Categoria</Form.Label>
                                <br />
                                <Form onClick={unidade}>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="INVENTÁRIO CD"
                                        value="1"
                                    />
                                    <br />
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="INVENTÁRIO LOJA POA"
                                        value="2"
                                    />
                                    <br />
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="INVENTÁRIO E_COMMERCE"
                                        value="3"
                                    />
                                    <br />
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="INVENTÁRIO CN"
                                        value="4"
                                    />

                                </Form>
                                {/* <Form.Select onClick={unidade} id=""> */}
                                {/* <option value="0"></option>
                                        <option value="1">INVENTÁRIO CD</option>
                                        <option value="2">INVENTÁRIO LOJA POA</option>
                                        <option value="3">INVENTÁRIO E_COMMERCE</option>
                                        <option value="4">INVENTÁRIO CN</option> */}
                                {/* </Form.Select> */}
                                <Form.Label htmlFor="">Digite seu Email</Form.Label>
                                <FormControl

                                    placeholder="Email"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onKeyPress={persona}
                                />
                                {/* <Form.Select onClickCapture={persona} id="">
                                    <option></option>
                                    <option>LUCIANA</option>
                                    <option>DOLORES </option>
                                    <option>SUELEN JUSTINO</option>
                                    <option>SUELEN CRISTINA</option>
                                    <option>EMERSON</option>
                                    <option>HEMERSON</option>
                                    <option>EMANUEL</option>
                                    <option>NANY</option>
                                    <option>KATIA</option>
                                    <option>LEILA</option>
                                    <option>GABRIEL</option>
                                    <option>SUZANA</option>
                                    <option>ANDRESSA</option>
                                    <option>CAMILA ALVES</option>
                                    <option>CAMILA PEREIRA</option>
                                    <option>YURI</option>
                                    <option>VENDEDOR 1</option>
                                    <option>VENDEDOR 2</option>
                                    <option>VENDEDOR 3</option>
                                    <option>VENDEDOR 4</option>
                                    <option>VENDEDOR 5</option>

                                </Form.Select> */}

                            </Form.Group>
                            <label>Escreva a senha informada pelo seu gestor</label>
                            <FormControl

                                placeholder="SENHA"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onKeyPress={senha}
                                
                            />

                            <Form.Group className="mb-3">
                                <Form.Check onClick={valida}
                                    type="checkbox"
                                    id=""
                                    label="Can't check this"
                                />
                            </Form.Group>
                            

                                    <Link to={"/bip/" + state.unidade + "/" + state.persona + "/"} >te amo porra</Link> 
                                    <br />
                                    <Botao 
                                    
                                    valor1={state.unidade}
                                    valor2={ state.persona}
                                    valor3={valor3}
                                    
                                    />
                                  
                            
                           



                            {/* <Button onClick={validacao} type="">Submit</Button> */}


                        </fieldset>
                    </Form>

                </main>

            }
        </>
    )

}



export default User
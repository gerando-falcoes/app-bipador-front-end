import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";
import Post from "../List/index";
import "../Bip/Bip.css";

import { InputGroup, Button, FormControl } from "react-bootstrap";
const Produto = () => {
  const [amount, setAmount] = useState(1);

  const { pathname } = window.location;

  const nomeRetirar = JSON.stringify(pathname)
    .replaceAll('"', "")
    .replaceAll("bip", "")
    .replaceAll("/", "")
    .replaceAll("2", "")
    .replaceAll("3", "")
    .replaceAll("4", "")
    .replaceAll("5", "")
    .replaceAll("6", "")
    .replaceAll("7", "")
    .replaceAll("8", "")
    .replaceAll("9", "")
    .replaceAll("10", "")
    .replaceAll("1", "");
  const nomeFuncionario = JSON.stringify(pathname)
    .replaceAll('"', "")
    .replaceAll("bip", "")
    .replaceAll("%20", " ")
    .replaceAll("/", "")
    .replaceAll(" ", "-")
    .replaceAll("2", "")
    .replaceAll("3", "")
    .replaceAll("4", "")
    .replaceAll("5", "")
    .replaceAll("6", "")
    .replaceAll("7", "")
    .replaceAll("8", "")
    .replaceAll("9", "")
    .replaceAll("10", "")
    .replaceAll("1", "");
  const unidade = JSON.stringify(pathname)
    .split(nomeRetirar)
    .join("")
    .replaceAll('"', "")
    .replaceAll("bip", "")
    .replaceAll("/", "");
  const url = `${unidade}/${nomeFuncionario}`;
  console.log(nomeFuncionario);

  console.log(url); //url com unidade/nome do funcionario

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const recoverePost = localStorage.getItem("Produto");

    if (recoverePost) {
      setPosts(JSON.parse(recoverePost));
    }
    console.log(localStorage.getItem("Produto"));
  }, []);
  var list = [...posts]; //list eu uso para fazer alteração no post de produtos quero fazer um delet

  const handleKeyPressSave = async (e) => {
    // enviar para api salvar em txt

    await api
      .post(`/produto/${url}/${posts}`, posts)
      .then((resp) => {
        // console.log(resp);
        alert(
          "Arquivo salvo com sucesso! \n statusText: " +
            resp.statusText +
            " \n Status: " +
            resp.status
        );
        setPosts([]);
        localStorage.setItem("Produto", []);
      })
      .catch((err) => {
        err = { message: "Algo deu errado!" };
        alert(err.message);
      });
  };

  const handleKeyPress = async (e) => {
    // pega informaçoes da api e guardo no state
    const code = document.getElementById("code").value;
    console.log(code.length);
    console.log(e);

    if (code.length === 12) {
      // 12 porque o codigo de barras tem tamanho de 12 no banco

      const code = e.target.value;

      await api
        .get(`/produto/${code}`)
        .then((resp) => {
          document.getElementById("code").value = "";
          const alterarQuantidade = resp.data;
          alterarQuantidade.quantidade = amount;
          setPosts((dados) => [...dados, resp.data]);
        })
        .catch((err) => {
          err = { message: "Produto não encontrado" };
          document.getElementById("code").value = "";
          alert(err.message);
        });
    }
    localStorage.setItem("Produto", JSON.stringify(posts));
  };
  const handleDelet = (e) => {
    const index = e.target.value;
    list.splice(index, 1);
    setPosts(list);
    localStorage.setItem("Produto", JSON.stringify(list));
  };

  return (
    <>
      {
        <main>
          <div className="teste">
            <label>Quantidade</label>
            <InputGroup className="mb-3">
              <br />
              <FormControl
                type="number"
                min="1"
                defaultValue="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                // aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <label>Código do Produto</label>
            <InputGroup className="mb-3">
              <FormControl
                id="code"
                type="number"
                placeholder=""
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={handleKeyPress}
              />
              <Button
                variant="outline-secondary"
                onClick={handleKeyPressSave}
                id="button-addon2"
              >
                Salvar em .txt
              </Button>
            </InputGroup>
          </div>
          <>
            {posts.map((post, index) => (
              <Post
                key={index}
                nome={post.nome}
                quantidade={post.quantidade}
                preco={post.preco}
                data={post.createdAt}
                id={post.id_produto}
                delet={handleDelet}
              />
            ))}
            <Button
              variant="outline-secondary"
              onClick={handleKeyPressSave}
              id="button-addon2"
            >
              Salvar em .txt
            </Button>
            <Button
              variant="outline-secondary"
              onClick={handleKeyPressSave}
              id="button-addon2"
            >
              {/* <a href="http://localhost:8080/C:/settings.txt" download='teste nome'>Download</a> */}
              Download
            </Button>

            {/* <input
                type="button"
                value="aberte enter parar salvar"
                // onChange={handleChange}
                onClick={handleKeyPressSave}
              /> */}
          </>
        </main>
      }
    </>
  );
};

Produto.propTypes = {
  nome: PropTypes.string,
  descricao: PropTypes.string,
};

export default Produto;

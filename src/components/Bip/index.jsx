import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";
import Post from "../List";
import "../Bip/Bip.css";

import { InputGroup, Button, FormControl } from "react-bootstrap";
const Bip = () => {
  const [amount, setAmount] = useState(1);
  const [code, setCode] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

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

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const recoverePost = localStorage.getItem("Produto");

    if (recoverePost) {
      setPosts(JSON.parse(recoverePost));
    }
  }, []);
  const list = [...posts]; //list eu uso para fazer alteração no post de produtos quero fazer um delete

  const handleSave = async (e) => {
    // salvar em txt
    try {
      const resp = await api.post(`/produto/${url}/${posts}`, posts);
      alert(
        "Arquivo salvo com sucesso! \n statusText: " +
          resp.statusText +
          " \n Status: " +
          resp.status
      );
      setPosts([]);
    } catch (error) {
      const err = { message: "Algo deu errado!" };
      alert(err.message);
    }
  };


  useEffect (() => {
    localStorage.setItem("Produto", JSON.stringify(posts));
  }, [posts])

  const onChangeCode = async (e) => {
    const value = e.target.value;
    setCode(value);
    setIsDisabled(true);

    if (value?.length === 12) {
      // 12 porque o codigo de barras tem tamanho de 12 no banco

      await api
        .get(`/produto/${value}`)
        .then((resp) => {
          const alterarQuantidade = resp.data;
          alterarQuantidade.quantidade = amount;
          const items = JSON.parse(localStorage.getItem("Produto") || '')
          const item = items.find(element => element.id_produto == e.target.value);
          if (item) {
            const foundIndex = items.findIndex(x => x.id_produto == item.id_produto);
            item.quantidade = Number(item.quantidade) + Number(amount);
            items[foundIndex] = item;
            setPosts(items);
          } else {
            setPosts((dados) => [...dados, resp.data]);
          }
          setCode("");
        })
        .catch((err) => {
          setCode("");
          alert("Produto não encontrado");
        });
    }
    setIsDisabled(false);
  };
  const handleDelete = (index) => {
    list.splice(index, 1);
    setPosts(list);
  };

  return (
    <>
      {
        <main className="container mt-3">
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
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            <label>Código do Produto</label>
            <InputGroup className="mb-3">
              <FormControl
                id="code"
                type="number"
                placeholder=""
                value={code}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={onChangeCode}
                disabled={isDisabled}
              />
              <Button
                variant="outline-secondary"
                onClick={handleSave}
                id="button-addon2"
              >
                Salvar em .txt
              </Button>
            </InputGroup>
          </div>
          <>
            <Post                
              posts={posts}
              onDelete={handleDelete}
            />
            <Button
              variant="outline-secondary"
              onClick={handleSave}
              id="button-addon2"
            >
              Salvar em .txt
            </Button>
            <Button
              variant="outline-secondary"
              onClick={handleSave}
              id="button-addon2"
            >
              Download
            </Button>
          </>
        </main>
      }
    </>
  );
};

Bip.propTypes = {
  nome: PropTypes.string,
  descricao: PropTypes.string,
};

export default Bip;

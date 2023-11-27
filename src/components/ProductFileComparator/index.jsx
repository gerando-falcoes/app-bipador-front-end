import React, { useState, useRef } from 'react'
import { Table } from 'react-bootstrap'
import api from '../../services/api'
import style from './productFileComparator.module.css'
import { toast } from 'react-toastify'

const ProductFileComparator = () => {
  const [outputProductFile, setOutputProductFile] = useState(null)
  const [returnProductFile, setReturnProductFile] = useState(null)
  const [productDifferencesTxt, setProductDifferencesTxt] = useState([])
  const [productDifferences, setProductDifferences] = useState([])

  const outputProductFileRef = useRef(null)
  const returnProductFileRef = useRef(null)

  let totalProducts = 0

  const handleOutputProductChange = (event) => {
    console.log('entrei no handler')
    const file = event.target.files[0]
    setOutputProductFile(file)
  }

  const handleReturnProductChange = (event) => {
    const file = event.target.files[0]
    setReturnProductFile(file)
  }

  const compareProductFiles = async () => {
    if (!outputProductFile || !returnProductFile) {
      toast.error('Por favor, selecione ambos os arquivos de produtos.')
      return
    }

    const outputProductText = await outputProductFile.text()
    const returnProductText = await returnProductFile.text()

    const outputProductLines = outputProductText.split('\n')
    const returnProductLines = returnProductText.split('\n')

    const productDiff = []

    // Comparar cada linha do arquivo de entrada de produtos com o arquivo de saída de produtos
    outputProductLines.forEach((outputProductLine) => {
      const [outputProductCode, outputProductQuantity] = outputProductLine.split(' ')
      const returnProductLine = returnProductLines.find((line) =>
        line.startsWith(outputProductCode)
      )

      if (!returnProductLine) {
        // Se não encontrar a linha correspondente no arquivo de saída de produtos, adicionar à diferença
        productDiff.push(`${outputProductCode} ${outputProductQuantity}`)
      } else {
        // Se encontrar, calcular a diferença de quantidade de produtos
        const [, returnProductQuantity] = returnProductLine.split(' ')
        const productQuantityDifference = outputProductQuantity - returnProductQuantity
        if (productQuantityDifference > 0) {
          productDiff.push(`${outputProductCode} ${productQuantityDifference}`)
        }
      }
    })

    const promises = productDiff.map((product) => {
      const productCode = product.split(' ')[0]
      return api.get(`/produtos/${productCode}`)
    })

    try {
      const results = await Promise.all(promises)
      const products = results.map((result) => {
        const productCode = result.data.id_produto

        const correspondingProduct = productDiff.find((str) => str.startsWith(productCode))

        if (productDiff.find((str) => str.startsWith(productCode))) {
          result.data.quantidade = correspondingProduct.split(' ')[1]
        }

        return result.data
      })
      setProductDifferences(products)
    } catch (error) {
      console.log(error.message)
    }

    setProductDifferencesTxt(productDiff)
  }

  const downloadProductDifferencesTxt = () => {
    const productDiffText = productDifferencesTxt.join('\n')
    const blob = new Blob([productDiffText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'Produtos Divergentes.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleReset = () => {
    setOutputProductFile(null)
    setReturnProductFile(null)
    setProductDifferencesTxt([])
    setProductDifferences([])

    outputProductFileRef.current.value = null
    returnProductFileRef.current.value = null
  }

  return (
    <div className={style.productFileComparatorContainer}>
      <div className={style.inputFileContainer}>
        <div className={style.inputFileName}>{outputProductFile ? <p>{outputProductFile.name}</p> : <p  className={style.inputFilePlaceholder}>Selecione o arquivo de saída</p>}</div>
        <label htmlFor="outputProductFile" className={style.inputFileLabel}>
          Selecionar
        </label>
        <input
          type="file"
          id="outputProductFile"
          accept=".txt"
          onChange={handleOutputProductChange}
          ref={outputProductFileRef}
          className={style.inputFile}
        />
      </div>
      <div className={style.inputFileContainer}>
        <div className={style.inputFileName}>{returnProductFile ? <p>{returnProductFile.name}</p> : <p className={style.inputFilePlaceholder}>Selecione o arquivo de retorno</p>}</div>
        <label htmlFor="returnProductFile" className={style.inputFileLabel}>
            Selecionar
          </label>
          <input
            type="file"
            id="returnProductFile"
            accept=".txt"
            onChange={handleReturnProductChange}
            ref={returnProductFileRef}
            className={style.inputFile}
          />
      </div>
      {productDifferences.length > 0 ? (
        <>
          <div>
            <h5>Produtos Divergentes:</h5>
            <Table bordered>
              <thead>
                <tr>
                  <th>Cod.</th>
                  <th>Prod.</th>
                  <th>Val.</th>
                  <th>Qtd.</th>
                </tr>
              </thead>
              <tbody>
                {productDifferences.map((product) => {
                  totalProducts += Number(product.quantidade)
                  return (
                    <tr key={product.id_produto}>
                      <td>{product.id_produto}</td>
                      <td>{product.nome}</td>
                      <td>{product.preco}</td>
                      <td>{product.quantidade}</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className={style.tableFooter} colSpan="4">
                    <b>Total de Produtos: </b>
                    {totalProducts}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>
          <div className={style.downloadAndClearButtons}>
            <button className="shadow-none btn btn-success" onClick={downloadProductDifferencesTxt}>
              Download
            </button>
            <button className="btn btn-danger" onClick={handleReset}>
              Limpar
            </button>
          </div>
        </>
      ) : (
        <button className="shadow-none btn btn-primary" onClick={compareProductFiles}>
          Comparar
        </button>
      )}
    </div>
  )
}

export default ProductFileComparator

import React, { useState } from 'react'
import style from './productFileComparator.module.css'
import { toast } from 'react-toastify'

const ProductFileComparator = () => {
  const [inputProductFile, setInputProductFile] = useState(null)
  const [outputProductFile, setOutputProductFile] = useState(null)
  const [productDifferences, setProductDifferences] = useState([])

  const handleInputProductChange = (event) => {
    const file = event.target.files[0]
    setInputProductFile(file)
  }

  const handleOutputProductChange = (event) => {
    const file = event.target.files[0]
    setOutputProductFile(file)
  }

  const compareProductFiles = async () => {
    if (!inputProductFile || !outputProductFile) {
      toast.error('Por favor, selecione ambos os arquivos de produtos.')
      return
    }

    const inputProductText = await inputProductFile.text()
    const outputProductText = await outputProductFile.text()

    const inputProductLines = inputProductText.split('\n')
    const outputProductLines = outputProductText.split('\n')

    const productDiff = []

    // Comparar cada linha do arquivo de entrada de produtos com o arquivo de saída de produtos
    inputProductLines.forEach((inputProductLine) => {
      const [inputProductCode, inputProductQuantity] = inputProductLine.split(' ')
      const outputProductLine = outputProductLines.find((line) => line.startsWith(inputProductCode))

      if (!outputProductLine) {
        // Se não encontrar a linha correspondente no arquivo de saída de produtos, adicionar à diferença
        productDiff.push(`${inputProductCode} ${inputProductQuantity}`)
      } else {
        // Se encontrar, calcular a diferença de quantidade de produtos
        const [, outputProductQuantity] = outputProductLine.split(' ')
        const productQuantityDifference = inputProductQuantity - outputProductQuantity
        if (productQuantityDifference > 0) {
          productDiff.push(`${inputProductCode} ${productQuantityDifference}`)
        }
      }
    })

    setProductDifferences(productDiff)
  }

  const downloadProductDifferences = () => {
    const productDiffText = productDifferences.join('\n')
    const blob = new Blob([productDiffText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'product_differences.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleReset = () => {
    setInputProductFile(null)
    setOutputProductFile(null)
    setProductDifferences([])
  }

  return (
    <div>
      <div>
        <label htmlFor="inputProductFile">Arquivo de Entrada de Produtos:</label>
        <input
          type="file"
          id="inputProductFile"
          accept=".txt"
          onChange={handleInputProductChange}
        />
        {inputProductFile && <p>{inputProductFile.name}</p>}
      </div>
      <div>
        <label htmlFor="outputProductFile">Arquivo de Saída de Produtos:</label>
        <input
          type="file"
          id="outputProductFile"
          accept=".txt"
          onChange={handleOutputProductChange}
        />
        {outputProductFile && <p>{outputProductFile.name}</p>}
      </div>
      <button className="shadow-none btn btn-primary" onClick={compareProductFiles}>
        Comparar
      </button>
      {productDifferences.length > 0 && (
        <>
          <div>
            <h2>Diferenças de Produtos:</h2>
            <ul>
              {productDifferences.map((productDiff, index) => (
                <li key={index}>{productDiff}</li>
              ))}
            </ul>
          </div>
          <div className={style.downloadAndClearButtons}>
            <button className="shadow-none btn btn-success" onClick={downloadProductDifferences}>
              Download
            </button>
            <button className="btn btn-danger" onClick={handleReset}>
              Limpar
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductFileComparator

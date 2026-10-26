import { icons, productImages } from './assets'
import './App.css'

function App() {
  return (
    <main className="product-page" aria-labelledby="product-page-title">
      <h1 id="product-page-title">eDisplay XG</h1>
      <p>Build the product page using README.md and the target screenshots.</p>

      <div className="starter-asset-preview">
        <img
          className="starter-product-image"
          src={productImages[0]}
          alt="eDisplay XG"
        />
        <img
          className="starter-icon"
          src={icons.warranty}
          alt="Warranty"
        />
      </div>
    </main>
  )
}

export default App

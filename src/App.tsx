import React, {useState} from 'react';
import styled from 'styled-components';

interface ProductI {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: string[];
}

interface ProductItem {
    title: string;
    price: number;
    description: string;
    image: string;
}

const ProductItem: React.FC<ProductItem> = ({title, price, description, image}) => {
    return (
        <ProductWrapper>
            <ProductItemWrapper>
                <p>{title}</p>
                <p>Price: {price}</p>
                <p>{description}</p>
                <StyledProductImage
                    imageSrc={image}/>
            </ProductItemWrapper>
        </ProductWrapper>
    )
}

function App() {
    const [products, setProducts] = useState<null | ProductI[]>(null);
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onClickHandler = () => {
        setIsLoading(true);

        fetch('https://api.escuelajs.co/api/v1/products')
            .then((response) => {
                    if (!response.ok) {
                        throw new Error('Что-то произошло :(');
                    }
                    return response.json();
                }
            )
            .then((data) => {
                setProducts(data);
                console.log('данные успешно получены');
            })
            .catch((e) => {
                console.log(e.message);
                setError(e.message);
            }).finally(() => {
            setIsLoading(false);
            console.log('finally');
        })
    };


    return (
        <div>
            <button onClick={onClickHandler}>Получить товары</button>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {products && products.map(({title, price, description, category}) => {
                return (
                    <ProductItem
                        title={title}
                        price={price}
                        description={description}
                        image={category.image}
                    />
                )
            })}
        </div>
    );
}

const ProductWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
`

const ProductItemWrapper = styled.div`
  max-width: 240px;
`

type StyledProductImageT = {
    imageSrc: string,
}

const StyledProductImage = styled.div<StyledProductImageT>`
  width: 100%;
  aspect-ratio: 1/1;
  background-image: url(${props => props.imageSrc});
  background-size: cover;
  background-position: center;
`

export default App;

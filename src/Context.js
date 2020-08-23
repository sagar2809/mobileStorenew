import React, { Component } from 'react';
import {storeProducts , detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products : [],
        detailProduct : detailProduct,
        cart : [],
        modalOpen : false,
        productModal : detailProduct,
        cartSubTotal : 0,
        cartTax : 0,
        cartTotal:0,
    };
    getItem = (id) =>{
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    componentDidMount(){
        this.setProducts();
    }
    setProducts = ()=>{
        let tempProduct =[];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProduct = [...tempProduct,singleItem];
        });
        this.setState(()=>{
            return {products:tempProduct};
        })
    }
    handleDetail = (id) =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
        console.log("handle");
    };
    addToCart = (id) =>{
        let tempProduct = [...this.state.products]
        console.log("add to cart:id"+id);
        const index = tempProduct.indexOf(this.getItem(id));
        const product = tempProduct[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(()=>{
            return { products : tempProduct, cart : [...this.state.cart , product]};

        },
        () => {
           this.addTotal();
        }
        
        
        )

    };

    openModal = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {productModal : product,modalOpen : true}
        }
        )
    }
    closeModal = () =>{
        this.setState(()=> {
            return {modalOpen : false}
        }
        )

    }

    increment = (id) =>{
        let tempCart = [...this.state.cart];
        let selectedItem = tempCart.find(item=>item.id===id);
        const index = tempCart.indexOf(selectedItem);
        const product = tempCart[index];
        console.log(product);
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(()=>{
            return {
                cart : [...tempCart]


            };
        },
        ()=>{this.addTotal()}
        )




    };
    decrement = (id) =>{
        let tempCart = [...this.state.cart];
        let selectedItem = tempCart.find(item=>item.id===id);
        const index = tempCart.indexOf(selectedItem);
        const product = tempCart[index];
        console.log(product);
        product.count = product.count - 1;
        if(product.count === 0){
            this.removeItem(id);

        }
        else{
            product.total = product.count * product.price;
        this.setState(()=>{
            return {
                cart : [...tempCart]


            };
        },
        ()=>{this.addTotal()}
        )

        }

    }
    removeItem = (id) =>{
        let tempProduct =[...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProduct.indexOf(this.getItem(id));
        let removedProduct = tempProduct[index];
        removedProduct.inCart = false;
        removedProduct.count=0;
        this.setState(()=>{
            return {
                cart:[...tempCart],
                products:[...tempProduct]
            };
        },
        ()=>{
            this.addTotal();
        }
        )

        console.log("removeItem");

    }
    clearCart = () =>{
        this.setState(()=>{
            return {cart:[]}
        },()=>{
            this.setProducts();
            this.addTotal();
        }
        )

    }
    addTotal = () =>{
        console.log("in add total");
        let subtotal = 0;
        this.state.cart.map(item => (subtotal+=item.total));
        const tempTax = subtotal*(0.18);
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subtotal + tax;
        this.setState(() => {
            return {
                cartSubTotal  :subtotal,
                cartTax : tax,
                cartTotal : total,
                
            }
           
        })
    }
    


    render() {
        console.log(this.state.cartSubTotal,this.state.cartTax,this.state.cartTotal);
        return (
           <ProductContext.Provider value={{
               ...this.state,
               handleDetail:this.handleDetail,
               addToCart : this.addToCart,
               openModal : this.openModal,
               closeModal : this.closeModal,
               increment : this.increment,
               decrement : this.decrement,
               clearCart : this.clearCart,
               removeItem : this.removeItem,
               addTotal : this.addTotal



           }}>
               {this.props.children}
            </ProductContext.Provider>
        );
    }
}
const ProductConsumer =  ProductContext.Consumer;

export {ProductConsumer , ProductProvider};
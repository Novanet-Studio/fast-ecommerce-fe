import {actions} from '../store/index';

export default class HandlerActions{

    handleAddToCart(product){
        let item = {
            id: product.id,
            quantity: 1,
            price: product.price
        };
        // this.$store.dispatch('cart/addProductToCart', item);
        // this.$notify({
        //     group: 'addCartSuccess',
        //     title: 'Success!',
        //     text: `${product.name} has been added to your cart!`
        // });
        console.log(product)

    }
}
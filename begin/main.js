const app = Vue.createApp({
    data: function(){
        return {
            product: 'Socks',
            description: 'this is description.',
            image: './assets/images/socks_green.jpg',
            image2:'./assets/images/socks_blue.jpg',
            myUrl:"https://kr.ncsoft.com/kr/index.do",
            inventory:0,
            inStock2: false,
            onSale: true,

            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id: 2234, color:'green', image:'./assets/images/socks_green.jpg'},
                {id: 2235, color:'blue', image:'./assets/images/socks_blue.jpg'},
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            cart:0,
        }
    },
    methods:{
        addToCart(){
            this.cart += 1;
            console.log(this.cart);
        },
        updateImage(variantImage){
            this.image2 = variantImage;
        },
        decreaseToCart(){
            if(this.cart > 0){
                this.cart -= 1;
            }else{
                this.cart = 0;
            }
            
            console.log(this.cart);
        }
    }
})

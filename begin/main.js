const app = Vue.createApp({
    data: function(){
        return {
            product: 'Socks',
            description: 'this is description.',
            image: './assets/images/socks_green.jpg',
            image2:'./assets/images/socks_blue.jpg',
            myUrl:"https://kr.ncsoft.com/kr/index.do",
            inventory:0,
            inStock2: true,
            onSale: true,

            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id: 2234, color:'green'},
                {id: 2235, color:'blue'},
            ],
            sizes: ['S', 'M', 'L', 'XL'],
        }
    }
})
<template lang="html">
    <div class="ps-footer__links">
        <p>
            <strong>Consumer Electric:</strong>
            <nuxt-link
                v-for="item in consumerElectric"
                :to="item.url"
                :key="item.text"
            >
                {{ item.text }}
            </nuxt-link>
        </p>
        <p>
            <strong>Clothing & Apparel:</strong>
            <nuxt-link
                v-for="item in clothingAndApparel"
                :to="item.url"
                :key="item.text"
            >
                {{ item.text }}
            </nuxt-link>
        </p>
        <p>
            <strong>Home, Garden & Kitchen:</strong>
            <nuxt-link
                v-for="item in gardenAndKitchen"
                :to="item.url"
                :key="item.text"
            >
                {{ item.text }}
            </nuxt-link>
        </p>
        <p>
            <strong>Health & Beauty:</strong>
            <nuxt-link
                v-for="item in healthAndBeauty"
                :to="item.url"
                :key="item.text"
            >
                {{ item.text }}
            </nuxt-link>
        </p>
        <p>
            <strong>Jewelry & Watches:</strong>
            <nuxt-link
                v-for="item in jewelryAndWatch"
                :to="item.url"
                :key="item.text"
            >
                {{ item.text }}
            </nuxt-link>
        </p>
        <p>
            <strong>Computer & Technologies:</strong>
            <nuxt-link
                v-for="item in computerAndTechnology"
                :to="item.url"
                :key="item.text"
            >
                {{ item.text }}
            </nuxt-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'FooterLinks',
    data() {
        return {
            consumerElectric: [
                {
                    text: 'Air Conditioners',
                    url: '/shop'
                },
                {
                    text: 'Audios & Theaters',
                    url: '/shop'
                },
                {
                    text: 'Car Electronics',
                    url: '/shop'
                },
                {
                    text: 'Office Electronics',
                    url: '/shop'
                },
                {
                    text: 'TV Televisions',
                    url: '/shop'
                },
                {
                    text: 'Washing Machines',
                    url: '/shop'
                }
            ],
            clothingAndApparel: [
                {
                    text: 'Printers',
                    url: '/shop'
                },
                {
                    text: 'Projectors',
                    url: '/shop'
                },
                {
                    text: 'Scanners',
                    url: '/shop'
                },
                {
                    text: 'Store & Business',
                    url: '/shop'
                },
                {
                    text: '4K Ultra HD TVs',
                    url: '/shop'
                },
                {
                    text: 'LED TVs',
                    url: '/shop'
                },
                {
                    text: 'OLED TVs',
                    url: '/shop'
                }
            ],
            gardenAndKitchen: [
                {
                    text: 'Cookware',
                    url: '/shop'
                },
                {
                    text: 'Decoration',
                    url: '/shop'
                },
                {
                    text: 'Furniture',
                    url: '/shop'
                },
                {
                    text: 'Garden Tools',
                    url: '/shop'
                },
                {
                    text: 'Garden Equipments',
                    url: '/shop'
                },
                {
                    text: 'Powers And Hand Tools',
                    url: '/shop'
                },
                {
                    text: 'Utensil & Gadget',
                    url: '/shop'
                }
            ],
            healthAndBeauty: [
                {
                    text: 'Hair Care',
                    url: '/shop'
                },
                {
                    text: 'Decoration',
                    url: '/shop'
                },
                {
                    text: 'Makeup',
                    url: '/shop'
                },
                {
                    text: 'Body Shower',
                    url: '/shop'
                },
                {
                    text: 'Skin Care',
                    url: '/shop'
                },
                {
                    text: 'Cologine',
                    url: '/shop'
                },
                {
                    text: 'Perfume',
                    url: '/shop'
                }
            ],
            jewelryAndWatch: [
                {
                    text: 'Necklace',
                    url: '/shop'
                },
                {
                    text: 'Pendant',
                    url: '/shop'
                },
                {
                    text: 'Diamond Ring',
                    url: '/shop'
                },
                {
                    text: 'Sliver Earing',
                    url: '/shop'
                },
                {
                    text: 'Leather Watcher',
                    url: '/shop'
                },
                {
                    text: 'Gucci',
                    url: '/shop'
                }
            ],
            computerAndTechnology: [
                {
                    text: 'Desktop PC',
                    url: '/shop'
                },
                {
                    text: 'Laptop',
                    url: '/shop'
                },
                {
                    text: 'Smartphones',
                    url: '/shop'
                },
                {
                    text: 'Tablet',
                    url: '/shop'
                },
                {
                    text: 'Game Controller',
                    url: '/shop'
                },
                {
                    text: 'Audio & Video',
                    url: '/shop'
                },
                {
                    text: 'Wireless Speaker',
                    url: '/shop'
                }
            ]
        };
    }
};
</script>

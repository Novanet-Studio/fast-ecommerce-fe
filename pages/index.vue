<template lang="html">
	<main id="homepage-1">
		<home-banner />
		<template v-if="categories !== null && isLoading === false">
			<div v-for="category in orderedCategories" :key="category.id">
				<productos-landing :category="category" />
			</div>
		</template>
		<div v-else-if="isLoading === true">
			<div
				v-for="cat in LoadingCat"
				:key="cat.id"
				class="ps-product-list ps-clothings ps-section--carousel-outside"
			>
				<div class="ps-container">
					<div class="ps-section__header">
						<v-progress-circular
							indeterminate
							color="primary"
						></v-progress-circular>
					</div>
					<div class=" ps-section__content">
						<carousel-arrows type="simple" />
						<div
							class="ps-carousel outside"
							v-swiper:carousel="carouselSetting"
						>
							<!-- <div class="swiper-wrapper">
								<div
									class="swiper-slide"
									v-for="item in loadingData"
									:key="item.id"
								>
									<v-skeleton-loader
										class="mx-4 ps-product"
										max-width="175"
										min-width="170"
										type="card"
										:loading="true"
									></v-skeleton-loader>
								</div>
								<div class="swiper-pagination swiper-pagination-bullets"></div>
							</div> -->
							<div class="swiper-wrapper">
								<v-skeleton-loader
									v-for="item in loadingData"
									:key="item.id"
									class="m-0 mx-2 ps-product"
									max-width="175"
									min-width="170"
									type="card"
									:loading="true"
								></v-skeleton-loader>
								<!--Carousel controls-->
								<div class="swiper-pagination swiper-pagination-bullets"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
import ProductosLanding from "~/components/partials/homepage/farine/ProductosLanding";
import CategoryRepository from "~/repositories/CategoryRepository";
import { mapState } from "vuex";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";
import HomeBanner from "~/components/partials/homepage/default/HomeBanner";
import HeaderDefault from "~/components/shared/headers/HeaderDefault";
import NavigationList from "~/components/shared/mobile/NavigationList";
import HeaderMobile from "~/components/shared/mobile/HeaderMobile";
import MobileDrawer from "~/components/shared/mobile/MobileDrawer";
import HomeDefaultDealOfDay from "~/components/partials/homepage/default/HomeDefaultDealOfDay";
import DemoPanel from "~/components/shared/DemoPanel";
import { carouselFullwidth } from "~/utilities/carousel-helpers.js";
import CarouselArrows from "~/components/elements/commons/CarouselArrows";

export default {
	transition: "zoom",
	layout: "layout-default",
	components: {
		ProductosLanding,
		MobileDrawer,
		HeaderMobile,
		NavigationList,
		HeaderDefault,
		HomeBanner,
		FooterFullwidth,
		CarouselArrows,
	},
	data() {
		return {
			categories: [],
			isLoading: true,
			loadingData: [{ id: 1 }, { id: 2 }],
			LoadingCat: [{ id: 1 }, { id: 2 }],
			carouselSetting: {
				...carouselFullwidth,
				navigation: {
					nextEl: ".ps-clothings .swiper-next",
					prevEl: ".ps-clothings .swiper-prev",
				},
			},
		};
	},
	mounted() {
		this.categorias();
		console.log(this.$cookies.get("cart"));
	},
	methods: {
		async categorias() {
			// const categorias = new CategoryRepository();
			// // return await categorias.GetCategories().then(val => {return console.log(val.data)})
			// return await categorias.GetCategories().then((val) => {
			// 	console.log(val);
			// 	return (this.categories = val.data);
			// });
			await this.$store
				.dispatch("product/getCategories")
				.then((res) => {
					this.isLoading = false;
					console.log("las categorias", res);
					if (res.length > 0) {
						this.categories = res;
					}
				})
				.catch((err) => {
					this.isLoading = false;
					this.categories = [];
				});
		},
	},
	computed: {
		orderedCategories: function() {
			return _.sortBy(this.categories, "id");
		},
	},
};
</script>

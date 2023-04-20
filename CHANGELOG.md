# Changelog

## [2.11.0](https://github.com/Novanet-Studio/fast-ecommerce-fe/compare/v2.10.0...v2.11.0) (2023-04-20)


### Features

* add new `input` component, add `checkbox` component' ([7f090af](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/7f090af985e50aa4724d1d7cc4d3e958141843d6))
* add payments report ([baed1f8](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/baed1f8240690430229476767edf8f0bab3c2e9e))
* add persist for `checkout` & `invoice` store ([7b2ffe7](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/7b2ffe7c9235634dac6b06ffb738df0ad73f8c3e))
* app improvements ([4d87809](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/4d87809bc451ca372e337d44fc49f0e5a147e0ce))
* export to pdf ([3740d93](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/3740d9370936a84c422a9fb7f5f78761aaaa8c88))
* fill information-form & set token when page is reloaded ([54b73b8](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/54b73b816fc07bbac863964c8bd8c496a8fa5f32))
* font-awesome plugin ([2033d44](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/2033d448a781e3e005dc9fec6fbdc24e73d53b80))
* mapper to simplify api response ([7ce2cd5](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/7ce2cd5357b439d71a443d50e0f6e067faa3f114))
* redirect to checkout when cartProducts has elements ([c713251](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/c713251301c1724cbb7745626cd97717857720d3))
* redirect to invoices when payment flow is finished ([debd38d](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/debd38d315312446937ce1503506b3cb079398f4))
* save information ([f694243](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/f69424326f77d6bff3b0699ba3dfb3f9fba51ff0))
* **visa-method:** add `payment_info` & `payment_method` to body object ([78d06f4](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/78d06f4036e6391f75b2e582a1fc2900ba42de95))


### Bug Fixes

* animation, no add product, show products in invoice ([79335da](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/79335da7d6ad37406de105f8d4bccb20c5eb61db))
* auth ([8dbf0c6](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/8dbf0c697cc827706405db4cca954307ea3bbbeb))
* autofill phone ([aa26319](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/aa26319a2ef4b842e6bd93cee12c907c1a3ec2ce))
* cart view & header cart items ([66fc27a](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/66fc27a6507e5129433f97ec544e88a90bc9f424))
* createInvoice ([a4a3dd2](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/a4a3dd2f14ec31bda257801fda12ee41c1db567f))
* **header:** styles for mini-cart ([ac5921a](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/ac5921abdfce86b00d37676aa013b4b27b12d1aa))
* **information-form:** minor validations ([b2d06b3](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/b2d06b37993329694cb00025c6e9115bf4d69709))
* invoice page, and styles ([b44a531](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/b44a531cf027f2328cc5398fba34f6dd6cb1af87))
* **invoice-detail:** export invoice to pdf ([423378c](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/423378c94a52b00482ad131d3fb1d78c29f591a0))
* **invoices:** show correct status with correct color ([df79fdf](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/df79fdf64487caf7c166542f404f4aeec15de3a8))
* load invoices detail ([b9288d9](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/b9288d9e903fed4737f01f1465d9da7a3255da77))
* **mini-cart:** styles ([5be10f4](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/5be10f4ce06b8f415feb33577fe8213104ffeccd))
* minor issues ([5bb05d3](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/5bb05d3201db2c4458f79d0cc14bf6f8e4c572ff))
* no load cartProducts to avoid bugs ([de1bdd8](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/de1bdd86e6dfbc4ad6f1db17d6a5f6bfc268b617))
* no persist product data ([80c0e50](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/80c0e50ee6249ce79a4f47c151a49b4c8cb5120f))
* no persist product store ([b1ab16c](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/b1ab16cf1b6f1c4d44322a3165adbd7af038e1c9))
* no reload when logout ([77e1360](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/77e13604cc8f353d7a706a67fa4d0d92ba53196b))
* no remove product cart ([894050c](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/894050c8ea7dd17af07548ff24be54c94e6c878c))
* order-summary correct props types ([aafb45f](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/aafb45fa5d419d979fbb4bbb9bfce5365c331fb5))
* **order-summary:** load cart products ([e5e98ab](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/e5e98aba4a52de80077f3ca3fef5364b029b75d6))
* pass no needed params ([4f785fe](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/4f785fe91b63124074898175ef52437abd2238e8))
* payment process, send email with all buyed items ([8a0853d](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/8a0853dbae41f7474bdd7f53841d4883af8a583f))
* paypal payment ([cd261bb](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/cd261bb84e0c86f59fb83bc295514dc3f56ef418))
* send email ([2186090](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/2186090ccf0bf3562fcf1d73607cee7936c16fdd))
* show correct user information ([78df7ea](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/78df7eaba4f5022e9bad2c017568409289036b94))
* slider images ([f51eefd](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/f51eefd5dea47a7dcdd1596d4942f1910aa57ef3))
* **squareup:** payment process issues ([31725ff](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/31725ff2df19c711310131649f5a8734c6e8222a))
* types ([8f6a636](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/8f6a6369382a43324709d580eded3e28e51fcb4e))
* **wish-list-content:** pass correct product name to notify fn ([67f09ea](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/67f09ea4a4d8398acbb3a0e998cb57da161e1591))
* zoom css property ([b9bea2d](https://github.com/Novanet-Studio/fast-ecommerce-fe/commit/b9bea2d03a2070b2e718022946f7cfd9a1344c26))

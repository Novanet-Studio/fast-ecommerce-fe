// import { defineStore } from 'pinia';

// export const useCompare = defineStore('compare', {
//   state: () => ({
//     items: [],
//     total: null,
//     loading: false,
//   }),
//   actions: {
//     initCompare(payload) {
//       this.items = payload.items;
//       this.total = payload.total;
//     },
//     addItemToCompare(payload) {
//       if (this.total !== null) {
//         const existItem = this.items.find((item) => item.id === payload.id);
//         if (!existItem) {
//           this.items.push({
//             id: payload.id,
//           });
//           this.total = this.total + 1;
//         }
//       } else {
//         this.items.push({
//           id: payload.id,
//         });
//         this.total = this.total + 1;
//       }
//       // const params = {
//       //   items: state.items,
//       //   total: state.total,
//       // };

//       // this.$cookies.set('compare', params, {
//       //   path: '/',
//       //   maxAge: 60 * 60 * 24 * 7,
//       // });
//     },
//     removeItemFromCompare(payload) {
//       const index = this.items.findIndex((item) => item.id === payload.id);
//       this.total = this.total - 1;
//       this.items.splice(index, 1);

//       // const params = {
//       //   items: this.items,
//       //   total: this.total,
//       // };

//       // this.$cookies.set('compare', params, {
//       //   path: '/',
//       //   maxAge: 60 * 60 * 24 * 7,
//       // });
//     },
//   },
// });

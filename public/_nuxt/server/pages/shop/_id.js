exports.ids = [3];
exports.modules = {

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ProfileService */
/* unused harmony export LocalProfileService */
/* unused harmony export FirebaseProfileService */
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var uniqid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(89);
/* harmony import */ var uniqid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uniqid__WEBPACK_IMPORTED_MODULE_1__);


class ProfileService {}
;
class LocalProfileService extends ProfileService {
  constructor() {
    super();
    let data = localStorage.getItem("profiles");
    if (data) this.profiles = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.mapValues(JSON.parse(data), function (obj) {
      obj.createdAt = new Date(obj.createdAt);
      obj.updatedAt = new Date(obj.updatedAt);
      return obj;
    });else this.profiles = {};
  }
  /**
   * Save current changes to persistent storage.
   */


  async save() {
    localStorage.setItem("profiles", JSON.stringify(this.profiles));
    return;
  }
  /**
   * Finds all elements matching filters.
   */


  async find(filter) {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.values(this.profiles), filter);
  }
  /**
   * Finds one element matching filters.
   */


  async findOne(filter) {
    if (filter.id && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(filter).length === 1) return this.profiles[filter.id];
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.values(this.profiles), filter);
  }
  /**
   * Creates a new entity instance.
   */


  async create(profile) {
    if (!profile.id) profile.id = uniqid__WEBPACK_IMPORTED_MODULE_1___default()();
    profile.createdAt = new Date();
    profile.updatedAt = new Date();
    this.profiles[profile.id] = profile;
    return profile;
  }
  /**
   * Updates all entity instances matching filters.
   */


  async update(filter, data) {
    if (data['id']) delete data['id'];
    let selectedProfiles = await this.find(filter);

    for (let profile of selectedProfiles) {
      data['id'] = profile.id;
      profile = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.merge(profile, data);
      profile.updatedAt = new Date();
      this.profiles[profile.id] = profile;
    }

    return selectedProfiles;
  }
  /**
   * Updates one entity instance matching filters.
   */


  async updateOne(filter, data) {
    if (data['id']) delete data['id'];
    let selectedProfile = await this.findOne(filter);
    selectedProfile = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.merge(selectedProfile, data);
    this.profiles[selectedProfile.id] = selectedProfile;
    return selectedProfile;
  }
  /**
   * Deletes all entity instances matching filters.
   */


  async delete(filter) {
    let selectedProfiles = await this.find(filter);

    for (let profile of selectedProfiles) {
      delete this.profiles[profile.id];
    }

    return selectedProfiles;
  }
  /**
   * Deletes one entity instance matching filters.
   */


  async deleteOne(filter) {
    let selectedProfile = await this.findOne(filter);
    console.log(selectedProfile);
    delete this.profiles[selectedProfile.id];
    return selectedProfile;
  }

}
class FirebaseProfileService extends ProfileService {
  constructor(database, config = {
    collection: "profiles"
  }) {
    super();
    this.database = database;
    this.db = database;
    this.config = config;
  }
  /**
   * Save current changes to persistent storage.
   * Firestore changes are handled by client library so no modifications here.
   */


  async save() {
    return;
  }
  /**
   * Finds all elements matching filters.
   */


  async find(filter) {
    let snapshot = await this.db.collection(this.config.collection).get();
    if (snapshot.empty) return [];
    let profiles = [];
    snapshot.forEach(doc => profiles.push(doc.data()));
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(profiles, filter);
  }
  /**
   * Finds one element matching filters.
   */


  async findOne(filter) {
    if (filter.id && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(filter).length === 1) return await (await this.db.collection(this.config.collection).doc(filter.id).get()).data();
    let profiles = await this.find(filter);
    let profile = profiles.find(profile => lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isMatch(profile, filter));
    return profile;
  }
  /**
   * Creates a new entity instance.
   */


  async create(profile) {
    if (!profile.id) profile.id = uniqid__WEBPACK_IMPORTED_MODULE_1___default()();
    profile.createdAt = new Date();
    profile.updatedAt = new Date();
    await this.db.collection(this.config.collection).doc(profile.id).set(profile);
    return profile;
  }
  /**
   * Updates all entity instances matching filters.
   */


  async update(filter, data) {
    let selectedProfiles = await this.find(filter);

    for (let profile of selectedProfiles) {
      data['id'] = profile.id;
      profile = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.merge(profile, data);
      profile.updatedAt = new Date();
      await this.db.collection(this.config.collection).doc(profile.id).set(data);
    }

    return selectedProfiles;
  }
  /**
   * Updates one entity instance matching filters.
   */


  async updateOne(filter, data) {
    if (data['id']) delete data['id'];
    let selectedProfile = await this.findOne(filter);
    selectedProfile = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.merge(selectedProfile, data);
    await this.db.collection(this.config.collection).doc(selectedProfile.id).set(selectedProfile);
    return selectedProfile;
  }
  /**
   * Deletes all entity instances matching filters.
   */


  async delete(filter) {
    let selectedProfiles = await this.find(filter);

    for (let profile of selectedProfiles) {
      await this.db.collection(this.config.collection).doc(profile.id).delete();
    }

    return selectedProfiles;
  }
  /**
   * Deletes one entity instance matching filters.
   */


  async deleteOne(filter) {
    let selectedProfile = await this.findOne(filter);
    console.log(selectedProfile);
    await this.db.collection(this.config.collection).doc(selectedProfile.id).delete();
    return selectedProfile;
  }

}
const DefaultService = process.env.DEV ? LocalProfileService : FirebaseProfileService;
/* harmony default export */ __webpack_exports__["a"] = (DefaultService);

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Viewer.vue?vue&type=template&id=318fcf46&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":""}},[(_vm.profile)?[_c('div',[_c('v-row',[_c('v-col',{attrs:{"cols":"12","md":"6"}},[_vm._v("\n                    Name: "+_vm._s(_vm.profile.name)+"\n                ")]),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"6"}},[_vm._v("\n                    Family Member: "+_vm._s(_vm.profile.family)+"\n                ")]),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"6"}},[_vm._v("\n                    Contact No.: "+_vm._s(_vm.profile.contact)+"\n                ")]),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"6"}},[_vm._v("\n                    Email ID: "+_vm._s(_vm.profile.email)+"\n                ")]),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"12"}},[_vm._v("\n                    Postal Address: "+_vm._s(_vm.profile.postal)+"\n                ")]),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"6"}},[_vm._v("\n                    Date of Birth: "+_vm._s(_vm.profile.dob)+"\n                ")])],1),_vm._v(" "),_c('v-row',{attrs:{"justify":"center"}},[_c('v-col',{attrs:{"cols":"12"}},[_c('v-simple-table',{attrs:{"fixed-header":"","height":"300px"},scopedSlots:_vm._u([{key:"default",fn:function(){return [_c('thead',[_c('tr',[_c('th',{attrs:{"colspan":"3"}}),_vm._v(" "),_c('th',{attrs:{"colspan":"1"}},[_vm._v("Life")]),_vm._v(" "),_c('th',{attrs:{"colspan":"1"}},[_vm._v("Cost")]),_vm._v(" "),_c('th',{attrs:{"colspan":"2","scope":"colgroup"}},[_vm._v("Effective Cost")]),_vm._v(" "),_c('th',{attrs:{"colspan":"2"}}),_vm._v(" "),_c('th',{attrs:{"colspan":"1"}},[_vm._v("Life")]),_vm._v(" "),_c('th',{attrs:{"colspan":"1"}},[_vm._v("Cost")]),_vm._v(" "),_c('th',{attrs:{"colspan":"2","scope":"colgroup"}},[_vm._v("Effective Cost")])]),_vm._v(" "),_c('tr',[_c('th',{staticClass:"text-left"},[_vm._v("Type of Product")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("Brand")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("Size")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("(Months)")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("DAP (Rs.)")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("Monthly")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("Yearly")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("AMWAY")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("Size")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("(Months)")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("DAP (Rs.)")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("Monthly")]),_vm._v(" "),_c('th',{staticClass:"text-left"},[_vm._v("Yearly")])])]),_vm._v(" "),_c('tbody',[_vm._l((_vm.profile.products),function(product,index){return _c('tr',{key:index},[_c('td',[_vm._v(_vm._s(product.type))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.brand))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.size))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.life))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.cost))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.monthly))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.yearly))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.alt.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.alt.size))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.alt.life))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.alt.cost))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.alt.monthly))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(product.alt.yearly))])])}),_vm._v(" "),_c('tr',[_c('td',{attrs:{"colspan":"6"}},[_vm._v("Total")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.sum(_vm.profile.products, 'yearly')))]),_vm._v(" "),_c('td',{attrs:{"colspan":"5"}},[_vm._v("Total")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.sum(_vm.profile.products, 'yearly', true)))])]),_vm._v(" "),_c('tr',[_c('td',{attrs:{"colspan":"12"}},[_vm._v("Yearly Savings")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.sum(_vm.profile.products, 'yearly') - _vm.sum(_vm.profile.products, 'yearly', true)))])])],2)]},proxy:true}],null,false,685909999)})],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"12","md":"6"}},[(!_vm.chart.loading)?_c('bar-chart',{attrs:{"chart-data":_vm.chart.data,":options":_vm.chart.options}}):_vm._e()],1)],1)],1)]:[_c('div',{staticClass:"text-center"},[_c('v-progress-circular',{attrs:{"size":50,"color":"primary","indeterminate":""}})],1)]],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Viewer.vue?vue&type=template&id=318fcf46&

// EXTERNAL MODULE: ./src/services/profile.services.ts
var profile_services = __webpack_require__(102);

// EXTERNAL MODULE: ./src/services/product.services.ts
var product_services = __webpack_require__(107);

// EXTERNAL MODULE: external "vue-chartjs"
var external_vue_chartjs_ = __webpack_require__(90);

// CONCATENATED MODULE: ./src/charts/BarChart.js

const {
  reactiveProp
} = external_vue_chartjs_["mixins"];
/* harmony default export */ var BarChart = ({
  extends: external_vue_chartjs_["Bar"],
  props: ['options'],
  mixins: [reactiveProp],

  mounted() {
    console.log(this.chartData, this.options);
    this.renderChart(this.chartData, this.options);
  }

});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Viewer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Viewervue_type_script_lang_js_ = ({
  props: ['id'],
  components: {
    BarChart: BarChart
  },
  data: () => ({
    profile: null,
    profileService: null,
    productService: null,
    chart: {
      loading: true,
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        barValueSpacing: 20,
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      }
    }
  }),
  methods: {
    sum(products, key, alt = false) {
      if (alt) return products.map(product => product.alt).reduce((a, v) => a + v[key], 0);
      return products.reduce((a, v) => a + v[key], 0);
    },

    async reload() {
      let profile = await this.profileService.findOne({
        id: this.id
      });
      console.log(profile);

      for (let product of profile.products) {
        product.alt = await this.productService.getAlternative(product.type);
      }

      this.profile = profile;
      this.chart.data.labels = this.profile.products.map(product => product.type);
      this.chart.data.datasets = [{
        label: "Current",
        backgroundColor: "yellow",
        data: this.profile.products.map(product => product.yearly)
      }, {
        label: "Amway",
        backgroundColor: "blue",
        data: this.profile.products.map(product => product.alt.yearly)
      }];
      this.$forceUpdate();
      this.chart.loading = false;
    }

  },

  async mounted() {
    this.profileService = new profile_services["a" /* default */](this.$fireStore);
    this.productService = new product_services["a" /* default */](this.$fireStore);
    this.reload();
  }

});
// CONCATENATED MODULE: ./src/components/Viewer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Viewervue_type_script_lang_js_ = (Viewervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(23);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js
var VContainer = __webpack_require__(97);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VProgressCircular/VProgressCircular.js
var VProgressCircular = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(113);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VDataTable/VSimpleTable.sass
var VSimpleTable = __webpack_require__(108);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/helpers.js
var helpers = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/themeable/index.js
var themeable = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VDataTable/VSimpleTable.js




/* harmony default export */ var VDataTable_VSimpleTable = (Object(mixins["a" /* default */])(themeable["a" /* default */]).extend({
  name: 'v-simple-table',
  props: {
    dense: Boolean,
    fixedHeader: Boolean,
    height: [Number, String]
  },
  computed: {
    classes() {
      return {
        'v-data-table--dense': this.dense,
        'v-data-table--fixed-height': !!this.height && !this.fixedHeader,
        'v-data-table--fixed-header': this.fixedHeader,
        ...this.themeClasses
      };
    }

  },
  methods: {
    genWrapper() {
      return this.$slots.wrapper || this.$createElement('div', {
        staticClass: 'v-data-table__wrapper',
        style: {
          height: Object(helpers["f" /* convertToUnit */])(this.height)
        }
      }, [this.$createElement('table', this.$slots.default)]);
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'v-data-table',
      class: this.classes
    }, [this.$slots.top, this.genWrapper(), this.$slots.bottom]);
  }

}));
// CONCATENATED MODULE: ./src/components/Viewer.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Viewervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "4dc92337"
  
)

/* harmony default export */ var Viewer = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */






installComponents_default()(component, {VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VProgressCircular: VProgressCircular["a" /* default */],VRow: VRow["a" /* default */],VSimpleTable: VDataTable_VSimpleTable})


/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ProductService */
/* unused harmony export LocalProductService */
/* unused harmony export FirebaseProductService */
let availableProducts = ['Toothpaste', 'Shampoo', 'Detergent', 'Floor Cleaner'];
const alternatives = {
  'Generic': {
    name: null,
    size: '',
    life: 0,
    cost: 0
  },
  'Toothpaste': {
    name: 'Amway Toothpaste',
    size: '100gm',
    life: 4,
    cost: 20
  },
  'Shampoo': {
    name: 'Amway Shampoo',
    size: '100gm',
    life: 3,
    cost: 35
  }
};
class ProductService {}
class LocalProductService extends ProductService {
  constructor() {
    super();
  }

  round(decimal, places) {
    return Math.round(decimal * Math.pow(10, places)) / Math.pow(10, places);
  }

  computeCosts(product) {
    product.monthly = this.round(product.cost / product.life, 2) || 0;
    product.yearly = this.round(12 * product.cost / product.life, 2) || 0;
    return product;
  }

  async verifyProduct(product) {
    return availableProducts.findIndex(p => p.toLowerCase() == product.toLowerCase()) !== -1;
  }

  async getAvailableProducts() {
    return availableProducts;
  }

  async setAvailableProducts(products) {
    availableProducts = products;
  }

  async getAlternative(type) {
    return this.computeCosts(alternatives[type] || alternatives['Generic']);
  }

  async setAlternative(type, alt) {
    alternatives[type] = alt;
    return;
  }

}
class FirebaseProductService extends ProductService {
  constructor(database, config = {
    collection: "products",
    doc: "PRODUCTS"
  }) {
    super();
    this.database = database;
    this.db = database;
    this.config = config;
  }

  round(decimal, places) {
    return Math.round(decimal * Math.pow(10, places)) / Math.pow(10, places);
  }

  computeCosts(product) {
    product.monthly = this.round(product.cost / product.life, 2) || 0;
    product.yearly = this.round(12 * product.cost / product.life, 2) || 0;
    return product;
  }

  async verifyProduct(product) {
    let data = (await this.db.collection(this.config.collection).doc(this.config.doc).get()).data();
    return data["available"].findIndex(p => p == product) !== -1;
  }

  async getAvailableProducts() {
    let data = (await this.db.collection(this.config.collection).doc(this.config.doc).get()).data();
    return data["available"] || [];
  }

  async setAvailableProducts(products) {
    await this.db.collection(this.config.collection).doc(this.config.doc).set({
      available: products
    }, {
      merge: true
    });
  }

  async getAlternative(type) {
    let data = (await this.db.collection(this.config.collection).doc(this.config.doc).get()).data();
    return this.computeCosts(data["alternatives"][type]) || {
      'Generic': {
        name: null,
        size: '',
        life: 0,
        cost: 0,
        monthly: 0,
        yearly: 0
      }
    };
  }

  async setAlternative(type, alt) {
    await this.db.collection(this.config.collection).doc(this.config.doc).set({
      alternatives: {
        [type]: alt
      }
    }, {
      merge: true
    });
    return;
  }

}
const DefaultProductService = process.env.DEV ? LocalProductService : FirebaseProductService;
/* harmony default export */ __webpack_exports__["a"] = (DefaultProductService);

/***/ }),

/***/ 108:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_mergeData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);



 // no xs

const breakpoints = ['sm', 'md', 'lg', 'xl'];

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();

const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['offset' + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* upperFirst */ "y"])(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    props['order' + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* upperFirst */ "y"])(val)] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();

const propMap = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};

function breakpointClass(type, prop, val) {
  let className = type;

  if (val == null || val === false) {
    return undefined;
  }

  if (prop) {
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <v-col sm></v-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return className.toLowerCase();
  } // .order-md-6


  className += `-${val}`;
  return className.toLowerCase();
}

const cache = new Map();
/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_1___default.a.extend({
  name: 'v-col',
  functional: true,
  props: {
    cols: {
      type: [Boolean, String, Number],
      default: false
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: str => ['auto', 'start', 'end', 'center', 'baseline', 'stretch'].includes(str)
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  render(h, {
    props,
    data,
    children,
    parent
  }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = '';

    for (const prop in props) {
      cacheKey += String(props[prop]);
    }

    let classList = cache.get(cacheKey);

    if (!classList) {
      classList = []; // Loop through `col`, `offset`, `order` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      const hasColClasses = classList.some(className => className.startsWith('col-'));
      classList.push({
        // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
        col: !hasColClasses || !props.cols,
        [`col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      cache.set(cacheKey, classList);
    }

    return h(props.tag, Object(_util_mergeData__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(data, {
      class: classList
    }), children);
  }

}));

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);
/* harmony import */ var _src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VGrid_VGrid_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_mergeData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);



 // no xs

const breakpoints = ['sm', 'md', 'lg', 'xl'];
const ALIGNMENT = ['start', 'end', 'center'];

function makeProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    props[prefix + Object(_util_helpers__WEBPACK_IMPORTED_MODULE_3__[/* upperFirst */ "y"])(val)] = def();
    return props;
  }, {});
}

const alignValidator = str => [...ALIGNMENT, 'baseline', 'stretch'].includes(str);

const alignProps = makeProps('align', () => ({
  type: String,
  default: null,
  validator: alignValidator
}));

const justifyValidator = str => [...ALIGNMENT, 'space-between', 'space-around'].includes(str);

const justifyProps = makeProps('justify', () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));

const alignContentValidator = str => [...ALIGNMENT, 'space-between', 'space-around', 'stretch'].includes(str);

const alignContentProps = makeProps('alignContent', () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: 'align',
  justify: 'justify',
  alignContent: 'align-content'
};

function breakpointClass(type, prop, val) {
  let className = classMap[type];

  if (val == null) {
    return undefined;
  }

  if (prop) {
    // alignSm -> Sm
    const breakpoint = prop.replace(type, '');
    className += `-${breakpoint}`;
  } // .align-items-sm-center


  className += `-${val}`;
  return className.toLowerCase();
}

const cache = new Map();
/* harmony default export */ __webpack_exports__["a"] = (vue__WEBPACK_IMPORTED_MODULE_1___default.a.extend({
  name: 'v-row',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    },
    ...alignContentProps
  },

  render(h, {
    props,
    data,
    children
  }) {
    // Super-fast memoization based on props, 5x faster than JSON.stringify
    let cacheKey = '';

    for (const prop in props) {
      cacheKey += String(props[prop]);
    }

    let classList = cache.get(cacheKey);

    if (!classList) {
      classList = []; // Loop through `align`, `justify`, `alignContent` breakpoint props

      let type;

      for (type in propMap) {
        propMap[type].forEach(prop => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }

      classList.push({
        'no-gutters': props.noGutters,
        'row--dense': props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      cache.set(cacheKey, classList);
    }

    return h(props.tag, Object(_util_mergeData__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(data, {
      staticClass: 'row',
      class: classList
    }), children);
  }

}));

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/shop/_id.vue?vue&type=template&id=9b05cb84&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":""}},[_c('viewer',{attrs:{"id":_vm.$route.params.id}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/shop/_id.vue?vue&type=template&id=9b05cb84&

// EXTERNAL MODULE: ./src/components/Viewer.vue + 6 modules
var Viewer = __webpack_require__(105);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/shop/_id.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var _idvue_type_script_lang_js_ = ({
  components: {
    Viewer: Viewer["default"]
  }
});
// CONCATENATED MODULE: ./src/pages/shop/_id.vue?vue&type=script&lang=js&
 /* harmony default export */ var shop_idvue_type_script_lang_js_ = (_idvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(23);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js
var VContainer = __webpack_require__(97);

// CONCATENATED MODULE: ./src/pages/shop/_id.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  shop_idvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "6d3717fd"
  
)

/* harmony default export */ var _id = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents_default()(component, {Viewer: __webpack_require__(105).default})


/* vuetify-loader */


installComponents_default()(component, {VContainer: VContainer["a" /* default */]})


/***/ })

};;
//# sourceMappingURL=_id.js.map
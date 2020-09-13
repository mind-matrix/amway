exports.ids = [6];
exports.modules = {

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _src_components_VCard_VCard_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(103);
/* harmony import */ var _src_components_VCard_VCard_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_components_VCard_VCard_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VSheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony import */ var _mixins_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(104);
/* harmony import */ var _mixins_routable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _util_mixins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
// Styles
 // Extensions

 // Mixins


 // Helpers


/* @vue/component */

/* harmony default export */ __webpack_exports__["a"] = (Object(_util_mixins__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(_mixins_loadable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], _mixins_routable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], _VSheet__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]).extend({
  name: 'v-card',
  props: {
    flat: Boolean,
    hover: Boolean,
    img: String,
    link: Boolean,
    loaderHeight: {
      type: [Number, String],
      default: 4
    },
    raised: Boolean
  },
  computed: {
    classes() {
      return {
        'v-card': true,
        ..._mixins_routable__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].options.computed.classes.call(this),
        'v-card--flat': this.flat,
        'v-card--hover': this.hover,
        'v-card--link': this.isClickable,
        'v-card--loading': this.loading,
        'v-card--disabled': this.disabled,
        'v-card--raised': this.raised,
        ..._VSheet__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].options.computed.classes.call(this)
      };
    },

    styles() {
      const style = { ..._VSheet__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].options.computed.styles.call(this)
      };

      if (this.img) {
        style.background = `url("${this.img}") center center / cover no-repeat`;
      }

      return style;
    }

  },
  methods: {
    genProgress() {
      const render = _mixins_loadable__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].options.methods.genProgress.call(this);
      if (!render) return null;
      return this.$createElement('div', {
        staticClass: 'v-card__progress',
        key: 'progress'
      }, [render]);
    }

  },

  render(h) {
    const {
      tag,
      data
    } = this.generateRouteLink();
    data.style = this.styles;

    if (this.isClickable) {
      data.attrs = data.attrs || {};
      data.attrs.tabindex = 0;
    }

    return h(tag, this.setBackgroundColor(this.color, data), [this.genProgress(), this.$slots.default]);
  }

}));

/***/ }),

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

/***/ 103:
/***/ (function(module, exports) {

// Exports
module.exports = {};


/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(1);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// EXTERNAL MODULE: ./node_modules/vuetify/src/components/VProgressLinear/VProgressLinear.sass
var VProgressLinear = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/transitions/index.js + 2 modules
var transitions = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/colorable/index.js
var colorable = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/positionable/index.js
var positionable = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/proxyable/index.js
var proxyable = __webpack_require__(43);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/mixins/themeable/index.js
var themeable = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/helpers.js
var helpers = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/util/mixins.js
var mixins = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VProgressLinear/VProgressLinear.js
 // Components

 // Mixins




 // Utilities



const baseMixins = Object(mixins["a" /* default */])(colorable["a" /* default */], Object(positionable["b" /* factory */])(['absolute', 'fixed', 'top', 'bottom']), proxyable["a" /* default */], themeable["a" /* default */]);
/* @vue/component */

/* harmony default export */ var VProgressLinear_VProgressLinear = (baseMixins.extend({
  name: 'v-progress-linear',
  props: {
    active: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: null
    },
    backgroundOpacity: {
      type: [Number, String],
      default: null
    },
    bufferValue: {
      type: [Number, String],
      default: 100
    },
    color: {
      type: String,
      default: 'primary'
    },
    height: {
      type: [Number, String],
      default: 4
    },
    indeterminate: Boolean,
    query: Boolean,
    reverse: Boolean,
    rounded: Boolean,
    stream: Boolean,
    striped: Boolean,
    value: {
      type: [Number, String],
      default: 0
    }
  },

  data() {
    return {
      internalLazyValue: this.value || 0
    };
  },

  computed: {
    __cachedBackground() {
      return this.$createElement('div', this.setBackgroundColor(this.backgroundColor || this.color, {
        staticClass: 'v-progress-linear__background',
        style: this.backgroundStyle
      }));
    },

    __cachedBar() {
      return this.$createElement(this.computedTransition, [this.__cachedBarType]);
    },

    __cachedBarType() {
      return this.indeterminate ? this.__cachedIndeterminate : this.__cachedDeterminate;
    },

    __cachedBuffer() {
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__buffer',
        style: this.styles
      });
    },

    __cachedDeterminate() {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: `v-progress-linear__determinate`,
        style: {
          width: Object(helpers["f" /* convertToUnit */])(this.normalizedValue, '%')
        }
      }));
    },

    __cachedIndeterminate() {
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__indeterminate',
        class: {
          'v-progress-linear__indeterminate--active': this.active
        }
      }, [this.genProgressBar('long'), this.genProgressBar('short')]);
    },

    __cachedStream() {
      if (!this.stream) return null;
      return this.$createElement('div', this.setTextColor(this.color, {
        staticClass: 'v-progress-linear__stream',
        style: {
          width: Object(helpers["f" /* convertToUnit */])(100 - this.normalizedBuffer, '%')
        }
      }));
    },

    backgroundStyle() {
      const backgroundOpacity = this.backgroundOpacity == null ? this.backgroundColor ? 1 : 0.3 : parseFloat(this.backgroundOpacity);
      return {
        opacity: backgroundOpacity,
        [this.isReversed ? 'right' : 'left']: Object(helpers["f" /* convertToUnit */])(this.normalizedValue, '%'),
        width: Object(helpers["f" /* convertToUnit */])(this.normalizedBuffer - this.normalizedValue, '%')
      };
    },

    classes() {
      return {
        'v-progress-linear--absolute': this.absolute,
        'v-progress-linear--fixed': this.fixed,
        'v-progress-linear--query': this.query,
        'v-progress-linear--reactive': this.reactive,
        'v-progress-linear--reverse': this.isReversed,
        'v-progress-linear--rounded': this.rounded,
        'v-progress-linear--striped': this.striped,
        ...this.themeClasses
      };
    },

    computedTransition() {
      return this.indeterminate ? transitions["c" /* VFadeTransition */] : transitions["d" /* VSlideXTransition */];
    },

    isReversed() {
      return this.$vuetify.rtl !== this.reverse;
    },

    normalizedBuffer() {
      return this.normalize(this.bufferValue);
    },

    normalizedValue() {
      return this.normalize(this.internalLazyValue);
    },

    reactive() {
      return Boolean(this.$listeners.change);
    },

    styles() {
      const styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      if (!this.indeterminate && parseFloat(this.normalizedBuffer) !== 100) {
        styles.width = Object(helpers["f" /* convertToUnit */])(this.normalizedBuffer, '%');
      }

      return styles;
    }

  },
  methods: {
    genContent() {
      const slot = Object(helpers["o" /* getSlot */])(this, 'default', {
        value: this.internalLazyValue
      });
      if (!slot) return null;
      return this.$createElement('div', {
        staticClass: 'v-progress-linear__content'
      }, slot);
    },

    genListeners() {
      const listeners = this.$listeners;

      if (this.reactive) {
        listeners.click = this.onClick;
      }

      return listeners;
    },

    genProgressBar(name) {
      return this.$createElement('div', this.setBackgroundColor(this.color, {
        staticClass: 'v-progress-linear__indeterminate',
        class: {
          [name]: true
        }
      }));
    },

    onClick(e) {
      if (!this.reactive) return;
      const {
        width
      } = this.$el.getBoundingClientRect();
      this.internalValue = e.offsetX / width * 100;
    },

    normalize(value) {
      if (value < 0) return 0;
      if (value > 100) return 100;
      return parseFloat(value);
    }

  },

  render(h) {
    const data = {
      staticClass: 'v-progress-linear',
      attrs: {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': this.normalizedBuffer,
        'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
      },
      class: this.classes,
      style: {
        bottom: this.bottom ? 0 : undefined,
        height: this.active ? Object(helpers["f" /* convertToUnit */])(this.height) : 0,
        top: this.top ? 0 : undefined
      },
      on: this.genListeners()
    };
    return h('div', data, [this.__cachedStream, this.__cachedBackground, this.__cachedBuffer, this.__cachedBar, this.genContent()]);
  }

}));
// CONCATENATED MODULE: ./node_modules/vuetify/lib/components/VProgressLinear/index.js


/* harmony default export */ var components_VProgressLinear = (VProgressLinear_VProgressLinear);
// CONCATENATED MODULE: ./node_modules/vuetify/lib/mixins/loadable/index.js


/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 */

/* @vue/component */

/* harmony default export */ var loadable = __webpack_exports__["a"] = (external_vue_default.a.extend().extend({
  name: 'loadable',
  props: {
    loading: {
      type: [Boolean, String],
      default: false
    },
    loaderHeight: {
      type: [Number, String],
      default: 2
    }
  },
  methods: {
    genProgress() {
      if (this.loading === false) return null;
      return this.$slots.progress || this.$createElement(components_VProgressLinear, {
        props: {
          absolute: true,
          color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,
          height: this.loaderHeight,
          indeterminate: true
        }
      });
    }

  }
}));

/***/ }),

/***/ 106:
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

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ProfileList.vue?vue&type=template&id=55b2d494&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-container',{attrs:{"fluid":""}},[_c('v-card',[_c('v-card-title',[_vm._v("\n            Product Purchase Profiles\n        ")]),_vm._v(" "),_c('v-card-text',[(_vm.createBtn)?_c('v-btn',{attrs:{"color":"primary"},on:{"click":function($event){return _vm.$router.push("/shop/edit/")}}},[_c('v-icon',[_vm._v("\n                    mdi-plus\n                ")]),_vm._v("\n                create\n            ")],1):_vm._e(),_vm._v(" "),_c('v-list',_vm._l((_vm.profiles),function(profile){return _c('v-list-item',{key:profile.id,class:[_vm.$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3', 'mb-2']},[_c('v-list-item-content',[_c('v-list-item-title',[_vm._v("\n                            "+_vm._s(profile.name)+"\n                            "),_c('v-list-item-subtitle',[_vm._v("\n                                "+_vm._s(profile.createdAt)+"\n                            ")])],1),_vm._v(" "),_c('v-row',{attrs:{"dense":""}},[_c('v-col',{attrs:{"cols":"12"}},[_c('v-row',_vm._l((['contact','email','family','postal','dob']),function(item){return _c('v-col',{key:item,attrs:{"cols":"6"}},[_vm._v("\n                                        "+_vm._s(_vm.capitalize(item))+": "+_vm._s(profile[item])+"\n                                    ")])}),1)],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"12"}},[_c('v-row',{attrs:{"dense":""}},[_c('v-col',{attrs:{"cols":"auto"}},[_c('v-btn',{attrs:{"icon":""},on:{"click":function($event){return _vm.view(profile.id)}}},[_c('v-icon',[_vm._v("\n                                                mdi-open-in-new\n                                            ")])],1)],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"auto"}},[_c('v-btn',{attrs:{"icon":""},on:{"click":function($event){return _vm.edit(profile.id)}}},[_c('v-icon',[_vm._v("\n                                                mdi-pen\n                                            ")])],1)],1),_vm._v(" "),_c('v-col',{attrs:{"cols":"auto"}},[_c('v-btn',{attrs:{"color":"red","icon":""},on:{"click":function($event){return _vm.remove(profile.id)}}},[_c('v-icon',[_vm._v("\n                                                mdi-delete\n                                            ")])],1)],1)],1)],1)],1)],1)],1)}),1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ProfileList.vue?vue&type=template&id=55b2d494&

// EXTERNAL MODULE: ./src/services/profile.services.ts
var profile_services = __webpack_require__(102);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ProfileList.vue?vue&type=script&lang=js&
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

/* harmony default export */ var ProfileListvue_type_script_lang_js_ = ({
  props: {
    createBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    view(id) {
      this.$router.push(`/shop/${id}`);
    },

    edit(id) {
      this.$router.push(`/shop/edit/${id}`);
    },

    async remove(id) {
      await this.profileService.deleteOne({
        id
      });
      await this.profileService.save();
      this.profiles = await this.profileService.find();
    },

    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  },
  data: () => ({
    profiles: [],
    profileService: null
  }),

  async mounted() {
    console.log(this.createBtn);
    this.profileService = new profile_services["a" /* default */](this.$fireStore);
    this.profiles = await this.profileService.find();
  }

});
// CONCATENATED MODULE: ./src/components/ProfileList.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ProfileListvue_type_script_lang_js_ = (ProfileListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/vuetify-loader/lib/runtime/installComponents.js
var installComponents = __webpack_require__(23);
var installComponents_default = /*#__PURE__*/__webpack_require__.n(installComponents);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VBtn/VBtn.js
var VBtn = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/VCard.js
var VCard = __webpack_require__(101);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VCard/index.js
var components_VCard = __webpack_require__(99);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VCol.js
var VCol = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VContainer.js
var VContainer = __webpack_require__(97);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VIcon/VIcon.js
var VIcon = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VList.js
var VList = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/VListItem.js
var VListItem = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VList/index.js + 7 modules
var components_VList = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/vuetify/lib/components/VGrid/VRow.js
var VRow = __webpack_require__(113);

// CONCATENATED MODULE: ./src/components/ProfileList.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_ProfileListvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "9f0f9cdc"
  
)

/* harmony default export */ var ProfileList = __webpack_exports__["default"] = (component.exports);

/* vuetify-loader */














installComponents_default()(component, {VBtn: VBtn["a" /* default */],VCard: VCard["a" /* default */],VCardText: components_VCard["b" /* VCardText */],VCardTitle: components_VCard["c" /* VCardTitle */],VCol: VCol["a" /* default */],VContainer: VContainer["a" /* default */],VIcon: VIcon["a" /* default */],VList: VList["a" /* default */],VListItem: VListItem["a" /* default */],VListItemContent: components_VList["a" /* VListItemContent */],VListItemSubtitle: components_VList["b" /* VListItemSubtitle */],VListItemTitle: components_VList["c" /* VListItemTitle */],VRow: VRow["a" /* default */]})


/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/shop/index.vue?vue&type=template&id=8230a9b0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('profile-list',{attrs:{"create-btn":""}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/shop/index.vue?vue&type=template&id=8230a9b0&

// EXTERNAL MODULE: ./src/components/ProfileList.vue + 4 modules
var ProfileList = __webpack_require__(135);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/shop/index.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var shopvue_type_script_lang_js_ = ({
  components: {
    ProfileList: ProfileList["default"]
  }
});
// CONCATENATED MODULE: ./src/pages/shop/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_shopvue_type_script_lang_js_ = (shopvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(13);

// CONCATENATED MODULE: ./src/pages/shop/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_shopvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "2bba0455"
  
)

/* harmony default export */ var shop = __webpack_exports__["default"] = (component.exports);

/* nuxt-component-imports */
installComponents(component, {ProfileList: __webpack_require__(135).default})


/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VCardActions; });
/* unused harmony export VCardSubtitle */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return VCardText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return VCardTitle; });
/* harmony import */ var _VCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(101);
/* harmony import */ var _util_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);


const VCardActions = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "h"])('v-card__actions');
const VCardSubtitle = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "h"])('v-card__subtitle');
const VCardText = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "h"])('v-card__text');
const VCardTitle = Object(_util_helpers__WEBPACK_IMPORTED_MODULE_1__[/* createSimpleFunctional */ "h"])('v-card__title');

/* unused harmony default export */ var _unused_webpack_default_export = ({
  $_vuetify_subcomponents: {
    VCard: _VCard__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"],
    VCardActions,
    VCardSubtitle,
    VCardText,
    VCardTitle
  }
});

/***/ })

};;
//# sourceMappingURL=index.js.map
const compilerSfc = require('@vue/compiler-sfc');
const typescript = require('typescript');
const vue3Jest = require('@vue/vue3-jest');

compilerSfc.registerTS(() => typescript);

module.exports = vue3Jest;

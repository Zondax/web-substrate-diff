const {
  PrebuiltCommonTypes,
  PrebuiltCommonReads,
  PrebuiltCommonToString,
  SkipTypesCommon,
  SkipMethodsCommon,
  SkipTypeVersioningCommon,
} = require('../common/prebuilt_common')

const PrebuiltTypes = {
  ...PrebuiltCommonTypes,
}

const PrebuiltReads = {
  ...PrebuiltCommonReads,
}

const PrebuiltToString = {
  ...PrebuiltCommonToString,
}

const CustomTypes = {}

const SkipTypes = new Set([...SkipTypesCommon])

const SkipMethods = new Set([
  ...SkipMethodsCommon,
  'session.setKeys',
  'sudo.sudo',
  'sudo.sudoUncheckedWeight',
  'sudo.setKey',
  'sudo.sudoAs',
])

const SkipTypeVersioning = new Set([...SkipTypeVersioningCommon])

module.exports = {
  PrebuiltTypes,
  PrebuiltReads,
  PrebuiltToString,
  CustomTypes,
  SkipTypes,
  SkipMethods,
  SkipTypeVersioning,
}

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
  pd_Keys_t: `
    GEN_DEF_READARRAY(5 * 32)`,

  pd_VecKeys_t: `
    GEN_DEF_READARRAY(5 * 32)`,
}

const PrebuiltToString = {
  ...PrebuiltCommonToString,
  pd_Keys_t: `
    GEN_DEF_TOSTRING_ARRAY(4 * 32)`,
}

const CustomTypes = {}

const SkipTypes = new Set([...SkipTypesCommon])

const SkipTypeVersioning = new Set([...SkipTypeVersioningCommon])

const SkipMethods = new Set([...SkipMethodsCommon, 'utility.batchAll'])

module.exports = {
  PrebuiltTypes,
  PrebuiltReads,
  PrebuiltToString,
  CustomTypes,
  SkipTypes,
  SkipMethods,
  SkipTypeVersioning,
}

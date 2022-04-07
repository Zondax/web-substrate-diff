function fixDesc(t) {
  // If starts with _, remove
  if (t.length > 0 && t.charAt(0) === '_') {
    t = t.slice(1)
  }

  // Capitalize first letter
  t = t.toLowerCase()
  if (t.length > 0) {
    t = t.charAt(0).toUpperCase() + t.slice(1)
  }

  // Replace _ with spaces
  t = t.replace(/_/g, ' ')

  return t
}

function splitCamelCaseString(t) {
  t = t.replace(/([a-z])([A-Z])/g, '$1 $2')
  t = fixDesc(t)
  return t
}

function fixTrailingZeros(t) {
  t = t.replace(/(\.\d*?[1-9])0+$/g, '$1')
  return t
}

function fixMethodName(t) {
  return t.replace(/ /g, '_')
}

function fixName(t) {
  if (t === 'new') return 'new_'
  return t
}

function fixType(t) {
  t = t.split('[').join('')
  t = t.split(']').join('')
  t = t.split('<(').join('Tuple')
  t = t.split('<').join('')
  t = t.split('>').join('')
  t = t.split(',').join('')
  t = t.split('(').join('')
  t = t.split(')').join('')
  t = t.split(';').join('_array_')
  return t
}

const defaultPageLength = 39

function splitString(outputList, itemData, pageLength) {
  let numPages = Math.ceil(itemData.toString().length / pageLength)
  for (let i = 0; i < numPages; i++) {
    let slice = itemData.slice(i * pageLength, (i + 1) * pageLength)
    outputList.push(slice)
  }
}

function pageString(outputList, itemIdx, itemName, itemData, pageLength = defaultPageLength) {
  let slices = []

  if (itemData.length === 0) {
    return slices
  }

  let customPageLength = pageLength

  if (Array.isArray(itemData)) {
    itemData.forEach(v => {
      if (v.customPageLength !== undefined) {
        customPageLength = v.customPageLength
      }

      let tmp = []
      slices.push(...pageString(tmp, itemIdx, itemName, v, customPageLength))
      customPageLength = pageLength
    })
  } else {
    splitString(slices, itemData, pageLength)
  }

  if (slices.length <= 1) {
    outputList.push(`${itemIdx} | ${itemName} : ${slices[0]}`)
    return slices
  }

  for (let i = 0; i < slices.length; i++) {
    outputList.push(`${itemIdx} | ${itemName} [${i + 1}/${slices.length}] : ${slices[i]}`)
  }

  return slices
}

module.exports = {
  fixName,
  fixType,
  fixDesc,
  fixMethodName,
  fixTrailingZeros,
  splitCamelCaseString,
  defaultPageLength,
  pageString,
}

if (require.main === module) {
  let answer = []
  let input = ['Data1'.repeat(20), 'Data2'.repeat(20)]

  pageString(answer, 1, 'TestField', input)

  answer.forEach(v => console.log(v))
}

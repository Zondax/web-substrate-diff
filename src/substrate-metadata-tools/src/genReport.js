const generateReport = (chain, data) => {
  let palletIndex = 0
  let methodIndex = 0

  let file = ''
  let version = Object.keys(data.metadata)[0]

  data.metadata[version].modules.forEach(m => {
    file += `[${paddIndex(palletIndex)}] Pallet ${m.name}\n`
    palletIndex++

    methodIndex = 0

    if (!m.calls) return
    m.calls.forEach(c => {
      let args = ''
      c.args.forEach(a => {
        args += `${a.name} ${a.type}, `
      })
      args = args.substr(0, args.length - 2)
      file += `\t[${paddIndex(methodIndex)}]  ${c.name}(${args})\n`
      methodIndex++
    })
  })

  return file
}

const paddIndex = index => {
  return '000'.substr(0, 3 - index.toString().length) + index.toString()
}

module.exports = { generateReport }

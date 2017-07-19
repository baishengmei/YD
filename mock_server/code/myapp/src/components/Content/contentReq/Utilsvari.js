const options = [{
  value: "regex",
  label: "Regex",
  children: [{
    value: "regexEq",
    label: "等于"
  }]
}, {
  value: 'neum',
  label: '枚举',
  children: [{
    value: 'neumEq',
    label: '等于'
  }]
}, {
  value: 'int',
  label: '整数',
  children: [{
    value: 'intEq',
    label: '等于'
  }, {
    value: "intBe",
    label: "范围"
  }]
}, {
  value: 'float',
  label: '小数',
  children: [{
    value: 'floatEq',
    label: '等于'
  }, {
    value: "floatBe",
    label: "范围"
  }]
}, {
  value: 'bool',
  label: '布尔',
  children: [{
    value: 'boolAny',
    label: '任意'
  }, {
    value: "boolT",
    label: "True"
  }, {
    value: "boolF",
    label: "False"
  }]
}, {
  value: 'str',
  label: 'String',
  children: [{
    value: 'strEq',
    label: '等于'
  }, {
    value: "strBe",
    label: "范围"
  }]
}, {
  value: 'chinese',
  label: '中文',
  disabled: true,
  children: [{
    value: 'chineseEq',
    label: '等于'
  }, {
    value: "chineseBe",
    label: "范围"
  }]
}, {
  value: 'email',
  label: 'Email',
}, {
  value: 'ip',
  label: 'Ip',
}, {
  value: 'url',
  label: 'Url',
}, {
  value: 'thedate',
  label: '日期',
  children: [{
    value: 'date',
    label: 'Date'
  }, {
    value: "time",
    label: "Time"
  }, {
    value: "date_time",
    label: "Datetime"
  }]
}, {
  value: 'address',
  label: '地址',
  children: [{
    value: 'region',
    label: 'Region'
  }, {
    value: "province",
    label: "Province"
  }, {
    value: "city",
    label: "City"
  }, {
    value: "country",
    label: "country"
  }, {
    value: "zip",
    label: "Zip"
  }]
}, {
  value: "obj",
  label: "Object",
  children: [{
    value: "objEq",
    label: "等于"
  }, {
    value: "objBe",
    label: "自定义"
  }]
}, {
  value: "arr",
  label: "Array",
  children: [{
    value: "arrEq",
    label: "等于"
  }, {
    value: "arrBe",
    label: "自定义"
  }]
}];

const allOptionItems = ["Regex", "枚举", "整数", "小数", "布尔", "String", "中文", "Email", "Ip", "Url", "Array", "Object", "日期", "地址"];

export { options, allOptionItems }
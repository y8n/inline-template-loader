var loaderUtils = require('loader-utils');
var path = require('path');
var fs = require('fs');

var reg = /"(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|(\/\/[^\r\n\f]+|\/\*[\s\S]*?(?:\*\/|$))|\b(__inline|__template)\s*\(\s*("(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*')\s*\)/g;

module.exports = function (content) {
  var context = this;
  var options = loaderUtils.getOptions(context) || {};
  var resourcePath = context.resourcePath;
  content = content.replace(options.pattern || reg, options.replacement || function(m, comment, type, value){
      if(type){
        var filePath = path.resolve(path.dirname(resourcePath),value.replace(/['"]/g,''));
        //没有后缀名的默认补.html
        if(path.extname(filePath) === ''){
          filePath += '.html'
        }
        if(fs.existsSync(filePath)){
          context.addDependency(filePath);
          return JSON.stringify(fs.readFileSync(filePath).toString().replace(/\r\n/g,'\n'))
        }else{
          return m;
        }
      }else{
        return m;
      }
    });
  return content;
};

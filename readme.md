# inline-template-loader

## Install

```
npm install inline-template-loader
```

## Usage

```javascript
// webpack.conf.js

module: {
  rules:[{
    test: /\.js$/,
    loader: 'inline-template-loader'
  }]
}

```

## Output

```javascript
// index.js
function foo(){
  return __inline('./template.html');
}
```

```html
// template.html
<div class="template">
  <h1>HelloWorld</h1>
</div>
```

```javascript
// output.js
function foo(){
  return '<div class="template"><h1>HelloWorld</h1></div>';
}
```

## options

```javascript
// webpack.conf.js

module: {
  rules:[{
    test: /\.js$/,
    loader: 'inline-template-loader',
    options: {
      pattern: /__template(/    // 正则
      replcement: function(m){  // 替换方法
        return m.slice(1);
      }
    }
  }]
}

```

## License

MIT

var fs = require('fs');
var hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
var md = require('markdown-it')({
    html:true,
    langPrefix:   'hljs language-',
    highlight: function (str, lang) {

        console.log('str: ', str);
        console.log('lang: ', lang);

      if (lang && hljs.getLanguage(lang)) {
        try {
            console.log('this one selected: ', lang);
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
  
      return ''; // use external default escaping


    }
  });

var mdFile = process.argv[2];

var prefix = '<html><head>\
<link rel="stylesheet" href="style.css">\
<link class="codestyle" rel="stylesheet" href="darcula.css">\
</head><body>';
var surfix = '</body></html>';

const content = fs.readFileSync(mdFile, "utf8");
var result = md.render(content);

fs.writeFile(mdFile.replace('md', 'html'), prefix+result+surfix, function (err) {
    if (err) return console.log(err);
  });
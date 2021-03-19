/*!
* BJSpell JavaScript Library v0.0.1
* http://code.google.com/p/bjspell/
*
* Copyright (c) 2009 Andrea Giammarchi
* Licensed under the Lesser GPL licenses.
*
* Date: 2009-02-05 23:50:01 +0000 (Wed, 05 Feb 2009)
* Revision: 1
* ToDo: better suggestion (at least one that make more sense)
*/BJSpell=function(){function BJSpell(dic,callback){if(this instanceof BJSpell){var lang=/^.*?([a-zA-Z]{2}_[a-zA-Z]{2}).*$/.exec(dic)[1],self=this;if(!callback)
callback=empty;if(BJSpell[lang]){if(BJSpell[lang]instanceof BJSpell)
    self=BJSpell[lang]
    else
    BJSpell[lang]=sync(self,BJSpell[lang]);self.checked={};var keys=self.keys=[],words=self.words,i=0,key;for(key in words)
    keys[i++]=key;keys.indexOf=indexOf;setTimeout(function(){callback.call(self)},1);}else{var script=document.createElement("script");BJSpell[lang]=self;script.src=dic;script.type="text/javascript";script.onload=function(){script.onload=script.onreadystatechange=empty;script.parentNode.removeChild(script);BJSpell.call(self,dic,callback);};script.onreadystatechange=function(){if(/loaded|completed/i.test(script.readyState))
    script.onload();};(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(script);};return self;}else
    return new BJSpell(dic,callback);};BJSpell.prototype.check=function(word){var checked=this.checked[word=word.toLowerCase()];return typeof checked==="boolean"?checked:this.parse(word);};BJSpell.prototype.parse=function(word){if(/^[0-9]+$/.test(word))
    return this.checked[word]=true;var result=!!this.words[word];if(!result){for(var
    parsed=word,rules=this.rules.PFX,length=rules.length,i=0,rule,str,seek,re,add;i<length;i++){rule=rules[i];add=rule[0];seek=rule[1];re=rule[2];str=word.substr(0,seek.length);if(str===seek){parsed=word.substring(str.length);if(add!=="0")
    parsed=add+parsed;result=!!this.words[parsed];break;}};if(!result&&parsed.length){for(var
    rules=this.rules.SFX,len=parsed.length,length=rules.length,i=0;i<length;i++){rule=rules[i];add=rule[0];seek=rule[1];re=rule[2];str=parsed.substring(len-seek.length);if(str===seek){seek=parsed.substring(0,len-str.length);if(add!=="0")
    seek+=add;if((re==="."||new RegExp(re+"$").test(seek))&&this.words[seek]){result=true;break;}}}}};return this.checked[word]=result;};BJSpell.prototype.replace=function(String,callback){var self=this;return String.replace(self.alphabet,function(word){return self.check(word)?word:callback(word);});};BJSpell.prototype.suggest=function(word,many){if(typeof this.words[word]==="string"){var words=[word];}else{var keys=this.keys,length=keys.length,i=Math.abs(many)||1,ceil,indexOf,words;word=word.toLowerCase();if(-1===keys.indexOf(word))
    keys[length]=word;keys.sort();indexOf=keys.indexOf(word);many=indexOf-((i/2)>>0);ceil=indexOf+1+Math.ceil(i/2);words=keys.slice(many,indexOf).concat(keys.slice(indexOf+1,ceil));while(words.length<i&&++ceil<keys.length)
    words[words.length]=keys[ceil];if(length!==keys.length)
    keys.splice(indexOf,1);};return words;};var empty=function(){},indexOf=Array.prototype.indexOf||function(word){for(var i=0,length=this.length;i<length&&this[i]!==word;i++);return i==length?-1:i},sync=function(a,b){for(var k in b)a[k]=b[k];return a};return BJSpell;}();
module.exports = function (api) {
   api.cache(true);
 
   const presets = [
       '@babel/preset-env',
   ];
   const plugins = [
       '@babel/plugin-transform-arrow-functions',
       '@babel/plugin-transform-runtime',
       ["component", 
        {
          "libraryName": "mint-ui",
          "style": true
        }
      ],
   ];
   return {
     presets,
     plugins
   };
   
 }
//'use strict'
//-- import modules
const fp = require('fastify-plugin')
    path = require('path'),
    nunjucks = require('nunjucks'), //-- template engine 
    fastifyStatic = require('@fastify/static'), //-- serve public folder 
    favicon = require('fastify-favicon'), //-- icon
    view = require("@fastify/view"), //-- template config
    minifier = require('html-minifier'), //-- minify html
    helper = require('../config/helper.js'); //--template helper
/**
 * This plugins ...
 */

module.exports = fp(async function (fastify) {

    // Set Static files path
    
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, '../public'),
    })

 
    

    //fav icon
    fastify.register(favicon, {
        path: path.join(__dirname, '../public'),
        name: 'favicon.ico'
    })



    // configure template
    fastify.register(view, {
        engine: {
            nunjucks: nunjucks,
        },
        includeViewExtension: true,
        root: path.join(__dirname, '../resources/views'),
        options: {
            onConfigure: (env) => {
                // do whatever you want on nunjucks env
                // add helper for template
                env.addGlobal('url', helper.url);
                env.addGlobal('metroCss', helper.metroCss);
                env.addGlobal('metroJs', helper.metroJs);
                env.addGlobal('bootstrapCss', helper.bootstrapCss);
                env.addGlobal('bootstrapJs', helper.bootstrapJs);
                env.addGlobal('img', helper.img);
                env.addGlobal('public', helper.public);
                env.addGlobal('dist', helper.dist);
                env.addGlobal('test', helper.test);
                env.addFilter('shorten', function (str, count) {
                    return str.slice(0, count || 5);
                });

            },
            useHtmlMinifier: minifier,
            htmlMinifierOptions: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true
            }
        }
    })


})
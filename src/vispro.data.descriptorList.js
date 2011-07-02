vispro.data.descriptorList = [
     {
        type: 'search',
        name: 'Search',
/*      
        images: {
            icon: {
                src: 
            }
            image: {
                src: 
            }
        },
        dimensions: {
            width: {
                value: ,
                resizable: 
            },
            height: {
                value:
                resizable:
            }
        },
*/
        dependencies: {
            map : {
                type: 'map',
                name: 'map',
                label: 'map',
                required: true
            },
            info: {
                type: 'info',
                name: 'info',
                label: 'info',
                required: false
            }
        },
        properties: {
            id: {
                name: 'id',
                label: 'id',
                type: 'string',
                writable: true
            },
            label: {
                name: 'label',
                label: 'label',
                value: 'Search',
                type: 'string',
                writable: false
            },
            ico: {
                name: 'ico',
                label: 'ico',
                type: 'url',
                value: 'http://search.ico',
                writable: false
            },
            img: {
                name: 'img',
                label: 'img',
                type: 'url',
                value: 'images/search.jpg',
                writable: false
            },
            left: {
                name: 'left',
                label: 'left',
                type: 'integer',
                value: 0,
                minimum: 0,
                writable: true
            },
            top: {
                name: 'top',
                label: 'top',
                type: 'integer',
                value: 0,
                minimum: 0,
                writable: true
            },
            width: {
                name: 'width',
                label: 'width',
                type: 'integer',
                value: 323,
                writable: false
            },
            height: {
                name: 'heigth',
                label: 'height',
                type: 'integer',
                value: 121,
                writable: false
            },
            resizable: {
                name: 'resizable',
                label: 'resizable',
                type: 'boolean',
                value: false,
                writable: false
            },
            tooltip: {
                name: 'tooltip',
                label: 'tooltip',
                type: 'boolean',
                value: true,
                writable: true
            }
        },
        templates: {
            html: {
                code: 
                    '<div id="<%= id %>" style="position:absolute; top:<%= top %>px; left:<%= left %>px"></div>',
                parameters: ['id', 'top', 'left']
            },
            js: {
                code: 
                    'var <%= id %> = geopoi.sdk.search("<%= id %>", { \n' +
                    '    map: <%= map %>, \n' +
                    '    tooltip: <%= tooltip %>, \n' +
                    '    opt: false, \n' +
                    '    infoDiv: <%= info %> \n' + 
                    '}); \n',
                parameters: ['id', 'map', 'tooltip', 'info' ]
            }
        }
    },
    {
        type: 'zoom_h_s',
        name: 'Zoom horizontal scrool',
        dependencies: {
            map : {
                type: 'map',
                name: 'map',
                label: 'map',
                required: true
            }
        },
        properties: {
            id: {
                name: 'id',
                label: 'id',
                type: 'string',
                writable: true
            },
            name: {
                name: 'name',
                label: 'name',
                type: 'string',
                value: 'zoom_h_s',
                writable: false
            },
            label: {
                name: 'label',
                label: 'label',
                value: 'Zoom horizontal slider',
                type: 'string',
                writable: false
            },
            ico: {
                name: 'ico',
                label: 'ico',
                type: 'url',
                value: 'images/zoom_h_s.jpg'
            },
            img: {
                name: 'img',
                label: 'img',
                type: 'url',
                value: 'images/zoom_h_s.jpg',
                writable: false
            },
            left: {
                name: 'left',
                label: 'left',
                type: 'integer',
                value: 0,
                minimum: 0,
                writable: true
            },
            top: {
                name: 'top',
                label: 'top',
                type: 'integer',
                value: 0,
                minimum: 0,
                writable: true
            },
            width: {
                name: 'width',
                label: 'size',
                type: 'integer',
                value: 168,
                minimum: 0,
                writable: true
            },
            height: {
                name: 'height',
                label: 'height',
                type: 'integer',
                value: 26,
                minimum: 0,
                writable: false
            },
            vertical: {
                name: 'vertical',
                label: 'vertical',
                type: 'boolean',
                value: false
            },
            slider: {
                name: 'slider',
                label: 'slider',
                type: 'boolean',
                value: true
            },
            tooltip: {
                name: 'tooltip',
                label: 'tooltip',
                type: 'boolean',
                value: true,
                writable: true
            }
        },
        templates: {
            html: {
                code: 
                    '<div id="<%= id %>" style="position:absolute; top:<%= top %>px; left:<%= left %>px"></div>',
                parameters: ['id', 'top', 'left']
            },
            js: {
                code: 
                    'var <%= id %> = geopoi.sdk.zoom("<%= id %>", { \n' + 
                    '    map: <%= map %>, \n' +
                    '    tooltip: <%= tooltip %>, \n' +
                    '    vertical: <%= vertical %>, \n' +
                    '    slider: <%=  slider %>, \n' +
                    '    size: <%= width %> \n' + 
                    '}); \n',
                parameters: ['id', 'map', 'tooltip', 'vertical', 'slider', 'width']
            }
        }
    },
    {
        type: 'map',
        name: 'Map',
        dependencies: {
            
        },
        properties: {
            id: {
                name: 'id',
                label: 'id',
                type: 'string',
                writable: true
            },
            name: {
                name: 'name',
                label: 'name',
                type: 'string',
                value: 'map',
                writable: false
            },
            label: {
                name: 'label',
                label: 'label',
                value: 'Map',
                type: 'string',
                writable: false
            },
            ico: {
                name: 'ico',
                label: 'ico',
                type: 'url',
                value: 'images/map.jpg'
            },
            img: {
                name: 'img',
                label: 'img',
                type: 'url',
                value: 'images/map.jpg',
                writable: false
            },
            left: {
                name: 'left',
                label: 'left',
                type: 'integer',
                value: 0,
                minimum: 0,
                writable: true
            },
            top: {
                name: 'top',
                label: 'top',
                type: 'integer',
                value: 0,
                minimum: 0,
                writable: true
            },
            width: {
                name: 'width',
                label: 'width',
                type: 'integer',
                value: 400,
                minimum: 0,
                writable: true
            },
            height: {
                name: 'height',
                label: 'height',
                type: 'integer',
                value: 300,
                minimum: 0,
                writable: true
            }
        },
        templates: {
            html: {
                code: 
                    '<div id="<%= id %>" style="position:absolute; left:<%= left %>px; top:<%= top %>px; width:<%= width %>px; height:<%= height %>px"></div>',
                parameters: ['id', 'left', 'top', 'width', 'height']
            },
            js: {
                code: 
                    'var <%= id %> = geopoi.sdk.map("<%= id %>"); \n',
                parameters: ['id']
            }
        }
    },
    {
        type: 'pan_4',
        name: 'Pan 4',
        dependencies: {
            map : {
                type: 'map',
                name: 'map',
                label: 'map',
                required: true
            }
        },
        properties: {
            id: {
                name: 'id',
                label: 'id',
                type: 'string',
                writable: true
            },
            name: {
                name: 'name',
                label: 'name',
                type: 'string',
                value: 'pan4',
                writable: false
            },
            label: {
                name: 'label',
                label: 'label',
                value: 'Pan 4',
                type: 'string',
                writable: false
            },
            ico: {
                name: 'ico',
                label: 'ico',
                type: 'url',
                value: 'images/pan_4.jpg',
                writable: false
            },
            img: {
                name: 'img',
                label: 'img',
                type: 'url',
                value: 'images/pan_4.jpg',
                writable: false
            },
            left: {
                name: 'left',
                label: 'left',
                type: 'integer',
                value: 0,
                minimum: 0,
                writable: true
            },
            top: {
                name: 'top',
                label: 'top',
                type: 'integer',
                value: 0,
                minimum: 0,
                writable: true
            },
            width: {
                name: 'width',
                label: 'width',
                type: 'integer',
                value: 64,
                minimum: 0,
                writable: false
            },
            height: {
                name: 'height',
                label: 'height',
                type: 'integer',
                value: 64,
                minimum: 0,
                writable: false
            },
            resizable: {
                name: 'resizable',
                label: 'resizable',
                type: 'boolean',
                value: false
            },
            tooltip: {
                name: 'tooltip',
                label: 'tooltip',
                type: 'boolean',
                value: true,
                writable: true
            }
        },
        templates: {
            html: {
                code: 
                    '<div id="<%= id %>" style="position:absolute, top:<%= top %>px, left:<%= left %>px"></div>',
                parameters: ['id', 'top', 'left']
            },
            js: {
                code: 
                    'var <%= id %> = geopoi.sdk.pan("<%= id %>", { \n' + 
                    '    fourarrow: false, \n' + 
                    '    map: <%= map %>, \n' + 
                    '    tooltip: <%= tooltip %> \n' + 
                    '}); \n',
                parameters: ['id', 'map', 'tooltip']
            }
        }
    }
];
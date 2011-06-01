vispro.data.descriptorList = [
    {
        name: 'search',
        properties: {
            id: {
                name: 'id',
                label: 'id',
                type: 'string',
                unique: true,
                writable: true
            },
            name: {
                name: 'name',
                label: 'name',
                type: 'string',
                value: 'search',
                writable: false
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
            map: {
                name: 'map',
                label: 'map',
                type: 'widget',
                widget: 'map',
                writable: true
            },
            tooltip: {
                name: 'tooltip',
                label: 'tooltip',
                type: 'boolean',
                value: true,
                writable: true
            },
            infoDiv: {
                name: 'infoDiv',
                label: 'info',
                type: 'widget',
                widget: 'info',
                writable: true
            }
        },
        templates: {
            html: {
                code: 
                    '<div id="<%= id %> style="position:absolute, top:<%= top %>, left:<%= left %>" ></div>',
                parameters: {
                    id: {
                        name: 'id',
                        required: true,
                        ref: 'id'
                    },
                    top: {
                        name: 'top',
                        required: true,
                        ref: 'top'
                    },
                    left: {
                        name: 'left',
                        required: true,
                        ref: 'left'
                    }
                }
            },
            js: {
                code: 
                    'var <%= id %> = geopoi.sdk.search("<%= id %>", { \n' +
                    '    map: <%= map %>, \n' +
                    '    tooltip: <%= tooltip %>, \n' +
                    '    opt: false, \n' +
                    '    infoDiv: <%= infoDiv %> \n' + 
                    '}); \n',
                parameters: {
                    id: {
                        name: 'id',
                        required: true,
                        ref: 'id'
                    },
                    map: {
                        name: 'map',
                        required: true,
                        ref: 'map'
                    },
                    tooltip: {
                        name: 'tooltip',
                        required: true,
                        ref: 'tooltip'
                    },
                    infoDiv: {
                        name: 'infoDiv',
                        required: false,
                        ref: 'infoDiv'
                    }
                }
            }
        }
    },
    {
        name: 'zoom_h_s',
        properties: {
            id: {
                name: 'id',
                label: 'id',
                type: 'string',
                unique: true,
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
            resizable: {
                name: 'resizable',
                label: 'resizable',
                type: 'boolean',
                value: true,
                width: true,
                height: false
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
            map: {
                name: 'map',
                label: 'map',
                type: 'widget',
                widget: 'map',
                writable: true
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
                    '<div id="<%= id %> style="position:absolute, top:<%= top %>, left:<%= left %>" ></div>',
                parameters: {
                    id: {
                        name: 'id',
                        required: true,
                        ref: 'id'
                    },
                    top: {
                        name: 'top',
                        required: true,
                        ref: 'top'
                    },
                    left: {
                        name: 'left',
                        required: true,
                        ref: 'left'
                    }
                }
            },
            js: {
                code: 
                    'var <%= id %> = geopoi.sdk.zoom("<%= id %>", { \n' + 
                    '    map: <%= map %>, \n' +
                    '    tooltip: <%= tooltip %>, \n' +
                    '    vertical: <%= vertical %>, \n' +
                    '    slider: <%=  slider %>, \n' +
                    '    size: <%= size %> \n' + 
                    '});',
                parameters: {
                    id: {
                        name: 'id',
                        required: true,
                        ref: 'id'
                    },
                    map: {
                        name: 'map',
                        required: true,
                        ref: 'map'
                    },
                    tooltip: {
                        name: 'tooltip',
                        required: true,
                        ref: 'tooltip'
                    },
                    vertical: {
                        name: 'vertical',
                        required: true,
                        ref: 'vertical'
                    },
                    slider: {
                        name: 'slider',
                        required: true,
                        ref: 'slider'
                    },
                    size: {
                        name: 'size',
                        required: true,
                        ref: 'width'
                    }
                }
            }
        }
    },
    {
        name: 'map',
        properties: {
            id: {
                name: 'id',
                label: 'id',
                type: 'string',
                unique: true,
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
            },
            resizable: {
                name: 'resizable',
                label: 'resizable',
                type: 'boolean',
                value: true
            }
        },
        templates: {
            html: {
                code: 
                    '<div id="<%= id %> style="position:absolute, left:<%= left %>px, top:<%= top %>px, width=<%= width %>px, height=<%= height %>></div>',
                parameters: {
                    id: {
                        name: 'id',
                        required: true,
                        ref: 'id'
                    },
                    left: {
                        name: 'left',
                        required: true,
                        ref: 'left'
                    },
                    top: {
                        name: 'top',
                        required: true,
                        ref: 'top'
                    },
                    width: {
                        name: 'width',
                        required: true,
                        ref: 'width'
                    },
                    height: {
                        name: 'height',
                        required: true,
                        ref: 'height'
                    }
                }
            },
            js: {
                code: 
                    'var <%= id %> = geopoi.sdk.map("<%= id %>"); \n',
                parameters: {
                    id: {
                        name: 'id',
                        required: true,
                        ref: 'id'
                    }
                }
            }
        }
    },
    {
        name: 'pan_4',
        properties: {
            id: {
                name: 'id',
                label: 'id',
                type: 'string',
                unique: true,
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
            },
            map: {
                name: 'map',
                label: 'map',
                type: 'widget',
                widget: 'map',
                writable: true
            }
        },
        templates: {
            html: {
                code: 
                    '<div id="<%= id %> style="position:absolute, top:<%= top %>, left:<%= left %>" ></div>',
                parameters: {
                    id: {
                        name: 'id',
                        required: true,
                        ref: 'id'
                    },
                    top: {
                        name: 'top',
                        required: true,
                        ref: 'top'
                    },
                    left: {
                        name: 'left',
                        required: true,
                        ref: 'left'
                    }
                }
            },
            js: {
                code: 
                    'var <%= id %> = geopoi.sdk.pan("<%= id %>", { \n' + 
                    '    fourarrow: false, \n' + 
                    '    map: <%= map %>, \n' + 
                    '    tooltip: <%= tooltip %> \n' + 
                    '});',
                parameters: {
                    id: {
                        name: 'id',
                        type: 'string',
                        required: true,
                        ref: 'id'
                    },
                    map: {
                        name: 'map',
                        required: true,
                        ref: 'map'                      
                    },
                    tooltip: {
                        name: 'tooltip',
                        required: true,
                        ref: 'tooltip'                      
                    }
                }
            }
        }
    }
];
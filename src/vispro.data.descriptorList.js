vispro.data.descriptorList = [
     {
        type: 'search',
        name: 'search',
        descriptor: 'Search window',
        icon: {
            src: 'images/search.jpg'
        },
        image: {
            src: 'images/search.jpg'
        },
        dimensions: {
            width: {
                value: 323,
                resizable: false
            },
            height: {
                value: 121,
                resizable: false
            }
        },
        position: {
            top: 0,
            left: 0
        },
        dependencies: {
            map : {
                name: 'map',
                required: true
            },
            info: {
                name: 'info',
                required: false
            }
        },
        properties: {
            tooltip: {
                type: 'boolean',
                name: 'tooltip',
                value: false,
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
        type: 'zoom',
        name: 'zoom_h_s',
        description: 'Zoom horizontal scrool',
        icon: {
            src: 'images/zoom_h_s.jpg'
        },
        image: {
            src: 'images/zoom_h_s.jpg'
        },
        dimensions: {
            width: {
                value: 168,
                resizable: false
            },
            height: {
                value: 26,
                resizable: false
            }
        },
        position: {
            top: 0,
            left: 0
        }, 
        dependencies: {
            map : {
                name: 'map',
                required: true
            }
        },
        properties: {
            tooltip: {
                type: 'boolean',
                name: 'tooltip',
                value: true
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
                    '    vertical: false, \n' +
                    '    slider: true, \n' +
                    '    size: <%= width %> \n' + 
                    '}); \n',
                parameters: ['id', 'map', 'tooltip', 'width']
            }
        }
    },
    {
        type: 'map',
        name: 'map',
        descriptor: 'Map',
        icon: {
            src: 'images/map.jpg'
        },
        image: {
            src: 'images/map.jpg'
        },
        dimensions: {
            width: {
                value: 400,
                resizable: false
            },
            height: {
                value: 300,
                resizable: false
            }
        },
        position: {
            top: 0,
            left: 0
        }, 
        dependencies: {
        },
        properties: {
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
        name: 'pan_4',
        descriptor: 'Pan with 4 arrow',
        icon: {
            src: 'images/pan_4.jpg'
        },
        image: {
            src: 'images/pan_4.jpg'
        },
        dimensions: {
            width: {
                value: 50,
                resizable: false
            },
            height: {
                value: 50,
                resizable: false
            }
        },
        position: {
            top: 0,
            left: 0
        }, 
        dependencies: {
            map : {
                name: 'map',
                required: true
            }
        },
        properties: {
            tooltip: {
                type: 'boolean',
                name: 'tooltip',
                value: true
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